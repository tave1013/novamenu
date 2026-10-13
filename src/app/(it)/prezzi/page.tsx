import { setLocale } from "@/i18n";
import View, { meta } from "@/views/Pricing";

export const metadata = meta("it");

export default function Page() {
  setLocale("it");
  return <View />;
}
