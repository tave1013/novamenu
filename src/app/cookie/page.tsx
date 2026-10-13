import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { cookieHtml } from "@/content/legal";
import { site } from "@/config/site";
import { pageMeta } from "@/config/seo";

export const metadata: Metadata = pageMeta({
  title: "Cookie policy del sito: quali cookie usiamo",
  description: `Cookie policy di ${site.name}: quali cookie usa il sito, a cosa servono, quali servizi di terze parti sono coinvolti e come gestirli dal tuo browser.`,
  path: "/cookie/",
});

export default function CookiePage() {
  return <LegalPage title="Cookie policy" slug="cookie" updated="11 ottobre 2026" html={cookieHtml} />;
}
