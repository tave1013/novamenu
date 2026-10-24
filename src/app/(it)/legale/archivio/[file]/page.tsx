import type { Metadata } from "next";
import { pageMeta } from "@/config/seo";
import { notFound } from "next/navigation";
import { setLocale } from "@/i18n";
import { leggiArchiviato } from "@/lib/legal/documenti";
import { LegalArchivedView, staticParamsArchivio } from "@/views/Legal";

/* Una versione precedente di un documento legale, com'era quando era in vigore. */
export const dynamicParams = false;
export const generateStaticParams = () => staticParamsArchivio("it");

export async function generateMetadata({ params }: { params: Promise<{ file: string }> }): Promise<Metadata> {
  const doc = leggiArchiviato((await params).file, "it");
  if (!doc) return {};
  const meta = pageMeta({ locale: "it", page: "legalArchived", id: (await params).file, title: `${doc.meta.etichetta} ${doc.meta.versione}`, description: doc.meta.descrizione });
  // le versioni non più in vigore restano consultabili ma fuori dai motori di ricerca
  return { ...meta, robots: { index: false, follow: true } };
}

export default async function Page({ params }: { params: Promise<{ file: string }> }) {
  setLocale("it");
  const { file } = await params;
  if (!leggiArchiviato(file, "it")) notFound();
  return <LegalArchivedView file={file} />;
}
