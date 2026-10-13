import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "@fontsource/caveat/latin-600.css";
import "@/app/globals.css";
import { site } from "@/config/site";
import { Header, type HeaderNav } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SmoothScroll } from "@/components/SmoothScroll";
import { JsonLd } from "@/components/ui";
import { alternateLanguages, ogImage, siteDescription, siteTagline } from "@/config/seo";
import { getFeatures, getSectors, getServices } from "@/content";
import { featureGroups } from "@/content/features";
import { setLocale, t } from "@/i18n";
import { localeInfo, locales, type Locale } from "@/i18n/config";
import { LocaleProvider } from "@/i18n/LocaleProvider";
import { href } from "@/i18n/routes";

/** Metadati di base del sito in una lingua; ogni pagina poi aggiunge i suoi. */
export function rootMetadata(locale: Locale): Metadata {
  const title = `${site.name} | ${siteTagline(locale)}`;
  const description = siteDescription(locale);
  const image = ogImage(locale);
  return {
    metadataBase: new URL(site.url),
    title: { default: title, template: `%s | ${site.name}` },
    description,
    applicationName: site.name,
    alternates: { canonical: href("home", locale), languages: alternateLanguages("home") },
    openGraph: {
      type: "website",
      locale: localeInfo[locale].ogLocale,
      alternateLocale: locales.filter((l) => l !== locale).map((l) => localeInfo[l].ogLocale),
      siteName: site.name,
      title,
      description,
      url: href("home", locale),
      images: [image],
    },
    twitter: { card: "summary_large_image", title, description, images: [image.url] },
    icons: { icon: "/icon.svg", apple: "/apple-icon.png" },
    formatDetection: { telephone: false },
  };
}

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

/** Nomi dei gruppi di funzionalità nella lingua della pagina. */
export function featureGroupName(group: (typeof featureGroups)[number], locale: Locale): string {
  const names = {
    Menu: t(locale, "Menu"),
    "Prenotazioni e sala": t(locale, "Prenotazioni e sala"),
    "Vendite e clienti": t(locale, "Vendite e clienti"),
    Gestione: t(locale, "Gestione"),
  };
  return names[group];
}

/** Voci dei menu dell'header, già con nomi e indirizzi della lingua. */
function headerNav(locale: Locale): HeaderNav {
  const sectors = getSectors(locale);
  const group = (ids: string[]) =>
    sectors.filter((s) => ids.includes(s.id)).map((s) => ({ id: s.id, name: s.name, icon: s.icon, href: href("sector", locale, s.id) }));
  return {
    featureGroups: featureGroups.map((g) => ({
      name: featureGroupName(g, locale),
      items: getFeatures(locale)
        .filter((f) => f.group === g)
        .map((f) => ({ id: f.id, name: f.name, icon: f.icon, href: href("feature", locale, f.id) })),
    })),
    sectorGroups: [
      { name: t(locale, "Locali"), items: group(["pizzerie", "ristoranti", "pub", "bar"]) },
      { name: t(locale, "Botteghe del cibo"), items: group(["gelaterie", "pastifici", "panetterie", "gastronomie"]) },
    ],
    services: getServices(locale).map((s) => ({ id: s.id, name: s.name, icon: s.icon, desc: s.desc, href: href("service", locale, s.id) })),
  };
}

/** Struttura comune a tutte le pagine di una lingua: <html lang>, header, contenuto, footer. */
export function RootShell({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  setLocale(locale);
  return (
    <html lang={localeInfo[locale].hreflang} className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>
        <LocaleProvider locale={locale}>
          <a
            href="#contenuto"
            className="sr-only z-[100] rounded-full bg-black px-4 py-2 text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
          >
            {t(locale, "Vai al contenuto")}
          </a>
          <SmoothScroll />
          <Header nav={headerNav(locale)} />
          <main id="contenuto">{children}</main>
          <Footer />
        </LocaleProvider>
        <JsonLd
          data={[
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "@id": `${site.url}/#organization`,
              name: site.name,
              url: site.url,
              logo: { "@type": "ImageObject", url: `${site.url}/apple-icon.png` },
              email: site.email,
              description: siteDescription(locale),
            },
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": `${site.url}${href("home", locale)}#website`,
              name: site.name,
              url: `${site.url}${href("home", locale)}`,
              inLanguage: localeInfo[locale].intl,
              publisher: { "@id": `${site.url}/#organization` },
            },
          ]}
        />
      </body>
    </html>
  );
}
