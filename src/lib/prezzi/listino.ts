import { cache } from "react";
import { listinoDaPiattaforma, type Listino } from "@/config/prezzi";
import conf from "./piattaforma.json";
import ultimi from "./ultimi-prezzi.json";

/*
 * Prezzi dei piani letti dalla piattaforma (la stessa API pubblica della pagina di registrazione).
 * - Si leggono quando il sito viene pubblicato e poi si aggiornano da soli ogni ora:
 *   se cambi un prezzo nella console della piattaforma, entro un'ora cambia anche sul sito.
 * - Se durante un aggiornamento la piattaforma non risponde, Vercel continua a mostrare
 *   la pagina con gli ultimi prezzi letti.
 * - Se non risponde durante il build, si usano gli ultimi prezzi letti salvati in
 *   ultimi-prezzi.json (lo aggiorna scripts/aggiorna-prezzi.mjs prima di ogni build).
 * Solo per componenti server.
 */
export const AGGIORNAMENTO_PREZZI_SECONDI = 3600;

const url = (process.env.PIATTAFORMA_SUPABASE_URL || conf.url).replace(/\/$/, "");
const chiave = process.env.PIATTAFORMA_SUPABASE_ANON_KEY || conf.chiaveAnon;

async function leggiDallaPiattaforma(): Promise<Listino> {
  const r = await fetch(`${url}/rest/v1/rpc/${conf.funzionePrezzi}`, {
    headers: { apikey: chiave, Authorization: `Bearer ${chiave}` },
    next: { revalidate: AGGIORNAMENTO_PREZZI_SECONDI, tags: ["prezzi"] },
    signal: AbortSignal.timeout(8000),
  });
  if (!r.ok) throw new Error(`Prezzi: la piattaforma ha risposto ${r.status}`);
  return listinoDaPiattaforma(await r.json());
}

const inBuild = () => process.env.NEXT_PHASE === "phase-production-build";

export const getListino = cache(async (): Promise<Listino> => {
  try {
    return await leggiDallaPiattaforma();
  } catch (e) {
    // Durante il build: ultimi prezzi letti. Dopo la pubblicazione l'errore fa fallire solo
    // l'aggiornamento, e resta online la pagina con i prezzi precedenti.
    if (inBuild() || process.env.NODE_ENV !== "production") {
      console.warn(`${(e as Error).message}. Uso gli ultimi prezzi letti (${ultimi.lettoIl}).`);
      return listinoDaPiattaforma(ultimi.righe);
    }
    throw e;
  }
});
