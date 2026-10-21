import { setLocale } from "@/i18n";
import { LegalArchiveView, metaArchivio } from "@/views/Legal";

export const metadata = metaArchivio("en");

export default function Page() {
  setLocale("en");
  return <LegalArchiveView />;
}
