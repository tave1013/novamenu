// Legge i prezzi dalla piattaforma (rpc public_plans) e ne salva una copia in
// src/lib/prezzi/ultimi-prezzi.json. Parte da solo prima di ogni build (npm run build).
// La copia serve solo se, durante il build, la piattaforma non risponde: così il sito
// pubblica gli ultimi prezzi letti e non una pagina vuota. Se la lettura fallisce, la copia
// precedente resta com'è e il build continua.
// Uso manuale: node scripts/aggiorna-prezzi.mjs
import { readFileSync, writeFileSync } from "node:fs";

const conf = JSON.parse(readFileSync("src/lib/prezzi/piattaforma.json", "utf8"));
const url = (process.env.PIATTAFORMA_SUPABASE_URL || conf.url).replace(/\/$/, "");
const chiave = process.env.PIATTAFORMA_SUPABASE_ANON_KEY || conf.chiaveAnon;
const file = "src/lib/prezzi/ultimi-prezzi.json";

try {
  const r = await fetch(`${url}/rest/v1/rpc/${conf.funzionePrezzi}`, {
    headers: { apikey: chiave, Authorization: `Bearer ${chiave}` },
    signal: AbortSignal.timeout(10000),
  });
  if (!r.ok) throw new Error(`risposta ${r.status}`);
  const righe = await r.json();
  const ok = Array.isArray(righe) && ["base", "pro", "premium"].every((id) => righe.some((x) => x?.id === id && x.priceMonthly && x.priceYearly && x.priceMonthlyGbp && x.priceYearlyGbp));
  if (!ok) throw new Error("risposta senza tutti i piani e gli importi");
  writeFileSync(file, JSON.stringify({ lettoIl: new Date().toISOString(), righe }, null, 2) + "\n");
  console.log(`Prezzi letti dalla piattaforma: ${righe.map((x) => `${x.id} ${x.priceMonthly} € / £${x.priceMonthlyGbp}`).join(", ")}`);
} catch (e) {
  console.warn(`Prezzi: la piattaforma non risponde (${e.message}). Uso gli ultimi prezzi letti in ${file}.`);
}
