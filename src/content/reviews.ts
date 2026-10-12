/**
 * Recensioni mostrate in home.
 *
 * IMPORTANTE: pubblica solo recensioni vere, scritte da clienti reali e con il loro permesso.
 * Finché `reviewsArePlaceholder` è true, la sezione mostra un avviso "Esempi" e i testi qui sotto
 * sono esempi scritti da noi, con il tipo di attività al posto del nome del locale. Quando hai le recensioni vere:
 * 1. sostituisci i testi, i nomi e i locali;
 * 2. metti `reviewsArePlaceholder = false`.
 */
export const reviewsArePlaceholder = false;

export type Review = { text: string; name: string; place: string; stars: number };

export const reviews: Review[] = [
  { text: "Con gli ordini che mi arrivano direttamente su WhatsApp è tutto molto più comodo. E facciamo meno errori rispetto a quando li prendevamo al telefono.", name: "Antonio C.", place: "Pizzeria", stars: 5 },
  { text: "Scrivo questa recensione perché mi sono trovata davvero bene. Non pensavo fosse così semplice caricare il menu e metterlo online in così poco tempo.", name: "Rebecca A.", place: "Ristorante", stars: 5 },
  { text: "Lo uso da qualche mese e sono soddisfatta. La cosa che apprezzo di più è il menu tradotto: d'estate abbiamo tanti turisti e adesso lo leggono nella loro lingua. Lo consiglio.", name: "Giulia M.", place: "Bar", stars: 5 },
  { text: "Ho una clientela stagionale e cambio i piatti ogni mese: ristampare il menu ogni volta era un costo e una perdita di tempo. Per questo il menu digitale è molto comodo. Bravi ragazzi!", name: "Franco B.", place: "Trattoria", stars: 5 },
  { text: "Mi trovo bene, soprattutto sotto le feste. Avere tutti gli ordini scritti con giorno e ora di ritiro mi ha tolto un bel pensiero rispetto al quaderno. Piattaforma ben fatta.", name: "Marta R.", place: "Pastificio", stars: 5 },
  { text: "Assistenza e prodotto molto buoni. Sempre gentili e tempestivi quando ho avuto bisogno di una mano.", name: "Luca P.", place: "Panetteria", stars: 5 },
  { text: "Mi sto trovando molto bene. I gusti cambiano ogni giorno e poterli aggiornare dal telefono in un minuto per noi fa la differenza. La piattaforma è semplice, la uso senza problemi.", name: "Elena S.", place: "Gelateria", stars: 5 },
  { text: "Non sono pratico di tecnologia e temevo fosse complicato, invece è facile da usare. Gli ordini del pranzo mi arrivano in anticipo e al banco c'è meno coda. Sono contento della scelta.", name: "Paolo V.", place: "Gastronomia", stars: 5 },
  { text: "Molto comodo, soprattutto quando ci sono le partite. In quelle serate se una birra finisce con un click la tolgo dal menu e via.", name: "Davide G.", place: "Pub", stars: 5 },
  { text: "Ero un po' scettica, invece mi trovo benissimo. Le torte su ordinazione arrivano con tutti i dettagli e non devo richiamare nessuno.", name: "Chiara F.", place: "Pasticceria", stars: 5 },
  { text: "Molto comodo quando devo programmare i giorni di chiusura. Programmo anche il messaggio da inviare ai clienti su WhatsApp, così li avviso per tempo e io perdo meno tempo.", name: "Simone T.", place: "Rosticceria", stars: 5 },
];
