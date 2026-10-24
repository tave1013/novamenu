import { VERSIONI } from "@/lib/legal/azienda";
import { emailValida, inoltra, leggiJson, risposta, rispostaEsito, tempo, testo } from "@/lib/moduli/inoltro";

/*
 * Richieste di demo e di contatto. La richiesta continua ad arrivare anche su WhatsApp, come prima;
 * qui si salva sulla piattaforma con la prova di cosa è stato mostrato e accettato:
 * versione dell'informativa, testo mostrato, consensi con data e ora.
 */
export const dynamic = "force-dynamic";

type Consenso = { tipo: string; valore: boolean; data?: string; testo?: string };

export async function POST(req: Request) {
  const d = await leggiJson(req);
  if (!d) return risposta(400, { ok: false });
  const nome = testo(d.nome, 120);
  const telefono = testo(d.telefono, 30);
  const email = testo(d.email, 200);
  if (!nome || (!telefono && !emailValida(email))) return risposta(400, { ok: false });
  const consensi: Consenso[] = (Array.isArray(d.consensi) ? d.consensi : [])
    .slice(0, 10)
    .filter((c): c is Record<string, unknown> => !!c && typeof c === "object")
    .map((c) => ({ tipo: testo(c.tipo, 40) ?? "altro", valore: c.valore === true, data: testo(c.data, 40) ?? undefined, testo: testo(c.testo, 500) ?? undefined }));
  const e = await inoltra(
    "demo",
    {
      nome,
      email: emailValida(email) ? email : undefined,
      telefono: telefono ?? undefined,
      messaggio: testo(d.messaggio, 4000) ?? undefined,
      pagina: testo(d.pagina, 300) ?? undefined,
      versione_informativa: VERSIONI.privacy.versione,
      testo_mostrato: testo(d.testo_mostrato, 2000) ?? undefined,
      consensi,
      lingua: d.lingua === "en" ? "en" : "it",
      t: tempo(d.t),
      website: testo(d.website, 200) ?? "",
    },
    req,
  );
  return rispostaEsito(e);
}
