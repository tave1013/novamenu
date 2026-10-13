// Controllo visivo dei servizi extra con Playwright (usa il Chrome installato).
// Uso: servire la cartella out/ sulla porta 4180 e poi
//      node scripts/qa-servizi-extra.mjs http://localhost:4180
// Salva gli screenshot in qa-servizi-extra/ e segnala i problemi di impaginazione.
import { mkdirSync } from "node:fs";
import { chromium } from "playwright-core";

const base = process.argv[2] || "http://localhost:4180";
const out = "qa-servizi-extra";
mkdirSync(out, { recursive: true });
const browser = await chromium.launch({ channel: "chrome" });
const problems = [];

const open = async (width, height = 900) => {
  const context = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: 1, isMobile: width < 600, hasTouch: width < 600, reducedMotion: "reduce" });
  const page = await context.newPage();
  const go = async (path) => {
    await page.goto(base + path, { waitUntil: "networkidle" });
    // scorre fino in fondo perché compaiano le sezioni animate, poi torna su
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 60)); }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(400);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    if (overflow > 0) problems.push(`${path} a ${width}px: ${overflow}px oltre il bordo`);
  };
  const shot = (name, opts = {}) => page.screenshot({ path: `${out}/${name}.jpg`, type: "jpeg", quality: 75, ...opts });
  const shotOf = async (name, selector) => {
    const el = page.locator(selector).first();
    await el.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await el.screenshot({ path: `${out}/${name}.jpg`, type: "jpeg", quality: 75 });
  };
  return { page, go, shot, shotOf, close: () => context.close() };
};

// Header desktop: voci su una riga, etichetta che non copre le altre voci, menu dentro lo schermo
for (const width of [1024, 1280, 1440]) {
  for (const [lang, path] of [["it", "/"], ["en", "/en/"]]) {
    const { page, go, shot, close } = await open(width);
    await go(path);
    const nav = await page.evaluate(() => {
      const items = [...document.querySelectorAll("header nav > *")].filter((e) => e.getBoundingClientRect().width > 0).map((e) => e.getBoundingClientRect());
      const tops = new Set(items.map((r) => Math.round(r.top + r.height / 2)));
      let overlap = false;
      for (let i = 1; i < items.length; i++) if (items[i].left < items[i - 1].right - 0.5) overlap = true;
      const header = document.querySelector("header");
      return { rows: tops.size, overlap, tall: header.getBoundingClientRect().height, wide: header.scrollWidth > header.clientWidth };
    });
    if (nav.rows > 1 || nav.overlap || nav.wide) problems.push(`header ${lang} a ${width}px: ${JSON.stringify(nav)}`);
    // il menu si apre già al passaggio del mouse: il clic serve solo se non è aperto
    const button = page.locator('button[aria-controls="menu-servizi"]');
    await button.hover();
    await page.waitForTimeout(350);
    if ((await button.getAttribute("aria-expanded")) !== "true") await button.click();
    await page.waitForTimeout(350);
    const box = await page.locator("#menu-servizi").boundingBox();
    if (box.x < 0 || box.x + box.width > width) problems.push(`menu Servizi ${lang} a ${width}px esce dallo schermo: ${Math.round(box.x)}..${Math.round(box.x + box.width)}`);
    const wraps = await page.evaluate(() => {
      const a = [...document.querySelectorAll("#menu-servizi a")].pop();
      return a.getBoundingClientRect().height > 26;
    });
    if (wraps) problems.push(`"Chiedi un preventivo" va a capo (${lang}, ${width}px)`);
    await shot(`header-${width}-servizi-aperto-${lang}`, { clip: { x: 0, y: 0, width, height: 420 } });
    await close();
  }
}

// Menu mobile a 390 px
for (const [lang, path] of [["it", "/"], ["en", "/en/"]]) {
  const { page, go, shot, close } = await open(390, 844);
  await go(path);
  await shot(`mobile-390-barra-chiusa-${lang}`, { clip: { x: 0, y: 0, width: 390, height: 120 } });
  await page.locator("header button[aria-expanded]").last().click();
  await page.waitForTimeout(700);
  await shot(`mobile-390-menu-principale-${lang}`);
  await page.locator("nav button:not([aria-controls])", { hasText: lang === "it" ? "Servizi" : "Services" }).first().click();
  await page.waitForTimeout(700);
  await shot(`mobile-390-menu-servizi-${lang}`);
  await close();
}

// Pagine
const pages = [
  ["home", "/", "/en/"],
  ["foto-e-video", "/servizi/foto-e-video/", "/en/services/photo-and-video/"],
  ["gestione-social", "/servizi/gestione-social/", "/en/services/social-media-management/"],
  ["servizi", "/servizi/", "/en/services/"],
];
for (const width of [1440, 390]) {
  for (const [name, it, en] of pages) {
    for (const [lang, path] of [["it", it], ["en", en]]) {
      const { page, go, shot, shotOf, close } = await open(width, width < 600 ? 844 : 900);
      await go(path);
      if (name === "home") {
        await shotOf(`home-${width}-servizio-foto-${lang}`, lang === "it" ? 'section[aria-label="Foto e video per il tuo locale"]' : 'section[aria-label="Photos and video for your venue"]');
        await shotOf(`home-${width}-perche-esistiamo-${lang}`, lang === "it" ? 'section[aria-label="Al fianco dei piccoli locali"]' : "section:has(.hl):has(img[src*='pasticceria'])");
      } else {
        await shot(`${name}-${width}-intera-${lang}`, { fullPage: true });
      }
      if (name === "gestione-social") {
        // nessun testo fuori dai bordi e righe del piano su una sola riga, accorciate con i puntini
        const bad = await page.evaluate(() => {
          const w = document.documentElement.clientWidth;
          const out = [];
          for (const el of document.querySelectorAll("main p, main h1, main h2, main h3, main li, main span, main a")) {
            const r = el.getBoundingClientRect();
            if (r.width && (r.left < -1 || r.right > w + 1)) out.push(el.textContent.trim().slice(0, 40));
          }
          const rows = [...document.querySelectorAll("li span.truncate")].filter((e) => e.getBoundingClientRect().height > 26).map((e) => "riga a capo: " + e.textContent);
          return [...new Set(out), ...rows];
        });
        for (const b of bad) problems.push(`${path} a ${width}px: ${b}`);
      }
      await close();
    }
  }
}

await browser.close();
console.log(problems.length ? "Problemi:\n" + problems.map((p) => "  " + p).join("\n") : "Nessun problema di impaginazione.");
