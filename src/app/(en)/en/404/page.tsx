import type { Metadata } from "next";
import { setLocale } from "@/i18n";
import NotFound from "@/views/NotFound";

// Pagina 404 in inglese: ci arriva chi apre un indirizzo inesistente sotto /en/.
export const metadata: Metadata = { robots: { index: false } };

export default function Page() {
  setLocale("en");
  return <NotFound />;
}
