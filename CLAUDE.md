# CLAUDE.md — xarjilanding

Working context for this repo. Read it before making non-trivial changes. If something here is wrong, fix the doc and the code in the same PR.

---

## 1. What this is

The marketing site for **Xarji** — the self-hosted Georgian-bank SMS parser whose app lives in a separate repo (`~/Development/expensetracker`, published as [tornikegomareli/Xarji](https://github.com/tornikegomareli/Xarji)).

This repo ships a **static site**: dark-mode landing page with a coral accent, inherited from the Ink design system used in the Xarji dashboard. Its job is to explain what Xarji does, show a live-looking dashboard preview, list supported banks honestly, offer the DMG download, and collect newsletter signups.

**Intentional non-goals:**
- No custom backend — this is a static Astro build served as flat HTML.
- No analytics, no telemetry, no trackers.
- Newsletter signups go to an InstantDB app we own (see §7), not a third-party newsletter service.

**Target reader:** a Georgian developer/power-user considering Xarji. They need: a one-sentence pitch, a visual, accurate bank-support info, a DMG button, honest FAQ answers about privacy / offline / parser coverage.

---

## 2. Stack

- **Astro 6** (static build, `output: "static"`) — two page files, one per locale
- **`@astrojs/react`** — React 19 islands for interactivity (nav scroll, hero SMS animation, FAQ accordion, newsletter form)
- **Tailwind v4** via `@tailwindcss/vite` — reset + utilities only; most section styling is inline with Ink tokens
- **@instantdb/react** — newsletter signups only (see §7)
- **Bun** as runtime + package manager (matches main Xarji repo)

Dev: `bun run dev` → `http://localhost:4321/`.
Build: `bun run build` → `dist/{index.html, ka/index.html}`.
Serve built site: `bun run start` → `bun run server.ts` (the Bun static server used in production on Railway).
Type-check: `bun x astro check` (strict — 0 errors expected before any commit).

---

## 3. Directory layout

```
.
├── CLAUDE.md                     ← this file
├── README.md
├── astro.config.mjs              ← React + Tailwind integrations + i18n config
├── railway.toml                  ← Nixpacks builder + build/start commands for Railway
├── server.ts                     ← Bun static server used by `bun run start` (production)
├── package.json
├── tsconfig.json
├── .env.example                  ← tracked; copy to .env and fill in real values
├── .env                          ← gitignored; holds PUBLIC_INSTANT_LANDING_APP_ID
├── public/
│   └── favicon.svg               ← Xarji X-mark (coral gradient rounded square)
└── src/
    ├── content/copy/
    │   ├── en.ts                 ← canonical English copy — the shape of every locale
    │   ├── ka.ts                 ← Georgian copy, declared `: Copy` for shape enforcement
    │   └── types.ts              ← `export type Copy = typeof en`
    │
    ├── lib/
    │   ├── copy.ts               ← getCopy(locale), formatDate(iso, locale), isLocale, locales, localePaths, localeLabels
    │   ├── theme.ts              ← Ink tokens (LAND), REPO_URL, REPO_STARS, INSTANT_LANDING_APP_ID
    │   ├── release.ts            ← fetchRelease() — GitHub API → ReleaseData at build time (see §5)
    │   └── instant.ts            ← landingDb client for newsletter signups (see §7)
    │
    ├── components/landing/
    │   ├── glyphs.tsx            ← Logomark, GithubGlyph, AppleGlyph, CheckGlyph, LivePulse, SectionLabel
    │   ├── Nav.tsx               ← sticky nav + LocaleSwitch (EN / ქა)
    │   ├── Hero.tsx              ← headline, CTAs, animated SMS→transaction demo
    │   ├── Why.tsx               ← "The problem" cards + "The realisation" quote + flow diagram
    │   ├── ProductShot.tsx       ← mock dashboard + 6-screen strip
    │   ├── Features.tsx          ← Features cards + HowItWorks steps + supported/planned banks
    │   ├── Download.tsx          ← centred release card + prior-releases table
    │   ├── Rest.tsx              ← Faq, TechStack, Newsletter, Footer
    │   └── Reveal.astro          ← CSS-only scroll-reveal wrapper
    │
    ├── layouts/
    │   └── LandingLayout.astro   ← single layout, takes { copy: Copy, locale: Locale, release: ReleaseData }
    │
    ├── pages/
    │   ├── index.astro           ← locale = 'en' → /
    │   └── ka/index.astro        ← locale = 'ka' → /ka/
    │
    └── styles/
        └── global.css            ← Tailwind import + Ink keyframes + responsive breakpoints + .land-reveal
```

---

## 4. Copy, translation, and i18n

### 4.1 Architecture

Every user-facing string lives in `src/content/copy/`. Components are 100% prop-driven: they take a `copy` slice (e.g. `copy: Copy['nav']`) plus `locale` and/or `release` when they need date formatting or version data. **No component imports copy globally.**

- **`en.ts`** is the canonical source of truth. Shape is inferred via `type Copy = typeof en`.
- **`ka.ts`** is declared `export const ka: Copy = { ... }` — TypeScript fails the build if any key drifts.
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

Dates are **never hardcoded as strings**. Release metadata uses ISO-8601 (`dateIso: '2026-04-23'`), formatted at render time via `formatDate(iso, locale)`. That gives the right output in every locale without per-locale date strings.

---

## 5. Release metadata — auto-fetched

Release data is **no longer hardcoded**. On every `astro build`, `src/pages/index.astro` and `src/pages/ka/index.astro` call `fetchRelease()` from `src/lib/release.ts`, which hits:

```
GET https://api.github.com/repos/tornikegomareli/Xarji/releases?per_page=6
```

and shapes the response into a `ReleaseData`:

```ts
{
  latest: { version, dateIso, size, sha, dmgUrl },
  prior: [{ version, dateIso }, ...5]
}
```

The `sha` is fetched from the `.dmg.sha256` asset body and truncated to `sha256:xxxx…yyyy`. Size is formatted from bytes. DMG URL comes from the `.dmg` asset. Values are baked into the static HTML at build time — no runtime fetch, no GitHub API cost for users, no rate-limit exposure.

If the GitHub API is unreachable at build time (rate limit, outage, offline dev), `release.ts` falls back to a pinned `FALLBACK` constant so the build never breaks.

**`GITHUB_TOKEN` env var** (optional): set it in Railway variables (or locally) to switch the fetch to authenticated mode — 5000 req/hr instead of 60 req/hr unauthenticated. Not required, but nice insurance if the landing redeploys often during a release day.

### 5.1 What still requires a human PR per release

Structured facts (version, date, size, sha, DMG URL, prior tags) update automatically. Two things don't:

1. **`download.releaseNotes`** — the "What's new in vX.Y.Z" bullet list, in both `en.ts` and `ka.ts`. Write it when you write the GitHub release body; translate for Georgian.
2. **`download.priorSummaries[oldVersion]`** — the one-line summary shown in the prior-releases table. Add an entry for the version that just fell out of "latest" and into "prior."

Both get updated in a single PR in this repo per release. Everything else auto-syncs via §6.

---

## 6. Deploy pipeline

### 6.1 Railway (hosting)

Served on Railway. Nixpacks auto-detects Bun from `bun.lock`. `railway.toml` pins:

- **Build:** `bun install && bun run build`
- **Start:** `bun run start` (runs `server.ts`, the tiny Bun static server)
- **Restart policy:** `ON_FAILURE`, max 3 retries
- **Healthcheck:** `/`

`server.ts` serves files from `./dist`, maps `/foo` → `/foo/index.html`, sets long cache on `/_astro/*` hashed assets and short cache on HTML so deploys replace content quickly. Reads `PORT` and `HOST` from env (Railway injects `PORT`).

### 6.2 Auto-redeploy on main-repo releases

The main Xarji repo has a workflow (`.github/workflows/landing-redeploy.yml`, see main repo CLAUDE.md §8.4) that fires on every `release: published` event. It:

1. Checks out this repo using a fine-grained PAT stored as the `LANDING_REPO_PAT` secret (contents:write scope on `Xarji-landing` only).
2. Pushes an empty commit: `Redeploy landing for v0.X.Y`.
3. Railway's git-push auto-deploy picks up the push, rebuilds, and `fetchRelease()` bakes in the new version.

End-to-end latency is ~60s from `gh release create` to a live new landing.

**The PAT is the only external credential.** If it expires or is revoked, the workflow fails silently (no redeploy, but the landing stays up showing the previous version). Rotate by regenerating the PAT and updating the `LANDING_REPO_PAT` secret in the Xarji main repo.

### 6.3 Manual redeploy

If the auto-redeploy misses (CI outage, expired PAT, etc.) you can:

1. Click **Run workflow** on `landing-redeploy.yml` in the Xarji main repo — same flow, fires on demand.
2. Push an empty commit directly to `Xarji-landing` main — `git commit --allow-empty -m "…" && git push`.
3. In Railway's dashboard, open the service → latest deployment → **Redeploy**.

Any of the three fires the same build and ends with the latest release values on the live site.

---

## 7. Newsletter signups — InstantDB

The form in `<Newsletter>` writes directly to an InstantDB app we own (separate from each user's per-install Xarji app). The DB stores one namespace:

```
subscriptions { email: string, subscribedAt: number, source: string, locale: string }
```

### 7.1 Wiring

- `src/lib/instant.ts` initialises a single `landingDb = init({ appId: INSTANT_LANDING_APP_ID })`.
- The app ID lives in `.env` as `PUBLIC_INSTANT_LANDING_APP_ID`. The `PUBLIC_` prefix exposes it to the client bundle — safe because InstantDB sends the app ID with every client request anyway. The `.env` indirection is for per-environment pointing (dev/staging/prod), not secrecy.
- `<Newsletter>` submits with `landingDb.transact([landingDb.tx.subscriptions[id()].update({ email, subscribedAt, source: 'landing', locale })])`.
- Emails are lower-cased before insert so casing doesn't create duplicates.
- Three UI states: `loading` (button flips to "Subscribing…" / "იგზავნება…"), `success` (green "You're in" card), `error` (coral border + alert line, form stays open for retry).
- Errors are logged via `console.error('[xarji] newsletter subscribe failed', err)` — the catch block forwards the InstantDB error so permission / network issues are diagnosable from DevTools.

### 7.2 Permissions posture

Since the app ID is public, permissions must be restrictive. Set in the InstantDB dashboard for this app:

```ts
{
  attrs: {
    allow: {
      $default: "true"
    }
  },
  subscriptions: {
    allow: {
      view: "false",
      create: "true",
      update: "false",
      delete: "false"
    }
  }
}
```

`attrs` needs `$default: "true"` so InstantDB can auto-create the namespace's attributes on first write. `subscriptions` is create-only — visitors can't read, update, or delete rows. Subscribers are read exclusively via the InstantDB admin dashboard.

Once the schema has stabilised (after the first real signups), `attrs` can be locked down to `$default: "false"` since no new attrs need to be added.

### 7.3 Reading / exporting subscribers

InstantDB dashboard → select the app → **Explorer** tab → `subscriptions` namespace → shows all rows, supports CSV export. That's the only path — visitors can't enumerate from the client because of the `view: "false"` rule.

---

## 8. Supported-banks invariant

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

## 9. Hydration strategy

Astro ships zero JS by default. Interactivity is surgical:

- `<Nav client:load>` — scroll listener + locale switch need first-paint hydration
- `<Hero client:load>` — the SMS-parse demo animation needs to start immediately
- `<Faq client:visible>`, `<Newsletter client:visible>` — hydrate when they scroll into view (below-fold, not critical for LCP)
- Everything else — static HTML, no JS cost

Scroll-reveal (`Reveal.astro` wrapping most sections) is **not** React — it's a global `<script is:inline>` with one `IntersectionObserver` that toggles `.is-visible` on elements with `data-reveal`. Respects `prefers-reduced-motion`.

---

## 10. Conventions

- **Inline styles** for everything that needs theme tokens (mirrors the Ink design system from the main repo). Tailwind for reset + the occasional utility.
- **No emoji in code or docs** unless the user explicitly asks.
- **Trust framework guarantees** — no defensive null-checks around things that can't be null.
- **No premature abstraction** — three similar lines beats a helper. Add the helper when the second caller materialises.
- **Comments explain *why*, not *what*** — if a reader could learn "what" from the code, the comment is redundant. Default to no comments; reserve them for hidden constraints, workarounds, subtle invariants.
- **Env vars are prefixed with `PUBLIC_`** only when they need to reach the client bundle (like the InstantDB app ID). Build-time-only vars (like `GITHUB_TOKEN` for `fetchRelease`) have no prefix.

---

## 11. Quick reference

```
Dev:
  bun run dev                         # :4321, hot reload, Astro dev server

Build both locales (runs fetchRelease against GitHub):
  bun run build                       # dist/index.html + dist/ka/index.html

Production serve (what Railway runs):
  bun run start                       # bun run server.ts

Type-check (strict):
  bun x astro check

Preview built site via Astro's built-in preview:
  bun run preview

Env setup (first clone):
  cp .env.example .env
  # edit .env, set PUBLIC_INSTANT_LANDING_APP_ID to the real InstantDB app ID
```
