import { elencoPdf, rispostaPdf } from "@/lib/legal/pdf";

/* PDF dei Termini e del DPA, generati a ogni build (vedi src/lib/legal/pdf.tsx). */
export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return elencoPdf("en").map((v) => ({ file: v.nome }));
}

export async function GET(_req: Request, { params }: { params: Promise<{ file: string }> }) {
  return rispostaPdf("en", (await params).file);
}
