/**
 * Dati del sito in un solo posto.
 * Per cambiare nome alla piattaforma basta modificare `name` qui sotto.
 */
export const site = {
  name: "NovaMenu",
  /** Frase breve usata nei titoli e nelle anteprime social. */
  tagline: "Menu digitale, ordini e prenotazioni per il tuo locale",
  description:
    "Menu digitale con QR, ordini da asporto su WhatsApp, prenotazioni, sala e clienti in un'unica piattaforma. Senza commissioni, in italiano, pronta in un pomeriggio.",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://novamenu.eu").replace(/\/$/, ""),
  appUrl: (process.env.NEXT_PUBLIC_APP_URL || "https://app.novamenu.eu").replace(/\/$/, ""),
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP || "393000000000",
  email: "ciao@novamenu.eu",
  /** Dati legali: da completare prima della pubblicazione. */
  company: {
    legalName: "[Ragione sociale]",
    vat: "[Partita IVA]",
    address: "[Indirizzo della sede], Acqui Terme (AL)",
    pec: "[PEC]",
  },
  locale: "it_IT",
};

export const signupUrl = `${site.appUrl}/registrati`;
export const loginUrl = `${site.appUrl}/accedi`;

export function waLink(text: string) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
}
