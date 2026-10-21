import { tr } from "@/i18n";

/*
 * Dati di esempio della Lista ordini (una pizzeria, nessun dato reale), condivisi dalle
 * illustrazioni per computer (ListaOrdini.tsx) e da quelle per telefono (ListaOrdiniTelefono.tsx).
 */

export type Voce = { n: string; q: string; u: string; f?: string; scorta?: boolean };
export type Categoria = { c: string; voci: Voce[] };
export type Reparto = { r: string; cat: Categoria[] };

export const dati = (): Reparto[] => [
  {
    r: tr("Pizzeria"),
    cat: [
      {
        c: tr("Alimentari"),
        voci: [
          { n: tr("Farina tipo 00"), q: "3", u: tr("sacchi"), f: tr("Molino") },
          { n: tr("Farina integrale"), q: "1", u: tr("sacco"), f: tr("Molino") },
          { n: tr("Pomodoro pelato"), q: "2", u: tr("cartoni"), f: tr("Ingrosso") },
          { n: tr("Lievito di birra"), q: "4", u: tr("pezzi"), f: tr("Ingrosso"), scorta: true },
          { n: tr("Sale grosso"), q: "1", u: tr("sacco"), f: tr("Ingrosso") },
          { n: tr("Origano"), q: "2", u: tr("pezzi"), f: tr("Ingrosso") },
        ],
      },
      {
        c: tr("Freschi"),
        voci: [
          { n: tr("Mozzarella fior di latte"), q: "12", u: "kg", f: tr("Caseificio") },
          { n: tr("Mozzarella di bufala"), q: "4", u: "kg", f: tr("Caseificio") },
          { n: tr("Basilico"), q: "3", u: tr("mazzi"), f: tr("Ortofrutta") },
          { n: tr("Salame piccante"), q: "2", u: "kg", f: tr("Salumificio") },
        ],
      },
      {
        c: tr("Surgelati"),
        voci: [
          { n: tr("Patatine"), q: "3", u: tr("cartoni"), f: tr("Ingrosso") },
          { n: tr("Crocchette"), q: "2", u: tr("cartoni"), f: tr("Ingrosso") },
        ],
      },
    ],
  },
  {
    r: tr("Cucina"),
    cat: [
      {
        c: tr("Alimentari"),
        voci: [
          { n: tr("Olio extravergine"), q: "6", u: tr("litri"), f: tr("Frantoio") },
          { n: tr("Pasta di semola"), q: "5", u: "kg", f: tr("Ingrosso") },
          { n: tr("Riso carnaroli"), q: "2", u: "kg", f: tr("Ingrosso") },
          { n: tr("Parmigiano"), q: "2", u: "kg", f: tr("Caseificio") },
        ],
      },
      {
        c: tr("Freschi"),
        voci: [
          { n: tr("Uova"), q: "60", u: tr("pezzi"), f: tr("Ortofrutta") },
          { n: tr("Panna da cucina"), q: "4", u: tr("litri"), f: tr("Caseificio") },
          { n: tr("Verdure di stagione"), q: "5", u: "kg", f: tr("Ortofrutta") },
        ],
      },
    ],
  },
  {
    r: tr("Bar"),
    cat: [
      {
        c: tr("Bevande"),
        voci: [
          { n: tr("Acqua naturale"), q: "4", u: tr("casse"), f: tr("Ingrosso bevande") },
          { n: tr("Acqua frizzante"), q: "3", u: tr("casse"), f: tr("Ingrosso bevande") },
          { n: tr("Birra in bottiglia"), q: "3", u: tr("casse"), f: tr("Ingrosso bevande") },
          { n: tr("Caffè in grani"), q: "4", u: "kg", f: tr("Torrefazione") },
          { n: tr("Limoni"), q: "2", u: "kg", f: tr("Ortofrutta") },
        ],
      },
    ],
  },
  {
    r: tr("Pulizie"),
    cat: [
      {
        c: tr("Detersivi"),
        voci: [
          { n: tr("Detersivo piatti"), q: "2", u: tr("taniche"), f: tr("Ingrosso") },
          { n: tr("Sgrassatore"), q: "3", u: tr("bottiglie"), f: tr("Ingrosso") },
          { n: tr("Rotoli di carta"), q: "2", u: tr("cartoni"), f: tr("Ingrosso") },
          { n: tr("Sacchi per rifiuti"), q: "1", u: tr("cartone"), f: tr("Ingrosso") },
        ],
      },
    ],
  },
];

/** Colore del brand della pizzeria di esempio, usato sul foglio stampato. */
export const BRAND = "#b4532a";

