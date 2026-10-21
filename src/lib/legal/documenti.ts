import fs from "node:fs";
import path from "node:path";
import { Marked } from "marked";
import { segnapostoAzienda } from "./azienda";
import { tabellaCookieHtml } from "@/lib/consenso/cookie";

/*
 * Documenti legali: file Markdown versionati in src/content/legale/<lingua>/<documento>.md.
 * In testa a ogni file: titolo, etichetta (nome breve per gli elenchi), descrizione (SEO),
 * versione e dataInVigore. I segnaposto {{nome}} leggono i dati della società da azienda.ts;
 * {{tabellaCookie}} inserisce la tabella dei cookie condivisa con il banner.
 * Quando un documento cambia, la versione sale e la copia precedente va in
 * src/content/legale/archivio/<lingua>/<documento>-<versione>.md (vedi la pagina /legale/archivio/).
 * Si legge solo durante la generazione delle pagine (componenti server).
 */
export const DOCUMENTI = ["note-legali", "privacy", "privacy-app", "cookie", "termini", "dpa", "sub-responsabili"] as const;
export type IdDocumento = (typeof DOCUMENTI)[number];
type Lingua = "it" | "en";

export type MetaDocumento = { titolo: string; etichetta: string; descrizione: string; versione: string; dataInVigore: string };
export type Documento = { id: IdDocumento | "indice"; meta: MetaDocumento; html: string; sezioni: { id: string; titolo: string }[] };

const cartella = path.join(process.cwd(), "src/content/legale");

function riempi(testo: string, lingua: Lingua): string {
  const valori: Record<string, string> = {
    ...segnapostoAzienda(lingua),
    tabellaCookie: `<div class="table-scroll">${tabellaCookieHtml(lingua)}</div>`,
  };
  return testo.replace(/\{\{(\w+)\}\}/g, (m, k: string) => (k in valori ? valori[k] : m));
}

function frontmatter(raw: string): { dati: Record<string, string>; corpo: string } {
  const m = raw.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!m) return { dati: {}, corpo: raw };
  const dati: Record<string, string> = {};
  for (const riga of m[1].split("\n")) {
    const i = riga.indexOf(":");
    if (i > 0) dati[riga.slice(0, i).trim()] = riga.slice(i + 1).trim().replace(/^"(.*)"$/, "$1");
  }
  return { dati, corpo: raw.slice(m[0].length) };
}

const slug = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/<[^>]+>/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const decodifica = (s: string) =>
  s.replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");

/** Converte il Markdown in HTML: titoli numerati con ancora uguale al numero (#8), tabelle che scorrono su mobile. */
export function rendiMarkdown(md: string): { html: string; sezioni: { id: string; titolo: string }[] } {
  const sezioni: { id: string; titolo: string }[] = [];
  const marked = new Marked({ gfm: true });
  marked.use({
    renderer: {
      heading({ tokens, depth }) {
        let testo = this.parser.parseInline(tokens);
        let id = "";
        const custom = testo.match(/\s*\{#([\w-]+)\}\s*$/);
        if (custom) {
          id = custom[1];
          testo = testo.slice(0, custom.index);
        } else {
          const num = testo.match(/^(\d+)\.\s/);
          id = num ? num[1] : slug(testo);
        }
        if (depth === 2) sezioni.push({ id, titolo: decodifica(testo.replace(/<[^>]+>/g, "")) });
        return `<h${depth} id="${id}">${testo}</h${depth}>\n`;
      },
    },
  });
  const html = (marked.parse(md) as string).replace(/<table>/g, '<div class="table-scroll"><table>').replace(/<\/table>/g, "</table></div>")
    // la tabella dei cookie arriva già avvolta: niente doppio contenitore
    .replace(/<div class="table-scroll"><div class="table-scroll">/g, '<div class="table-scroll">')
    .replace(/<\/table><\/div><\/div>/g, "</table></div>");
  return { html, sezioni };
}

export function leggiDocumento(id: IdDocumento | "indice", lingua: Lingua): Documento {
  const raw = fs.readFileSync(path.join(cartella, lingua, `${id}.md`), "utf8");
  const { dati, corpo } = frontmatter(raw);
  const meta: MetaDocumento = {
    titolo: riempi(dati.titolo ?? "", lingua),
    etichetta: riempi(dati.etichetta ?? dati.titolo ?? "", lingua),
    descrizione: riempi(dati.descrizione ?? "", lingua),
    versione: dati.versione ?? "",
    dataInVigore: riempi(dati.dataInVigore ?? "", lingua),
  };
  const { html, sezioni } = rendiMarkdown(riempi(corpo, lingua));
  return { id, meta, html, sezioni };
}

/** Versioni precedenti archiviate: src/content/legale/archivio/<lingua>/<documento>-<versione>.md */
export function versioniArchiviate(lingua: Lingua): { file: string; documento: string; versione: string; meta: MetaDocumento }[] {
  const dir = path.join(cartella, "archivio", lingua);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => {
      const { dati } = frontmatter(fs.readFileSync(path.join(dir, f), "utf8"));
      const m = f.replace(/\.md$/, "").match(/^(.*)-(\d+(?:\.\d+)*)$/);
      return {
        file: f,
        documento: m?.[1] ?? f,
        versione: m?.[2] ?? dati.versione ?? "",
        meta: { titolo: dati.titolo ?? f, etichetta: dati.etichetta ?? dati.titolo ?? f, descrizione: dati.descrizione ?? "", versione: dati.versione ?? "", dataInVigore: dati.dataInVigore ?? "" },
      };
    });
}
