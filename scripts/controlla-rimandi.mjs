// Controlla i rimandi interni dei documenti legali (src/content/legale/<lingua>/*.md):
// - "articolo 19.3", "art. 6.5", "articoli 10, 12.3 o 15", "punto 9", "section 9", "clause 6.5";
// - i link /legale/<documento>/#N e /en/legal/<document>/#N.
// Per ogni rimando dice se il punto esiste e ne stampa il titolo, così si controlla anche il senso.
// Non segnala i rimandi a leggi (GDPR, Codice civile...), riconosciuti dalle parole intorno.
// Uso: node scripts/controlla-rimandi.mjs [--tutti]   (senza --tutti stampa solo gli errori)
import { readFileSync, readdirSync } from "node:fs";

const tutti = process.argv.includes("--tutti");
const cartella = "src/content/legale";
const enSlug = { "note-legali": "legal-notice", privacy: "privacy", "privacy-app": "app-privacy", cookie: "cookies", termini: "terms", dpa: "dpa", "sub-responsabili": "sub-processors" };
const daSlugEn = Object.fromEntries(Object.entries(enSlug).map(([k, v]) => [v, k]));

function struttura(testo) {
  const corpo = testo.replace(/<!--[\s\S]*?-->/g, "").replace(/\{\{#se \w+\}\}|\{\{\/se\}\}/g, "");
  const sezioni = new Map();
  const clausole = new Map();
  for (const riga of corpo.split("\n")) {
    const h = riga.match(/^##\s+(\d+)\.\s+(.*)$/);
    if (h) sezioni.set(h[1], h[2].trim());
    const c = riga.match(/^(\d+\.\d+)\.\s+(.{0,70})/);
    if (c) clausole.set(c[1], c[2]);
    const a = riga.match(/^##\s+(Allegato|Annex)\s+(\d+)/i);
    if (a) sezioni.set(`A${a[2]}`, riga.replace(/^##\s+/, ""));
  }
  return { corpo, sezioni, clausole };
}

let errori = 0;
for (const lingua of ["it", "en"]) {
  const docs = Object.fromEntries(
    readdirSync(`${cartella}/${lingua}`).filter((f) => f.endsWith(".md")).map((f) => [f.replace(/\.md$/, ""), struttura(readFileSync(`${cartella}/${lingua}/${f}`, "utf8"))]),
  );
  for (const [nome, d] of Object.entries(docs)) {
    const righe = d.corpo.split("\n");
    righe.forEach((riga, i) => {
      const dove = `${lingua}/${nome}.md:${i + 1}`;
      // 1. link ad altri documenti con ancora numerica
      for (const m of riga.matchAll(/\]\((\/en\/legal|\/legale)\/([a-z-]+)\/#([\w-]+)\)/g)) {
        const doc = m[1] === "/legale" ? m[2] : daSlugEn[m[2]];
        const t = docs[doc];
        const titolo = t?.sezioni.get(m[3]);
        if (!titolo) errori++;
        if (!titolo || tutti) console.log(`${titolo ? "ok " : "ERR"} ${dove}  link ${doc}#${m[3]} -> ${titolo ?? "NON ESISTE"}`);
      }
      // 1b. "[Informativa privacy](/legale/privacy/) (punti 11, 13 e 14)": punti di un altro documento
      for (const m of riga.matchAll(/\]\((\/en\/legal|\/legale)\/([a-z-]+)\/\)\s*\((?:punt[oi]|sections?)\s+([^)]*)\)/gi)) {
        const doc = m[1] === "/legale" ? m[2] : daSlugEn[m[2]];
        for (const n of m[3].matchAll(/\d+/g)) {
          const titolo = docs[doc]?.sezioni.get(n[0]);
          if (!titolo) errori++;
          if (!titolo || tutti) console.log(`${titolo ? "ok " : "ERR"} ${dove}  ${doc} punto ${n[0]} -> ${titolo ?? "NON ESISTE"}`);
        }
      }
      // 2. rimandi nel testo allo stesso documento
      const re = /\b(articol[oi]|art\.|punt[oi]|clauses?|sections?|paragraphs?|Annex|Allegato)\s+((?:\d+(?:\.\d+)?(?:\s*\([a-z]\))?(?:,\s*|\s+(?:e|o|and|or)\s+)?)+)/gi;
      for (const m of riga.matchAll(re)) {
        const dopo = riga.slice(m.index + m[0].length, m.index + m[0].length + 60);
        const prima = riga.slice(Math.max(0, m.index - 40), m.index);
        // rimandi a leggi o ad altri documenti: si riconoscono dalle parole vicine
        if (/^\s*(del|della|dello|dei|delle|di|GDPR|UK|of|the|del Regolamento|Codice|c\.c\.|D\.Lgs|Regulation|Data|DPA|dei Termini|of the Terms|of the DPA|del DPA|Codice civile|Civil)/i.test(dopo) && !/^\s*(di questi Termini|of these Terms|di questo|of this)/i.test(dopo)) continue;
        if (/(GDPR|Regolamento|Regulation|Codice|Code|legge|law)\s*$/i.test(prima)) continue;
        if (/(Informativa privacy|Privacy notice)[^.]*\($/i.test(prima)) continue;
        const allegato = /annex|allegato/i.test(m[1]);
        // nei documenti senza clausole numerate (privacy, cookie...) "art." e "articolo" sono sempre articoli di legge
        if (/^art/i.test(m[1]) && d.clausole.size === 0) continue;
        // "art. 6.1.b": lettera dopo il numero, è un articolo di legge
        if (/^\.[a-z]\b/i.test(dopo)) continue;
        // "articoli 44-49 GDPR", "contratti art. 28 con i sub-responsabili"
        if (/^-\d+\s*(GDPR|UK)/.test(dopo) || /^\s*con i sub|^\s*contracts|^\s*with (the )?sub/i.test(dopo)) continue;
        for (const n of m[2].matchAll(/\d+(?:\.\d+)?/g)) {
          const k = n[0];
          const titolo = allegato ? d.sezioni.get(`A${k}`) : k.includes(".") ? d.clausole.get(k) : d.sezioni.get(k);
          if (!titolo) errori++;
          if (!titolo || tutti) console.log(`${titolo ? "ok " : "ERR"} ${dove}  ${m[1]} ${k} -> ${titolo ?? "NON ESISTE"}`);
        }
      }
    });
  }
}
console.log(errori ? `\n${errori} rimandi da controllare.` : "\nNessun rimando rotto.");
process.exitCode = errori ? 1 : 0;
