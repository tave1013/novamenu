/*
 * Inoltro dei moduli del sito al server della piattaforma (solo lato server).
 * Il browser manda tutto alle nostre funzioni /api/... sullo stesso dominio: nessun servizio esterno
 * viene chiamato dalla pagina. Qui si aggiungono data, ora e paese e si inoltra alla piattaforma,
 * che salva la riga (registro dei consensi, richieste demo, richieste privacy).
 *
 * Indirizzi e chiave si impostano su Vercel (variabili d'ambiente, mai nel codice):
 *   REGISTRO_CONSENSI_URL   registro dei consensi ai cookie
 *   RICHIESTE_DEMO_URL      richieste di demo e di contatto, con i consensi dati
 *   RICHIESTE_PRIVACY_URL   richieste privacy (la piattaforma le apre nella console con scadenza a 30 giorni)
 *   PIATTAFORMA_MODULI_CHIAVE  chiave segreta condivisa, inviata come "Authorization: Bearer ..."
 * Finché un indirizzo manca, la funzione risponde "non configurato" e non salva niente.
 * Il contratto dei dati per l'agente della piattaforma è in docs/legale/per-la-piattaforma.md.
 */
export type Destinazione = "REGISTRO_CONSENSI_URL" | "RICHIESTE_DEMO_URL" | "RICHIESTE_PRIVACY_URL";

export const configurato = (d: Destinazione) => !!process.env[d];

export async function inoltra(d: Destinazione, dati: Record<string, unknown>, req: Request): Promise<{ ok: boolean; stato: number; motivo?: string }> {
  const url = process.env[d];
  if (!url) return { ok: false, stato: 503, motivo: "non configurato" };
  const riga = {
    ...dati,
    ricevuto_il: new Date().toISOString(),
    paese: req.headers.get("x-vercel-ip-country") ?? null,
    origine: new URL(req.url).hostname,
  };
  try {
    const r = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...(process.env.PIATTAFORMA_MODULI_CHIAVE ? { Authorization: `Bearer ${process.env.PIATTAFORMA_MODULI_CHIAVE}` } : {}) },
      body: JSON.stringify(riga),
      signal: AbortSignal.timeout(8000),
    });
    return r.ok ? { ok: true, stato: 200 } : { ok: false, stato: 502, motivo: `la piattaforma ha risposto ${r.status}` };
  } catch {
    return { ok: false, stato: 502, motivo: "la piattaforma non risponde" };
  }
}

/** Legge un corpo JSON piccolo (al massimo 8 KB): i moduli non mandano di più. */
export async function leggiJson(req: Request): Promise<Record<string, unknown> | null> {
  const testo = await req.text();
  if (testo.length > 8192) return null;
  try {
    const v = JSON.parse(testo);
    return v && typeof v === "object" && !Array.isArray(v) ? v : null;
  } catch {
    return null;
  }
}

/** Testo pulito e corto, oppure null. */
export function testo(v: unknown, max: number): string | null {
  if (typeof v !== "string") return null;
  const t = v.replace(/[\u0000-\u0008\u000b-\u001f]/g, "").trim();
  return t ? t.slice(0, max) : null;
}

export const emailValida = (v: string | null) => !!v && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) && v.length <= 200;

/** Limite semplice di invii per indirizzo, per istanza del server: ferma gli invii a raffica. */
const invii = new Map<string, number[]>();
export function troppiInvii(req: Request, chiave: string, max = 5, finestraMs = 10 * 60 * 1000): boolean {
  const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "sconosciuto";
  const k = `${chiave}:${ip}`;
  const ora = Date.now();
  const recenti = (invii.get(k) ?? []).filter((t) => ora - t < finestraMs);
  recenti.push(ora);
  invii.set(k, recenti);
  if (invii.size > 5000) invii.clear();
  return recenti.length > max;
}

export const risposta = (stato: number, corpo: Record<string, unknown>) =>
  Response.json(corpo, { status: stato, headers: { "Cache-Control": "no-store" } });

/** Tipi di richiesta privacy accettati dal modulo /legale/richieste-privacy/. */
export const TIPI_RICHIESTA = ["accesso", "correzione", "cancellazione", "opposizione", "portabilita", "altro"] as const;
export type TipoRichiesta = (typeof TIPI_RICHIESTA)[number];
