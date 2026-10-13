// Raccoglie tutti i testi dell'interfaccia usati con tr("...") e t(lingua, "...") e aggiorna
// l'elenco in src/i18n/dictionaries/it.ts. Poi TypeScript segnala i testi che mancano negli altri dizionari.
// Uso: node scripts/i18n-extract.mjs
import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import ts from "typescript";

const files = [];
(function walk(dir) {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) walk(p);
    else if (/\.tsx?$/.test(f) && !p.includes("i18n/dictionaries")) files.push(p);
  }
})("src");

const keys = new Set();
for (const f of files) {
  const sf = ts.createSourceFile(f, readFileSync(f, "utf8"), ts.ScriptTarget.Latest, true, f.endsWith("x") ? ts.ScriptKind.TSX : ts.ScriptKind.TS);
  (function visit(n) {
    if (ts.isCallExpression(n) && ts.isIdentifier(n.expression)) {
      const name = n.expression.text;
      const arg = name === "tr" || name === "msg" ? n.arguments[0] : name === "t" ? n.arguments[1] : undefined;
      if (arg && (ts.isStringLiteral(arg) || ts.isNoSubstitutionTemplateLiteral(arg))) keys.add(arg.text);
    }
    ts.forEachChild(n, visit);
  })(sf);
}

const list = [...keys].sort((a, b) => a.localeCompare(b, "it"));
const out =
  "/*\n * Testi dell'interfaccia in italiano, la lingua di partenza.\n * Questo elenco è generato da scripts/i18n-extract.mjs: non modificarlo a mano.\n * Ogni altro dizionario deve tradurre tutte queste voci, altrimenti il build si ferma.\n */\n" +
  "export const it = [\n" + list.map((k) => `  ${JSON.stringify(k)},`).join("\n") + "\n] as const;\n\nexport type MessageKey = (typeof it)[number];\n";
writeFileSync("src/i18n/dictionaries/it.ts", out);
console.log(`${list.length} testi in src/i18n/dictionaries/it.ts`);
