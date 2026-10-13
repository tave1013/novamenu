import { setLocale } from "@/i18n";
import View, { meta, staticParams } from "@/views/Sector";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export const generateStaticParams = () => staticParams("en");

export async function generateMetadata({ params }: Props) {
  return meta("en", (await params).slug);
}

export default async function Page({ params }: Props) {
  setLocale("en");
  return <View slug={(await params).slug} />;
}
