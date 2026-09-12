# Linqo — Smart NFC Business Cards for Algeria

> A full-stack SaaS that turns one NFC tap (or QR scan) into a complete, always-up-to-date
> digital profile — WhatsApp, socials, contact card, catalog and more. Built for the
> Algerian market: prices in DZD, cash-on-delivery, delivery to all 58 wilayas, and a
> fully trilingual UI (French · English · العربية with RTL).

![Linqo landing page](screenshots/02-landing-hero-desktop.png)

<p align="center">
  <img alt="Next.js 16" src="https://img.shields.io/badge/Next.js-16-000000?logo=nextdotjs&logoColor=white">
  <img alt="React 19" src="https://img.shields.io/badge/React-19-20232a?logo=react&logoColor=61DAFB">
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white">
  <img alt="Tailwind CSS v4" src="https://img.shields.io/badge/Tailwind_CSS-v4-38BDF8?logo=tailwindcss&logoColor=white">
  <img alt="Supabase" src="https://img.shields.io/badge/Supabase-Postgres_+_RLS-3ECF8E?logo=supabase&logoColor=white">
  <img alt="Cloudinary" src="https://img.shields.io/badge/Cloudinary-Media-3448C5?logo=cloudinary&logoColor=white">
</p>

---

## The problem

Paper business cards get lost, go out of date the moment your number changes, and give you
zero feedback. In Algeria, most business happens over **WhatsApp** — but there was no
localized, no-app-required way to hand someone your entire digital presence in a single tap.

**Linqo** solves this with a physical NFC/QR card linked to an editable online profile. Tap
the card on any phone (iPhone or Android, no app), and the visitor instantly gets a
WhatsApp-first profile with a one-tap "save contact" (vCard), all your links, a map, and — on
higher tiers — a product catalog and lead-capture forms. Change your profile any time; the
same card always shows the latest version.

## What I built

An end-to-end product, not just a UI:

- **Marketing site** — trilingual landing page (FR/EN/AR) with full RTL support, DZD pricing,
  FAQ, and an NFC card storefront.
- **Guided onboarding** — a 5-step wizard that adapts its structure and recommended plan to
  the visitor's goal and profession, with a **live phone preview** that updates as they type.
- **Creator dashboard** — manage links (reorder, hide, per-link click stats), profile
  appearance & themes, a business "showcase" (catalog, portfolio, map, lead forms), a
  branded QR code generator, and card orders.
- **Public profile** — the core surface: mobile-first, WhatsApp-first, five selectable
  layout templates, vCard download, and privacy-respecting view/click analytics.
- **Order flow** — a checkout for physical PVC cards: wilaya-aware delivery, cash-on-delivery
  or BaridiMob, with server-persisted orders.
- **Admin console** — a super-admin back office (clients, orders, subscriptions, finance,
  activity) with charts, guarded by row-level security and a role check.
- **Tiered entitlements** — Free / Pro / Business plans that gate features (link limits,
  images, catalog, lead forms) consistently on both the client and the server.

> 💡 **Zero-config demo mode.** With no backend configured, the app automatically falls back
> to `localStorage`-backed demo data, so the entire experience is runnable with just
> `npm install && npm run dev`. Every screenshot below was captured in this mode.

---

## Screens

### Trilingual landing + RTL

The same page in English and Arabic. Language is client-switchable and persisted; selecting
Arabic flips the entire layout to right-to-left via `document.documentElement.dir`.

| English | العربية (RTL) |
| --- | --- |
| ![Landing — English](screenshots/01-landing-desktop.png) | ![Landing — Arabic RTL](screenshots/03-landing-arabic-rtl.png) |

### Public profile (the product's core surface)

Mobile-first and WhatsApp-first, with a one-tap "save contact" vCard, tracked link taps, and
a sticky call-to-action. Five layout templates (Classic, Minimal, Professional, Portfolio,
Showcase) unlock by plan.

<p align="center">
  <img alt="Public profile (mobile)" src="screenshots/04-public-profile-mobile.png" width="360">
</p>

### Adaptive onboarding wizard

Picks a recommended plan, profile template, and starter links based on the user's goal and
profession — with a live preview beside every step.

![Onboarding wizard](screenshots/05-onboarding-desktop.png)

### Creator dashboard

| Overview | Links |
| --- | --- |
| ![Dashboard overview](screenshots/06-dashboard-overview.png) | ![Link management](screenshots/07-dashboard-links.png) |

| Appearance & themes | QR code studio |
| --- | --- |
| ![Appearance editor](screenshots/08-dashboard-appearance.png) | ![QR code generator](screenshots/09-dashboard-qr.png) |

### NFC card ordering & order history

| Order flow | Orders |
| --- | --- |
| ![Order an NFC card](screenshots/10-order-desktop.png) | ![Order history](screenshots/11-dashboard-orders.png) |

---

## Tech stack

| Area | Choices |
| --- | --- |
| **Framework** | Next.js 16 (App Router, Turbopack, Server Components + Route Handlers) |
| **Language** | TypeScript (strict) |
| **UI** | React 19, Tailwind CSS v4, custom design system, `lucide-react` icons |
| **Backend / DB** | Supabase (Postgres, Auth, Row-Level Security) via `@supabase/ssr` |
| **Media** | Cloudinary (avatar/cover uploads with signed server-side handling) |
| **Data viz** | Recharts (admin analytics) |
| **Other** | `react-qr-code` (branded QR export), hCaptcha (bot protection), OpenStreetMap (map sections) |
| **Testing** | Vitest (unit tests for rate-limiting and geo/URL helpers) |
| **Tooling** | ESLint 9, PostCSS, Netlify deploy config |

---

## Engineering highlights

Things I'm proud of under the hood:

- **Multi-tenant security with RLS + RBAC.** Every table is protected by Postgres Row-Level
  Security so users can only read/write their own data. Admin routes are gated server-side by
  an `is_super_admin` RPC and redirect unauthorized users before any data is fetched. Public
  profiles are served through an explicitly column-scoped query, never `select *`.

- **Graceful degradation & progressive migrations.** The data layer transparently handles a
  database that hasn't run the latest migration yet (e.g. missing `profile_template` or image
  columns), falling back to a legacy query instead of erroring — so deploys never take
  profiles offline.

- **Consistent entitlements.** A single `PLAN_ENTITLEMENTS` table drives feature gating
  (link caps, images, catalog, lead forms) identically on the client and on the server, and
  the public profile only queries premium data when the plan allows it.

- **Abuse protection.** Public write endpoints (leads, tracking, uploads) are rate-limited
  using a hashed `endpoint:ip:subject` key, standard `Retry-After` / `X-RateLimit-*`
  response headers, and honeypot fields on public forms. The core limiter is unit-tested.

- **Privacy-respecting analytics.** Views and link clicks are recorded with
  `navigator.sendBeacon` and de-duplicated per session — analytics can never block or break
  the public profile.

- **Client-generated, print-ready QR codes.** QR codes are rendered to SVG, have the Linqo
  logo embedded, and are exported as both high-res branded PNG (via canvas) and vector SVG
  for print shops — entirely on the client.

- **Hardened by default.** A strict Content-Security-Policy and security headers
  (`X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`) are
  applied to every route in `next.config.ts`.

- **Real i18n, including RTL.** A typed dictionary powers FR/EN/AR, with correct
  direction, locale-aware number/currency formatting, and RTL-aware layout utilities.

---

## Project structure

```
src/
├── app/
│   ├── page.tsx              # Trilingual marketing landing
│   ├── [slug]/               # Public profile (SSR, cached, RLS-scoped)
│   ├── onboarding/           # Adaptive 5-step wizard
│   ├── order/                # NFC card checkout
│   ├── dashboard/            # Creator app (links, appearance, showcase, qr, orders…)
│   ├── admin/                # Super-admin console (charts, clients, finance…)
│   └── api/                  # Route handlers: track, leads, uploads, geocode, admin, …
├── components/               # ProfileView, PhonePreview, charts, upload fields, …
└── lib/
    ├── store.ts              # Client data layer (Supabase ↔ localStorage demo mode)
    ├── plans.ts              # Plan entitlements + public-visibility rules
    ├── profile-themes.ts     # Template & palette system
    ├── rate-limit*.ts        # Rate limiting (+ tests)
    ├── i18n.tsx              # FR/EN/AR dictionary + RTL
    └── supabase/             # SSR-safe browser/server/service clients
```

---

## Running it locally

```bash
npm install
npm run dev      # http://localhost:3000  — runs in demo mode with no backend
```

To connect a real backend, copy `.env.local.example` → `.env.local`, run
`supabase/schema.sql` in your Supabase project, and fill in the Supabase, Cloudinary and
hCaptcha keys. See [`README.md`](README.md) for the full setup guide.

```bash
npm run test     # Vitest unit tests
npm run build    # Production build
```

---

## Notes & credits

- Screenshots are captured in demo mode; the admin console additionally requires an
  authenticated super-admin session against a live Supabase project.
- The product name shown in-app is **Linqo**; the repository is `linknfc-app`.

Built by **Anes Hamdaoui**.
