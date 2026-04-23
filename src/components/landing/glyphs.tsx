import { LAND } from '../../lib/theme';

export function Logomark({ size = 40 }: { size?: number }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: size * 0.28,
      background: `linear-gradient(135deg, ${LAND.accent}, #ff8560)`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: '#fff', fontWeight: 800, fontSize: size * 0.48,
      fontFamily: LAND.sans, letterSpacing: -1,
      boxShadow: `0 8px 24px ${LAND.accentSoft}, inset 0 1px 0 rgba(255,255,255,0.3)`,
      flexShrink: 0,
    }}>X</div>
  );
}

export function GithubGlyph({ size = 16, color }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill={color || 'currentColor'}>
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0016 8c0-4.42-3.58-8-8-8z"/>
    </svg>
  );
}

export function AppleGlyph({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size * 1.2} viewBox="0 0 24 28" fill="currentColor">
      <path d="M18.7 14.3c0-3 2.5-4.5 2.6-4.5-1.4-2.1-3.6-2.3-4.4-2.4-1.9-.2-3.6 1.1-4.6 1.1-1 0-2.4-1.1-4-1.1C6.2 7.5 4.2 8.7 3.1 10.8c-1.9 3.3-.5 8.1 1.4 10.8.9 1.3 2 2.7 3.5 2.7 1.4-.1 1.9-.9 3.6-.9s2.2.9 3.6.9c1.5 0 2.5-1.3 3.4-2.6 1-1.5 1.5-3 1.5-3.1-.1 0-2.9-1.1-3-4.4zM15.6 5.2c.8-1 1.3-2.4 1.2-3.8-1.2.1-2.6.8-3.4 1.8-.7.9-1.4 2.3-1.2 3.7 1.3.1 2.6-.7 3.4-1.7z"/>
    </svg>
  );
}

export function CheckGlyph() {
  return (
    <span style={{
      width: 22, height: 22, borderRadius: 11,
      background: LAND.accentSoft, color: LAND.accent,
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 11, fontWeight: 900, fontFamily: LAND.sans, flexShrink: 0,
    }}>✓</span>
  );
}

export function LivePulse() {
  return (
    <span style={{ position: 'relative', display: 'inline-flex', width: 8, height: 8 }}>
      <span style={{ position: 'absolute', inset: 0, borderRadius: 4, background: LAND.accent, opacity: 0.6, animation: 'land-ping 1.6s cubic-bezier(0,0,0.2,1) infinite' }}/>
      <span style={{ width: 8, height: 8, borderRadius: 4, background: LAND.accent }}/>
    </span>
  );
}

export function SectionLabel({ eyebrow, title, subtitle, align = 'left' }: { eyebrow: string; title: string; subtitle?: string; align?: 'left' | 'center' }) {
  return (
    <div style={{ textAlign: align, maxWidth: 720, margin: align === 'center' ? '0 auto' : undefined }}>
      <div style={{ fontSize: 11.5, color: LAND.accent, fontWeight: 700, fontFamily: LAND.mono, letterSpacing: 1.4, textTransform: 'uppercase' }}>{eyebrow}</div>
      <h2 style={{ marginTop: 12, marginBottom: 14, fontSize: 'clamp(32px, 4.4vw, 52px)', fontWeight: 700, letterSpacing: -1.8, lineHeight: 1.02, color: LAND.text, fontFamily: LAND.sans }}>{title}</h2>
      {subtitle && <p style={{ margin: 0, fontSize: 16.5, lineHeight: 1.55, color: LAND.muted, fontFamily: LAND.sans, maxWidth: 560 }}>{subtitle}</p>}
    </div>
  );
}
