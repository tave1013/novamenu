import { AZIENDA, VERSIONI, inVigoreDal, type DocumentoVersionato } from "@/lib/legal/azienda";
import { DOCUMENTI_PDF, urlPdf, type DocumentoPdf } from "@/lib/legal/pdf";
import { href } from "@/i18n/routes";

/*
 * Versione e data in vigore di ogni documento legale, per la piattaforma: quando il ristoratore
 * accetta i documenti, la piattaforma legge da qui e salva le stesse versioni che vede il sito.
 * Indirizzo: https://novamenu.eu/legale/versioni.json (generato a ogni build da azienda.ts).
 */
export const dynamic = "force-static";

export function GET() {
  const documenti = (Object.keys(VERSIONI) as DocumentoVersionato[])
    .filter((d) => d !== "indice")
    .map((d) => ({
      id: d,
      versione: VERSIONI[d].versione,
      in_vigore_dal: inVigoreDal(d),
      url: { it: `${AZIENDA.sito}${href("legalDoc", "it", d)}`, en: `${AZIENDA.sito}${href("legalDoc", "en", d)}` },
      ...((DOCUMENTI_PDF as string[]).includes(d)
        ? { pdf: { it: `${AZIENDA.sito}${urlPdf(d as DocumentoPdf, "it", VERSIONI[d].versione)}`, en: `${AZIENDA.sito}${urlPdf(d as DocumentoPdf, "en", VERSIONI[d].versione)}` } }
        : {}),
    }));
  return Response.json({ societa: AZIENDA.ragioneSociale, numero_societa: AZIENDA.numeroSocieta, documenti }, { headers: { "Cache-Control": "public, max-age=300" } });
}
