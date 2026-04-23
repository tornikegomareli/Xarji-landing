# CLAUDE.md — xarjilanding

Working context for this repo. Read it before making non-trivial changes. If something here is wrong, fix the doc and the code in the same PR.

---

## 1. What this is

The marketing site for **Xarji** — the self-hosted Georgian-bank SMS parser whose app lives in a separate repo (`~/Development/expensetracker`, published as [tornikegomareli/Xarji](https://github.com/tornikegomareli/Xarji)).

This repo ships a **static site**: dark-mode landing page with a coral accent, inherited from the Ink design system used in the Xarji dashboard. Its job is to explain what Xarji does, show a live-looking dashboard preview, list supported banks honestly, and offer the DMG download.

**Intentional non-goals:**
- No server, no backend, no database — it's a static Astro build.
- No user accounts, no analytics, no telemetry.
- No form backend (the newsletter form is UI-only; wire to a provider when there's demand).

**Target reader:** a Georgian developer/power-user considering Xarji. They need: a one-sentence pitch, a visual, accurate bank-support info, a DMG button, honest FAQ answers about privacy / offline / parser coverage.

---

## 2. Stack

- **Astro 6** (static build, `output: "static"`)
- **`@astrojs/react`** — React 19 islands for interactivity (nav scroll, hero SMS animation, FAQ accordion, newsletter form)
- **Tailwind v4** via `@tailwindcss/vite` — used for reset + utilities. Most section styling is inline (mirrors the Ink design tokens).
- **Bun** as runtime + package manager (to match the main Xarji repo).

Dev server: `bun run dev` → `http://localhost:4321/`.
Build: `bun run build` → `dist/` (two pages: `/index.html`, `/ka/index.html`).
Type-check: `bun x astro check` (strict — 0 errors expected before any commit).

---

## 3. Directory layout

```
.
├── CLAUDE.md                     ← this file
├── README.md
├── astro.config.mjs              ← React + Tailwind integrations + i18n config
├── package.json
├── tsconfig.json
├── public/                       ← favicon, static assets
└── src/
    ├── content/copy/
    │   ├── en.ts                 ← canonical English copy — the shape of every locale
    │   ├── ka.ts                 ← Georgian copy, declared `: Copy` for shape enforcement
    │   └── types.ts              ← `export type Copy = typeof en`
    │
    ├── lib/
    │   ├── copy.ts               ← getCopy(locale), formatDate(iso, locale), isLocale(), locales[], localePaths, localeLabels
    │   └── theme.ts              ← Ink tokens (LAND), RELEASE (version/dateIso/size/sha/dmgUrl), PRIOR_RELEASES, REPO_URL, REPO_STARS
    │
    ├── components/landing/
    │   ├── glyphs.tsx            ← Logomark, GithubGlyph, AppleGlyph, CheckGlyph, LivePulse, SectionLabel
    │   ├── Nav.tsx               ← sticky nav + LocaleSwitch (EN / ქა)
    │   ├── Hero.tsx              ← headline, CTAs, animated SMS→transaction demo
    │   ├── ProductShot.tsx       ← mock dashboard + annotation callouts + 6-screen strip
    │   ├── Features.tsx          ← Features + HowItWorks + banks (supported / planned split)
    │   ├── Download.tsx          ← current release card + prior releases
    │   ├── Rest.tsx              ← Faq, TechStack, Newsletter, Footer
    │   └── Reveal.astro          ← CSS-only scroll-reveal wrapper (IntersectionObserver in a global <script>)
    │
    ├── layouts/
    │   └── LandingLayout.astro   ← single layout, takes { copy: Copy, locale: Locale }
    │
    ├── pages/
    │   ├── index.astro           ← locale = 'en' → /
    │   └── ka/index.astro        ← locale = 'ka' → /ka/
    │
    └── styles/
        └── global.css            ← Tailwind import + Ink keyframes + responsive breakpoints + .land-reveal transitions
```

---

## 4. Copy, translation, and i18n

### 4.1 Architecture

Every user-facing string lives in `src/content/copy/`. Components are 100% prop-driven: they take a `copy` slice (e.g. `copy: Copy['nav']`) and a `locale: Locale` when they need to format dates. **No component imports copy globally.**

- **`en.ts`** is the canonical source of truth. Shape is inferred via `type Copy = typeof en`.
- **`ka.ts`** is declared as `export const ka: Copy = { ... }` — TypeScript fails the build if any key drifts.
- **`lib/copy.ts`** exposes `getCopy(locale)` and `formatDate(iso, locale)` (uses `Intl.DateTimeFormat` with `en-US` / `ka-GE`).
- **Locale switch:** `<Nav>` renders a two-button pill that deep-links to `/` or `/ka/`. `aria-current="page"` on the active one.

### 4.2 Adding or changing strings

**Changing copy requires user approval.** Translation files (`ka.ts`) and marketing copy in `en.ts` are human-authored — they encode choices you can't undo with a refactor. If a task genuinely needs a wording change, pause and ask.

**Adding a new string** (new section, new field):
1. Add it to `en.ts` with a sensible default.
2. TypeScript will immediately fail `bun x astro check` because `ka.ts` no longer matches `Copy`.
3. Add the Georgian translation to `ka.ts` **only with the user's approval** — default to a TODO placeholder and flag it.

**Adding a new locale:** create `copy/<locale>.ts` declared `: Copy`, add `<locale>` to `locales` in `lib/copy.ts` and to Astro's `i18n.locales`, add a `src/pages/<locale>/index.astro` thin entry, and a path entry in `localePaths` + label in `localeLabels`.

### 4.3 Date formatting

Dates are **never hardcoded as strings**. Store as ISO-8601 in `theme.ts` (`RELEASE.dateIso = '2026-04-23'`, `PRIOR_RELEASES[i].dateIso`), format at render time via `formatDate(iso, locale)`. This gives the right output in every locale without per-locale date strings.

---

## 5. Release metadata

`src/lib/theme.ts` holds the facts about the latest DMG:

```ts
export const RELEASE = {
  version: '0.2.4',
  dateIso: '2026-04-23',
  size: '26.3 MB',
  sha: 'sha256:77c2…ede1',
  dmgUrl: `${REPO_URL}/releases/download/v0.2.4/Xarji-0.2.4.dmg`,
};
```

When the main Xarji repo ships a new tag, this file needs to be bumped:

1. `version` → new semver
2. `dateIso` → publish date
3. `size` → new DMG size (GitHub releases API reports bytes; divide by `1024 * 1024` for MB)
4. `sha` → first 4 + last 4 chars of the new `.dmg.sha256`, formatted `sha256:xxxx…yyyy`
5. `dmgUrl` → `${REPO_URL}/releases/download/v<version>/Xarji-<version>.dmg`
6. `download.releaseNotes` in **both** `en.ts` and `ka.ts` → new "What's new" bullets

Push `PRIOR_RELEASES` the previous entry and add a `priorSummaries[oldVersion]` in both copy files.

---

## 6. Supported-banks invariant

Only two bank parsers exist in the main Xarji repo today: `service/src/parsers/solo.ts` (Bank of Georgia Solo SMS) and `service/src/parsers/tbc.ts` (TBC SMS / TBC). The landing must reflect that:

- **Working today:** BOG (Solo SMS), TBC
- **On the roadmap:** the 12 other major Georgian banks, ordered by the Wikipedia asset ranking:
  Liberty, Basis, ProCredit, Credo, Terabank, Cartu, Halyk, VTB Georgia, PASHA, Isbank, Ziraat, Silk Road

Do not mark any of the planned banks as "supported" — even if the main repo's `CLAUDE.md` mentions aspirational parsers that were never built. The parser file list is the ground truth. When a new parser lands in the service, update:

1. `how.banks.supported` + `how.banks.planned` in both locale copy files
2. The "Made for Georgian banks" Features card blurb
3. The relevant FAQ answer
4. The hero subhead if it enumerates banks

---

## 7. Hydration strategy

Astro ships zero JS by default. Interactivity is surgical:

- `<Nav client:load>` — needs the scroll listener immediately (the blur/border transition depends on scroll position at first paint).
- `<Hero client:load>` — the SMS-parse demo animation needs to start as soon as the page renders.
- `<Faq client:visible>`, `<Newsletter client:visible>` — hydrate when they scroll into view (below-fold, not critical for LCP).
- Everything else — static HTML, no JS cost.

Scroll-reveal (`Reveal.astro` wrapping most sections) is **not** React — it's a global `<script is:inline>` with one `IntersectionObserver` that toggles `.is-visible` on elements with `data-reveal`. Respects `prefers-reduced-motion`.

---

## 8. Conventions

- **Inline styles** for everything that needs theme tokens (mirrors the Ink design system from the main repo). Tailwind for reset + the occasional utility.
- **No emoji in code or docs** unless the user explicitly asks.
- **Trust framework guarantees** — no defensive null-checks around things that can't be null.
- **No premature abstraction** — three similar lines beats a helper. Add the helper when the second caller materialises.
- **Comments explain *why*, not *what*** — if a reader could learn "what" from the code, the comment is redundant. Default to no comments; reserve them for hidden constraints, workarounds, subtle invariants.

---

## 9. Quick reference

```
Dev:
  bun run dev                         # :4321

Build both locales:
  bun run build                       # dist/index.html + dist/ka/index.html

Type-check (strict):
  bun x astro check

Preview built site:
  bun run preview
```
