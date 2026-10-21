import { setLocale } from "@/i18n";
import { LegalIndexView, metaIndice } from "@/views/Legal";

export const metadata = metaIndice("it");

export default function Page() {
  setLocale("it");
  return <LegalIndexView />;
}
