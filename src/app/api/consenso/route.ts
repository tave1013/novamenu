import { inoltra, leggiJson, risposta, rispostaEsito, testo } from "@/lib/moduli/inoltro";

/*
 * Registro dei consensi ai cookie: il banner manda qui ogni scelta e la inoltriamo alla piattaforma.
 * Si salvano identificativo casuale del browser, scelte, versione della cookie policy, lingua e paese;
 * data e ora le mette la piattaforma. Nessun dato personale in chiaro.
 */
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const d = await leggiJson(req);
  const identificativo = testo(d?.identificativo, 64);
  if (!d || !identificativo || !/^[\w-]{8,64}$/.test(identificativo)) return risposta(400, { ok: false });
  const e = await inoltra(
    "consenso",
    {
      identificativo,
      scelte: { necessari: true, statistiche: d.statistiche === true, marketing: d.marketing === true },
      versione_policy: testo(d.versione_policy, 40) ?? "",
      lingua: d.lingua === "en" ? "en" : "it",
      paese: (req.headers.get("x-vercel-ip-country") ?? "").slice(0, 2).toUpperCase() || undefined,
      website: testo(d.website, 200) ?? "",
    },
    req,
  );
  return rispostaEsito(e);
}
