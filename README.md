# Sito vetrina

Sito pubblico della piattaforma: home, una pagina per ogni funzionalità e per ogni settore, prezzi, guide, demo, contatti e pagine legali. È fatto con Next.js: le pagine sono generate in anticipo e su Vercel gira solo un piccolo middleware che, alla prima visita della home, sceglie la lingua in base al paese (`src/middleware.ts`).

## Avviarlo sul Mac

```bash
npm install
npm run dev
```

Poi apri http://localhost:3000

## Dove si cambia cosa

| Cosa | File |
| --- | --- |
| Nome della piattaforma, indirizzi | `src/config/site.ts` |
| Dati della società (ragione sociale, numero, sede...) | `src/lib/legal/azienda.ts` |
| Testi delle funzionalità | `src/content/features.ts` |
| Testi dei settori | `src/content/sectors.ts` |
| Piani, confronto, domande frequenti | `src/content/plans.ts` |
| Prezzi dei piani | dalla piattaforma (console), letti da `src/lib/prezzi/listino.ts` e aggiornati ogni ora |
| Guide (articoli) | `src/content/guides.ts` |
| Documenti legali (italiano e inglese) | `src/content/legale/it/` e `src/content/legale/en/` |
| Elenco dei cookie (cookie policy e banner) | `src/lib/consenso/cookie.ts` |
| Testi del banner dei cookie | `src/lib/consenso/testi.ts` |
| PDF scaricabili di Termini e DPA (generati a ogni build) | `src/lib/legal/pdf.tsx` |
| Versioni precedenti dei documenti legali | `src/content/legale/archivio/<lingua>/<documento>-<versione>.md` |
| Animazioni delle pagine | `src/components/visuals/` |
| Immagine per le anteprime social | `public/og.png` |

## Variabili su Vercel

Copia `.env.example` e imposta su Vercel (Settings, Environment Variables):

- `NEXT_PUBLIC_SITE_URL`: l'indirizzo del sito, per esempio `https://www.nomefinale.it`
- `NEXT_PUBLIC_APP_URL`: l'indirizzo della dashboard
- `NEXT_PUBLIC_WHATSAPP`: il numero che riceve le richieste di demo, solo cifre con prefisso (es. `393331234567`)
- `NEXT_PUBLIC_GA4_ID`, `NEXT_PUBLIC_CLARITY_ID`, `NEXT_PUBLIC_META_PIXEL_ID`: identificativi di Google Analytics, Microsoft Clarity e Meta Pixel. Si caricano solo dopo il consenso; senza identificativo lo strumento non parte mai.
- `NEXT_PUBLIC_CONSENSO_ENDPOINT`: indirizzo della funzione Supabase che salva le scelte sui cookie nella tabella `consensi_cookie`.

## Controlli

```bash
npm run verifica
```

Fa il build (prima legge i prezzi dalla piattaforma), ricrea la cartella `out/` con una pagina HTML per indirizzo e controlla link, lingue, canonical e hreflang. Dopo, `node scripts/seo-check.mjs out` controlla titoli e descrizioni e `node scripts/scansione-cookie.mjs <indirizzi>` elenca i cookie reali di una pagina.

## Prima di andare online

- Completare i dati tra parentesi quadre in `src/lib/legal/azienda.ts`.
- Far verificare i documenti legali a un consulente.
- Nella dashboard servono le pagine `/registrati` e `/accedi` (i pulsanti "Prova gratis" e "Accedi" puntano lì).
- Quando c'è il dominio definitivo: aggiornare `NEXT_PUBLIC_SITE_URL` e inviare la sitemap (`/sitemap.xml`) a Google Search Console.
