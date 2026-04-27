export const LAND = {
  bg:        'var(--land-bg)',
  bgDeep:    'var(--land-bg-deep)',
  panel:     'var(--land-panel)',
  panelAlt:  'var(--land-panel-alt)',
  panelHi:   'var(--land-panel-hi)',
  text:      'var(--land-text)',
  muted:     'var(--land-muted)',
  dim:       'var(--land-dim)',
  faint:     'var(--land-faint)',
  line:      'var(--land-line)',
  lineStrong:'var(--land-line-strong)',
  accent:    'var(--land-accent)',
  accentHi:  'var(--land-accent-hi)',
  accentSoft:'var(--land-accent-soft)',
  accentDim: 'var(--land-accent-dim)',
  green:     'var(--land-green)',
  amber:     'var(--land-amber)',
  blue:      'var(--land-blue)',
  sans:      "'Inter Tight', 'Inter', system-ui, sans-serif",
  mono:      "'JetBrains Mono', ui-monospace, monospace",
  serif:     "'Instrument Serif', Georgia, serif",
  geo:       "'Noto Sans Georgian', 'Inter Tight', system-ui, sans-serif",
  rMd: 14, rLg: 18, rXl: 22,
} as const;

export const REPO_URL = 'https://github.com/tornikegomareli/Xarji';
export const REPO_STARS = 9;

// InstantDB app ID for the landing-page newsletter signups. Sourced from
// .env (PUBLIC_INSTANT_LANDING_APP_ID) so different environments can point
// at different apps without code changes. Safe to expose — InstantDB sends
// the ID with every client request.
//
// Dashboard / subscriber list / export:
//   https://instantdb.com/dash?s=main&t=explorer&app=<ID>
//
// Required permissions (configure in the dashboard so visitors can only
// insert — never read, update, or delete):
//
//   subscriptions: {
//     allow: {
//       create: "true",
//       view: "false",
//       update: "false",
//       delete: "false",
//     }
//   }
export const INSTANT_LANDING_APP_ID =
  import.meta.env.PUBLIC_INSTANT_LANDING_APP_ID ?? '';

// Release data (version, DMG URL, sha, prior tags) is no longer hardcoded.
// It's fetched from the GitHub API at build time — see src/lib/release.ts.
// Pages pass `ReleaseData` through the LandingLayout into each section that
// needs it.
