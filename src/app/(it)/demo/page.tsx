import { setLocale } from "@/i18n";
import View, { meta } from "@/views/Demo";

export const metadata = meta("it");

export default function Page() {
  setLocale("it");
  return <View />;
}
