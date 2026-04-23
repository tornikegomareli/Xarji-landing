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

export const RELEASE = {
  version: '0.2.4',
  dateIso: '2026-04-23',
  size: '26.3 MB',
  sha: 'sha256:77c2…ede1',
  dmgUrl: `${REPO_URL}/releases/download/v0.2.4/Xarji-0.2.4.dmg`,
} as const;

export const PRIOR_RELEASES = [
  { version: '0.2.3', dateIso: '2026-04-22' },
  { version: '0.2.2', dateIso: '2026-04-22' },
  { version: '0.2.1', dateIso: '2026-04-22' },
  { version: '0.2.0', dateIso: '2026-04-22' },
  { version: '0.1.1', dateIso: '2026-04-21' },
] as const;
