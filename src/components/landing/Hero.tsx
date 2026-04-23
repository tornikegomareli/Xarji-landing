import React from 'react';
import { LAND, RELEASE } from '../../lib/theme';
import type { Copy, RichPart } from '../../lib/copy';
import { LivePulse, AppleGlyph, CheckGlyph } from './glyphs';

type Props = { copy: Copy['hero'] };

export default function Hero({ copy }: Props) {
  return (
    <section id="top" style={{ position: 'relative', overflow: 'hidden', paddingBottom: 60 }}>
      <div aria-hidden style={{
        position: 'absolute', top: -120, left: '50%', transform: 'translateX(-50%)',
        width: 900, height: 600, borderRadius: '50%',
        background: LAND.accent, opacity: 0.16, filter: 'blur(140px)', pointerEvents: 'none',
      }}/>
      <div aria-hidden style={{
        position: 'absolute', top: 200, left: -200,
        width: 420, height: 420, borderRadius: '50%',
        background: '#6aa3ff', opacity: 0.06, filter: 'blur(120px)', pointerEvents: 'none',
      }}/>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '80px 28px 40px', position: 'relative' }}>
        <div className="land-hero-grid" style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 60, alignItems: 'center' }}>
          <div>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '6px 14px', borderRadius: 999,
              background: LAND.accentSoft, border: `1px solid ${LAND.accent}33`,
              color: LAND.accent, fontSize: 11.5, fontWeight: 700,
              fontFamily: LAND.sans, letterSpacing: 0.5, textTransform: 'uppercase',
              marginBottom: 24,
            }}>
              <LivePulse/>
              <span>v{RELEASE.version} · {copy.badgeSuffix}</span>
            </div>

            <h1 style={{
              fontSize: 'clamp(44px, 6.4vw, 80px)', fontWeight: 700,
              letterSpacing: -3.2, lineHeight: 0.98, margin: 0,
              color: LAND.text, fontFamily: LAND.sans,
            }}>
              {copy.titleLine1}<br/>
              {copy.titleLine2Pre}<em style={{ color: LAND.accent, fontStyle: 'normal', fontFamily: LAND.serif, fontWeight: 400, letterSpacing: -2 }}>{copy.titleLine2Accent}</em>{copy.titleLine2Post}
            </h1>

            <p style={{
              marginTop: 24, fontSize: 17.5, lineHeight: 1.55,
              color: LAND.muted, fontFamily: LAND.sans, fontWeight: 400,
              maxWidth: 540,
            }}>
              <RichText parts={copy.subhead}/>
            </p>

            <div style={{ marginTop: 32, display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
              <a href="#download" style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '16px 24px', borderRadius: 14,
                background: LAND.accent, color: '#fff', textDecoration: 'none',
                fontSize: 15, fontWeight: 700, fontFamily: LAND.sans,
                boxShadow: `0 20px 50px ${LAND.accentSoft}, inset 0 1px 0 rgba(255,255,255,0.2)`,
                transition: 'transform .12s ease',
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-1px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                <AppleGlyph size={18}/>
                <span>{copy.ctaPrimary}</span>
                <span style={{ fontFamily: LAND.mono, fontSize: 11, opacity: 0.75, fontWeight: 500 }}>DMG · {RELEASE.size}</span>
              </a>
              <a href="#how" style={{
                padding: '16px 22px', borderRadius: 14,
                border: `1px solid ${LAND.lineStrong}`, background: LAND.panel,
                color: LAND.text, textDecoration: 'none',
                fontSize: 14, fontWeight: 600, fontFamily: LAND.sans,
                display: 'flex', alignItems: 'center', gap: 8,
              }}>
                <span>{copy.ctaSecondary}</span>
                <span style={{ fontFamily: LAND.mono, fontSize: 12, color: LAND.accent }}>→</span>
              </a>
            </div>

            <div style={{ marginTop: 28, display: 'flex', gap: 24, flexWrap: 'wrap' }}>
              {copy.checks.map((c) => (
                <div key={c.title} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <CheckGlyph/>
                  <div>
                    <div style={{ fontSize: 12.5, fontWeight: 600, color: LAND.text, fontFamily: LAND.sans }}>{c.title}</div>
                    <div style={{ fontSize: 11, color: LAND.dim, fontFamily: LAND.mono, marginTop: 2 }}>{c.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <SmsParseDemo sms={copy.sms}/>
        </div>
      </div>
    </section>
  );
}

function RichText({ parts }: { parts: RichPart[] }) {
  return (
    <>
      {parts.map((p, i) => {
        if (typeof p === 'string') return <React.Fragment key={i}>{p}</React.Fragment>;
        if ('bold' in p) return <b key={i} style={{ color: LAND.text, fontWeight: 600 }}>{p.bold}</b>;
        return <em key={i} style={{ color: LAND.accent, fontStyle: 'normal', fontFamily: LAND.serif, fontWeight: 400 }}>{p.accent}</em>;
      })}
    </>
  );
}

function SmsParseDemo({ sms }: { sms: Copy['hero']['sms'] }) {
  const [idx, setIdx] = React.useState(0);
  const [stage, setStage] = React.useState(0);

  React.useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    const tick = () => {
      setStage(0);
      timers.push(setTimeout(() => setStage(1), 900));
      timers.push(setTimeout(() => setStage(2), 2100));
      timers.push(setTimeout(() => setIdx(i => (i + 1) % sms.messages.length), 4200));
    };
    tick();
    const iv = setInterval(tick, 4300);
    return () => {
      clearInterval(iv);
      timers.forEach(clearTimeout);
    };
  }, [sms.messages.length]);

  const m = sms.messages[idx];
  const bankLabel = sms.bankLabels[m.bank];
  const bankInitial = bankLabel[0];

  return (
    <div style={{ position: 'relative', minHeight: 460 }}>
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 30,
        background: LAND.panel, border: `1px solid ${LAND.line}`,
        borderRadius: 20, padding: 20,
        boxShadow: `0 20px 60px rgba(0,0,0,0.4)`,
        transform: stage >= 1 ? 'translateY(-8px) scale(0.98)' : 'translateY(0) scale(1)',
        opacity: stage >= 2 ? 0.55 : 1,
        transition: 'all .6s cubic-bezier(0.2, 0.8, 0.2, 1)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
          <div style={{ width: 30, height: 30, borderRadius: 15, background: LAND.panelAlt, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 800, color: LAND.text, fontFamily: LAND.sans }}>{bankInitial}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12.5, fontWeight: 700, color: LAND.text, fontFamily: LAND.sans }}>{bankLabel}</div>
            <div style={{ fontSize: 10, color: LAND.dim, fontFamily: LAND.mono }}>{sms.messagesAppLabel}</div>
          </div>
          <span style={{ fontSize: 10, color: LAND.dim, fontFamily: LAND.mono }}>{sms.smsBadge}</span>
        </div>
        <pre style={{
          margin: 0, padding: 14,
          background: LAND.bg, borderRadius: 12, border: `1px solid ${LAND.line}`,
          fontFamily: LAND.mono, fontSize: 11.5, color: LAND.muted,
          whiteSpace: 'pre-wrap', lineHeight: 1.6, fontWeight: 500,
        }}>{m.raw}</pre>
      </div>

      <div style={{
        position: 'absolute', left: '50%', top: 180, transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
      }}>
        <div style={{
          padding: '6px 14px', borderRadius: 999, background: LAND.accentSoft,
          border: `1px solid ${LAND.accent}44`, color: LAND.accent,
          fontSize: 10, fontWeight: 800, fontFamily: LAND.mono, letterSpacing: 1,
          textTransform: 'uppercase',
          opacity: stage >= 1 ? 1 : 0.4, transition: 'opacity .4s ease',
        }}>
          {stage === 0 ? sms.stageReceived : stage === 1 ? sms.stageParsing : sms.stageParsed}
        </div>
        <ParseLine active={stage >= 1} stage={stage}/>
      </div>

      <div style={{
        position: 'absolute', bottom: 0, left: 40, right: 0,
        background: LAND.panel, border: `1px solid ${stage >= 2 ? m.color + '66' : LAND.line}`,
        borderRadius: 22, padding: '22px 24px',
        boxShadow: `0 24px 60px rgba(0,0,0,0.4)`,
        transform: stage >= 2 ? 'translateY(0) scale(1)' : 'translateY(16px) scale(0.97)',
        opacity: stage >= 2 ? 1 : 0.35,
        transition: 'all .5s cubic-bezier(0.2, 0.8, 0.2, 1)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{
            width: 44, height: 44, borderRadius: 22,
            background: `${m.color}22`, color: m.color,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 17, fontWeight: 800, fontFamily: LAND.sans,
          }}>{m.icon}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: LAND.text, fontFamily: LAND.sans, letterSpacing: -0.2 }}>{m.merchant}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
              <span style={{ width: 6, height: 6, borderRadius: 3, background: m.color }}/>
              <span style={{ fontSize: 11.5, color: LAND.muted, fontFamily: LAND.sans }}>{m.cat}</span>
              <span style={{ fontSize: 10, color: LAND.dim, fontFamily: LAND.mono }}>· {m.time} · ·1423</span>
            </div>
          </div>
          <div style={{
            fontSize: 22, fontWeight: 800, color: LAND.text,
            fontFamily: LAND.sans, letterSpacing: -0.8,
            fontVariantNumeric: 'tabular-nums',
          }}>−₾{m.amount.toFixed(2)}</div>
        </div>
        <div style={{
          marginTop: 16, paddingTop: 14, borderTop: `1px solid ${LAND.line}`,
          display: 'flex', justifyContent: 'space-between', gap: 14,
        }}>
          {[
            [sms.labelAutoCategory, m.cat],
            [sms.labelBank, bankLabel],
            [sms.labelStored, sms.valueStored],
          ].map(([k, v]) => (
            <div key={k}>
              <div style={{ fontSize: 9.5, color: LAND.dim, fontFamily: LAND.mono, letterSpacing: 0.6, textTransform: 'uppercase' }}>{k}</div>
              <div style={{ fontSize: 12, fontWeight: 600, color: LAND.text, fontFamily: LAND.sans, marginTop: 3 }}>{v}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: -24, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 6 }}>
        {sms.messages.map((_, i) => (
          <span key={i} style={{
            width: i === idx ? 18 : 6, height: 6, borderRadius: 3,
            background: i === idx ? LAND.accent : LAND.faint,
            transition: 'all .4s ease',
          }}/>
        ))}
      </div>
    </div>
  );
}

function ParseLine({ active, stage }: { active: boolean; stage: number }) {
  return (
    <svg key={stage} width="10" height="80" viewBox="0 0 10 80" style={{ overflow: 'visible' }}>
      <line x1="5" y1="0" x2="5" y2="80" stroke={LAND.line} strokeWidth="2" strokeDasharray="3 4"/>
      {active && (
        <circle cx="5" cy="0" r="4" fill={LAND.accent}>
          <animate attributeName="cy" from="0" to="80" dur="0.9s" fill="freeze"/>
          <animate attributeName="opacity" from="1" to="0" dur="0.9s" fill="freeze"/>
        </circle>
      )}
    </svg>
  );
}
