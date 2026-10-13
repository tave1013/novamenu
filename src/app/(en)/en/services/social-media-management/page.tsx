import { setLocale } from "@/i18n";
import View, { meta } from "@/views/ServiceSocial";

export const metadata = meta("en");

export default function Page() {
  setLocale("en");
  return <View />;
}
