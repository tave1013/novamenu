/*
 * Paese del visitatore, letto dall'header che aggiunge Vercel (x-vercel-ip-country).
 * Serve al sito per scegliere la valuta dei prezzi: euro nell'Unione europea, sterline altrove.
 * Non salva nulla e non restituisce l'indirizzo IP.
 */
export const dynamic = "force-dynamic";

export function GET(req: Request) {
  return Response.json({ paese: req.headers.get("x-vercel-ip-country") }, { headers: { "Cache-Control": "private, no-store" } });
}
