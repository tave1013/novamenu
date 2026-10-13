import type { Metadata } from "next";
import { site } from "./site";
import { plans } from "@/content/plans";

/** Immagine usata nelle anteprime social (1200x630, in public/og.png). */
export const ogImage = { url: "/og.png", width: 1200, height: 630, alt: `${site.name}: ${site.tagline}` };

/**
 * Metadati completi di una pagina: titolo, descrizione, canonical, Open Graph e Twitter card.
 * Il titolo riceve da solo " | NovaMenu" in coda; con `absolute` viene usato così com'è.
 */
export function pageMeta({
  title,
  description,
  path,
  absolute = false,
  article,
}: {
  title: string;
  description: string;
  path: string;
  absolute?: boolean;
  article?: { publishedTime: string };
}): Metadata {
  const full = absolute ? title : `${title} | ${site.name}`;
  const base = { locale: site.locale, siteName: site.name, title: full, description, url: path, images: [ogImage] };
  return {
    title: absolute ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: article ? { type: "article", publishedTime: article.publishedTime, ...base } : { type: "website", ...base },
    twitter: { card: "summary_large_image", title: full, description, images: [ogImage.url] },
  };
}

/** Dati strutturati della piattaforma, con i prezzi presi da plans.ts. */
export function softwareApplicationLd() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: site.name,
    url: site.url,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    inLanguage: "it-IT",
    description: site.description,
    publisher: { "@type": "Organization", name: site.name, url: site.url },
    offers: plans.map((p) => ({
      "@type": "Offer",
      name: `Piano ${p.name}`,
      description: p.desc,
      price: String(p.monthly),
      priceCurrency: "EUR",
      url: `${site.url}/prezzi/`,
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: String(p.monthly),
        priceCurrency: "EUR",
        billingDuration: "P1M",
      },
    })),
  };
}
