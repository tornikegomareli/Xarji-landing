import { LAND } from '../../lib/theme';
import type { Copy } from '../../lib/copy';
import { Logomark, SectionLabel } from './glyphs';

type Props = { copy: Copy['product'] };

export default function ProductShot({ copy }: Props) {
  return (
    <section id="product" style={{ padding: '60px 28px 100px', position: 'relative' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <SectionLabel eyebrow={copy.eyebrow} title={copy.title} subtitle={copy.subtitle}/>

        <div style={{
          marginTop: 50,
          background: LAND.panel, border: `1px solid ${LAND.lineStrong}`,
          borderRadius: 24, padding: 0, overflow: 'hidden',
          boxShadow: `0 40px 100px rgba(0,0,0,0.5), 0 0 0 1px ${LAND.line}`,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '14px 18px', background: LAND.bgDeep, borderBottom: `1px solid ${LAND.line}` }}>
            <span style={{ width: 12, height: 12, borderRadius: 6, background: '#ff5f57' }}/>
            <span style={{ width: 12, height: 12, borderRadius: 6, background: '#febc2e' }}/>
            <span style={{ width: 12, height: 12, borderRadius: 6, background: '#28c840' }}/>
            <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
              <div style={{ padding: '4px 14px', borderRadius: 6, background: LAND.panelAlt, fontSize: 11, color: LAND.dim, fontFamily: LAND.mono }}>{copy.browserBar}</div>
            </div>
          </div>
          <MockDashboard mock={copy.mock}/>
        </div>

        <div className="land-screens-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginTop: 28 }}>
          {copy.screens.map((s, i) => (
            <div key={s.name} style={{
              padding: '18px 20px', background: LAND.panel,
              border: `1px solid ${LAND.line}`, borderRadius: 16,
              display: 'flex', alignItems: 'center', gap: 14,
            }}>
              <div style={{ width: 32, height: 32, borderRadius: 10, background: LAND.accentSoft, color: LAND.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: LAND.mono, fontWeight: 700, fontSize: 12 }}>0{i+1}</div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: LAND.text, fontFamily: LAND.sans }}>{s.name}</div>
                <div style={{ fontSize: 11.5, color: LAND.muted, fontFamily: LAND.sans, marginTop: 2 }}>{s.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MockDashboard({ mock }: { mock: Copy['product']['mock'] }) {
  return (
    <div style={{ display: 'flex', minHeight: 520, background: LAND.bg }}>
      <div style={{ width: 200, borderRight: `1px solid ${LAND.line}`, padding: '22px 18px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
          <Logomark size={30}/>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: LAND.text, fontFamily: LAND.sans }}>Xarji</div>
            <div style={{ fontSize: 9, color: LAND.dim, fontFamily: LAND.mono }}>ხარჯი</div>
          </div>
        </div>
        {mock.sidebar.map((item) => (
          <div key={item.n} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', borderRadius: 8, background: item.a ? LAND.text : 'transparent', color: item.a ? LAND.bg : LAND.muted, fontSize: 12, fontWeight: item.a ? 700 : 500, fontFamily: LAND.sans, marginBottom: 2 }}>
            <span style={{ fontFamily: LAND.mono, fontSize: 11 }}>{item.g}</span>
            <span>{item.n}</span>
          </div>
        ))}
      </div>
      <div style={{ flex: 1, padding: '26px 30px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 22 }}>
          <div>
            <div style={{ fontSize: 11, color: LAND.muted, fontFamily: LAND.sans }}>{mock.greeting}</div>
            <div style={{ fontSize: 24, fontWeight: 700, color: LAND.text, fontFamily: LAND.sans, letterSpacing: -0.8, marginTop: 4 }}>{mock.heroTitle}</div>
          </div>
          <div style={{ display: 'flex', gap: 3, padding: 3, background: LAND.panel, borderRadius: 10, border: `1px solid ${LAND.line}` }}>
            {mock.ranges.map(r => (
              <span key={r} style={{ padding: '5px 11px', borderRadius: 7, fontSize: 11, fontWeight: 600, fontFamily: LAND.sans, background: r === mock.activeRange ? '#fff' : 'transparent', color: r === mock.activeRange ? LAND.bg : LAND.muted }}>{r}</span>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 14 }}>
          <div style={{ padding: '24px 26px', background: LAND.panel, border: `1px solid ${LAND.line}`, borderRadius: 20, position: 'relative', overflow: 'hidden' }}>
            <div aria-hidden style={{ position: 'absolute', top: -40, right: -30, width: 160, height: 160, borderRadius: '50%', background: LAND.accent, opacity: 0.2, filter: 'blur(50px)' }}/>
            <div style={{ position: 'relative' }}>
              <div style={{ fontSize: 11, color: LAND.muted, fontFamily: LAND.sans, fontWeight: 600 }}>{mock.spentLabel}</div>
              <div style={{ marginTop: 10, fontSize: 56, fontWeight: 700, color: LAND.text, fontFamily: LAND.sans, letterSpacing: -2.5, lineHeight: 1 }}>
                <span style={{ color: LAND.accent }}>₾</span>{mock.amountWhole}<span style={{ fontSize: 26, color: LAND.muted }}>{mock.amountDecimal}</span>
              </div>
              <div style={{ fontSize: 11, color: LAND.muted, marginTop: 6, fontFamily: LAND.sans }}>{mock.amountDelta}</div>
              <svg width="100%" height="70" viewBox="0 0 600 70" style={{ marginTop: 16 }}>
                <defs>
                  <linearGradient id="gr" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0" stopColor={LAND.accent} stopOpacity="0.5"/>
                    <stop offset="1" stopColor={LAND.accent} stopOpacity="0"/>
                  </linearGradient>
                </defs>
                <path d="M0,50 L60,45 L120,30 L180,40 L240,20 L300,30 L360,25 L420,15 L480,25 L540,10 L600,15 L600,70 L0,70 Z" fill="url(#gr)"/>
                <path d="M0,50 L60,45 L120,30 L180,40 L240,20 L300,30 L360,25 L420,15 L480,25 L540,10 L600,15" fill="none" stroke={LAND.accent} strokeWidth="2"/>
              </svg>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateRows: '1fr 1fr', gap: 14 }}>
            <div style={{ padding: '18px 20px', background: LAND.accentSoft, border: `1px solid ${LAND.accent}33`, borderRadius: 18 }}>
              <div style={{ fontSize: 10.5, color: LAND.accent, fontWeight: 700, fontFamily: LAND.sans }}>{mock.dailyAvgLabel}</div>
              <div style={{ fontSize: 30, fontWeight: 800, color: LAND.text, fontFamily: LAND.sans, letterSpacing: -1.2, marginTop: 8 }}>{mock.dailyAvgValue}</div>
              <div style={{ fontSize: 10, color: LAND.muted, fontFamily: LAND.sans, marginTop: 4 }}>{mock.dailyAvgSub}</div>
            </div>
            <div style={{ padding: '18px 20px', background: LAND.panel, border: `1px solid ${LAND.line}`, borderRadius: 18 }}>
              <div style={{ fontSize: 10.5, color: LAND.muted, fontWeight: 600, fontFamily: LAND.sans }}>{mock.declinedLabel}</div>
              <div style={{ fontSize: 30, fontWeight: 800, color: LAND.text, fontFamily: LAND.sans, letterSpacing: -1.2, marginTop: 8 }}>{mock.declinedValue}</div>
              <div style={{ fontSize: 10, color: LAND.muted, fontFamily: LAND.sans, marginTop: 4 }}>{mock.declinedSub}</div>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 14, marginTop: 14 }}>
          <div style={{ padding: 20, background: LAND.panel, border: `1px solid ${LAND.line}`, borderRadius: 18 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: LAND.text, fontFamily: LAND.sans, marginBottom: 12 }}>{mock.spendingMixLabel}</div>
            <MiniDonut topLabel={mock.donutLabelTop} bottomLabel={mock.donutLabelBottom}/>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 16 }}>
              {mock.spendingMix.map(item => (
                <div key={item.n} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 7, height: 7, borderRadius: 4, background: item.c }}/>
                  <span style={{ flex: 1, fontSize: 11, color: LAND.text, fontFamily: LAND.sans }}>{item.n}</span>
                  <span style={{ fontSize: 10, color: LAND.muted, fontFamily: LAND.mono }}>{item.p}%</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ padding: 20, background: LAND.panel, border: `1px solid ${LAND.line}`, borderRadius: 18 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: LAND.text, fontFamily: LAND.sans }}>{mock.recentLabel}</div>
              <span style={{ padding: '3px 8px', borderRadius: 999, background: 'rgba(75,217,162,0.15)', color: LAND.green, fontSize: 9, fontWeight: 800, fontFamily: LAND.sans, letterSpacing: 0.5, textTransform: 'uppercase' }}>{mock.liveBadge}</span>
            </div>
            {mock.recent.map((r, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 0', borderBottom: i === mock.recent.length - 1 ? 'none' : `1px solid ${LAND.line}` }}>
                <div style={{ width: 26, height: 26, borderRadius: 13, background: `${r.co}22`, color: r.co, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, fontFamily: LAND.sans }}>{r.ic}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: LAND.text, fontFamily: LAND.sans }}>{r.m}</div>
                  <div style={{ fontSize: 9.5, color: LAND.dim, fontFamily: LAND.mono }}>{r.t} · {r.c}</div>
                </div>
                <div style={{ fontSize: 13, fontWeight: 700, color: LAND.text, fontFamily: LAND.sans, fontVariantNumeric: 'tabular-nums' }}>−₾{r.a.toFixed(2)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function MiniDonut({ topLabel, bottomLabel }: { topLabel: string; bottomLabel: string }) {
  const segs = [
    { v: 32, c: '#ff8a5c' },
    { v: 22, c: '#4bd9a2' },
    { v: 14, c: '#6aa3ff' },
    { v: 12, c: '#b38df7' },
    { v: 10, c: '#f1b84a' },
    { v: 10, c: '#ff7a9e' },
  ];
  const r = 50, c = 2 * Math.PI * r, total = segs.reduce((s, x) => s + x.v, 0);
  let off = 0;
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <svg width="130" height="130" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r={r} fill="none" stroke={LAND.panelAlt} strokeWidth="14"/>
        {segs.map((s, i) => {
          const len = (s.v / total) * c;
          const gap = 3;
          const strokeDasharray = `${len - gap} ${c - (len - gap)}`;
          const el = <circle key={i} cx="60" cy="60" r={r} fill="none" stroke={s.c} strokeWidth="14" strokeDasharray={strokeDasharray} strokeDashoffset={-off} transform="rotate(-90 60 60)"/>;
          off += len;
          return el;
        })}
        <text x="60" y="55" textAnchor="middle" fontSize="9" fontFamily={LAND.mono} fill={LAND.dim} letterSpacing="1">{topLabel}</text>
        <text x="60" y="72" textAnchor="middle" fontSize="16" fontFamily={LAND.sans} fontWeight="700" fill={LAND.text} letterSpacing="-0.5">{bottomLabel}</text>
      </svg>
    </div>
  );
}
