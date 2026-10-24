/*
 * Inoltro dei moduli del sito al server della piattaforma (solo lato server).
 * Il browser manda tutto alle nostre funzioni /api/... sullo stesso dominio: nessun servizio esterno
 * viene chiamato dalla pagina. Da qui si inoltra alla piattaforma, che salva la riga
 * (registro dei consensi, richieste demo, richieste privacy).
 * Istruzioni della piattaforma: docs/legale/istruzioni-piattaforma.md.
 *
 * Chiave: variabile d'ambiente SITO_CHIAVE_CONDIVISA su Vercel, inviata nell'intestazione x-chiave-sito.
 * Si legge solo qui (server): non va mai nel browser, nei log o nelle risposte.
 * L'IP del visitatore va nell'intestazione x-ip-visitatore: serve alla piattaforma solo per i limiti
 * di invio e non viene salvato.
 */
const BASE = (process.env.PIATTAFORMA_SITO_URL || "https://pprjwaqzbrtigxfvdkcd.supabase.co/functions/v1/sito").replace(/\/$/, "");

export const INDIRIZZI = {
  consenso: `${BASE}/consenso-cookie`,
  demo: `${BASE}/richiesta-demo`,
  privacy: `${BASE}/richiesta-privacy`,
} as const;
export type Destinazione = keyof typeof INDIRIZZI;

/** La chiave c'è? (senza mai leggerne il valore fuori da qui) */
export const configurato = () => !!process.env.SITO_CHIAVE_CONDIVISA;

/** IP del visitatore: primo valore di x-forwarded-for della richiesta arrivata al sito. */
const ipVisitatore = (req: Request) => (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim();

export type Esito = { ok: boolean; stato: number; errore?: string; dati?: Record<string, unknown> };

export async function inoltra(d: Destinazione, dati: Record<string, unknown>, req: Request): Promise<Esito> {
  const chiave = process.env.SITO_CHIAVE_CONDIVISA;
  if (!chiave) return { ok: false, stato: 503, errore: "Servizio non configurato" };
  try {
    const r = await fetch(INDIRIZZI[d], {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-chiave-sito": chiave, "x-ip-visitatore": ipVisitatore(req) },
      body: JSON.stringify(dati),
      signal: AbortSignal.timeout(10000),
      cache: "no-store",
    });
    const corpo = (await r.json().catch(() => ({}))) as Record<string, unknown>;
    if (r.ok && corpo.ok === true) return { ok: true, stato: 200, dati: corpo };
    return { ok: false, stato: r.status || 502, errore: typeof corpo.errore === "string" ? corpo.errore : undefined };
  } catch {
    return { ok: false, stato: 502, errore: "La piattaforma non risponde" };
  }
}

/** Legge un corpo JSON piccolo (al massimo 16 KB): i moduli non mandano di più. */
export async function leggiJson(req: Request): Promise<Record<string, unknown> | null> {
  const testo = await req.text();
  if (testo.length > 16384) return null;
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

/** Millisecondi passati sul modulo (campo "t"), oppure 0. */
export const tempo = (v: unknown) => (typeof v === "number" && Number.isFinite(v) && v > 0 ? Math.round(v) : 0);

export const risposta = (stato: number, corpo: Record<string, unknown>) =>
  Response.json(corpo, { status: stato, headers: { "Cache-Control": "no-store" } });

/** Messaggio semplice per il visitatore: il testo della piattaforma va bene solo per i 400 (dati sbagliati). */
export function rispostaEsito(e: Esito, extra: Record<string, unknown> = {}) {
  if (e.ok) return risposta(200, { ok: true, ...extra });
  if (e.stato === 503) return risposta(503, { ok: false, errore: "non configurato" });
  return risposta(e.stato === 400 || e.stato === 429 ? e.stato : 502, { ok: false, errore: e.stato === 400 ? e.errore : e.stato === 429 ? "troppe" : undefined });
}

/** Tipi di richiesta privacy accettati dalla piattaforma. */
export const TIPI_RICHIESTA = ["accesso", "rettifica", "cancellazione", "opposizione", "portabilita", "limitazione", "revoca_consenso", "altro"] as const;
export type TipoRichiesta = (typeof TIPI_RICHIESTA)[number];
