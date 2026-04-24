import React from 'react';
import { LAND, REPO_URL, REPO_STARS } from '../../lib/theme';
import { locales, localeLabels, localePaths, type Copy, type Locale } from '../../lib/copy';
import type { ReleaseInfo } from '../../lib/release';
import { Logomark, GithubGlyph } from './glyphs';

type Props = {
  copy: Copy['nav'];
  locale: Locale;
  release: ReleaseInfo;
};

export default function Nav({ copy, locale, release }: Props) {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 50,
      backdropFilter: scrolled ? 'blur(20px) saturate(140%)' : 'none',
      WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(140%)' : 'none',
      background: scrolled ? 'rgba(12,12,14,0.72)' : 'transparent',
      borderBottom: scrolled ? `1px solid ${LAND.line}` : '1px solid transparent',
      transition: 'background .2s ease, border-color .2s ease',
    }}>
      <div style={{
        maxWidth: 1280, margin: '0 auto',
        padding: '18px 28px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24,
      }}>
        <a href="#top" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none' }}>
          <Logomark size={34}/>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700, letterSpacing: -0.3, color: LAND.text, fontFamily: LAND.sans, lineHeight: 1 }}>Xarji</div>
            <div style={{ fontSize: 10, color: LAND.dim, fontFamily: LAND.mono, marginTop: 3 }}>{copy.brandTagline} · v{release.version}</div>
          </div>
        </a>

        <nav className="land-nav-links" style={{ display: 'flex', gap: 4 }}>
          {copy.links.map(l => (
            <a key={l.href} href={l.href} style={{
              padding: '8px 14px', borderRadius: 10,
              fontSize: 13.5, color: LAND.muted, textDecoration: 'none',
              fontFamily: LAND.sans, fontWeight: 500, transition: 'all .15s ease',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = LAND.text; e.currentTarget.style.background = LAND.panel; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = LAND.muted; e.currentTarget.style.background = 'transparent'; }}>
              {l.label}
            </a>
          ))}
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <LocaleSwitch current={locale} aria={copy.localeSwitchAria}/>
          <a href={REPO_URL} target="_blank" rel="noreferrer" style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '9px 14px', borderRadius: 10,
            border: `1px solid ${LAND.line}`, background: LAND.panel,
            color: LAND.text, fontSize: 12.5, fontWeight: 600,
            fontFamily: LAND.sans, textDecoration: 'none',
          }}>
            <GithubGlyph size={14}/>
            <span className="land-hide-narrow">{copy.sourceLabel}</span>
            <span style={{ fontFamily: LAND.mono, fontSize: 11, color: LAND.dim }}>{REPO_STARS} ★</span>
          </a>
          <a href="#download" style={{
            padding: '10px 18px', borderRadius: 10,
            background: LAND.accent, color: '#fff', textDecoration: 'none',
            fontSize: 13, fontWeight: 700, fontFamily: LAND.sans,
            boxShadow: `0 8px 20px ${LAND.accentSoft}`,
            display: 'flex', alignItems: 'center', gap: 8,
          }}>
            <span>{copy.downloadCta}</span>
          </a>
        </div>
      </div>
    </header>
  );
}

function LocaleSwitch({ current, aria }: { current: Locale; aria: string }) {
  return (
    <div role="group" aria-label={aria} style={{
      display: 'flex', gap: 2, padding: 3,
      background: LAND.panel, border: `1px solid ${LAND.line}`, borderRadius: 10,
    }}>
      {locales.map(l => {
        const active = l === current;
        return (
          <a key={l} href={localePaths[l]} aria-current={active ? 'page' : undefined} style={{
            padding: '5px 9px', borderRadius: 7,
            fontSize: 11, fontWeight: 700, fontFamily: LAND.mono, letterSpacing: 0.5,
            background: active ? LAND.text : 'transparent',
            color: active ? LAND.bg : LAND.muted,
            textDecoration: 'none',
            transition: 'all .15s ease',
          }}>
            {localeLabels[l]}
          </a>
        );
      })}
    </div>
  );
}
