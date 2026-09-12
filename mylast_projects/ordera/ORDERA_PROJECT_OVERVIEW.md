# Ordera — Project Overview & Client Video Script

> A production-grade SaaS that automates **cash-on-delivery (COD) order confirmation and
> fulfilment** for e-commerce merchants (built for the Algerian market). Full-stack:
> marketing site, merchant web app, REST API, background workers, and third-party
> integrations (Shopify, YouCan, Google Sheets, Yalidine, Chargily).

This document is written so you can **read it almost word-for-word in a demo video**.

---

## 1. The 20-second pitch

> "In COD e-commerce, most orders come in from a storefront, a landing page, or even a
> Google Sheet — and someone has to *call every customer to confirm* before shipping.
> Ordera is the system that runs that whole pipeline: it pulls orders in from every
> source, gives agents a fast 'call cockpit' to confirm them, pushes confirmed orders to
> the delivery company, tracks them to delivery, and gives the owner live analytics on
> money, confirmation rate and returns."

That is exactly the problem in your job post — a customer order system with COD checkout,
product management, e-commerce integrations, and orders flowing to/from Google Sheets.

---

## 2. How Ordera maps to your requirements

| Your requirement | Where it lives in Ordera |
|---|---|
| **Modern, professional, responsive website** | Public landing page + full merchant app (React + Tailwind, mobile-friendly) |
| **Product pages & product management** | *Produits & Stock*: catalog, SKUs, price, live stock, reservations, low-stock alerts, CSV import/export, immutable stock ledger |
| **E-commerce functionality** | Multi-store catalog + orders + inventory + checkout via connected storefronts (Shopify / YouCan) |
| **Customer order system** | Orders table + order detail + customer profiles & history + the *Cockpit* confirmation flow |
| **Cash-on-delivery checkout** | COD totals on every order, the confirmation cockpit, and COD shipping to Yalidine |
| **Orders automatically registered in Google Sheets** | Google Sheets connector (auto-sync every 15 min) **+** outbound webhooks that push each new order to a Sheet (via Apps Script) |
| **API integrations** | YouCan (OAuth + webhooks), Shopify, Yalidine (shipping), Chargily (payments), generic Webhook/Form sources, **public API keys** and **outbound webhooks** for developers |
| **Clean & scalable development** | Multi-tenant Postgres with Row-Level Security, transactional outbox, idempotency keys, separate API/worker/scheduler processes, Docker images, 29 DB migrations, automated tests, monitoring & encrypted backups |

**On Google Sheets specifically:** Ordera does this in *both* directions — it can treat a
Google Sheet as an order **source** (a "Landing Ramadan" sheet syncing every 15 minutes in
the demo), and its **outbound-webhook** engine can register each incoming order **into** a
Google Sheet automatically. That is the exact "orders → Google Sheets" flow you asked for,
plus the harder two-way version.

---

## 3. Tech stack (what to say when they ask "what did you build it with")

**Frontend**
- React 18 + TypeScript, Vite 6 build
- Tailwind CSS 4 (design system, fully responsive)
- TanStack Query (server state / caching), React Router 7, Zustand (local state)
- Recharts (analytics charts), Lucide icons
- Sentry error monitoring + error boundary

**Backend**
- NestJS 11 running on Fastify 5 (high-performance Node)
- PostgreSQL 17 with **Row-Level Security** for hard multi-tenant isolation
- Argon2 password hashing, opaque server sessions, CSRF-origin checks
- Zod schema validation on every input, RFC 9457 problem responses
- BullMQ + Redis for job queues (with a Postgres durable-lease fallback)
- Server-Sent Events (SSE) for realtime UI updates
- OpenTelemetry tracing + Sentry
- **118 REST endpoints**, **61 tables**, **29 versioned migrations**

**Integrations & infra**
- YouCan OAuth 2.0 + REST Hook webhooks; Shopify webhooks; Google Sheets sync;
  Yalidine shipping/COD; Chargily payments
- AES-256-GCM encryption for all stored third-party credentials
- Docker multi-stage images (API, web, backup) running non-root, read-only filesystem
- Prometheus metrics, alert rules, age-encrypted Postgres backups + restore drills

---

## 4. Screen-by-screen walkthrough (this is your video script)

Screenshots are in `apps/screenshots/`. Follow this order on camera:

1. **Landing page** (`01-landing.png`) — "This is the marketing site. Clean, responsive,
   explains the value prop: connect your stores once, confirm orders forever. Notice the
   supported channels: Shopify, YouCan, WooCommerce, Google Sheets."

2. **Sign in / Sign up** (`02-login.png`, `03-signup.png`) — "Secure merchant login.
   Sign-up creates a workspace and verifies the owner's phone by one-time code (OTP).
   Note the Algerian +213 phone field."

3. **Dashboard** (`04-dashboard.png`) — "The owner's home. Live KPIs — orders to confirm,
   revenue in dinars, confirmation queue, team performance, activity feed. Everything is
   real data from the API."

4. **Orders** (`05-orders.png`) — "Every order from every channel lands in one table —
   searchable, filterable, with status, courier, COD total. This is the single source of
   truth."

5. **Cockpit** (`06-cockpit.png`) — *(the star of the demo)* "This is the confirmation
   call-center. The agent gets one order at a time with the customer's phone, address and
   COD total. One keypress to Confirm, mark No-answer, schedule a Callback, or open
   WhatsApp. This is what turns an unconfirmed order into a shippable one — the core of COD."

6. **Products & Stock** (`07-products.png`) — "Product management: SKUs, price, live
   available stock, reservations, low-stock alerts, CSV import/export. Stock is reserved the
   moment an order is confirmed, so you never oversell."

7. **Customers** (`08-customers.png`) — "Customer directory with order history — so agents
   see if a caller is a repeat buyer or a serial no-show."

8. **Shipments** (`09-shipments.png`) — "Confirmed orders become shipments sent to the
   courier (Yalidine). We track each parcel's status all the way to delivered / returned."

9. **Analytics** (`10-analytics.png`) — "Business intelligence: revenue, confirmation rate,
   delivery rate, return rate, best products, best wilayas, best hours to call, cancellation
   reasons. This is how the owner runs the business."

10. **Stores / Boutiques** (`11-stores.png`) — *(key for your job post)* "Integrations. Each
    connected source pours orders into the same queue — here you can see **Shopify**,
    **YouCan**, a **Google Sheet** syncing every 15 minutes, and a **TikTok landing-page
    webhook**. New sources connect in a click."

11. **Imports** (`12-imports.png`) — "Bulk import: upload a CSV/XLSX (or the provided
    template), we preview, validate, normalise Algerian phone numbers & wilayas, and
    de-duplicate before creating orders."

12. **Delivery, Notifications, Settings** (`13`, `14`, `15`) — "Courier connections,
    operational alerts (dead jobs, stale tracking, low stock), team & workspace settings
    with role-based permissions."

**Backend proof shot:** in the terminal show the API running on `http://127.0.0.1:3000`
and hit `http://127.0.0.1:3000/health/ready` → `{"status":"ready","database":"ok"}`. Then
mention: "The frontend you just saw is backed by this API — 118 endpoints, multi-tenant,
with background workers confirming, shipping and syncing on their own."

---

## 5. Engineering highlights (say these to sound senior)

- **Multi-tenant by design** — Postgres Row-Level Security means one merchant can *never*
  see another's data, even if application code has a bug.
- **Idempotent & crash-safe** — every mutation takes an idempotency key; a transactional
  **outbox** guarantees no event is lost if a process dies mid-write.
- **Separate API / worker / scheduler processes** — the web API stays fast while heavy work
  (syncing stores, creating shipments, exports) runs in the background and scales
  independently.
- **Encrypted secrets** — store tokens and webhook secrets are AES-256-GCM encrypted at rest.
- **Operable in production** — health checks, Prometheus metrics + alerts, structured logs,
  encrypted database backups with tested restore drills, Docker images that run non-root
  with a read-only filesystem.

---

## 6. How it's running right now (for recording)

- **Frontend (populated demo):** http://localhost:5173  — runs in *mock mode* so every
  screen is full of realistic data (best for the video). Set via `web/.env.local`
  (`VITE_DATA_SOURCE=mock`).
- **Backend API (live):** http://127.0.0.1:3000 — real NestJS API + worker + scheduler,
  connected to PostgreSQL. Health: `/health/ready`.
- To point the frontend at the **live** API instead of mock data, set
  `web/.env.local` → `VITE_DATA_SOURCE=api` and `VITE_API_BASE_URL=http://127.0.0.1:3000/v1`
  (note: the live database starts empty, so mock mode is better for a visual demo).

---

## 7. One-paragraph version (for the email to the client)

> *Ordera is a full-stack cash-on-delivery order-automation platform I built end to end:
> a responsive marketing site and merchant web app (React + TypeScript + Tailwind) on top
> of a NestJS/PostgreSQL API with 118 endpoints, background workers, and a proper
> multi-tenant, Row-Level-Security architecture. It ingests orders from Shopify, YouCan,
> Google Sheets and custom landing-page webhooks, lets agents confirm COD orders in a fast
> call "cockpit", manages products and live stock, pushes confirmed orders to the Yalidine
> courier, and reports revenue, confirmation and return rates in real time. It covers every
> item on your list — product management, e-commerce, a customer order system, COD checkout,
> orders synced to/from Google Sheets, and clean, scalable API integrations.*
