import { setLocale } from "@/i18n";
import View, { meta } from "@/views/Home";

export const metadata = meta("en");

// I prezzi arrivano dalla piattaforma: la pagina si rigenera ogni ora.
export const revalidate = 3600;

export default async function Page() {
  setLocale("en");
  return <View />;
}
