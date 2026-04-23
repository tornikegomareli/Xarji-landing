import React from 'react';
import { LAND, RELEASE, REPO_URL, BUTTONDOWN_USERNAME } from '../../lib/theme';
import type { Copy, Locale } from '../../lib/copy';
import { formatDate } from '../../lib/copy';
import { Logomark, SectionLabel } from './glyphs';

export function Faq({ copy }: { copy: Copy['faq'] }) {
  const [open, setOpen] = React.useState(0);

  return (
    <section id="faq" style={{ padding: '100px 28px', background: LAND.bgDeep, borderTop: `1px solid ${LAND.line}`, borderBottom: `1px solid ${LAND.line}` }}>
      <div style={{ maxWidth: 880, margin: '0 auto' }}>
        <SectionLabel eyebrow={copy.eyebrow} title={copy.title}/>
        <div style={{ marginTop: 40, display: 'flex', flexDirection: 'column', gap: 10 }}>
          {copy.items.map((it, i) => {
            const isOpen = open === i;
            return (
              <div key={i} style={{
                background: LAND.panel, border: `1px solid ${isOpen ? LAND.accent + '55' : LAND.line}`,
                borderRadius: 16, overflow: 'hidden',
                transition: 'border-color .2s ease',
              }}>
                <button onClick={() => setOpen(isOpen ? -1 : i)} style={{
                  width: '100%', padding: '20px 24px',
                  background: 'transparent', border: 'none', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  textAlign: 'left', color: LAND.text, fontFamily: LAND.sans,
                  fontSize: 15, fontWeight: 600,
                }}>
                  <span>{it.q}</span>
                  <span style={{
                    width: 28, height: 28, borderRadius: 14, flexShrink: 0, marginLeft: 14,
                    background: isOpen ? LAND.accent : LAND.panelAlt,
                    color: isOpen ? '#fff' : LAND.muted,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 16, lineHeight: 1, fontWeight: 500,
                    transform: isOpen ? 'rotate(45deg)' : 'rotate(0)',
                    transition: 'all .2s ease',
                  }}>+</span>
                </button>
                <div style={{
                  maxHeight: isOpen ? 500 : 0, overflow: 'hidden',
                  transition: 'max-height .3s ease',
                }}>
                  <div style={{ padding: '0 24px 22px', fontSize: 14, color: LAND.muted, fontFamily: LAND.sans, lineHeight: 1.65 }}>
                    <FaqAnswer text={it.a}/>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FaqAnswer({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={i} style={{ color: LAND.text, fontWeight: 700 }}>{part.slice(2, -2)}</strong>;
        }
        return <React.Fragment key={i}>{part}</React.Fragment>;
      })}
    </>
  );
}

export function TechStack({ copy }: { copy: Copy['techStack'] }) {
  return (
    <section style={{ padding: '80px 28px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', fontSize: 11.5, color: LAND.accent, fontFamily: LAND.mono, fontWeight: 700, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 28 }}>{copy.eyebrow}</div>
        <div className="land-stack-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
          {copy.items.map((t) => (
            <a key={t.name} href={t.link} target="_blank" rel="noreferrer" style={{
              padding: '20px 22px', background: LAND.panel, border: `1px solid ${LAND.line}`,
              borderRadius: 16, textDecoration: 'none', display: 'block',
              transition: 'border-color .15s ease, transform .15s ease',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = LAND.accent + '55'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = LAND.line; e.currentTarget.style.transform = 'translateY(0)'; }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: LAND.text, fontFamily: LAND.sans, letterSpacing: -0.3 }}>{t.name}</div>
              <div style={{ marginTop: 4, fontSize: 12, color: LAND.muted, fontFamily: LAND.sans }}>{t.role}</div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

type NewsletterStatus = 'idle' | 'loading' | 'success' | 'error';

export function Newsletter({ copy }: { copy: Copy['newsletter'] }) {
  const [email, setEmail] = React.useState('');
  const [status, setStatus] = React.useState<NewsletterStatus>('idle');
  const [focused, setFocused] = React.useState(false);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || !trimmed.includes('@')) return;
    setStatus('loading');
    try {
      const res = await fetch(
        `https://buttondown.com/api/emails/embed-subscribe/${BUTTONDOWN_USERNAME}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({ email: trimmed, tag: 'landing' }).toString(),
        },
      );
      if (!res.ok && res.type !== 'opaque') throw new Error(`HTTP ${res.status}`);
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  const isSuccess = status === 'success';
  const isError = status === 'error';
  const isLoading = status === 'loading';
  const showForm = !isSuccess;

  return (
    <section style={{ padding: '100px 28px' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{
          padding: 48, borderRadius: 28,
          background: `radial-gradient(1000px 400px at 20% 0%, ${LAND.accentDim}, transparent), ${LAND.panel}`,
          border: `1px solid ${LAND.lineStrong}`, position: 'relative', overflow: 'hidden',
        }}>
          <div aria-hidden style={{ position: 'absolute', top: -60, right: -40, fontSize: 220, fontFamily: LAND.serif, color: LAND.accent, opacity: 0.08, lineHeight: 1, fontStyle: 'italic' }}>✉</div>
          <div style={{ position: 'relative', maxWidth: 520 }}>
            <div style={{ fontSize: 11.5, color: LAND.accent, fontFamily: LAND.mono, fontWeight: 700, letterSpacing: 1.2, textTransform: 'uppercase' }}>{copy.eyebrow}</div>
            <h3 style={{ margin: '14px 0 0 0', fontSize: 34, fontWeight: 700, color: LAND.text, fontFamily: LAND.sans, letterSpacing: -1.2, lineHeight: 1.1 }}>
              {copy.titlePre}<em style={{ color: LAND.accent, fontStyle: 'italic', fontFamily: LAND.serif, fontWeight: 400 }}>{copy.titleAccent}</em>{copy.titlePost}
            </h3>
            <p style={{ marginTop: 14, fontSize: 15, color: LAND.muted, fontFamily: LAND.sans, lineHeight: 1.55 }}>
              {copy.body}
            </p>

            {showForm ? (
              <form onSubmit={submit} style={{
                marginTop: 28, display: 'flex', gap: 8, padding: 6,
                background: LAND.bg, borderRadius: 14,
                border: `1px solid ${focused ? LAND.accent : isError ? `${LAND.accent}99` : LAND.lineStrong}`,
                transition: 'border-color .15s ease',
              }}>
                <input
                  type="email" placeholder={copy.emailPlaceholder}
                  value={email}
                  onChange={e => { setEmail(e.target.value); if (isError) setStatus('idle'); }}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  disabled={isLoading}
                  style={{
                    flex: 1, background: 'transparent', border: 'none', outline: 'none',
                    color: LAND.text, fontFamily: LAND.sans, fontSize: 14,
                    padding: '12px 16px',
                  }}
                />
                <button type="submit" disabled={isLoading} style={{
                  padding: '12px 22px', borderRadius: 10,
                  background: LAND.accent, color: '#fff', border: 'none',
                  cursor: isLoading ? 'default' : 'pointer',
                  opacity: isLoading ? 0.7 : 1,
                  fontSize: 13, fontWeight: 700, fontFamily: LAND.sans,
                  display: 'flex', alignItems: 'center', gap: 8,
                  transition: 'opacity .15s ease',
                }}>
                  <span>{isLoading ? copy.loadingCta : copy.subscribeCta}</span>
                  {!isLoading && <span>→</span>}
                </button>
              </form>
            ) : (
              <div style={{ marginTop: 28, padding: 20, borderRadius: 14, background: 'rgba(75,217,162,0.08)', border: `1px solid ${LAND.green}55`, display: 'flex', alignItems: 'center', gap: 14 }}>
                <span style={{ width: 34, height: 34, borderRadius: 17, background: LAND.green, color: LAND.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 800 }}>✓</span>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: LAND.text, fontFamily: LAND.sans }}>{copy.successTitle}</div>
                  <div style={{ fontSize: 12, color: LAND.muted, fontFamily: LAND.sans, marginTop: 3 }}>{copy.successSubPre}{email}{copy.successSubPost}</div>
                </div>
              </div>
            )}

            {isError && (
              <div role="alert" style={{ marginTop: 12, fontSize: 12.5, color: LAND.accent, fontFamily: LAND.sans, lineHeight: 1.5 }}>
                <span style={{ fontWeight: 700 }}>{copy.errorTitle}</span>
                <span style={{ color: LAND.muted, marginLeft: 6 }}>{copy.errorSub}</span>
              </div>
            )}

            <div style={{ marginTop: 16, fontSize: 11.5, color: LAND.dim, fontFamily: LAND.sans }}>
              {copy.trustNote}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

type FooterProps = { copy: Copy['footer']; locale: Locale };

export function Footer({ copy, locale }: FooterProps) {
  const resourcesLinks: [string, string][] = [
    [copy.resourcesCol.faqLabel, '#faq'],
    [copy.resourcesCol.githubLabel, REPO_URL],
    [copy.resourcesCol.instantdbLabel, 'https://instantdb.com'],
    [copy.resourcesCol.bugLabel, `${REPO_URL}/issues/new`],
  ];
  const legalLinks: [string, string][] = [
    [copy.legalCol.licenseLabel, `${REPO_URL}/blob/main/LICENSE`],
    [copy.legalCol.sourceLabel, REPO_URL],
  ];
  const productLinks: [string, string][] = copy.productCol.links.map(l => [l.label, l.href]);
  return (
    <footer style={{ padding: '60px 28px 40px', borderTop: `1px solid ${LAND.line}`, background: LAND.bgDeep }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', justifyContent: 'space-between', gap: 30, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
          <Logomark size={36}/>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: LAND.text, fontFamily: LAND.sans }}>{copy.brand}</div>
            <div style={{ fontSize: 11.5, color: LAND.dim, fontFamily: LAND.mono, marginTop: 3 }}>{copy.madeIn}</div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 60, flexWrap: 'wrap' }}>
          <FooterCol title={copy.productCol.title} links={productLinks}/>
          <FooterCol title={copy.resourcesCol.title} links={resourcesLinks}/>
          <FooterCol title={copy.legalCol.title} links={legalLinks}/>
        </div>
      </div>
      <div style={{ maxWidth: 1280, margin: '40px auto 0', paddingTop: 24, borderTop: `1px solid ${LAND.line}`, display: 'flex', justifyContent: 'space-between', gap: 16, fontSize: 11, color: LAND.dim, fontFamily: LAND.mono, flexWrap: 'wrap' }}>
        <span>v{RELEASE.version} · {formatDate(RELEASE.dateIso, locale)}</span>
        <span>{copy.notAffiliated}</span>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <div style={{ fontSize: 10.5, color: LAND.dim, fontFamily: LAND.mono, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 14 }}>{title}</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
        {links.map(([l, h]) => (
          <a key={l} href={h} style={{ fontSize: 13, color: LAND.muted, textDecoration: 'none', fontFamily: LAND.sans, fontWeight: 500, transition: 'color .15s ease' }}
            onMouseEnter={(e) => e.currentTarget.style.color = LAND.text}
            onMouseLeave={(e) => e.currentTarget.style.color = LAND.muted}>
            {l}
          </a>
        ))}
      </div>
    </div>
  );
}
