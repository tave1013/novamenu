import path from "node:path";
import { Document, Font, Link, Page, StyleSheet, Text, View, renderToBuffer } from "@react-pdf/renderer";
import { Lexer, type Token, type Tokens } from "marked";
import { AZIENDA, sedeLegale } from "./azienda";
import { leggiSorgente, percorsoDocumento, versioniArchiviate, type MetaDocumento } from "./documenti";

/*
 * PDF scaricabili dei Termini e del DPA: la copia che il cliente può conservare
 * (art. 12, comma 3, D.Lgs. 70/2003 e reg. 9(3) delle Electronic Commerce Regulations 2002).
 * Si generano a ogni build dagli stessi file Markdown delle pagine, uno per lingua e per versione:
 * quelli delle versioni precedenti arrivano da src/content/legale/archivio/.
 * Indirizzi: /legale/pdf/<file> e /en/legal/pdf/<file>.
 */
type Lingua = "it" | "en";
export type DocumentoPdf = "termini" | "dpa";
export const DOCUMENTI_PDF: DocumentoPdf[] = ["termini", "dpa"];

const NOME: Record<Lingua, Record<DocumentoPdf, string>> = {
  it: { termini: "novamenu-termini", dpa: "novamenu-dpa" },
  en: { termini: "novamenu-terms-of-service", dpa: "novamenu-dpa" },
};

export const nomePdf = (documento: DocumentoPdf, lingua: Lingua, versione: string) => `${NOME[lingua][documento]}-${versione}.pdf`;
export const urlPdf = (documento: DocumentoPdf, lingua: Lingua, versione: string) =>
  `${lingua === "en" ? "/en/legal/pdf/" : "/legale/pdf/"}${nomePdf(documento, lingua, versione)}`;

type VocePdf = { nome: string; documento: DocumentoPdf; versione: string; percorso: string; attuale: boolean };

/** Tutti i PDF di una lingua: versione in vigore più quelle archiviate. */
export function elencoPdf(lingua: Lingua): VocePdf[] {
  const attuali = DOCUMENTI_PDF.map((d) => {
    const percorso = percorsoDocumento(d, lingua);
    const { versione } = leggiSorgente(percorso, lingua, d).meta;
    return { nome: nomePdf(d, lingua, versione), documento: d, versione, percorso, attuale: true };
  });
  const archiviati = versioniArchiviate(lingua)
    .filter((v): v is typeof v & { documento: DocumentoPdf } => (DOCUMENTI_PDF as string[]).includes(v.documento))
    .map((v) => ({ nome: nomePdf(v.documento, lingua, v.versione), documento: v.documento, versione: v.versione, percorso: v.percorso, attuale: false }));
  return [...attuali, ...archiviati];
}

/* ---------- impaginazione ---------- */

const fonts = path.join(process.cwd(), "node_modules/geist/dist/fonts/geist-sans");
Font.register({
  family: "Geist",
  fonts: [
    { src: path.join(fonts, "Geist-Regular.ttf"), fontWeight: 400 },
    { src: path.join(fonts, "Geist-SemiBold.ttf"), fontWeight: 600 },
  ],
});
Font.registerHyphenationCallback((parola) => [parola]);

const C = { ink: "#0b0b0c", testo: "#2c2c2e", muted: "#52525b", linea: "#e7e7e4", mist: "#f4f4f1" };
const s = StyleSheet.create({
  pagina: { fontFamily: "Geist", fontSize: 9.5, lineHeight: 1.5, color: C.testo, paddingTop: 48, paddingBottom: 60, paddingHorizontal: 54 },
  marchio: { fontSize: 10, fontWeight: 600, color: C.ink, marginBottom: 18 },
  titolo: { fontSize: 20, fontWeight: 600, color: C.ink, lineHeight: 1.2, marginBottom: 8 },
  versione: { fontSize: 10, fontWeight: 600, color: C.ink },
  societa: { fontSize: 8.5, color: C.muted, marginTop: 4, marginBottom: 14, paddingBottom: 12, borderBottomWidth: 1, borderBottomColor: C.linea },
  h2: { fontSize: 12, fontWeight: 600, color: C.ink, marginTop: 14, marginBottom: 4 },
  h3: { fontSize: 10.5, fontWeight: 600, color: C.ink, marginTop: 10, marginBottom: 3 },
  p: { marginBottom: 6 },
  b: { fontWeight: 600, color: C.ink },
  link: { color: C.ink, textDecoration: "underline" },
  lista: { marginBottom: 6 },
  voce: { flexDirection: "row", marginBottom: 2.5 },
  segno: { width: 14 },
  voceTesto: { flex: 1 },
  tabella: { borderWidth: 1, borderColor: C.linea, borderRadius: 4, marginVertical: 6 },
  riga: { flexDirection: "row", borderTopWidth: 1, borderTopColor: C.linea },
  rigaTesta: { flexDirection: "row", backgroundColor: C.mist },
  cella: { flex: 1, padding: 5, fontSize: 8.5, lineHeight: 1.4 },
  nota: { marginTop: 14, fontSize: 8.5, color: C.muted },
  piedeSx: { position: "absolute", bottom: 26, left: 54, fontSize: 7.5, color: C.muted },
  piedeLinea: { position: "absolute", bottom: 40, left: 54, right: 54, borderTopWidth: 1, borderTopColor: C.linea },
});

const assoluto = (href: string) => (href.startsWith("/") ? `${AZIENDA.sito}${href}` : href);
const pulisci = (t: string) => t.replace(/\s*\{#[\w-]+\}\s*$/, "");

function Inline({ tokens }: { tokens?: Token[] }): React.ReactNode {
  return (tokens ?? []).map((t, i) => {
    switch (t.type) {
      case "strong":
        return (
          <Text key={i} style={s.b}>
            <Inline tokens={(t as Tokens.Strong).tokens} />
          </Text>
        );
      case "em":
        return <Inline key={i} tokens={(t as Tokens.Em).tokens} />;
      case "link": {
        const l = t as Tokens.Link;
        // Le ancore della pagina web (#allegato-1) nel PDF non esistono: resta il testo.
        if (l.href.startsWith("#")) return <Inline key={i} tokens={l.tokens} />;
        return (
          <Link key={i} src={assoluto(l.href)} style={s.link}>
            <Inline tokens={l.tokens} />
          </Link>
        );
      }
      case "br":
        return "\n";
      case "html":
        return /<br\s*\/?>/i.test((t as Tokens.HTML).text) ? "\n" : "";
      case "text": {
        const tt = t as Tokens.Text;
        return tt.tokens?.length ? <Inline key={i} tokens={tt.tokens} /> : pulisci(tt.text);
      }
      case "codespan":
        return (t as Tokens.Codespan).text;
      case "escape":
        return (t as Tokens.Escape).text;
      default:
        return "raw" in t ? String(t.raw) : "";
    }
  });
}

function Blocchi({ tokens }: { tokens: Token[] }) {
  return tokens.map((t, i) => {
    switch (t.type) {
      case "heading": {
        const h = t as Tokens.Heading;
        const testo = <Inline tokens={h.tokens} />;
        return h.depth <= 2 ? (
          <Text key={i} style={s.h2} minPresenceAhead={40}>
            {testo}
          </Text>
        ) : (
          <Text key={i} style={s.h3} minPresenceAhead={30}>
            {testo}
          </Text>
        );
      }
      case "paragraph":
        return (
          <Text key={i} style={s.p}>
            <Inline tokens={(t as Tokens.Paragraph).tokens} />
          </Text>
        );
      case "list": {
        const l = t as Tokens.List;
        const inizio = typeof l.start === "number" ? l.start : 1;
        return (
          <View key={i} style={s.lista}>
            {l.items.map((it, j) => (
              <View key={j} style={s.voce} wrap={false}>
                <Text style={s.segno}>{l.ordered ? `${inizio + j}.` : "•"}</Text>
                <Text style={s.voceTesto}>
                  <Inline tokens={it.tokens.flatMap((x) => ("tokens" in x && x.tokens ? x.tokens : [x]))} />
                </Text>
              </View>
            ))}
          </View>
        );
      }
      case "table": {
        const tb = t as Tokens.Table;
        const larghezza = (k: number) => (tb.header.length === 2 ? { flex: k === 0 ? 1 : 2.6 } : {});
        return (
          <View key={i} style={s.tabella}>
            <View style={s.rigaTesta} fixed={false}>
              {tb.header.map((c, j) => (
                <Text key={j} style={[s.cella, s.b, larghezza(j)]}>
                  <Inline tokens={c.tokens} />
                </Text>
              ))}
            </View>
            {tb.rows.map((r, j) => (
              <View key={j} style={s.riga} wrap={false}>
                {r.map((c, k) => (
                  <Text key={k} style={[s.cella, larghezza(k)]}>
                    <Inline tokens={c.tokens} />
                  </Text>
                ))}
              </View>
            ))}
          </View>
        );
      }
      default:
        return null;
    }
  });
}

const NOTA_EN =
  "This English version is provided for convenience. In case of conflict, the Italian version prevails, except for customers established in the United Kingdom, for whom the English version prevails.";

/** "Versione 1.0, in vigore dal 1 dicembre 2026": senza data, solo "Versione 1.0". */
export function rigaVersione(meta: MetaDocumento, lingua: Lingua): string {
  const en = lingua === "en";
  let r = en ? `Version ${meta.versione}` : `Versione ${meta.versione}`;
  if (meta.dataInVigore) r += en ? `, in force from ${meta.dataInVigore}` : `, in vigore dal ${meta.dataInVigore}`;
  if (meta.dataInVigore && meta.dataFine) r += en ? ` to ${meta.dataFine}` : ` al ${meta.dataFine}`;
  else if (meta.dataFine) r += en ? `, in force until ${meta.dataFine}` : `, in vigore fino al ${meta.dataFine}`;
  return r;
}

function Pdf({ meta, markdown, lingua }: { meta: MetaDocumento; markdown: string; lingua: Lingua }) {
  const en = lingua === "en";
  const versione = rigaVersione(meta, lingua);
  const societa = en
    ? `${AZIENDA.ragioneSociale}, ${sedeLegale("en")}. Registered in England and Wales, no. ${AZIENDA.numeroSocieta}. ${AZIENDA.emailContatto}`
    : `${AZIENDA.ragioneSociale}, ${sedeLegale("it")}. Società registrata in Inghilterra e Galles n. ${AZIENDA.numeroSocieta}. ${AZIENDA.emailContatto}`;
  return (
    <Document title={`${meta.titolo} ${meta.versione}`} author={AZIENDA.ragioneSociale} creator={AZIENDA.marchio} producer={AZIENDA.marchio} language={lingua}>
      <Page size="A4" style={s.pagina}>
        <View style={s.piedeLinea} fixed />
        <Text style={s.piedeSx} fixed>
          {meta.etichetta}, {en ? "version" : "versione"} {meta.versione}
        </Text>
        <Text style={s.marchio}>{AZIENDA.marchio}</Text>
        <Text style={s.titolo}>{meta.titolo}</Text>
        <Text style={s.versione}>{versione}</Text>
        <Text style={s.societa}>{societa}</Text>
        <Blocchi tokens={new Lexer({ gfm: true }).lex(markdown)} />
        {en && <Text style={s.nota}>{NOTA_EN}</Text>}
      </Page>
    </Document>
  );
}

export async function generaPdf(voce: VocePdf, lingua: Lingua): Promise<Buffer> {
  const { meta, markdown } = leggiSorgente(voce.percorso, lingua, voce.attuale ? voce.documento : undefined);
  return renderToBuffer(<Pdf meta={meta} markdown={markdown} lingua={lingua} />);
}

/** Risposta HTTP con il PDF da scaricare: la usano le rotte /legale/pdf/ e /en/legal/pdf/. */
export async function rispostaPdf(lingua: Lingua, file: string): Promise<Response> {
  const voce = elencoPdf(lingua).find((v) => v.nome === file);
  if (!voce) return new Response("Not found", { status: 404 });
  const buf = await generaPdf(voce, lingua);
  return new Response(new Uint8Array(buf), {
    headers: { "Content-Type": "application/pdf", "Content-Disposition": `attachment; filename="${file}"` },
  });
}
