// Controllo del sito bilingue già costruito: node scripts/i18n-check.mjs [cartella out]
// Verifica link interni, lingua di ogni pagina, canonical, hreflang reciproci e parole italiane rimaste nelle pagine inglesi.
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const root = process.argv[2] || "out";
const pages = new Map();
(function walk(dir) {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) walk(p);
    else if (f === "index.html") pages.set("/" + relative(root, p).replace(/index\.html$/, ""), readFileSync(p, "utf8"));
  }
})(root);

const dec = (s) => s.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#x27;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
const localeOf = (url) => (url.startsWith("/en/") ? "en" : "it");
const origin = (html) => (html.match(/<link rel="canonical" href="(https?:\/\/[^/"]+)/) || [])[1] || "";
const problems = [];
const add = (url, msg) => problems.push(`${url}: ${msg}`);

// Parole italiane comuni: se compaiono nel testo visibile di una pagina inglese, vanno riviste a mano.
const italian = /(?<![\w'’-])(il|lo|gli|della|dello|delle|degli|nella|nelle|sulla|per il|con il|che|sono|anche|più|già|così|perché|quando|prenota|prenotazioni?|ordini|locale|locali|gratis|menu del|clienti|cliente|tavolo|tavoli|giorno|giorni|oggi|domani|sera|ritiro|asporto|esaurito|piatti?|prezzi?|scopri|vedi|tutti|tutte|ogni|senza|ancora|subito|pranzo|cena|colazione|settimana|mese|anno|sabato|domenica|lunedì|martedì|mercoledì|giovedì|venerdì)(?![\w'’-])/gi;
// Parole italiane ammesse nelle pagine inglesi: nomi propri, piatti e prodotti lasciati in italiano di proposito.
const allowed = /Pizzeria da Mario|Trattoria del Borgo|Trattoria Il Glicine|Caffè Centrale|Gastronomia Vercelli|Pastificio Gallo|Gelateria Polo Nord|Forno San Guido|Agnolotti del plin|Tajarin al ragù|Brasato al Barolo|Vitello tonnato|Tonnarelli cacio e pepe|Ravioli di magro|Focaccia genovese|Bufala e crudo|stracciatella di burrata|fior di latte|Negroni sbagliato|Garante per la protezione dei dati personali|Registro pubblico delle opposizioni|assistenza-tenant, cliente|Olive ascolane|Bollito misto|\[Ragione sociale\]|\[Indirizzo della sede\]|\[Partita IVA\]|menu_pizzeria|menu\.yourvenue|del Borgo|di burrata|del plin|al ragù|al Barolo|Il Glicine|da Mario|cacio e pepe|di magro/gi;

for (const [url, html] of pages) {
  if (url.startsWith("/404") || url === "/en/404/") continue;
  const locale = localeOf(url);
  const base = origin(html);
  const lang = (html.match(/<html[^>]* lang="([^"]+)"/) || [])[1];
  if (lang !== locale) add(url, `lang="${lang}" ma la pagina è ${locale}`);
  if (!/<title>[^<]+<\/title>/.test(html)) add(url, "title mancante");
  if (!/<meta name="description" content="[^"]+"/.test(html)) add(url, "description mancante");
  const canonical = (html.match(/<link rel="canonical" href="([^"]*)"/) || [])[1] || "";
  if (canonical !== base + url) add(url, `canonical ${canonical} non punta alla pagina stessa`);
  const alts = Object.fromEntries([...html.matchAll(/<link rel="alternate" hrefLang="([^"]+)" href="([^"]+)"/gi)].map((m) => [m[1], m[2].replace(base, "")]));
  for (const k of ["it", "en", "x-default"]) if (!alts[k]) add(url, `hreflang ${k} mancante`);
  if (alts[locale] && alts[locale] !== url) add(url, `hreflang ${locale} punta a ${alts[locale]}`);
  if (alts["x-default"] && alts["x-default"] !== alts.it) add(url, "x-default non punta all'italiano");
  const other = locale === "it" ? "en" : "it";
  const twin = pages.get(alts[other]);
  if (alts[other] && !twin) add(url, `la versione ${other} ${alts[other]} non esiste`);
  if (twin && !new RegExp(`<link rel="alternate" hrefLang="${locale}" href="${base}${url.replace(/[[\]]/g, "\\$&")}"`, "i").test(twin)) add(url, `la versione ${other} non rimanda a questa pagina`);
  const ogLocale = (html.match(/<meta property="og:locale" content="([^"]+)"/) || [])[1];
  if (ogLocale !== (locale === "it" ? "it_IT" : "en_GB")) add(url, `og:locale ${ogLocale}`);
  const ogUrl = (html.match(/<meta property="og:url" content="([^"]+)"/) || [])[1];
  if (ogUrl !== base + url) add(url, `og:url ${ogUrl}`);

  // link interni
  const body = html.split("<body")[1] || "";
  for (const m of body.matchAll(/<a\b([^>]*)>/g)) {
    const attrs = m[1];
    const href = dec((attrs.match(/ href="([^"]*)"/) || [])[1] || "");
    if (!href.startsWith("/") || href.startsWith("//")) continue;
    const path = href.split("#")[0].split("?")[0];
    const target = path.endsWith("/") ? path : path + "/";
    const isSwitch = / hrefLang="/i.test(attrs);
    if (!pages.has(target) && !existsSync(join(root, path))) add(url, `link rotto ${href}`);
    if (!isSwitch && localeOf(target) !== locale) add(url, `link verso l'altra lingua ${href}`);
  }

  // parole italiane nelle pagine inglesi
  if (locale === "en") {
    const main = body.replace(/<script\b.*?<\/script>/gs, "").replace(/<style\b.*?<\/style>/gs, "");
    const texts = [...main.matchAll(/>([^<>]+)</g)].map((m) => dec(m[1])).concat([...main.matchAll(/(?:aria-label|alt|placeholder|title)="([^"]*)"/g)].map((m) => dec(m[1])));
    const head = [(html.match(/<title>([^<]*)/) || [])[1] || "", (html.match(/<meta name="description" content="([^"]*)"/) || [])[1] || ""].map(dec);
    for (const t of [...texts, ...head]) {
      const clean = t.replace(allowed, " ");
      const hits = clean.match(italian);
      if (hits) add(url, `italiano? «${t.trim().slice(0, 90)}» (${[...new Set(hits.map((h) => h.toLowerCase()))].join(", ")})`);
    }
  }
}

const unique = [...new Set(problems)];
for (const p of unique) console.log(p);
console.log(`\n${pages.size} pagine controllate, ${unique.length} segnalazioni.`);
process.exit(unique.length ? 1 : 0);
