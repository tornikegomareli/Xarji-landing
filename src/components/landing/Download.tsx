import { LAND, REPO_URL } from '../../lib/theme';
import type { Copy, Locale } from '../../lib/copy';
import { formatDate } from '../../lib/copy';
import type { ReleaseData } from '../../lib/release';
import { AppleGlyph } from './glyphs';

type Props = { copy: Copy['download']; locale: Locale; release: ReleaseData };

export default function Download({ copy, locale, release }: Props) {
  const { latest, prior } = release;
  const releaseDate = formatDate(latest.dateIso, locale);
  return (
    <section id="download" style={{ padding: 'var(--sv) var(--sh)', position: 'relative' }}>
      <div aria-hidden style={{
        position: 'absolute', top: '30%', left: '50%', transform: 'translateX(-50%)',
        width: 600, height: 300, borderRadius: '50%',
        background: LAND.accent, opacity: 0.1, filter: 'blur(120px)', pointerEvents: 'none',
      }}/>
      <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative' }}>
        <div style={{ textAlign: 'center', fontSize: 22, color: LAND.accent, fontWeight: 700, fontFamily: LAND.mono, letterSpacing: 2, textTransform: 'uppercase' }}>{copy.eyebrow}</div>

        <div className="land-download-box" style={{
          marginTop: 40, padding: 36,
          background: `linear-gradient(180deg, ${LAND.panelAlt}, ${LAND.panel})`,
          border: `1px solid ${LAND.lineStrong}`,
          borderRadius: 28,
          boxShadow: `0 40px 100px rgba(0,0,0,0.4)`,
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
              <span style={{ padding: '5px 12px', borderRadius: 999, background: LAND.accent, color: '#fff', fontSize: 10.5, fontWeight: 800, fontFamily: LAND.sans, letterSpacing: 0.8, textTransform: 'uppercase' }}>{copy.latestBadge}</span>
              <span style={{ fontFamily: LAND.mono, fontSize: 13, color: LAND.muted }}>v{latest.version}</span>
            </div>
            <h3 style={{ margin: '16px 0 0 0', fontSize: 36, fontWeight: 700, color: LAND.text, fontFamily: LAND.sans, letterSpacing: -1.4, lineHeight: 1.05 }}>
              {copy.xarjiForPre}<span style={{ color: LAND.accent }}>{copy.xarjiForAccent}</span>
            </h3>
            <div style={{ marginTop: 10, fontSize: 14, color: LAND.muted, fontFamily: LAND.sans }}>
              {copy.releasedPrefix} {releaseDate} · {copy.requires}
            </div>

            <a href={latest.dmgUrl} style={{
              marginTop: 24,
              display: 'inline-flex', alignItems: 'center', gap: 14,
              padding: '18px 28px', borderRadius: 14,
              background: LAND.accent, color: '#fff', textDecoration: 'none',
              fontSize: 16, fontWeight: 700, fontFamily: LAND.sans,
              boxShadow: `0 20px 50px ${LAND.accentSoft}, inset 0 1px 0 rgba(255,255,255,0.2)`,
              transition: 'transform .12s ease',
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-1px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
              <AppleGlyph size={20}/>
              <span>{copy.dmgCta}</span>
              <span style={{ padding: '3px 9px', borderRadius: 6, background: 'rgba(255,255,255,0.18)', fontFamily: LAND.mono, fontSize: 11, fontWeight: 500 }}>{latest.size}</span>
            </a>

            <div style={{ marginTop: 18, display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap', fontSize: 11.5, color: LAND.dim, fontFamily: LAND.mono }}>
              <span>{latest.sha}</span>
              <span>{copy.signedNotarized}</span>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 32 }}>
          <div style={{ fontSize: 11, color: LAND.dim, fontFamily: LAND.mono, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 14 }}>{copy.previousLabel}</div>
          <div style={{ display: 'flex', flexDirection: 'column', border: `1px solid ${LAND.line}`, borderRadius: 14, overflow: 'hidden' }}>
            {prior.map((r, i) => {
              const summaries = copy.priorSummaries as Record<string, string>;
              const summary = summaries[r.version] ?? '';
              const date = formatDate(r.dateIso, locale);
              return (
                <div key={r.version} className="land-download-row" style={{
                  display: 'flex', alignItems: 'center', gap: 20,
                  padding: '14px 22px', background: LAND.panel,
                  borderBottom: i === prior.length - 1 ? 'none' : `1px solid ${LAND.line}`,
                  fontSize: 13,
                }}>
                  <span style={{ fontFamily: LAND.mono, fontWeight: 700, color: LAND.text, minWidth: 60 }}>v{r.version}</span>
                  <span className="land-download-date" style={{ fontFamily: LAND.mono, fontSize: 11, color: LAND.dim, minWidth: 160 }}>{date}</span>
                  <span style={{ flex: 1, color: LAND.muted, fontFamily: LAND.sans }}>{summary}</span>
                  <a href={`${REPO_URL}/releases/download/v${r.version}/Xarji-${r.version}.dmg`} style={{ fontSize: 11.5, color: LAND.accent, fontFamily: LAND.sans, fontWeight: 600, textDecoration: 'none' }}>{copy.priorDownloadLink}</a>
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ marginTop: 24, textAlign: 'center', fontSize: 12, color: LAND.dim, fontFamily: LAND.sans }}>
          {copy.fallbackPrefix}<a href="#faq" style={{ color: LAND.accent, textDecoration: 'none', fontWeight: 600 }}>{copy.fallbackLink}</a>
        </div>
      </div>
    </section>
  );
}
