import type { Metadata } from "next";
import { setLocale } from "@/i18n";
import { defaultLocale, localeInfo, locales } from "@/i18n/config";
import { RootShell, rootMetadata } from "@/views/RootShell";
import NotFound from "@/views/NotFound";

export { viewport } from "@/views/RootShell";

export const metadata: Metadata = { ...rootMetadata(defaultLocale), robots: { index: false } };

/*
 * Pagina 404 del sito. Su un sito statico esiste un solo file 404, quindi è nella lingua principale;
 * chi arriva da un indirizzo di un'altra lingua viene portato alla 404 di quella lingua.
 */
const redirect = `(function(){var p=location.pathname;${locales
  .filter((l) => l !== defaultLocale)
  .map((l) => `if(p.indexOf("${localeInfo[l].prefix}/")===0&&p!=="${localeInfo[l].prefix}/404/"){location.replace("${localeInfo[l].prefix}/404/");return}`)
  .join("")}})();`;

export default function GlobalNotFound() {
  setLocale(defaultLocale);
  return (
    <RootShell locale={defaultLocale}>
      <script dangerouslySetInnerHTML={{ __html: redirect }} />
      <NotFound />
    </RootShell>
  );
}
