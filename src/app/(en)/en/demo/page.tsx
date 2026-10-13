import { setLocale } from "@/i18n";
import View, { meta } from "@/views/Demo";

export const metadata = meta("en");

export default function Page() {
  setLocale("en");
  return <View />;
}
