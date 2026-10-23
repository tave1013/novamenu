import { VERSIONI } from "@/lib/legal/azienda";
import { TIPI_RICHIESTA, emailValida, inoltra, leggiJson, risposta, testo, troppiInvii } from "@/lib/moduli/inoltro";

/*
 * Richieste privacy (accesso, correzione, cancellazione, opposizione, portabilità).
 * Inoltro a RICHIESTE_PRIVACY_URL: la piattaforma apre la richiesta nella console con scadenza a 30 giorni.
 * Protezione anti spam: campo trappola, tempo minimo di compilazione e limite di invii.
 */
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  if (troppiInvii(req, "privacy", 3)) return risposta(429, { ok: false, errore: "troppi" });
  const d = await leggiJson(req);
  if (!d) return risposta(400, { ok: false });
  // robot: campo trappola compilato o modulo inviato in meno di 3 secondi
  if (testo(d.sito, 10) || typeof d.aperto_da_ms !== "number" || d.aperto_da_ms < 3000) return risposta(400, { ok: false });
  const nome = testo(d.nome, 120);
  const email = testo(d.email, 200);
  const tipo = testo(d.tipo, 20);
  const messaggio = testo(d.messaggio, 4000);
  if (!nome || !emailValida(email) || !tipo || !(TIPI_RICHIESTA as readonly string[]).includes(tipo) || !messaggio) return risposta(400, { ok: false });
  const r = await inoltra(
    "RICHIESTE_PRIVACY_URL",
    {
      nome,
      email,
      tipo_richiesta: tipo,
      locale_coinvolto: testo(d.locale, 160),
      messaggio,
      lingua: d.lingua === "en" ? "en" : "it",
      informativa_privacy_versione: VERSIONI.privacy.versione,
      scadenza_giorni: 30,
    },
    req,
  );
  return risposta(r.ok ? 200 : 502, { ok: r.ok });
}
