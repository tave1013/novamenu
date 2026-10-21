// Scansione dei cookie reali (sezione 8 dei documenti legali).
// Apre ogni indirizzo in una finestra pulita e annota cookie, localStorage, sessionStorage e richieste
// verso domini esterni: prima del consenso e, se c'è il banner, dopo "Accetta tutti" e dopo la revoca.
// Uso: node scripts/scansione-cookie.mjs https://novamenu.eu/ https://app.novamenu.eu/ ...
import { chromium } from "playwright-core";

const urls = process.argv.slice(2);
if (!urls.length) {
  console.error("Indica almeno un indirizzo.");
  process.exit(1);
}

const browser = await chromium.launch({ channel: "chrome" });

const durata = (c) => (c.expires === -1 ? "sessione" : `${Math.round((c.expires * 1000 - Date.now()) / 864e5)} giorni`);

async function stato(context, page, label, terzi) {
  const cookies = await context.cookies();
  const storage = await page.evaluate(() => ({
    local: Object.keys(localStorage),
    session: Object.keys(sessionStorage),
  }));
  console.log(`  [${label}]`);
  console.log(`    cookie: ${cookies.length ? "" : "nessuno"}`);
  for (const c of cookies) console.log(`      - ${c.name} (dominio ${c.domain}, ${durata(c)})`);
  console.log(`    localStorage: ${storage.local.join(", ") || "vuoto"}`);
  console.log(`    sessionStorage: ${storage.session.join(", ") || "vuoto"}`);
  console.log(`    richieste a domini esterni: ${[...terzi].join(", ") || "nessuna"}`);
}

for (const url of urls) {
  const host = new URL(url).hostname;
  const context = await browser.newContext();
  const page = await context.newPage();
  const terzi = new Set();
  page.on("request", (r) => {
    const h = new URL(r.url()).hostname;
    if (h !== host && !h.endsWith(`.${host}`) && !r.url().startsWith("data:")) terzi.add(h);
  });
  console.log(`\n${url}`);
  await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });
  await page.waitForTimeout(1500);
  await stato(context, page, "prima del consenso", terzi);

  const banner = page.locator("[data-cookie-banner]");
  if (await banner.count()) {
    terzi.clear();
    await banner.getByRole("button", { name: /^(Accetta tutti|Accept all)$/ }).first().click();
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(3000);
    await stato(context, page, "dopo Accetta tutti", terzi);

    await page.getByRole("button", { name: /^(Preferenze cookie|Cookie preferences)$/ }).first().click();
    await page.locator("[data-cookie-banner]").getByRole("button", { name: /^(Rifiuta|Reject)$|^(Salva le scelte|Save my choices)$/ }).first().waitFor();
    for (const sw of await page.locator('[data-cookie-banner] [role="switch"]:not([disabled])').all()) {
      if ((await sw.getAttribute("aria-checked")) === "true") await sw.click();
    }
    terzi.clear();
    await page.locator("[data-cookie-banner]").getByRole("button", { name: /^(Salva le scelte|Save my choices)$/ }).click();
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(2000);
    await stato(context, page, "dopo la revoca", terzi);
  } else {
    console.log("  (nessun banner dei cookie in pagina)");
  }
  await context.close();
}
await browser.close();
