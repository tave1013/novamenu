import { setLocale } from "@/i18n";
import View, { meta, staticParams } from "@/views/Guide";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

// Alcune guide citano i prezzi, che arrivano dalla piattaforma: si rigenerano ogni ora.
export const revalidate = 3600;

export const generateStaticParams = () => staticParams("it");

export async function generateMetadata({ params }: Props) {
  return meta("it", (await params).slug);
}

export default async function Page({ params }: Props) {
  setLocale("it");
  return <View slug={(await params).slug} />;
}
