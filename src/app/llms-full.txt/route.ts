import { llmsFullTxt } from "@/config/llms";

export const dynamic = "force-static";
// I prezzi arrivano dalla piattaforma: il file si rigenera ogni ora.
export const revalidate = 3600;

export async function GET() {
  return new Response(await llmsFullTxt(), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
