import { setLocale } from "@/i18n";
import { LegalDocView, metaDoc, staticParams } from "@/views/Legal";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export const generateStaticParams = () => staticParams("en");

export async function generateMetadata({ params }: Props) {
  return metaDoc("en", (await params).slug);
}

export default async function Page({ params }: Props) {
  setLocale("en");
  return <LegalDocView slug={(await params).slug} />;
}
