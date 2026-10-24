import { TIPI_RICHIESTA, emailValida, inoltra, leggiJson, risposta, rispostaEsito, tempo, testo } from "@/lib/moduli/inoltro";

/*
 * Richieste privacy (accesso, rettifica, cancellazione, opposizione, portabilità...).
 * La piattaforma apre la richiesta nella console con scadenza a 30 giorni.
 * Anti spam: campo trappola "website" e tempo passato sul modulo "t", controllati dalla piattaforma.
 */
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const d = await leggiJson(req);
  if (!d) return risposta(400, { ok: false });
  const nome = testo(d.nome, 120);
  const email = testo(d.email, 200);
  const messaggio = testo(d.messaggio, 4000);
  const tipo = testo(d.tipo, 30);
  if (!nome || !emailValida(email) || !messaggio) return risposta(400, { ok: false });
  const e = await inoltra(
    "privacy",
    {
      nome,
      email,
      tipo: tipo && (TIPI_RICHIESTA as readonly string[]).includes(tipo) ? tipo : "altro",
      messaggio,
      locale: testo(d.locale, 120) ?? undefined,
      t: tempo(d.t),
      website: testo(d.website, 200) ?? "",
    },
    req,
  );
  return rispostaEsito(e, e.dati?.scadenza ? { scadenza: e.dati.scadenza } : {});
}
