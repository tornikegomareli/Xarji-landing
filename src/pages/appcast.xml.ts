// Sparkle 2 appcast feed for Xarji's macOS auto-update flow.
//
// Runs at Astro build time (the landing site is statically rendered).
// Each release-published event on the main Xarji repo triggers a fresh
// build of this site via the landing-redeploy workflow, so the feed
// always reflects the GitHub-side state of releases without manual
// intervention.
//
// The menu-bar app's Info.plist points SUFeedURL at https://xarji.app/
// appcast.xml; Sparkle hits this endpoint daily (per
// SUScheduledCheckInterval=86400), compares the topmost <item>'s
// sparkle:version against the installed bundle's CFBundleVersion, and
// if the feed's value is higher it offers the download. Signature
// verification uses the EdDSA public key embedded in each user's
// installed Info.plist (SUPublicEDKey).
//
// Important: <sparkle:version> is treated by Sparkle as the build
// number equivalent (a strictly-increasing integer), NOT the marketing
// version. <sparkle:shortVersionString> is the marketing version used
// for display only. If the feed puts the marketing version into both
// fields, Sparkle's numeric comparison degrades to nonsense — splitting
// "0.6.0" into [0, 6, 0] and comparing against an installed
// CFBundleVersion like "16" gives 0 < 16, so the latest release looks
// older than what's installed and users see "You're up to date" even
// though they're not. v0.6.0 surfaced this exact bug.
//
// We extract the build number from a hidden HTML comment the publish
// script writes into the GitHub release body: `<!-- build: 18 -->`.
// Falls back to the marketing version string when the marker is
// missing (legacy releases pre-dating the publish-script change keep
// working, even if their Sparkle comparison is still subtly broken).

import type { APIRoute } from 'astro';

const REPO = 'tornikegomareli/Xarji';
const MIN_MACOS = '13.0';

type GhAsset = { name: string; size: number; browser_download_url: string };
type GhRelease = {
  tag_name: string;
  name: string;
  body: string;
  published_at: string;
  prerelease: boolean;
  draft: boolean;
  assets: GhAsset[];
};

type EdDsaJson = {
  version: string;
  edSignature: string;
  length: number;
};

export const GET: APIRoute = async () => {
  const headers = githubHeaders();

  // 50 releases is plenty — Sparkle only ever cares about the topmost
  // entry that satisfies the user's CFBundleVersion comparison; older
  // entries are informational. We still return them so the feed reads
  // as an honest history of every signed release.
  const res = await fetch(
    `https://api.github.com/repos/${REPO}/releases?per_page=50`,
    { headers },
  );
  if (!res.ok) {
    return new Response(`GitHub API error: ${res.status}`, {
      status: 502,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
  }
  const releases = (await res.json()) as GhRelease[];

  const items: string[] = [];
  for (const r of releases) {
    if (r.prerelease || r.draft) continue;

    const dmg = r.assets.find((a) => a.name.endsWith('.dmg'));
    const sig = r.assets.find((a) => a.name.endsWith('.dmg.eddsa.json'));
    // Releases pre-Sparkle (v0.3.1 and earlier) don't have an .eddsa.json
    // asset. Skipping them keeps the feed valid; the menu-bar app simply
    // never offers those builds as updates, which is the right behaviour
    // — Sparkle requires a verified signature.
    if (!dmg || !sig) continue;

    let sigJson: EdDsaJson;
    try {
      const sigRes = await fetch(sig.browser_download_url, { headers });
      if (!sigRes.ok) continue;
      sigJson = (await sigRes.json()) as EdDsaJson;
    } catch {
      // Network blip while fetching the signature asset for this entry.
      // Skip rather than poison the feed with a bogus enclosure.
      continue;
    }

    const version = stripV(r.tag_name);
    const build = parseBuildNumber(r.body);
    const pubDate = new Date(r.published_at).toUTCString();
    items.push(buildItem({ version, build, pubDate, dmgUrl: dmg.browser_download_url, sigJson, name: r.name, body: r.body }));
  }

  const xml = `<?xml version="1.0" encoding="utf-8"?>
<rss xmlns:sparkle="http://www.andymatuschak.org/xml-namespaces/sparkle" version="2.0">
  <channel>
    <title>Xarji</title>
    <link>https://github.com/${REPO}/releases</link>
    <description>Xarji release feed for Sparkle auto-updates</description>
    <language>en</language>${items.join('')}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      // Modest cache so a transient GitHub-API outage doesn't take the
      // feed down with us; long enough that we're not pinging GitHub on
      // every Sparkle check from every user. Astro static rendering
      // means this header only applies if the host (Railway) honours it.
      'Cache-Control': 'public, max-age=600',
    },
  });
};

function buildItem(args: {
  version: string;
  build: string | null;
  pubDate: string;
  dmgUrl: string;
  sigJson: EdDsaJson;
  name: string;
  body: string;
}): string {
  const { version, build, pubDate, dmgUrl, sigJson, name, body } = args;
  const title = name?.trim() || `Version ${version}`;
  // sparkle:version MUST be the build number for Sparkle's numeric
  // comparison to work correctly against the installed CFBundleVersion.
  // Fall back to the marketing version on legacy releases that don't
  // carry the marker — those will still be broken on auto-update, but
  // re-publishing them with the marker fixes them retroactively.
  const sparkleVersion = build ?? version;
  return `
    <item>
      <title>${escapeXml(title)}</title>
      <sparkle:version>${escapeXml(sparkleVersion)}</sparkle:version>
      <sparkle:shortVersionString>${escapeXml(version)}</sparkle:shortVersionString>
      <sparkle:minimumSystemVersion>${MIN_MACOS}</sparkle:minimumSystemVersion>
      <pubDate>${pubDate}</pubDate>
      <description><![CDATA[${cdataSafe(body)}]]></description>
      <enclosure url="${escapeXml(dmgUrl)}"
                 sparkle:edSignature="${escapeXml(sigJson.edSignature)}"
                 length="${sigJson.length}"
                 type="application/octet-stream"/>
    </item>`;
}

// Looks for a hidden HTML comment of the form "<!-- build: 18 -->"
// anywhere in the release body. Case-insensitive on the keyword, plus
// whitespace tolerant either side of the colon. Returns the captured
// digits verbatim (as a string, so the XML emitter doesn't have to
// worry about Number → string round-tripping). null when no marker
// exists or it can't be parsed cleanly.
function parseBuildNumber(body: string): string | null {
  const match = /<!--\s*build:\s*(\d+)\s*-->/i.exec(body);
  return match ? match[1] : null;
}

function githubHeaders(): Record<string, string> {
  const token = (import.meta.env.GITHUB_TOKEN ?? '') as string;
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  };
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
}

function stripV(t: string): string {
  return t.startsWith('v') ? t.slice(1) : t;
}

function escapeXml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// Inside CDATA sections only the literal "]]>" terminator needs guarding.
// Splitting it across two CDATA blocks is the standard escape.
function cdataSafe(s: string): string {
  return s.replace(/]]>/g, ']]]]><![CDATA[>');
}
