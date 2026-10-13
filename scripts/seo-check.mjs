// Controllo SEO sul sito già costruito: node scripts/seo-check.mjs [cartella out]
// Elenca meta title e description con la lunghezza, conta gli H1, cerca duplicati e valida il JSON-LD.
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const root = process.argv[2] || "out";
const pages = [];
(function walk(dir) {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) walk(p);
    else if (f === "index.html") pages.push(p);
  }
})(root);

const dec = (s) => s.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#x27;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
const meta = (html, attr, name) => {
  const m = html.match(new RegExp(`<meta ${attr}="${name}" content="([^"]*)"`));
  return m ? dec(m[1]) : "";
};

let problems = 0;
const flag = (msg) => { problems++; return ` <-- ${msg}`; };
const seenT = new Map(), seenD = new Map();
const rows = [];

for (const file of pages.sort()) {
  const html = readFileSync(file, "utf8");
  const url = "/" + relative(root, file).replace(/index\.html$/, "");
  if (url.startsWith("/404") || url.startsWith("/_")) continue;
  const title = dec((html.match(/<title>([^<]*)<\/title>/) || [])[1] || "");
  const desc = meta(html, "name", "description");
  const h1 = (html.match(/<h1[\s>]/g) || []).length;
  const canonical = (html.match(/<link rel="canonical" href="([^"]*)"/) || [])[1] || "";
  const og = ["og:title", "og:description", "og:url", "og:image"].filter((k) => !meta(html, "property", k));
  const tw = ["twitter:card", "twitter:title", "twitter:image"].filter((k) => !meta(html, "name", k));
  const types = [];
  let ldError = "";
  for (const m of html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)) {
    try {
      for (const o of [].concat(JSON.parse(m[1]))) {
        if (!o["@context"] || !o["@type"]) ldError = "manca @context o @type";
        types.push(o["@type"]);
      }
    } catch { ldError = "JSON non valido"; }
  }
  const notes = [];
  if (title.length < 50 || title.length > 60) notes.push(flag(`title ${title.length} caratteri`));
  if (desc.length < 140 || desc.length > 158) notes.push(flag(`description ${desc.length} caratteri`));
  if (h1 !== 1) notes.push(flag(`${h1} H1`));
  if (!canonical) notes.push(flag("canonical mancante"));
  if (og.length) notes.push(flag(`Open Graph senza ${og.join(", ")}`));
  if (tw.length) notes.push(flag(`Twitter senza ${tw.join(", ")}`));
  if (ldError) notes.push(flag(`JSON-LD: ${ldError}`));
  if (!/<html[^>]* lang="it"/.test(html)) notes.push(flag("lang diverso da it"));
  if (html.includes("—")) notes.push(flag("contiene una lineetta lunga"));
  if (seenT.has(title)) notes.push(flag(`title uguale a ${seenT.get(title)}`)); else seenT.set(title, url);
  if (seenD.has(desc)) notes.push(flag(`description uguale a ${seenD.get(desc)}`)); else seenD.set(desc, url);
  rows.push({ url, title, desc, types, notes });
}

for (const r of rows) {
  console.log(`\n${r.url}`);
  console.log(`  title (${r.title.length}): ${r.title}`);
  console.log(`  description (${r.desc.length}): ${r.desc}`);
  console.log(`  JSON-LD: ${r.types.join(", ") || "nessuno"}`);
  for (const n of r.notes) console.log(`  ${n}`);
}
console.log(`\n${rows.length} pagine controllate, ${problems} problemi.`);
process.exit(problems ? 1 : 0);
