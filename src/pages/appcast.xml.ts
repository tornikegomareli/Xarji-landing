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
// SUScheduledCheckInterval=86400), looks at the topmost <item>'s
// sparkle:version, and if it's higher than CFBundleVersion offers the
// download. Signature verification uses the EdDSA public key embedded
// in each user's installed Info.plist (SUPublicEDKey), which has to
// match the key whose private half was used to sign the DMG.

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
    const pubDate = new Date(r.published_at).toUTCString();
    items.push(buildItem({ version, pubDate, dmgUrl: dmg.browser_download_url, sigJson, name: r.name, body: r.body }));
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
  pubDate: string;
  dmgUrl: string;
  sigJson: EdDsaJson;
  name: string;
  body: string;
}): string {
  const { version, pubDate, dmgUrl, sigJson, name, body } = args;
  const title = name?.trim() || `Version ${version}`;
  return `
    <item>
      <title>${escapeXml(title)}</title>
      <sparkle:version>${escapeXml(version)}</sparkle:version>
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
