import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { cookieHtml } from "@/content/legal";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Cookie policy",
  description: `Cookie policy del sito e della piattaforma ${site.name}.`,
  alternates: { canonical: "/cookie/" },
};

export default function CookiePage() {
  return <LegalPage title="Cookie policy" slug="cookie" updated="11 ottobre 2026" html={cookieHtml} />;
}
