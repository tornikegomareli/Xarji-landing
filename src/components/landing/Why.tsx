import { LAND } from '../../lib/theme';
import type { Copy } from '../../lib/copy';

type Props = { copy: Copy['why'] };

export default function Why({ copy }: Props) {
  return (
    <section id="why" style={{
      position: 'relative', padding: 'var(--sv) var(--sh)',
      background: LAND.bgDeep,
      borderTop: `1px solid ${LAND.line}`, borderBottom: `1px solid ${LAND.line}`,
    }}>
      <div style={{ maxWidth: 1180, margin: '0 auto' }}>
        <div style={{ maxWidth: 900 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 22 }}>
            <span style={{ width: 22, height: 1, background: LAND.accent }}/>
            <span style={{ fontSize: 11.5, color: LAND.accent, fontFamily: LAND.mono, fontWeight: 700, letterSpacing: 1.4, textTransform: 'uppercase' }}>{copy.eyebrow}</span>
          </div>
          <h2 style={{
            margin: 0, fontSize: 'clamp(34px, 4.8vw, 60px)', fontWeight: 700,
            letterSpacing: -2.2, lineHeight: 1.03,
            color: LAND.text, fontFamily: LAND.sans,
          }}>
            {copy.titlePre}
            <em style={{ color: LAND.accent, fontStyle: 'normal', fontFamily: LAND.serif, fontWeight: 400, letterSpacing: -1.5 }}>{copy.titleAccent}</em>
            {copy.titlePost}
          </h2>
          <p style={{
            marginTop: 22, fontSize: 18, lineHeight: 1.6, color: LAND.muted,
            fontFamily: LAND.sans, maxWidth: 760,
          }}>
            {copy.intro.prefix}
            <a href={copy.intro.monarchUrl} target="_blank" rel="noreferrer" style={{ color: LAND.text, fontWeight: 600, textDecoration: 'underline', textDecorationColor: LAND.accent, textUnderlineOffset: 4 }}>{copy.intro.monarchText}</a>
            {copy.intro.between}
            <a href={copy.intro.copilotUrl} target="_blank" rel="noreferrer" style={{ color: LAND.text, fontWeight: 600, textDecoration: 'underline', textDecorationColor: LAND.accent, textUnderlineOffset: 4 }}>{copy.intro.copilotText}</a>
            {copy.intro.suffix}
          </p>
        </div>

        <div className="land-why-grid" style={{ marginTop: 60, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 18 }}>
          {copy.cards.map((c, i) => (
            <WhyCard key={i} card={c} accent={i === 2}/>
          ))}
        </div>

        <div className="land-aha-box" style={{
          marginTop: 56,
          padding: '48px 44px',
          background: LAND.panel,
          border: `1px solid ${LAND.lineStrong}`,
          borderRadius: 24,
          position: 'relative', overflow: 'hidden',
        }}>
          <div aria-hidden style={{
            position: 'absolute', top: -120, right: -120,
            width: 400, height: 400, borderRadius: '50%',
            background: LAND.accent, opacity: 0.1, filter: 'blur(100px)',
          }}/>
          <div className="land-aha-grid" style={{ position: 'relative', display: 'grid', gridTemplateColumns: '1.15fr 1fr', gap: 48, alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 11.5, color: LAND.accent, fontFamily: LAND.mono, fontWeight: 700, letterSpacing: 1.4, textTransform: 'uppercase' }}>{copy.aha.eyebrow}</div>
              <div style={{
                marginTop: 18, fontSize: 28, fontWeight: 600, color: LAND.text,
                fontFamily: LAND.sans, letterSpacing: -0.8, lineHeight: 1.3,
              }}>
                {copy.aha.quoteLine1}
                <br/>
                <span style={{ color: LAND.accent, fontFamily: LAND.serif, fontStyle: 'italic', fontWeight: 400 }}>{copy.aha.quoteLine2}</span>
              </div>
              <p style={{
                marginTop: 20, fontSize: 15, color: LAND.muted, lineHeight: 1.6,
                fontFamily: LAND.sans, maxWidth: 520,
              }}>
                {copy.aha.body}
              </p>
              <p style={{
                marginTop: 16, fontSize: 13.5, color: LAND.dim, lineHeight: 1.6,
                fontFamily: LAND.sans, maxWidth: 520,
              }}>
                {copy.aha.tagline}
              </p>
            </div>

            <FlowDiagram flow={copy.aha.flow}/>
          </div>
        </div>
      </div>
    </section>
  );
}

function WhyCard({ card, accent }: { card: Copy['why']['cards'][number]; accent: boolean }) {
  return (
    <div style={{
      padding: 28,
      background: accent ? `linear-gradient(180deg, ${LAND.accentDim}, ${LAND.panel})` : LAND.panel,
      border: `1px solid ${accent ? LAND.accent + '55' : LAND.line}`,
      borderRadius: 20,
      display: 'flex', flexDirection: 'column',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{ fontSize: 10.5, color: accent ? LAND.accent : LAND.dim, fontFamily: LAND.mono, fontWeight: 700, letterSpacing: 1.2, textTransform: 'uppercase' }}>{card.tag}</div>
      <div style={{ marginTop: 14, fontSize: 20, fontWeight: 700, color: LAND.text, fontFamily: LAND.sans, letterSpacing: -0.5, lineHeight: 1.2 }}>{card.title}</div>
      <div style={{ marginTop: 12, fontSize: 13.5, color: LAND.muted, fontFamily: LAND.sans, lineHeight: 1.6, flex: 1 }}>{card.body}</div>
      <div style={{ marginTop: 22, paddingTop: 18, borderTop: `1px solid ${LAND.line}`, display: 'flex', alignItems: 'baseline', gap: 12 }}>
        <div style={{
          fontSize: 40, fontWeight: 700,
          color: accent ? LAND.accent : LAND.text,
          fontFamily: LAND.sans, letterSpacing: -1.6, lineHeight: 1,
          fontVariantNumeric: 'tabular-nums',
        }}>{card.stat}</div>
        <div style={{ fontSize: 11.5, color: LAND.muted, fontFamily: LAND.sans, lineHeight: 1.4 }}>{card.statLabel}</div>
      </div>
    </div>
  );
}

function FlowDiagram({ flow }: { flow: Copy['why']['aha']['flow'] }) {
  return (
    <div style={{ position: 'relative', padding: '20px 0' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <FlowNode label={flow.iphoneLabel} sub={flow.iphoneSub} ic="✉" meta={flow.iphoneMeta}/>
        <FlowConnector label={flow.iphoneToMac}/>
        <FlowNode label={flow.macLabel} sub={flow.macSub} ic="◫" meta={flow.macMeta}/>
        <FlowConnector label={flow.macToXarji}/>
        <FlowNode label={flow.xarjiLabel} sub={flow.xarjiSub} ic="X" meta={flow.xarjiMeta} highlight/>
      </div>
    </div>
  );
}

function FlowNode({ label, sub, ic, meta, highlight = false }: { label: string; sub: string; ic: string; meta: string; highlight?: boolean }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 16,
      padding: '14px 18px',
      background: highlight ? LAND.accent : LAND.bg,
      border: `1px solid ${highlight ? LAND.accent : LAND.lineStrong}`,
      borderRadius: 14,
      boxShadow: highlight ? `0 16px 40px ${LAND.accentSoft}` : 'none',
    }}>
      <div style={{
        width: 38, height: 38, borderRadius: 10,
        background: highlight ? 'rgba(255,255,255,0.2)' : LAND.panelAlt,
        color: highlight ? '#fff' : LAND.accent,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 16, fontWeight: 700, fontFamily: highlight ? LAND.sans : LAND.mono,
        flexShrink: 0,
      }}>{ic}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontSize: 14, fontWeight: 700,
          color: highlight ? '#fff' : LAND.text,
          fontFamily: LAND.sans, letterSpacing: -0.2,
        }}>{label}</div>
        <div style={{
          fontSize: 11.5, marginTop: 2,
          color: highlight ? 'rgba(255,255,255,0.8)' : LAND.muted,
          fontFamily: LAND.sans,
        }}>{sub}</div>
      </div>
      <div style={{
        fontSize: 10, fontFamily: LAND.mono,
        color: highlight ? 'rgba(255,255,255,0.7)' : LAND.dim,
        textAlign: 'right', flexShrink: 0,
      }}>{meta}</div>
    </div>
  );
}

function FlowConnector({ label }: { label: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, paddingLeft: 19 }}>
      <div style={{ width: 1, height: 20, background: LAND.lineStrong }}/>
      <span style={{
        fontSize: 10, fontFamily: LAND.mono, color: LAND.dim,
        letterSpacing: 0.5, textTransform: 'uppercase',
      }}>{label}</span>
    </div>
  );
}
