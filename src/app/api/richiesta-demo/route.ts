import { VERSIONI } from "@/lib/legal/azienda";
import { emailValida, inoltra, leggiJson, risposta, testo, troppiInvii } from "@/lib/moduli/inoltro";

/*
 * Richieste di demo e di contatto. La richiesta vera parte su WhatsApp, come prima; qui si salva
 * la prova di cosa è stato mostrato e accettato: versione dell'informativa privacy, consensi dati
 * (WhatsApp), data e ora. Inoltro a RICHIESTE_DEMO_URL.
 */
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  if (troppiInvii(req, "demo")) return risposta(429, { ok: false });
  const d = await leggiJson(req);
  if (!d || testo(d.sito, 10)) return risposta(400, { ok: false }); // campo trappola compilato: è un robot
  const nome = testo(d.nome, 120);
  const telefono = testo(d.telefono, 40);
  const email = testo(d.email, 200);
  if (!nome || (!telefono && !emailValida(email))) return risposta(400, { ok: false });
  const consensi = (d.consensi ?? {}) as Record<string, unknown>;
  const r = await inoltra(
    "RICHIESTE_DEMO_URL",
    {
      tipo: d.tipo === "contatto" ? "contatto" : "demo",
      nome,
      attivita: testo(d.attivita, 160),
      email: emailValida(email) ? email : null,
      telefono,
      messaggio: testo(d.messaggio, 2000),
      lingua: d.lingua === "en" ? "en" : "it",
      // cosa ha visto e accettato chi ha scritto
      testo_mostrato: testo(d.testo_mostrato, 300),
      informativa_privacy_versione: VERSIONI.privacy.versione,
      consensi: { whatsapp: consensi.whatsapp === true },
    },
    req,
  );
  return risposta(r.ok ? 200 : 202, { ok: r.ok });
}
