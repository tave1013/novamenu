# Glossario italiano → inglese

Scelte di traduzione usate nel sito. L'inglese è britannico (colours, organise,
takeaway, rota, till). Quando si aggiunge o si modifica un testo, usare gli
stessi termini.

## Parole del mestiere

| Italiano | Inglese | Note |
| --- | --- | --- |
| locale | venue | Parola neutra per ristorante, bar, negozio. Mai "local". |
| titolare | owner | |
| gestionale | management software / software | Nei titoli SEO "restaurant management software". |
| asporto | takeaway | Non "takeout" (americano). |
| ritiro | collection | Non "pickup" (americano). |
| fascia oraria, fascia di ritiro | time slot, collection slot | |
| prenotazione | booking | Non "reservation". |
| prenotare (un prodotto) | pre-order | Pane, vaschette, torte ordinati in anticipo. |
| coperti | covers | "48 covers out of 60". |
| costo a coperto | per-cover fee | Riferito alle commissioni dei portali, non al coperto in conto. |
| comanda | order | "Il cameriere prende la comanda" → "the waiter takes the order". |
| sala | dining room | "Piantina della sala" → "floor plan". |
| sala e tavoli | floor plan and tables | Nome della funzione. |
| bancone | bar (in un bar), counter (in negozio) | |
| cassa | till | |
| esaurito | sold out | |
| carrello | basket | Non "cart" (americano). |
| piatto del giorno | dish of the day | |
| scontrino medio | average spend | |
| caparra | deposit | |
| mancata presentazione | no-show | |
| disdetta | cancellation | |
| ferie e chiusure | holidays and closures | |
| turni | rota | "Staff e turni" → "Staff and rotas". |
| clienti abituali | regulars | |
| commissioni | commission | Al singolare: "zero commission". |
| preventivo | quote | |
| IVA esclusa | excl. VAT | |
| P. IVA | VAT no. | |
| scheda Google | Google Business Profile | Nome ufficiale del prodotto. |
| assistente vocale | voice assistant | |

## Tipi di attività

| Italiano | Inglese |
| --- | --- |
| pizzerie | pizzerias |
| ristoranti e trattorie | restaurants and trattorias |
| pub e birrerie | pubs and beer halls |
| bar | cafés and bars |
| gelaterie | ice cream shops |
| pastifici | fresh pasta shops |
| panetterie | bakeries |
| gastronomie, rosticcerie | delis, rotisseries |

Il bar italiano è reso con "cafés and bars": "bar" da solo in inglese fa pensare
solo a un posto dove si beve alcol.

## Allergeni

| Italiano | Inglese |
| --- | --- |
| allergeni | allergens |
| glutine | gluten |
| latte | milk |
| uova | eggs |
| frutta a guscio | tree nuts |
| sedano | celery |
| pesce | fish |

## Cosa resta in italiano

- Nomi di piatti e prodotti tipici: margherita, supplì, tajarin, agnolotti del
  plin, tonnarelli, spritz, aperitivo, fior di latte, gianduia. Dove serve si
  aggiunge una breve spiegazione, non si traduce il nome.
- Nomi dei locali di esempio (Pizzeria Fiore, Gelateria Polo Nord) e delle
  persone.
- I nomi dei piani: Base, Pro, Premium.

## Numeri, prezzi, date

- I prezzi dei piani stanno solo in `src/config/prezzi.ts`, in euro e in sterline.
  Le sterline sono un listino a parte (Base £18, Pro £55, Premium £79 al mese;
  in euro 19 €, 59 €, 89 €), mai una conversione. La valuta non dipende dalla
  lingua: Regno Unito in sterline, tutti gli altri paesi in euro, e il selettore
  € / £ vicino ai prezzi salva la scelta nel cookie `nm_preferenze`.
  Accanto al prezzo: "al mese + IVA", in inglese "per month, excl. VAT".
- Negli esempi (prezzi dei piatti nelle illustrazioni e nelle guide) l'inglese usa
  le sterline: la valuta di esempio di ogni lingua sta in `src/i18n/config.ts`
  (`currency`, `symbol`).
- I prezzi di esempio (piatti, ordini, conti nelle guide) tengono lo stesso
  numero e cambiano solo simbolo e formato: `27,50 €` → `£27.50`,
  `4.280 €` → `£4,280`.
- Orari a 24 ore come in italiano (`22:30`), con i due punti.
- Date scritte per esteso con `Intl` (`13 October 2026`).
- Gli orari delle demo sono indicati come "Italian time (CET)".

## Tono

Si dà del "tu" in italiano e in inglese si parla direttamente a "you", con
frasi brevi e contrazioni ("you'll", "it's"), come farebbe una persona al
telefono. Niente gergo da marketing ("leverage", "seamless", "unlock").
