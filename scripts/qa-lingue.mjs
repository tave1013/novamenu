// Controllo visivo del sito bilingue con Playwright (usa il Chrome installato, senza scaricare altri browser).
// Uso: servire la cartella out/ (per esempio: npx serve out -l 4180) e poi
//      node scripts/qa-lingue.mjs http://localhost:4180
// Salva gli screenshot in qa-lingue/ e segnala le pagine con scorrimento orizzontale.
import { mkdirSync } from "node:fs";
import { chromium } from "playwright-core";

const base = process.argv[2] || "http://localhost:4180";
const out = "qa-lingue";
mkdirSync(out, { recursive: true });

// Un esempio per ogni tipo di pagina, nelle due lingue.
const pages = [
  ["home", "/", "/en/"],
  ["funzionalita", "/funzionalita/", "/en/features/"],
  ["funzionalita-scheda", "/funzionalita/ordini-whatsapp/", "/en/features/whatsapp-orders/"],
  ["settori", "/settori/", "/en/industries/"],
  ["settori-scheda", "/settori/pizzerie/", "/en/industries/pizzerias/"],
  ["servizi", "/servizi/", "/en/services/"],
  ["servizi-foto", "/servizi/foto-e-video/", "/en/services/photo-and-video/"],
  ["servizi-presenza", "/servizi/presenza-online/", "/en/services/online-presence/"],
  ["prezzi", "/prezzi/", "/en/pricing/"],
  ["guide", "/guide/", "/en/guides/"],
  ["guide-articolo", "/guide/pizzeria-ore-perse-al-telefono/", "/en/guides/pizzeria-hours-lost-on-the-phone/"],
  ["contatti", "/contatti/", "/en/contact/"],
  ["demo", "/demo/", "/en/demo/"],
  ["legale", "/legale/", "/en/legal/"],
  ["legale-privacy", "/legale/privacy/", "/en/legal/privacy/"],
  ["legale-cookie", "/legale/cookie/", "/en/legal/cookies/"],
  ["legale-termini", "/legale/termini/", "/en/legal/terms/"],
  ["legale-sub", "/legale/sub-responsabili/", "/en/legal/sub-processors/"],
];
const widths = [1440, 375];
const browser = await chromium.launch({ channel: "chrome" });
const problems = [];

for (const width of widths) {
  const context = await browser.newContext({ viewport: { width, height: 900 }, deviceScaleFactor: 1, isMobile: width < 600, hasTouch: width < 600, reducedMotion: "reduce" });
  const page = await context.newPage();
  const shot = (name, fullPage = false) => page.screenshot({ path: `${out}/${name}.jpg`, type: "jpeg", quality: 70, fullPage });

  for (const [name, it, en] of pages) {
    for (const [lang, path] of [["it", it], ["en", en]]) {
      await page.goto(base + path, { waitUntil: "networkidle" });
      // scorre fino in fondo perché compaiano le sezioni animate, poi torna su
      await page.evaluate(async () => {
        for (let y = 0; y < document.body.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 60)); }
        window.scrollTo(0, 0);
      });
      await page.waitForTimeout(400);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      if (overflow > 0) problems.push(`${path} a ${width}px: ${overflow}px oltre il bordo`);
      await shot(`${width}-${name}-${lang}`, true);
    }
  }

  // Header: selettore lingua e menu
  for (const [lang, path] of [["it", "/prezzi/"], ["en", "/en/pricing/"]]) {
    await page.goto(base + path, { waitUntil: "networkidle" });
    if (width >= 1024) {
      await shot(`${width}-header-chiuso-${lang}`);
      await page.locator('button[aria-controls="menu-lingua"]').click();
      await page.waitForTimeout(350);
      await shot(`${width}-selettore-aperto-${lang}`);
      const target = await page.locator("#menu-lingua a:not([aria-current])").getAttribute("href");
      await page.keyboard.press("Escape");
      await page.locator("header nav button").first().click();
      await page.waitForTimeout(350);
      await shot(`${width}-menu-funzionalita-${lang}`);
      console.log(`${lang} ${path}: il selettore porta a ${target}`);
    } else {
      await shot(`${width}-header-chiuso-${lang}`);
      await page.locator('button[aria-controls="menu-mobile"]').click();
      await page.waitForTimeout(400);
      await shot(`${width}-menu-mobile-${lang}`);
      await page.locator('button[aria-controls="menu-lingua-mobile"]').click();
      await page.waitForTimeout(400);
      await shot(`${width}-menu-mobile-lingua-${lang}`);
    }
  }
  await context.close();
}
await browser.close();
console.log(problems.length ? problems.join("\n") : "Nessuna pagina con scorrimento orizzontale.");
