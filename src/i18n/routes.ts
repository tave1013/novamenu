import { defaultLocale, localeInfo, locales, type Locale } from "./config";

/*
 * Mappa centrale delle rotte: ogni pagina del sito e il suo indirizzo in ogni lingua.
 * Tutti i link interni passano da href(), così una pagina non può puntare alla lingua sbagliata.
 * Gli indirizzi italiani non hanno prefisso; le altre lingue stanno sotto /<lingua>/.
 */
export type PageKey =
  | "home"
  | "features"
  | "feature"
  | "sectors"
  | "sector"
  | "services"
  | "service"
  | "pricing"
  | "guides"
  | "guide"
  | "contact"
  | "demo"
  | "privacy"
  | "terms"
  | "cookies";

/** [id] è il segmento che cambia: viene sostituito con lo slug della lingua. */
export const routes: Record<PageKey, Record<Locale, string>> = {
  home: { it: "/", en: "/" },
  features: { it: "/funzionalita/", en: "/features/" },
  feature: { it: "/funzionalita/[id]/", en: "/features/[id]/" },
  sectors: { it: "/settori/", en: "/industries/" },
  sector: { it: "/settori/[id]/", en: "/industries/[id]/" },
  services: { it: "/servizi/", en: "/services/" },
  service: { it: "/servizi/[id]/", en: "/services/[id]/" },
  pricing: { it: "/prezzi/", en: "/pricing/" },
  guides: { it: "/guide/", en: "/guides/" },
  guide: { it: "/guide/[id]/", en: "/guides/[id]/" },
  contact: { it: "/contatti/", en: "/contact/" },
  demo: { it: "/demo/", en: "/demo/" },
  privacy: { it: "/privacy/", en: "/privacy/" },
  terms: { it: "/termini/", en: "/terms/" },
  cookies: { it: "/cookie/", en: "/cookies/" },
};

type Collection = "feature" | "sector" | "service" | "guide";

/**
 * Slug delle pagine con indirizzo variabile. La chiave è l'identificativo interno
 * (lo slug italiano, che non cambia mai); il valore è lo slug in ogni altra lingua.
 */
export const slugs: Record<Collection, Record<string, Partial<Record<Locale, string>>>> = {
  feature: {
    "menu-digitale": { en: "digital-menu" },
    "importa-menu-ai": { en: "menu-import" },
    traduzioni: { en: "menu-translation" },
    "menu-a-orari": { en: "timed-menus" },
    prenotazioni: { en: "table-bookings" },
    "sala-e-tavoli": { en: "floor-plan-and-tables" },
    "ferie-e-chiusure": { en: "holidays-and-closures" },
    "ordini-whatsapp": { en: "whatsapp-orders" },
    clienti: { en: "customers" },
    "automazioni-whatsapp": { en: "whatsapp-automations" },
    statistiche: { en: "analytics" },
    "staff-e-turni": { en: "staff-and-rotas" },
    assistente: { en: "voice-assistant" },
  },
  sector: {
    pizzerie: { en: "pizzerias" },
    ristoranti: { en: "restaurants" },
    pub: { en: "pubs" },
    bar: { en: "cafes-and-bars" },
    gelaterie: { en: "ice-cream-shops" },
    pastifici: { en: "fresh-pasta-shops" },
    panetterie: { en: "bakeries" },
    gastronomie: { en: "delis" },
  },
  service: {
    "foto-e-video": { en: "photo-and-video" },
    "gestione-social": { en: "social-media-management" },
    "presenza-online": { en: "online-presence" },
  },
  guide: {
    "come-creare-menu-digitale-qr": { en: "how-to-create-a-qr-code-digital-menu" },
    "allergeni-nel-menu": { en: "allergens-on-your-menu" },
    "ordini-asporto-whatsapp-senza-commissioni": { en: "takeaway-orders-on-whatsapp-without-commission" },
    "ridurre-no-show-ristorante": { en: "how-to-reduce-restaurant-no-shows" },
    "pizzeria-ore-perse-al-telefono": { en: "pizzeria-hours-lost-on-the-phone" },
    "gastronomia-vendere-di-piu-a-pranzo": { en: "deli-ideas-to-sell-more-at-lunch" },
    "panetteria-pane-prenotato-meno-spreco": { en: "bakery-bread-pre-orders-less-waste" },
    "pastificio-ordini-di-natale": { en: "pasta-shop-christmas-orders" },
    "bar-scontrino-medio-colazione-aperitivo": { en: "cafe-raise-average-spend" },
    "gelateria-vaschette-torte-gelato": { en: "ice-cream-shop-tubs-and-cakes" },
  },
};

const isCollection = (key: PageKey): key is Collection => key in slugs;

/** Slug di una pagina in una lingua, a partire dal suo identificativo. */
export function slugOf(collection: Collection, id: string, locale: Locale): string {
  return locale === defaultLocale ? id : slugs[collection][id]?.[locale] ?? id;
}

/** Identificativo di una pagina a partire dallo slug che compare nell'indirizzo. */
export function idOf(collection: Collection, slug: string, locale: Locale): string | undefined {
  if (locale === defaultLocale) return slug in slugs[collection] ? slug : undefined;
  return Object.keys(slugs[collection]).find((id) => slugs[collection][id][locale] === slug);
}

/** Indirizzo di una pagina in una lingua. Per le pagine con indirizzo variabile serve l'identificativo. */
export function href(key: PageKey, locale: Locale, id?: string): string {
  let path = routes[key][locale];
  if (isCollection(key)) path = path.replace("[id]", slugOf(key, id ?? "", locale));
  return `${localeInfo[locale].prefix}${path}`;
}

/** Riconosce la pagina a partire dall'indirizzo: serve al selettore della lingua. */
export function matchPath(pathname: string): { key: PageKey; locale: Locale; id?: string } | null {
  const clean = pathname.endsWith("/") ? pathname : `${pathname}/`;
  // Prima le lingue con prefisso, poi quella alla radice.
  const ordered = [...locales].sort((a, b) => localeInfo[b].prefix.length - localeInfo[a].prefix.length);
  for (const locale of ordered) {
    const prefix = localeInfo[locale].prefix;
    if (prefix && !clean.startsWith(`${prefix}/`)) continue;
    const rest = clean.slice(prefix.length);
    for (const key of Object.keys(routes) as PageKey[]) {
      const pattern = routes[key][locale];
      if (!pattern.includes("[id]")) {
        if (pattern === rest) return { key, locale };
        continue;
      }
      const [before, after] = pattern.split("[id]");
      if (rest.startsWith(before) && rest.endsWith(after)) {
        const slug = rest.slice(before.length, rest.length - after.length);
        if (!slug || slug.includes("/")) continue;
        const id = idOf(key as Collection, slug, locale);
        if (id) return { key, locale, id };
      }
    }
  }
  return null;
}

/** Stessa pagina in un'altra lingua; se non esiste, la home di quella lingua. */
export function switchLocale(pathname: string, to: Locale): string {
  const m = matchPath(pathname);
  return m ? href(m.key, to, m.id) : href("home", to);
}
