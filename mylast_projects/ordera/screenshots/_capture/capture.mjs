// Captures full-page (1440px-wide) portfolio screenshots of the Ordera web app.
// The app runs in mock mode, so every screen is full of realistic demo data.
//
// The merchant app uses an internal-scroll shell (`h-screen overflow-hidden` with
// a scrollable <main>), so a naive Playwright fullPage capture would only grab one
// viewport. We instead measure the real content height, resize the viewport to it,
// and then capture — which also stretches the fixed sidebar to full height.
//
// Usage:  BASE_URL=http://localhost:5173 node capture.mjs
import { chromium } from "playwright";
import path from "node:path";
import { fileURLToPath } from "node:url";

const BASE = (process.env.BASE_URL || "http://localhost:5173").replace(/\/$/, "");
const WIDTH = 1440;
const MIN_H = 900;
const MAX_H = 12000;
const OUT_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const SCREENS = [
  { file: "01-landing.png", path: "/" },
  { file: "02-login.png", path: "/login" },
  { file: "03-signup.png", path: "/signup" },
  { file: "04-dashboard.png", path: "/app", app: true },
  { file: "05-orders.png", path: "/app/orders", app: true, maxRows: 30 },
  { file: "06-cockpit.png", path: "/app/cockpit" },
  { file: "07-products.png", path: "/app/products", app: true },
  { file: "08-customers.png", path: "/app/customers", app: true, maxRows: 30 },
  { file: "09-shipments.png", path: "/app/shipments", app: true },
  { file: "10-analytics.png", path: "/app/analytics", app: true },
  { file: "11-stores.png", path: "/app/stores", app: true },
  { file: "12-imports.png", path: "/app/imports", app: true },
  { file: "13-delivery.png", path: "/app/delivery", app: true },
  { file: "14-notifications.png", path: "/app/notifications", app: true },
  { file: "15-settings.png", path: "/app/settings", app: true },
];

// Runs in the browser. The merchant shell is `h-screen overflow-hidden` with the
// real scrolling happening inside <main> (and sometimes inside a nested wrapper,
// e.g. a table). To let Playwright's fullPage stitch the whole screen, we unlock
// those scroll containers: expand the shell to content height and drop overflow /
// max-height on <main> and any nested vertical scrollers. The fixed sidebar then
// stretches to full height via the flex row's default `align-items: stretch`.
function unlockShell() {
  const main = document.querySelector("main");
  if (!main) return;
  for (let el = main; el && el !== document.body; el = el.parentElement) {
    const s = getComputedStyle(el);
    if (/(auto|scroll)/.test(s.overflowY) || s.overflow === "hidden") el.style.overflow = "visible";
    if (el.classList.contains("h-screen") || s.height === `${window.innerHeight}px`) {
      el.style.height = "auto";
      el.style.minHeight = "100vh";
    }
  }
  main.style.overflow = "visible";
  main.style.height = "auto";
  main.querySelectorAll("*").forEach((node) => {
    const s = getComputedStyle(node);
    if (/(auto|scroll)/.test(s.overflowY) && node.scrollHeight > node.clientHeight + 4) {
      node.style.overflow = "visible";
      node.style.maxHeight = "none";
      node.style.height = "auto";
    }
  });
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function capture() {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: WIDTH, height: MIN_H },
    deviceScaleFactor: 1,
    locale: "fr-FR",
    timezoneId: "Africa/Algiers",
  });
  const page = await context.newPage();

  for (const screen of SCREENS) {
    await page.setViewportSize({ width: WIDTH, height: MIN_H });
    await page.goto(BASE + screen.path, { waitUntil: "load", timeout: 30000 });
    if (screen.app) {
      await page.waitForSelector("main", { timeout: 15000 }).catch(() => {});
    }
    await sleep(1600); // let lazy chunks, mock data and chart animations settle

    // The landing page hides sections below the fold (they carry a `reveal`
    // class = opacity 0) until an IntersectionObserver adds `on`, and animates
    // count-up stats the same way. Scroll through top-to-bottom to fire those
    // observers naturally, then force `on` on anything still hidden as a safety
    // net, before scrolling back to the top for the capture.
    if (!screen.app) {
      const total = await page.evaluate(() => document.documentElement.scrollHeight);
      for (let y = 0; y < total; y += 700) {
        await page.evaluate((yy) => window.scrollTo(0, yy), y);
        await sleep(140);
      }
      await sleep(300);
      await page.evaluate(() => {
        document.querySelectorAll("[data-reveal]").forEach((el) => el.classList.add("on"));
      });
      await sleep(700);
    }

    if (screen.app) {
      await page.evaluate(unlockShell);
      await sleep(600); // reflow + chart re-render at new height
    }
    if (screen.maxRows) {
      // Long data tables (orders/customers) would otherwise show every seeded
      // row. Trim to a healthy slice so the shot reads as a rich table, not a wall.
      await page.evaluate((max) => {
        const tables = [...document.querySelectorAll("main table")];
        const table = tables.sort((a, b) => b.offsetHeight - a.offsetHeight)[0];
        const rows = table?.querySelectorAll("tbody > tr") ?? [];
        rows.forEach((tr, i) => { if (i >= max) tr.remove(); });
      }, screen.maxRows);
      await sleep(200);
    }
    await page.evaluate(() => window.scrollTo(0, 0));

    const outPath = path.join(OUT_DIR, screen.file);
    await page.screenshot({ path: outPath, fullPage: true });
    const dims = await page.evaluate(() => [
      document.documentElement.scrollWidth,
      document.documentElement.scrollHeight,
    ]);
    console.log(`  saved ${screen.file.padEnd(20)} ${dims[0]}x${dims[1]}`);
  }

  await browser.close();
}

capture().then(
  () => console.log("done."),
  (err) => {
    console.error(err);
    process.exit(1);
  },
);
