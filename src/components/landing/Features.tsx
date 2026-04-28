import { LAND } from '../../lib/theme';
import type { Copy } from '../../lib/copy';

export function Features({ copy }: { copy: Copy['features'] }) {
  return (
    <section style={{ padding: 'var(--sv) var(--sh)', background: LAND.bgDeep, borderTop: `1px solid ${LAND.line}`, borderBottom: `1px solid ${LAND.line}` }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ fontSize: 22, color: LAND.accent, fontWeight: 700, fontFamily: LAND.mono, letterSpacing: 2, textTransform: 'uppercase' }}>{copy.eyebrow}</div>
        <div className="land-features-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginTop: 48 }}>
          {copy.items.map((f) => (
            <div key={f.t} style={{
              padding: 28, background: LAND.panel, border: `1px solid ${LAND.line}`,
              borderRadius: 20, transition: 'transform .2s ease, border-color .2s ease',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.borderColor = LAND.accent + '55'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = LAND.line; }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: LAND.accentSoft, color: LAND.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontFamily: LAND.mono }}>{f.ic}</div>
              <div style={{ marginTop: 18, fontSize: 17, fontWeight: 700, color: LAND.text, fontFamily: LAND.sans, letterSpacing: -0.4 }}>{f.t}</div>
              <div style={{ marginTop: 8, fontSize: 13.5, color: LAND.muted, fontFamily: LAND.sans, lineHeight: 1.55 }}>{f.d}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HowItWorks({ copy }: { copy: Copy['how'] }) {
  return (
    <section id="how" style={{ padding: 'var(--sv) var(--sh)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ fontSize: 22, color: LAND.accent, fontWeight: 700, fontFamily: LAND.mono, letterSpacing: 2, textTransform: 'uppercase' }}>{copy.eyebrow}</div>
        <div className="land-how-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginTop: 48 }}>
          {copy.steps.map((s, i) => (
            <div key={s.n} style={{ position: 'relative' }}>
              <div style={{ padding: '32px 28px', background: LAND.panel, border: `1px solid ${LAND.line}`, borderRadius: 20, height: '100%' }}>
                <div style={{ fontSize: 13, fontFamily: LAND.mono, color: LAND.accent, fontWeight: 700, letterSpacing: 1 }}>{copy.stepLabel} {s.n}</div>
                <div style={{ marginTop: 16, fontSize: 22, fontWeight: 700, color: LAND.text, fontFamily: LAND.sans, letterSpacing: -0.6 }}>{s.t}</div>
                <div style={{ marginTop: 10, fontSize: 14, color: LAND.muted, fontFamily: LAND.sans, lineHeight: 1.6 }}>{s.d}</div>
              </div>
              {i < copy.steps.length - 1 && (
                <div className="land-step-arrow" style={{ position: 'absolute', top: '50%', right: -16, transform: 'translateY(-50%)', color: LAND.accent, fontSize: 20, fontFamily: LAND.mono }}>→</div>
              )}
            </div>
          ))}
        </div>

        <div className="land-banks-box" style={{ marginTop: 80, padding: '40px 36px', background: LAND.panel, border: `1px solid ${LAND.line}`, borderRadius: 24 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div>
              <div style={{ fontSize: 11.5, color: LAND.accent, fontFamily: LAND.mono, fontWeight: 700, letterSpacing: 1.2, textTransform: 'uppercase' }}>{copy.banks.eyebrow}</div>
              <div style={{ marginTop: 8, fontSize: 22, fontWeight: 700, color: LAND.text, fontFamily: LAND.sans, letterSpacing: -0.6 }}>{copy.banks.title}</div>
              <div style={{ marginTop: 6, fontSize: 13, color: LAND.muted, fontFamily: LAND.sans, maxWidth: 600 }}>{copy.banks.subtitle}</div>
            </div>

            <div>
              <div style={{ fontSize: 10.5, color: LAND.green, fontFamily: LAND.mono, fontWeight: 700, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 6, height: 6, borderRadius: 3, background: LAND.green, boxShadow: `0 0 10px ${LAND.green}` }}/>
                {copy.banks.supportedLabel}
              </div>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                {copy.banks.supported.map((b) => (
                  <div key={b.k} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 18px', background: LAND.bg, border: `1px solid ${LAND.green}33`, borderRadius: 14 }}>
                    <div style={{ width: 34, height: 34, borderRadius: 10, background: b.c, color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800, fontFamily: LAND.sans }}>{b.k}</div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: LAND.text, fontFamily: LAND.sans }}>{b.n}</div>
                      <div style={{ fontSize: 10, color: LAND.dim, fontFamily: LAND.mono }}>{b.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div style={{ fontSize: 10.5, color: LAND.dim, fontFamily: LAND.mono, fontWeight: 700, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 12 }}>
                {copy.banks.plannedLabel}
              </div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {copy.banks.planned.map((b) => (
                  <div key={b.k} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', background: LAND.bg, border: `1px dashed ${LAND.lineStrong}`, borderRadius: 12, opacity: 0.78 }}>
                    <div style={{ width: 26, height: 26, borderRadius: 8, background: LAND.panelAlt, color: LAND.muted, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9.5, fontWeight: 800, fontFamily: LAND.mono }}>{b.k}</div>
                    <span style={{ fontSize: 12, fontWeight: 600, color: LAND.muted, fontFamily: LAND.sans }}>{b.n}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
