import { setLocale } from "@/i18n";
import { LegalArchiveView, metaArchivio } from "@/views/Legal";

export const metadata = metaArchivio("it");

export default function Page() {
  setLocale("it");
  return <LegalArchiveView />;
}
