import { AZIENDA } from "@/lib/legal/azienda";

/**
 * Dati del sito in un solo posto.
 * Per cambiare nome alla piattaforma basta modificare `name` qui sotto.
 */
export const site = {
  name: "NovaMenu",
  /** Frase breve usata nei titoli e nelle anteprime social. */
  tagline: "Menu digitale, ordini e prenotazioni per il tuo locale",
  description:
    "Menu digitale con QR, ordini da asporto su WhatsApp e prenotazioni per il tuo locale. Nessuna commissione, pronto in un pomeriggio. Prova gratis 14 giorni.",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://www.novamenu.eu").replace(/\/$/, ""),
  appUrl: (process.env.NEXT_PUBLIC_APP_URL || "https://app.novamenu.eu").replace(/\/$/, ""),
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP || "393000000000",
  /** Dati della società: in src/lib/legal/azienda.ts. */
  email: AZIENDA.emailContatto,
  locale: "it_IT",
};

export const signupUrl = `${site.appUrl}/registrati`;
export const loginUrl = `${site.appUrl}/accedi`;
/** Dove porta il link "Dashboard" quando hai già fatto l'accesso. */
export const dashboardUrl = site.appUrl;

export function waLink(text: string) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
}
