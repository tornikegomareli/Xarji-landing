import { REPO_URL } from './theme';

export type ReleaseInfo = {
  version: string;
  dateIso: string;
  size: string;
  sha: string;
  dmgUrl: string;
};

export type PriorRelease = {
  version: string;
  dateIso: string;
};

export type ReleaseData = {
  latest: ReleaseInfo;
  prior: PriorRelease[];
};

/**
 * Used when the GitHub API is unreachable at build time (rate limit, outage,
 * no network in local dev). Kept deliberately brief — the live fetch is the
 * source of truth; this only exists so a broken build doesn't ship a broken
 * download page.
 */
const FALLBACK: ReleaseData = {
  latest: {
    version: '0.2.4',
    dateIso: '2026-04-23',
    size: '26.3 MB',
    sha: 'sha256:77c2…ede1',
    dmgUrl: `${REPO_URL}/releases/download/v0.2.4/Xarji-0.2.4.dmg`,
  },
  prior: [
    { version: '0.2.3', dateIso: '2026-04-22' },
    { version: '0.2.2', dateIso: '2026-04-22' },
    { version: '0.2.1', dateIso: '2026-04-22' },
    { version: '0.2.0', dateIso: '2026-04-22' },
    { version: '0.1.1', dateIso: '2026-04-21' },
  ],
};

type GhAsset = { name: string; size: number; browser_download_url: string };
type GhRelease = { tag_name: string; published_at: string; assets: GhAsset[] };

/**
 * Fetches the last 6 releases of tornikegomareli/Xarji from the GitHub API
 * and shapes them for the landing page. Runs at Astro build time — values
 * are baked into the static HTML. Use the `GITHUB_TOKEN` env var to bypass
 * the 60 req/hr unauthenticated rate limit.
 */
export async function fetchRelease(): Promise<ReleaseData> {
  const token = (import.meta.env.GITHUB_TOKEN ?? '') as string;
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  };
  if (token) headers.Authorization = `Bearer ${token}`;

  try {
    const res = await fetch(
      'https://api.github.com/repos/tornikegomareli/Xarji/releases?per_page=6',
      { headers },
    );
    if (!res.ok) throw new Error(`GitHub API ${res.status}`);
    const releases = (await res.json()) as GhRelease[];
    if (releases.length === 0) throw new Error('no releases on repo');

    const [latestRaw, ...priorRaw] = releases;
    const latest: ReleaseInfo = {
      version: stripV(latestRaw.tag_name),
      dateIso: latestRaw.published_at.slice(0, 10),
      size: findDmgSize(latestRaw.assets),
      sha: await findDmgSha(latestRaw.assets, headers),
      dmgUrl: findDmgUrl(latestRaw.assets) ?? `${REPO_URL}/releases/latest`,
    };
    return {
      latest,
      prior: priorRaw.map((r) => ({
        version: stripV(r.tag_name),
        dateIso: r.published_at.slice(0, 10),
      })),
    };
  } catch (err) {
    console.warn('[xarji-landing] release fetch failed, using fallback:', err);
    return FALLBACK;
  }
}

function stripV(tag: string): string {
  return tag.startsWith('v') ? tag.slice(1) : tag;
}

function findDmgAsset(assets: GhAsset[]): GhAsset | undefined {
  return assets.find((a) => a.name.endsWith('.dmg'));
}

function findDmgUrl(assets: GhAsset[]): string | undefined {
  return findDmgAsset(assets)?.browser_download_url;
}

function findDmgSize(assets: GhAsset[]): string {
  const a = findDmgAsset(assets);
  if (!a) return 'unknown';
  return `${(a.size / 1024 / 1024).toFixed(1)} MB`;
}

async function findDmgSha(
  assets: GhAsset[],
  headers: Record<string, string>,
): Promise<string> {
  const shaAsset = assets.find((a) => a.name.endsWith('.dmg.sha256'));
  if (!shaAsset) return 'sha256:…';
  try {
    const res = await fetch(shaAsset.browser_download_url, { headers });
    if (!res.ok) return 'sha256:…';
    const text = await res.text();
    const hash = text.trim().split(/\s+/)[0] ?? '';
    if (hash.length < 8) return 'sha256:…';
    return `sha256:${hash.slice(0, 4)}…${hash.slice(-4)}`;
  } catch {
    return 'sha256:…';
  }
}
