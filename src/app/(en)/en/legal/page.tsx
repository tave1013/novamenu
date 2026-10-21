import { setLocale } from "@/i18n";
import { LegalIndexView, metaIndice } from "@/views/Legal";

export const metadata = metaIndice("en");

export default function Page() {
  setLocale("en");
  return <LegalIndexView />;
}
