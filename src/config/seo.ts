import type { Metadata } from "next";
import { site } from "./site";
import { VALUTE, prezzoMensile, type Listino, type Valuta } from "./prezzi";
import { getPlans } from "@/content";
import { t } from "@/i18n";
import { defaultLocale, localeInfo, locales, type Locale } from "@/i18n/config";
import { href, type PageKey } from "@/i18n/routes";

/** Frase breve usata nei titoli e nelle anteprime social. */
export const siteTagline = (locale: Locale) => t(locale, "Menu digitale, ordini e prenotazioni per il tuo locale");

export const siteDescription = (locale: Locale) =>
  t(locale, "Menu digitale con QR, ordini da asporto su WhatsApp e prenotazioni per il tuo locale. Nessuna commissione, pronto in un pomeriggio. Prova gratis 14 giorni.");

/** Immagine usata nelle anteprime social (1200x630, in public/og.png). */
export const ogImage = (locale: Locale) => ({ url: "/og.png", width: 1200, height: 630, alt: `${site.name}: ${siteTagline(locale)}` });

/** Indirizzi della stessa pagina in tutte le lingue, per i tag hreflang. x-default punta all'italiano. */
export function alternateLanguages(key: PageKey, id?: string): Record<string, string> {
  const out: Record<string, string> = {};
  for (const l of locales) out[localeInfo[l].hreflang] = href(key, l, id);
  out["x-default"] = href(key, defaultLocale, id);
  return out;
}

/**
 * Metadati completi di una pagina: titolo, descrizione, canonical verso sé stessa, hreflang,
 * Open Graph e Twitter card. Il titolo riceve da solo " | NovaMenu" in coda; con `absolute` resta così com'è.
 */
export function pageMeta({
  locale,
  page,
  id,
  title,
  description,
  absolute = false,
  article,
  image: immagine,
}: {
  locale: Locale;
  page: PageKey;
  id?: string;
  title: string;
  description: string;
  absolute?: boolean;
  article?: { publishedTime: string };
  /** Immagine di anteprima propria della pagina (1200x630); altrimenti quella del sito. */
  image?: { url: string; alt: string };
}): Metadata {
  const full = absolute ? title : `${title} | ${site.name}`;
  const path = href(page, locale, id);
  const image = immagine ? { ...immagine, width: 1200, height: 630 } : ogImage(locale);
  const base = {
    locale: localeInfo[locale].ogLocale,
    alternateLocale: locales.filter((l) => l !== locale).map((l) => localeInfo[l].ogLocale),
    siteName: site.name,
    title: full,
    description,
    url: path,
    images: [image],
  };
  return {
    title: absolute ? { absolute: title } : title,
    description,
    alternates: { canonical: path, languages: alternateLanguages(page, id) },
    openGraph: article ? { type: "article", publishedTime: article.publishedTime, ...base } : { type: "website", ...base },
    twitter: { card: "summary_large_image", title: full, description, images: [image.url] },
  };
}

/** Dati strutturati della piattaforma, con i prezzi presi da plans.ts. */
export function softwareApplicationLd(locale: Locale, listino: Listino) {
  const pricing = `${site.url}${href("pricing", locale)}`;
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: site.name,
    url: `${site.url}${href("home", locale)}`,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    inLanguage: localeInfo[locale].intl,
    description: siteDescription(locale),
    publisher: { "@type": "Organization", name: site.name, url: site.url },
    // Un'offerta per piano e per valuta: euro per tutti, sterline per il Regno Unito. Prezzi IVA esclusa.
    offers: getPlans(locale).flatMap((p) =>
      (Object.keys(VALUTE) as Valuta[]).map((v) => ({
        "@type": "Offer",
        name: t(locale, "Piano {name}", { name: p.name }),
        description: p.desc,
        price: String(prezzoMensile(listino, p.id, v)),
        priceCurrency: VALUTE[v].codice,
        ...(v === "gbp" ? { eligibleRegion: { "@type": "Country", name: "GB" } } : {}),
        url: pricing,
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: String(prezzoMensile(listino, p.id, v)),
          priceCurrency: VALUTE[v].codice,
          valueAddedTaxIncluded: false,
          billingDuration: "P1M",
        },
      })),
    ),
  };
}
