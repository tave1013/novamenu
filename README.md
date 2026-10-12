# Sito vetrina

Sito pubblico della piattaforma: home, una pagina per ogni funzionalità e per ogni settore, prezzi, guide, demo, contatti e pagine legali. È fatto con Next.js ed esportato come sito statico, quindi su Vercel non serve nessun server.

## Avviarlo sul Mac

```bash
npm install
npm run dev
```

Poi apri http://localhost:3000

## Dove si cambia cosa

| Cosa | File |
| --- | --- |
| Nome della piattaforma, email, dati legali | `src/config/site.ts` |
| Testi delle funzionalità | `src/content/features.ts` |
| Testi dei settori | `src/content/sectors.ts` |
| Prezzi, confronto piani, domande frequenti | `src/content/plans.ts` |
| Guide (articoli) | `src/content/guides.ts` |
| Privacy, cookie, termini | `src/content/legal.ts` |
| Animazioni delle pagine | `src/components/visuals/` |
| Immagine per le anteprime social | `public/og.png` |

## Variabili su Vercel

Copia `.env.example` e imposta su Vercel (Settings, Environment Variables):

- `NEXT_PUBLIC_SITE_URL`: l'indirizzo del sito, per esempio `https://www.nomefinale.it`
- `NEXT_PUBLIC_APP_URL`: l'indirizzo della dashboard
- `NEXT_PUBLIC_WHATSAPP`: il numero che riceve le richieste di demo, solo cifre con prefisso (es. `393331234567`)

## Prima di andare online

- Completare ragione sociale, P. IVA, indirizzo, PEC ed email in `src/config/site.ts`.
- Far verificare privacy, cookie e termini a un consulente.
- Nella dashboard servono le pagine `/registrati` e `/accedi` (i pulsanti "Prova gratis" e "Accedi" puntano lì).
- Quando c'è il dominio definitivo: aggiornare `NEXT_PUBLIC_SITE_URL` e inviare la sitemap (`/sitemap.xml`) a Google Search Console.
