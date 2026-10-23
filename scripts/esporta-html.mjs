// Ricrea la cartella out/ (una index.html per pagina, come il vecchio export statico) a partire dal build
// di Next in .next/, così i controlli (i18n-check, seo-check, qa-lingue) continuano a funzionare.
// Uso: next build && node scripts/esporta-html.mjs
import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync } from "node:fs";
import { dirname, join, relative } from "node:path";

const app = ".next/server/app";
const out = "out";
rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });

let n = 0;
(function walk(dir) {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) {
      if (!/^\(.*\)$/.test(f)) walk(p);
      continue;
    }
    const rel = relative(app, p);
    let dest = null;
    if (rel === "index.html") dest = join(out, "index.html");
    else if (f.endsWith(".html") && !rel.startsWith("_")) dest = join(out, rel.replace(/\.html$/, ""), "index.html");
    else if (f.endsWith(".body")) dest = join(out, rel.replace(/\.body$/, "").replace(/\/route$/, ""));
    if (!dest) continue;
    // pagine nascoste finché mancano i dati (per esempio "Richieste privacy"): rispondono 404, non sono pagine del sito
    const meta = p.replace(/\.(html|body)$/, ".meta");
    if (existsSync(meta) && JSON.parse(readFileSync(meta, "utf8")).status === 404) continue;
    mkdirSync(dirname(dest), { recursive: true });
    cpSync(p, dest);
    n++;
  }
})(app);

if (existsSync("public")) cpSync("public", out, { recursive: true });
cpSync(".next/static", join(out, "_next/static"), { recursive: true });
if (existsSync(join(app, "_not-found.html"))) cpSync(join(app, "_not-found.html"), join(out, "404.html"));
console.log(`${n} file copiati in ${out}/`);
