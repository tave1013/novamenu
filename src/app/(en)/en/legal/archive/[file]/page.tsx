import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setLocale } from "@/i18n";
import { leggiArchiviato } from "@/lib/legal/documenti";
import { LegalArchivedView, staticParamsArchivio } from "@/views/Legal";

/* Una versione precedente di un documento legale, com'era quando era in vigore. */
export const dynamicParams = false;
export const generateStaticParams = () => staticParamsArchivio("en");

export async function generateMetadata({ params }: { params: Promise<{ file: string }> }): Promise<Metadata> {
  const doc = leggiArchiviato((await params).file, "en");
  return doc ? { title: `${doc.meta.etichetta} ${doc.meta.versione}`, robots: { index: false } } : {};
}

export default async function Page({ params }: { params: Promise<{ file: string }> }) {
  setLocale("en");
  const { file } = await params;
  if (!leggiArchiviato(file, "en")) notFound();
  return <LegalArchivedView file={file} />;
}
