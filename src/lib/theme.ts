export const LAND = {
  bg:        '#0c0c0e',
  bgDeep:    '#08080a',
  panel:     '#17171a',
  panelAlt:  '#1f1f24',
  panelHi:   '#242429',
  text:      '#f2f2f4',
  muted:     'rgba(242,242,244,0.62)',
  dim:       'rgba(242,242,244,0.38)',
  faint:     'rgba(242,242,244,0.18)',
  line:      'rgba(242,242,244,0.08)',
  lineStrong:'rgba(242,242,244,0.14)',
  accent:    '#ff5a3a',
  accentHi:  '#ff7352',
  accentSoft:'rgba(255,90,58,0.16)',
  accentDim: 'rgba(255,90,58,0.08)',
  green:     '#4bd9a2',
  amber:     '#f1b84a',
  blue:      '#6aa3ff',
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
