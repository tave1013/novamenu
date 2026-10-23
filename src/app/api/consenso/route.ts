import { inoltra, leggiJson, risposta, testo, troppiInvii } from "@/lib/moduli/inoltro";

/*
 * Registro dei consensi ai cookie. Il banner manda qui ogni scelta; aggiungiamo data, ora e paese
 * e la inoltriamo al registro della piattaforma (REGISTRO_CONSENSI_URL).
 * Si salvano solo: identificativo casuale del browser, scelte, azione, versioni, lingua, paese, data e ora.
 * Niente indirizzo IP, nome, email o altri dati personali in chiaro.
 */
export const dynamic = "force-dynamic";

const AZIONI = new Set(["accetta_tutti", "rifiuta", "personalizza", "chiusura_x", "revoca"]);

export async function POST(req: Request) {
  if (troppiInvii(req, "consenso", 30)) return risposta(429, { ok: false });
  const d = await leggiJson(req);
  const id = testo(d?.id, 64);
  const azione = testo(d?.azione, 20);
  if (!d || !id || !/^[\w-]+$/.test(id) || !azione || !AZIONI.has(azione)) return risposta(400, { ok: false });
  const r = await inoltra(
    "REGISTRO_CONSENSI_URL",
    {
      id_anonimo: id,
      azione,
      necessari: true,
      statistiche: d.statistiche === true,
      marketing: d.marketing === true,
      versione_consenso: testo(d.versione_consenso, 40),
      versione_cookie_policy: testo(d.versione_cookie_policy, 10),
      lingua: d.lingua === "en" ? "en" : "it",
    },
    req,
  );
  return risposta(r.ok ? 200 : 202, { ok: r.ok });
}
