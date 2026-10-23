import fs from "node:fs";
import path from "node:path";
import { Marked } from "marked";
import { VERSIONI, dataLunga, inVigoreDal, segnapostoAzienda, type DocumentoVersionato } from "./azienda";
import { tabellaCookieHtml } from "@/lib/consenso/cookie";
import { tabellaFornitoriHtml } from "@/content/legale/fornitori";
import { fornitoriPubblicati, richiestePrivacyAttive, strumentiAttivi } from "./visibilita";

/** "A", "A e B", "A, B e C" (in inglese "and"). */
const elenco = (voci: string[], lingua: Lingua) => (voci.length < 2 ? voci.join("") : `${voci.slice(0, -1).join(", ")} ${lingua === "en" ? "and" : "e"} ${voci.at(-1)}`);

/** Valori che dipendono da cosa è attivo: strumenti collegati, pagine pubblicate. null = non c'è. */
function valoriAttivi(lingua: Lingua): Record<string, string | null> {
  const st = strumentiAttivi();
  const statistica = [st.ga4 && "Google Analytics 4", st.clarity && "Microsoft Clarity"].filter(Boolean) as string[];
  const tutti = [...statistica, ...(st.metaPixel ? ["Meta Pixel"] : [])];
  const si = lingua === "en" ? "yes" : "sì";
  return {
    ga4: st.ga4 ? si : null,
    clarity: st.clarity ? si : null,
    metaPixel: st.metaPixel ? si : null,
    strumentiStatistica: statistica.length ? elenco(statistica, lingua) : null,
    strumentiSito: tutti.length ? elenco(tutti, lingua) : null,
    fornitori: fornitoriPubblicati() ? si : null,
    tabellaFornitori: fornitoriPubblicati() ? tabellaFornitoriHtml(lingua) : null,
    richiestePrivacy: richiestePrivacyAttive() ? si : null,
  };
}

/*
 * Documenti legali: file Markdown versionati in src/content/legale/<lingua>/<documento>.md.
 * In testa a ogni file: titolo, etichetta (nome breve per gli elenchi) e descrizione (SEO).
 * Versione e data in vigore stanno in azienda.ts (VERSIONI), uguali per pagine, PDF e piattaforma.
 * I segnaposto {{nome}} leggono i dati della società da azienda.ts;
 * {{tabellaCookie}} inserisce la tabella dei cookie condivisa con il banner.
 * Le parti che dipendono da un dato che può mancare stanno dentro {{#se nome}} ... {{/se}}
 * (o {{#senza nome}} ... {{/senza}} per il testo alternativo): se il dato manca spariscono intere,
 * anche le righe che restano vuote. Un {{nome}} senza dato fuori da {{#se}} ferma il build.
 * Quando un documento cambia, la versione sale e la copia precedente va in
 * src/content/legale/archivio/<lingua>/<documento>-<versione>.md (vedi la pagina /legale/archivio/).
 * Si legge solo durante la generazione delle pagine (componenti server).
 */
export const DOCUMENTI = ["note-legali", "privacy", "privacy-app", "cookie", "termini", "dpa", "fornitori"] as const;
export type IdDocumento = (typeof DOCUMENTI)[number];
/** Documenti con una pagina pubblicata: "Fornitori" solo quando c'è l'elenco della piattaforma. */
export const documentiVisibili = (): IdDocumento[] => DOCUMENTI.filter((d) => d !== "fornitori" || fornitoriPubblicati());
type Lingua = "it" | "en";

export type MetaDocumento = {
  titolo: string;
  etichetta: string;
  descrizione: string;
  versione: string;
  /** Data in vigore già scritta per esteso ("1 dicembre 2026"), oppure null se non c'è ancora. */
  dataInVigore: string | null;
  /** Solo per le versioni archiviate: fino a quando sono state in vigore. */
  dataFine?: string | null;
};
export type Documento = { id: IdDocumento | "indice"; meta: MetaDocumento; html: string; sezioni: { id: string; titolo: string }[] };

const cartella = path.join(process.cwd(), "src/content/legale");

const SEGNO = "\u0000";

function riempi(testo: string, lingua: Lingua, origine: string): string {
  const valori: Record<string, string | null> = {
    ...segnapostoAzienda(lingua),
    ...valoriAttivi(lingua),
    tabellaCookie: `<div class="table-scroll">${tabellaCookieHtml(lingua)}</div>`,
  };
  const presente = (k: string) => {
    if (!(k in valori)) throw new Error(`${origine}: {{#se ${k}}} usa un dato che non esiste in azienda.ts`);
    return valori[k] != null && valori[k] !== "";
  };
  // Blocchi condizionali, dal più interno. Al posto dei tag resta un segno: le righe fatte solo di segni si tolgono.
  const blocco = /\{\{#(se|senza) ([\w ]+)\}\}((?:(?!\{\{#(?:se|senza) )[\s\S])*?)\{\{\/\1\}\}/;
  let t = testo;
  for (let m = t.match(blocco); m; m = t.match(blocco)) {
    const tutti = m[2].trim().split(/\s+/).every(presente);
    const mostra = m[1] === "se" ? tutti : !tutti;
    t = t.slice(0, m.index) + (mostra ? SEGNO + m[3] + SEGNO : SEGNO) + t.slice(m.index! + m[0].length);
  }
  t = t
    .split("\n")
    .filter((riga) => !(riga.includes(SEGNO) && riga.replaceAll(SEGNO, "").trim() === ""))
    .join("\n")
    .replaceAll(SEGNO, "");
  return t.replace(/\{\{(\w+)\}\}/g, (_m, k: string) => {
    if (!(k in valori)) throw new Error(`${origine}: il segnaposto {{${k}}} non esiste in azienda.ts`);
    const v = valori[k];
    if (v == null || v === "") throw new Error(`${origine}: {{${k}}} non ha ancora un valore in azienda.ts: mettilo dentro {{#se ${k}}} ... {{/se}}`);
    return v;
  });
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

/**
 * Testo Markdown di un documento con i segnaposto già riempiti, e i suoi metadati. Serve anche ai PDF.
 * Per i documenti in vigore versione e data vengono da azienda.ts; per quelli archiviati dalla loro intestazione.
 */
export function leggiSorgente(percorso: string, lingua: Lingua, documento?: DocumentoVersionato): { meta: MetaDocumento; markdown: string } {
  const { dati, corpo } = frontmatter(fs.readFileSync(percorso, "utf8"));
  const origine = path.relative(process.cwd(), percorso);
  const data = (iso: string | null | undefined) => (iso ? dataLunga(iso, lingua) : null);
  return {
    meta: {
      titolo: riempi(dati.titolo ?? "", lingua, origine),
      etichetta: riempi(dati.etichetta ?? dati.titolo ?? "", lingua, origine),
      descrizione: riempi(dati.descrizione ?? "", lingua, origine),
      versione: documento ? VERSIONI[documento].versione : (dati.versione ?? ""),
      dataInVigore: documento ? data(inVigoreDal(documento)) : data(dati.inVigoreDal),
      dataFine: documento ? null : data(dati.inVigoreFinoAl),
    },
    // i commenti <!-- ... --> sono note per chi modifica i testi: non vanno né nella pagina né nel PDF
    markdown: riempi(corpo.replace(/<!--[\s\S]*?-->/g, ""), lingua, origine),
  };
}

export const percorsoDocumento = (id: IdDocumento | "indice", lingua: Lingua) => path.join(cartella, lingua, `${id}.md`);

export function leggiDocumento(id: IdDocumento | "indice", lingua: Lingua): Documento {
  const { meta, markdown } = leggiSorgente(percorsoDocumento(id, lingua), lingua, id);
  const { html, sezioni } = rendiMarkdown(markdown);
  return { id, meta, html, sezioni };
}

/** Versioni precedenti archiviate: src/content/legale/archivio/<lingua>/<documento>-<versione>.md */
export function versioniArchiviate(lingua: Lingua): { file: string; percorso: string; documento: string; versione: string; meta: MetaDocumento }[] {
  const dir = path.join(cartella, "archivio", lingua);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => {
      const percorso = path.join(dir, f);
      const { meta } = leggiSorgente(percorso, lingua);
      const m = f.replace(/\.md$/, "").match(/^(.*)-(\d+(?:\.\d+)*)$/);
      return { file: f, percorso, documento: m?.[1] ?? f, versione: m?.[2] ?? meta.versione, meta };
    });
}

/** Una versione archiviata, già pronta da mostrare: "privacy-1.0" -> documento, metadati e testo. */
export function leggiArchiviato(file: string, lingua: Lingua): { documento: IdDocumento; meta: MetaDocumento; html: string } | null {
  const v = versioniArchiviate(lingua).find((x) => x.file === `${file}.md`);
  if (!v || !(DOCUMENTI as readonly string[]).includes(v.documento)) return null;
  const { meta, markdown } = leggiSorgente(v.percorso, lingua);
  return { documento: v.documento as IdDocumento, meta, html: rendiMarkdown(markdown).html };
}
