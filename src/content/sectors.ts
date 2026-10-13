import type { IconName } from "@/components/Icon";
import type { Tone } from "./features";
import { withId } from "./util";

/* Dati delle grafiche statiche dei settori: ogni settore mostra i suoi prodotti, i suoi orari, i suoi ordini. */
export type ArtItem = { name: string; desc?: string; price: string; unit?: string; tag?: string; out?: boolean; c?: string };
export type CatalogArt = { kind: "catalog"; shop: string; status: string; tabs: string[]; items: ArtItem[]; note?: string };
export type SlotsArt = {
  kind: "slots";
  title: string;
  days: { d: string; n: string; full?: boolean }[];
  slots: { t: string; s: "free" | "few" | "full" | "sel" }[];
  note: string;
};
export type OrderArt = { kind: "order"; who: string; lines: string[]; total: string; when: string; extra?: string };
export type DaypartsArt = { kind: "dayparts"; rows: { t: string; time: string; on: boolean; items: string }[]; note?: string };
export type BookingArt = { kind: "booking"; title: string; sub: string; used: number; total: number; list: { name: string; n: number; time: string; note?: string }[] };
export type LangsArt = { kind: "langs"; dish: string; lines: { flag: string; text: string }[] };
export type CalcArt = { kind: "calc"; title: string; rows: { label: string; value: string }[]; result: { label: string; value: string }; note?: string };
export type KpisArt = { kind: "kpis"; title: string; items: { value: string; label: string }[]; note?: string };
export type SectorArt = CatalogArt | SlotsArt | OrderArt | DaypartsArt | BookingArt | LangsArt | CalcArt | KpisArt;

export type Sector = {
  /** Identificativo interno, uguale in tutte le lingue (è lo slug italiano). */
  id: string;
  slug: string;
  name: string;
  short: string;
  icon: IconName;
  tone: Tone;
  seo: { title: string; description: string };
  hero: { title: string; hl: string; lead: string };
  heroArt: { main: CatalogArt; floats: { icon: IconName; t: string; d: string }[] };
  /** Foto del settore (in public/images/settori). Se manca, la pagina mostra solo le grafiche. */
  photo?: {
    src: string;
    alt: string;
    caption: string;
    pos?: string;
    /** Come mostrare la foto: al centro con la scritta sopra, oppure di lato con titolo e testo. */
    layout?: "center" | "left" | "right";
    text?: string;
    points?: string[];
  };
  showcase: { tag: string; title: string; text: string; points: string[]; art: SectorArt }[];
  day: { time: string; text: string }[];
  uses: { feature: string; text: string }[];
  faq: { q: string; a: string }[];
};

export const sectors: Sector[] = withId<Sector>([
  {
    slug: "pizzerie",
    name: "Pizzerie",
    short: "Asporto e serate piene",
    icon: "pizza",
    tone: "red",
    seo: {
      title: "Menu digitale per pizzeria e ordini da asporto",
      description:
        "Menu digitale per pizzeria con ordini da asporto su WhatsApp: fasce di ritiro, pizze finite tolte subito, tavoli prenotati. Zero commissioni. Prova gratis.",
    },
    hero: {
      title: "Più pizze da asporto, meno telefonate.",
      hl: "meno telefonate",
      lead: "NovaMenu è il menu digitale per pizzerie che prende gli ordini da asporto al posto tuo: arrivano scritti su WhatsApp, con l'orario di ritiro. Le prenotazioni si confermano con un tocco e quando finisce la bufala la togli in un secondo.",
    },
    heroArt: {
      main: {
        kind: "catalog",
        shop: "Pizzeria da Mario",
        status: "Asporto aperto fino alle 22:30",
        tabs: ["Rosse", "Bianche", "Fritti", "Bibite"],
        items: [
          { name: "Margherita", desc: "Pomodoro, fiordilatte, basilico", price: "7,00", c: "#fde68a" },
          { name: "Bufala", desc: "Pomodoro, bufala DOP, basilico", price: "9,50", out: true, c: "#fecaca" },
          { name: "Diavola", desc: "Salame piccante, fiordilatte", price: "8,50", tag: "Piccante", c: "#fca5a5" },
          { name: "Impasto integrale", desc: "Su qualsiasi pizza", price: "+1,00", c: "#e7d5b5" },
        ],
      },
      floats: [
        { icon: "bag", t: "Nuovo ordine da asporto", d: "Ritiro 19:45, 3 pizze" },
        { icon: "clock", t: "Fascia delle 20:00 piena", d: "I clienti vedono le successive" },
      ],
    },
    showcase: [
      {
        tag: "Fasce di ritiro",
        title: "Il forno non va in crisi: ogni fascia ha il suo limite.",
        text: "Decidi quanti ordini accettare ogni quarto d'ora. Quando una fascia è piena il cliente vede solo quelle libere, e tu non devi richiamare nessuno per spostare il ritiro.",
        points: ["Limite di ordini per fascia", "Pausa ordini con un tocco", "Orari diversi nel weekend"],
        art: {
          kind: "slots",
          title: "Scegli quando ritirare",
          days: [{ d: "Ven", n: "17" }, { d: "Sab", n: "18" }, { d: "Dom", n: "19" }],
          slots: [
            { t: "19:00", s: "free" }, { t: "19:15", s: "few" }, { t: "19:30", s: "full" },
            { t: "19:45", s: "sel" }, { t: "20:00", s: "full" }, { t: "20:15", s: "free" },
          ],
          note: "Ritiro sabato alle 19:45",
        },
      },
      {
        tag: "Ordine su WhatsApp",
        title: "L'ordine arriva scritto, con varianti e totale.",
        text: "Niente ordini dettati nel pieno del servizio e niente nomi sbagliati sul foglietto. L'ordine arriva con varianti, note e totale, e il pizzaiolo lo legge già in ordine di ritiro.",
        points: ["Varianti e aggiunte con il loro prezzo", "Note del cliente in evidenza", "0% di commissioni"],
        art: {
          kind: "order",
          who: "Luca Bianchi",
          lines: ["2 × Margherita", "1 × Diavola, impasto integrale", "1 × Patatine"],
          total: "€ 27,50",
          when: "Ritiro sabato 19:45",
          extra: "Nota: tagliate a spicchi, grazie",
        },
      },
    ],
    day: [
      { time: "17:30", text: "Arrivano i primi ordini per le 19:30, già scritti e in ordine di ritiro." },
      { time: "19:45", text: "Finisce la bufala: la segni esaurita dal telefono, sparisce dal menu." },
      { time: "20:30", text: "Forno pieno: metti in pausa gli ordini per mezz'ora con un tocco." },
      { time: "Domenica", text: "Parte il messaggio della pizza del mese ai clienti abituali." },
    ],
    uses: [
      { feature: "ordini-whatsapp", text: "Asporto con fasce di ritiro e limite di ordini per fascia, così il forno non va in crisi." },
      { feature: "menu-digitale", text: "Pizze con varianti, impasti speciali e aggiunte a pagamento." },
      { feature: "prenotazioni", text: "Tavoli del weekend confermati senza telefonate, seggiolini compresi." },
      { feature: "assistente", text: "\"Bufala finita\" detto a voce, mentre stendi l'impasto." },
    ],
    faq: [
      { q: "Posso gestire impasti diversi e aggiunte?", a: "Sì, puoi gestire impasti diversi e aggiunte: ogni pizza può avere varianti (impasto, formato) e aggiunte con il loro prezzo." },
      { q: "Quanti ordini posso ricevere per fascia?", a: "Decidi tu quanti ordini ricevere per ogni fascia di ritiro. Quando una fascia è piena, il cliente vede solo quelle successive." },
    ],
  },
  {
    slug: "ristoranti",
    name: "Ristoranti e trattorie",
    short: "Sala, prenotazioni, turisti",
    icon: "fork",
    tone: "blue",
    seo: {
      title: "Gestionale per ristoranti: prenotazioni e sala",
      description:
        "Gestionale per ristoranti e trattorie: prenotazioni online senza commissioni, piantina della sala, menu tradotto per i turisti. Prova gratis 14 giorni.",
    },
    hero: {
      title: "La sala piena. Anche il martedì.",
      hl: "Anche il martedì",
      lead: "NovaMenu è il gestionale per ristoranti e trattorie che tiene insieme prenotazioni, sala e menu. Nessuna commissione a coperto, il menu nella lingua dei turisti e un promemoria che riduce i tavoli vuoti.",
    },
    photo: { src: "/images/settori/ristorante.webp", alt: "Cameriere che serve un piatto a una cliente in una sala elegante con luci calde", caption: "La sala piena, il servizio tranquillo.", pos: "50% 40%", layout: "center" },
    heroArt: {
      main: {
        kind: "catalog",
        shop: "Trattoria del Borgo",
        status: "Cucina aperta 12:00 a 14:30, 19:00 a 22:30",
        tabs: ["Antipasti", "Primi", "Secondi", "Dolci"],
        items: [
          { name: "Tajarin al ragù", desc: "Pasta all'uovo tirata a mano", price: "12,00", c: "#fde68a" },
          { name: "Agnolotti del plin", desc: "Al sugo d'arrosto", price: "13,00", tag: "Della casa", c: "#fed7aa" },
          { name: "Brasato al Barolo", desc: "Con polenta morbida", price: "18,00", c: "#d6b8a8" },
          { name: "Menu degustazione", desc: "5 portate, vini a parte", price: "45,00", c: "#e0e7ff" },
        ],
      },
      floats: [
        { icon: "calendarCheck", t: "Prenotazione confermata", d: "Sabato 20:30, 4 persone" },
        { icon: "globe", t: "Menu letto in inglese", d: "12 volte stasera" },
      ],
    },
    showcase: [
      {
        tag: "Prenotazioni",
        title: "La serata la vedi già al mattino, coperto per coperto.",
        text: "Le prenotazioni arrivano dal tuo sito e da Google, entro i coperti che decidi tu. Allergie e seggiolini sono scritti accanto al nome.",
        points: ["Coperti massimi per turno", "Promemoria il giorno prima", "Nessuna commissione a prenotazione"],
        art: {
          kind: "booking",
          title: "Sabato sera",
          sub: "Turno delle 20:00",
          used: 62,
          total: 80,
          list: [
            { name: "Famiglia Rossi", n: 6, time: "20:00", note: "Seggiolone" },
            { name: "Marco e Giulia", n: 2, time: "20:15", note: "Anniversario" },
            { name: "Anna Ferrero", n: 4, time: "20:30", note: "Celiaca" },
          ],
        },
      },
      {
        tag: "Turisti",
        title: "Il piatto tipico resta in italiano. La spiegazione no.",
        text: "Il menu si apre nella lingua del telefono. Il nome del piatto resta quello vero, sotto c'è la spiegazione chiara per chi viene da fuori.",
        points: ["Inglese, francese, tedesco e spagnolo", "Allergeni tradotti correttamente", "Ritocchi a mano quando vuoi"],
        art: {
          kind: "langs",
          dish: "Agnolotti del plin",
          lines: [
            { flag: "🇬🇧", text: "Small pinched ravioli filled with roast meat" },
            { flag: "🇩🇪", text: "Kleine Ravioli mit Bratenfüllung" },
            { flag: "🇫🇷", text: "Petits raviolis farcis à la viande rôtie" },
          ],
        },
      },
    ],
    day: [
      { time: "10:00", text: "Controlli le prenotazioni della sera: sono già confermate." },
      { time: "12:00", text: "Il menu del pranzo si attiva da solo." },
      { time: "20:15", text: "Una coppia senza prenotazione: la piantina ti dice dove farla sedere." },
      { time: "Il giorno dopo", text: "Parte la richiesta di recensione su Google." },
    ],
    uses: [
      { feature: "prenotazioni", text: "Turni, coperti massimi e conferma automatica per i tavoli piccoli." },
      { feature: "sala-e-tavoli", text: "La piantina vera della tua sala, con lo stato di ogni tavolo." },
      { feature: "traduzioni", text: "Menu in quattro lingue per chi arriva da fuori." },
      { feature: "automazioni-whatsapp", text: "Promemoria e richiesta di recensione, in automatico." },
    ],
    faq: [
      { q: "Sostituisce i portali di prenotazione?", a: "Sì, per le prenotazioni dirette puoi usarlo al posto dei portali, senza commissioni. Puoi anche affiancarlo all'inizio e decidere con calma." },
      { q: "Posso gestire più sale?", a: "Sì, puoi gestire più sale: interne, dehors e privé, ognuna con la sua piantina." },
    ],
  },
  {
    slug: "pub",
    name: "Pub e birrerie",
    short: "Spine, partite, serate a tema",
    icon: "beer",
    tone: "amber",
    seo: {
      title: "Menu digitale per pub e birrerie, con le spine",
      description:
        "Menu digitale per pub e birrerie: spine aggiornate dal telefono, happy hour che parte da solo, tavoli prenotati per partite ed eventi. Prova gratis 14 giorni.",
    },
    hero: {
      title: "Spine nuove, serate piene.",
      hl: "serate piene",
      lead: "NovaMenu è il menu digitale per pub e birrerie che aggiorni dal bancone: togli una spina finita in un tocco, apri le prenotazioni per la partita con i posti contati e avvisi i clienti delle serate a tema.",
    },
    photo: { src: "/images/settori/pub.webp", alt: "Barista sorridente che incassa un pagamento con il telefono al bancone di un pub", caption: "Al bancone, non al telefono.", pos: "50% 35%", layout: "left", text: "Spilli le birre, servi, chiacchieri con i clienti. Le prenotazioni per la partita, le spine nuove e le serate a tema le gestisci dal telefono, senza lasciare il bancone.", points: ["Spine aggiornate in un attimo", "Posti limitati per gli eventi", "Inviti alle serate a chi li vuole"] },
    heroArt: {
      main: {
        kind: "catalog",
        shop: "The Old Barrel",
        status: "Aperto fino all'1:00",
        tabs: ["Alla spina", "Bottiglie", "Cucina"],
        items: [
          { name: "IPA della casa", desc: "6,5% · amara e agrumata", price: "6,00", unit: "0,4 L", c: "#fcd34d" },
          { name: "Weiss", desc: "5,2% · banana e chiodo di garofano", price: "5,50", unit: "0,4 L", c: "#fde68a" },
          { name: "Stout", desc: "4,8% · caffè e cacao", price: "6,00", unit: "0,4 L", out: true, c: "#57534e" },
          { name: "Hamburger del pub", desc: "Con patatine", price: "13,00", c: "#d6b8a8" },
        ],
      },
      floats: [
        { icon: "calendarCheck", t: "Partita di sabato", d: "34 posti su 40 prenotati" },
        { icon: "sparkle", t: "Nuova spina online", d: "Red Ale, 5,4%" },
      ],
    },
    showcase: [
      {
        tag: "Serate ed eventi",
        title: "Per la partita i posti finiscono. E lo sai prima.",
        text: "Apri le prenotazioni per l'evento con il numero di posti che hai. Quando sono finiti la prenotazione si chiude da sola.",
        points: ["Posti limitati per evento", "Tavoli da 2 a 12 persone", "Promemoria il giorno della partita"],
        art: {
          kind: "booking",
          title: "Partita di sabato",
          sub: "Calcio d'inizio 21:00",
          used: 34,
          total: 40,
          list: [
            { name: "Andrea e amici", n: 8, time: "20:30", note: "Vicino allo schermo" },
            { name: "Fabio Costa", n: 4, time: "20:45" },
            { name: "Sara Gallo", n: 6, time: "20:45", note: "Compleanno" },
          ],
        },
      },
      {
        tag: "Menu a orari",
        title: "Happy hour e cucina, ognuno al suo orario.",
        text: "Il menu cambia da solo: alle 18 l'happy hour, alle 19 apre la cucina, a mezzanotte restano solo le birre.",
        points: ["Più menu in un solo QR", "Orari diversi nel weekend", "Spine aggiornate dal telefono"],
        art: {
          kind: "dayparts",
          rows: [
            { t: "Happy hour", time: "18:00 a 20:00", on: true, items: "Spina media 4 €, tagliere" },
            { t: "Cucina", time: "19:00 a 23:30", on: true, items: "Hamburger, fritti, piatti caldi" },
            { t: "Dopo cena", time: "23:30 a 1:00", on: false, items: "Birre e snack" },
          ],
        },
      },
    ],
    day: [
      { time: "Martedì", text: "Cambi due spine: le aggiorni dal telefono con grado e stile." },
      { time: "Giovedì", text: "Prenotazioni aperte per la partita di sabato, con limite di posti." },
      { time: "18:00", text: "Il menu dell'happy hour si attiva da solo." },
      { time: "Sabato", text: "Un messaggio ai clienti per la serata quiz." },
    ],
    uses: [
      { feature: "menu-digitale", text: "Birre con stile, grado e formato, sempre aggiornate." },
      { feature: "menu-a-orari", text: "Happy hour e cucina con orari diversi." },
      { feature: "prenotazioni", text: "Tavoli per partite ed eventi, con posti limitati." },
      { feature: "automazioni-whatsapp", text: "Inviti alle serate per chi ha dato il consenso." },
    ],
    faq: [{ q: "Posso indicare grado e stile delle birre?", a: "Sì, per ogni birra puoi indicare grado alcolico, stile e formato." }],
  },
  {
    slug: "bar",
    name: "Bar e caffetterie",
    short: "Dalla colazione all'aperitivo",
    icon: "coffee",
    tone: "orange",
    seo: {
      title: "Menu digitale per bar e caffetterie con QR",
      description:
        "Menu digitale per bar e caffetterie: colazione, pranzo e aperitivo cambiano da soli con un solo QR, tradotto per i turisti. Niente ristampe. Prova gratis.",
    },
    hero: {
      title: "Dalla colazione all'aperitivo, il menu cambia da solo.",
      hl: "da solo",
      lead: "NovaMenu è il menu digitale per bar e caffetterie che segue la giornata: colazione, pranzo e aperitivo si alternano da soli. I turisti leggono nella loro lingua e ai tavolini si ordina più in fretta.",
    },
    photo: { src: "/images/settori/bar.webp", alt: "Barista che consegna un sacchetto di brioche dietro un bancone pieno di croissant", caption: "Dalla prima brioche all'ultimo spritz.", pos: "50% 45%", layout: "right", text: "Il menu cambia da solo con le ore del giorno, i turisti lo leggono nella loro lingua e tu servi il caffè invece di spiegare il listino.", points: ["Colazione, pranzo e aperitivo in un QR", "Menu in quattro lingue", "Prodotti del giorno sempre in cima"] },
    heroArt: {
      main: {
        kind: "catalog",
        shop: "Caffè Centrale",
        status: "Menu colazione fino alle 11:30",
        tabs: ["Colazione", "Pranzo", "Aperitivo"],
        items: [
          { name: "Cappuccino", desc: "Anche con latte vegetale", price: "1,60", c: "#e7d5b5" },
          { name: "Brioche alla crema", desc: "Sfornata stamattina", price: "1,40", tag: "Del giorno", c: "#fde68a" },
          { name: "Spremuta d'arancia", price: "3,50", c: "#fdba74" },
          { name: "Toast prosciutto e formaggio", price: "4,50", c: "#fed7aa" },
        ],
      },
      floats: [
        { icon: "clock", t: "Alle 18:00 parte l'aperitivo", d: "Il menu cambia da solo" },
        { icon: "globe", t: "Menu aperto in tedesco", d: "Tavolino 6" },
      ],
    },
    showcase: [
      {
        tag: "Menu a orari",
        title: "Un QR sul tavolino, tre menu nella giornata.",
        text: "Alle 7 il cliente trova la colazione, a mezzogiorno il pranzo veloce, alle 18 la carta dei cocktail. Tu non tocchi niente.",
        points: ["Fasce orarie per ogni menu", "Prodotti del giorno in evidenza", "Esauriti segnati in un tocco"],
        art: {
          kind: "dayparts",
          rows: [
            { t: "Colazione", time: "7:00 a 11:30", on: true, items: "Caffetteria, brioche, spremute" },
            { t: "Pranzo veloce", time: "12:00 a 15:00", on: true, items: "Toast, insalate, piatto del giorno" },
            { t: "Aperitivo", time: "18:00 a 21:00", on: true, items: "Spritz, cocktail, taglieri" },
          ],
        },
      },
      {
        tag: "Turisti",
        title: "Lo spritz si capisce in tutte le lingue. Il resto lo traduciamo noi.",
        text: "Il menu si apre da solo nella lingua del telefono. In una località turistica vuol dire meno spiegazioni al banco e ordini più veloci.",
        points: ["Quattro lingue incluse", "Allergeni sempre chiari", "Nessuna ristampa"],
        art: {
          kind: "langs",
          dish: "Brioche alla crema",
          lines: [
            { flag: "🇬🇧", text: "Croissant filled with custard cream" },
            { flag: "🇩🇪", text: "Hörnchen mit Vanillecreme" },
            { flag: "🇪🇸", text: "Cruasán relleno de crema pastelera" },
          ],
        },
      },
    ],
    day: [
      { time: "7:00", text: "Si attiva il menu colazione con le brioche del giorno." },
      { time: "12:00", text: "Pranzo veloce: piatti del giorno in evidenza." },
      { time: "18:00", text: "Arriva l'aperitivo, con la carta dei cocktail." },
      { time: "Sempre", text: "I turisti leggono il menu in inglese o in tedesco." },
    ],
    uses: [
      { feature: "menu-a-orari", text: "Tre menu in un QR, che cambiano da soli." },
      { feature: "traduzioni", text: "Per i turisti in centro o in località di mare." },
      { feature: "menu-digitale", text: "Prodotti del giorno ed esauriti aggiornati al volo." },
      { feature: "statistiche", text: "Scopri quali prodotti guardano di più." },
    ],
    faq: [{ q: "Serve per un bar piccolo?", a: "Sì, serve anche a un bar piccolo: già solo il menu digitale a orari fa risparmiare tempo e ristampe." }],
  },
  {
    slug: "gelaterie",
    name: "Gelaterie",
    short: "Gusti del giorno e vaschette",
    icon: "icecream",
    tone: "pink",
    seo: {
      title: "Menu digitale per gelaterie: gusti e vaschette",
      description:
        "Menu digitale per gelaterie: gusti del giorno aggiornati in un tocco, vaschette e torte gelato ordinate su WhatsApp con giorno e ora di ritiro. Prova gratis.",
    },
    hero: {
      title: "I gusti di oggi, già sul telefono dei clienti.",
      hl: "gusti di oggi",
      lead: "NovaMenu è il menu digitale per gelaterie: aggiorni i gusti del giorno in un tocco, ricevi gli ordini di vaschette e torte gelato su WhatsApp e mostri gli allergeni senza cartelli.",
    },
    photo: { src: "/images/settori/gelateria.webp", alt: "Cameriera che porta tre coppette di gelato in una piazza italiana", caption: "I gusti di oggi, già sul telefono dei clienti.", pos: "50% 55%", layout: "center" },
    heroArt: {
      main: {
        kind: "catalog",
        shop: "Gelateria Polo Nord",
        status: "Gusti aggiornati alle 10:12",
        tabs: ["Gusti di oggi", "Vaschette", "Torte gelato"],
        items: [
          { name: "Pistacchio di Bronte", desc: "Contiene frutta a guscio", price: "", out: true, c: "#bef264" },
          { name: "Nocciola Piemonte IGP", desc: "Contiene frutta a guscio, latte", price: "", tag: "Novità", c: "#e7d5b5" },
          { name: "Fragola", desc: "Sorbetto, senza latte", price: "", c: "#fda4af" },
          { name: "Vaschetta da 1 kg", desc: "Fino a 4 gusti", price: "22,00", c: "#fce7f3" },
        ],
      },
      floats: [
        { icon: "bag", t: "Torta gelato per sabato", d: "8 persone, ritiro ore 16:00" },
        { icon: "x", t: "Pistacchio esaurito", d: "Segnato dal telefono" },
      ],
    },
    showcase: [
      {
        tag: "Vaschette e torte",
        title: "La torta gelato si ordina con giorno e ora di ritiro.",
        text: "Il cliente sceglie gusti, persone e scritta, e indica quando passa. Tu trovi tutto scritto, anche con giorni di anticipo.",
        points: ["Ordini fino a settimane prima", "Gusti a scelta per la vaschetta", "Note per la scritta sulla torta"],
        art: {
          kind: "order",
          who: "Chiara Moretti",
          lines: ["1 × Torta gelato, 8 persone", "Gusti: nocciola e fragola", "1 × Vaschetta da 500 g"],
          total: "€ 46,00",
          when: "Ritiro sabato 16:00",
          extra: "Scritta: Auguri Sofia!",
        },
      },
      {
        tag: "Stagione",
        title: "A settembre chiudi. Il sito lo dice da solo.",
        text: "Programmi la chiusura invernale e la riapertura. Il menu mostra l'avviso e gli ordini si fermano nei giorni giusti.",
        points: ["Chiusure stagionali programmate", "Avviso automatico sul menu", "Orari estivi e invernali"],
        art: {
          kind: "dayparts",
          rows: [
            { t: "Orario estivo", time: "Giugno a settembre", on: true, items: "Tutti i giorni 12:00 a 24:00" },
            { t: "Orario invernale", time: "Ottobre a novembre", on: false, items: "Solo weekend 14:00 a 20:00" },
            { t: "Chiusura", time: "Dicembre a febbraio", on: false, items: "Avviso sul menu, ordini fermi" },
          ],
        },
      },
    ],
    day: [
      { time: "10:00", text: "Segni i gusti del giorno: pistacchio, nocciola, fragola." },
      { time: "15:00", text: "Arriva l'ordine di una torta gelato per sabato." },
      { time: "21:00", text: "Finisce il pistacchio: lo segni esaurito." },
      { time: "Settembre", text: "Imposti la chiusura invernale e l'avviso per i clienti." },
    ],
    uses: [
      { feature: "menu-digitale", text: "Gusti del giorno ed esauriti in tempo reale." },
      { feature: "ordini-whatsapp", text: "Vaschette e torte gelato con data e ora di ritiro." },
      { feature: "ferie-e-chiusure", text: "Chiusura stagionale programmata." },
      { feature: "traduzioni", text: "Gusti spiegati ai turisti." },
    ],
    faq: [{ q: "Posso ricevere ordini con giorni di anticipo?", a: "Sì, puoi ricevere ordini con giorni di anticipo: il cliente sceglie data e ora di ritiro, anche per i giorni successivi." }],
  },
  {
    slug: "pastifici",
    name: "Pastifici",
    short: "Pasta fresca a peso",
    icon: "wheat",
    tone: "amber",
    seo: {
      title: "Ordini online per pastifici: pasta fresca a peso",
      description:
        "Ordini online per pastifici: pasta fresca a peso con giorno e ora di ritiro, un limite per ogni giorno delle feste e avvisi ai clienti abituali. Prova gratis.",
    },
    hero: {
      title: "A Natale ordinano online. Tu tiri la sfoglia.",
      hl: "online",
      lead: "NovaMenu porta gli ordini online nel tuo pastificio: i clienti ordinano a peso con giorno e ora di ritiro, tu vedi quanta pasta preparare e prima delle feste avvisi tutti con un messaggio.",
    },
    photo: { src: "/images/settori/pastificio.webp", alt: "Due pastai che tirano una sfoglia di pasta fresca in laboratorio", caption: "Tu tiri la sfoglia, gli ordini arrivano da soli.", pos: "50% 40%", layout: "left", text: "Gli ordini arrivano scritti, con i pesi e l'orario di ritiro. Ogni mattina sai quanta pasta preparare, anche nelle settimane delle feste.", points: ["Prezzo al chilo o a confezione", "Limite di ordini per giorno", "Riepilogo di cosa preparare"] },
    heroArt: {
      main: {
        kind: "catalog",
        shop: "Pastificio Gallo",
        status: "Ordini per domani fino alle 18:00",
        tabs: ["Pasta fresca", "Ripiena", "Sughi"],
        items: [
          { name: "Tajarin", desc: "40 tuorli per kg", price: "14,00", unit: "kg", c: "#fde68a" },
          { name: "Agnolotti del plin", desc: "Ripieno di tre carni", price: "26,00", unit: "kg", c: "#fed7aa" },
          { name: "Ravioli di magro", desc: "Ricotta e spinaci", price: "24,00", unit: "kg", tag: "Solo venerdì", c: "#d9f99d" },
          { name: "Ragù della casa", desc: "Vasetto", price: "8,00", unit: "500 g", c: "#fca5a5" },
        ],
      },
      floats: [
        { icon: "calendarCheck", t: "Ordini di Natale aperti", d: "23 dicembre quasi pieno" },
        { icon: "bag", t: "Nuovo ordine", d: "1 kg di plin, ritiro sabato" },
      ],
    },
    showcase: [
      {
        tag: "Ordini delle feste",
        title: "Ogni giorno ha il suo limite. Il 23 dicembre non scoppia.",
        text: "Decidi quanti ordini accetti per giorno e per fascia. Quando un giorno è pieno il cliente sceglie il precedente, senza chiamarti.",
        points: ["Limite di ordini per giorno", "Fasce di ritiro di mezz'ora", "Riepilogo di cosa preparare"],
        art: {
          kind: "slots",
          title: "Ritiro per Natale",
          days: [{ d: "Sab", n: "20" }, { d: "Dom", n: "21" }, { d: "Lun", n: "22" }, { d: "Mar", n: "23", full: true }],
          slots: [
            { t: "9:00", s: "full" }, { t: "9:30", s: "few" }, { t: "10:00", s: "sel" },
            { t: "10:30", s: "free" }, { t: "11:00", s: "free" }, { t: "11:30", s: "few" },
          ],
          note: "Ritiro lunedì 22 alle 10:00",
        },
      },
      {
        tag: "Vendita a peso",
        title: "Il cliente sceglie quanto. Tu vedi quanto preparare.",
        text: "Prezzo al chilo o a confezione, quantità a scelta. L'ordine ti arriva con i pesi già scritti e il totale calcolato.",
        points: ["Prezzo al kg o a pezzo", "Prodotti solo in certi giorni", "Clienti abituali e ordini ricorrenti"],
        art: {
          kind: "order",
          who: "Giovanna Ricci",
          lines: ["1 kg × Agnolotti del plin", "500 g × Tajarin", "1 × Ragù della casa, 500 g"],
          total: "€ 41,00",
          when: "Ritiro lunedì 22 alle 10:00",
        },
      },
    ],
    day: [
      { time: "Novembre", text: "Apri gli ordini per Natale, con limite per giorno." },
      { time: "Ogni mattina", text: "Vedi il riepilogo di cosa preparare e per quando." },
      { time: "23 dicembre", text: "Il ritiro scorre veloce, gli ordini sono già pronti." },
      { time: "Gennaio", text: "Un messaggio ai clienti per i ravioli del mese." },
    ],
    uses: [
      { feature: "ordini-whatsapp", text: "Ordini con giorno e ora di ritiro, anche settimane prima." },
      { feature: "menu-digitale", text: "Prodotti venduti a peso o a pezzo, disponibili solo certi giorni." },
      { feature: "clienti", text: "I clienti abituali e i loro ordini ricorrenti." },
      { feature: "automazioni-whatsapp", text: "Un avviso prima delle feste." },
    ],
    faq: [{ q: "Posso vendere a peso?", a: "Sì, puoi vendere a peso: indichi il prezzo al chilo o a confezione e il cliente sceglie la quantità." }],
  },
  {
    slug: "panetterie",
    name: "Panetterie e pasticcerie",
    short: "Pane e torte su prenotazione",
    icon: "bread",
    tone: "orange",
    seo: {
      title: "Prenotazioni per panetterie: pane e torte online",
      description:
        "Prenotazioni per panetterie e pasticcerie: il pane ordinato la sera con la fascia di ritiro, torte su ordinazione, catalogo con prezzi al chilo. Prova gratis.",
    },
    hero: {
      title: "Il pane prenotato la sera, pronto al mattino.",
      hl: "prenotato",
      lead: "NovaMenu porta le prenotazioni nella tua panetteria: catalogo con prezzo al chilo e allergeni, pane e torte ordinati con la fascia di ritiro, e niente più foglietti attaccati al bancone.",
    },
    photo: { src: "/images/settori/panetteria.webp", alt: "Fornaio sorridente sulla porta del suo forno con le braccia piene di pane", caption: "Il pane prenotato, pronto sul bancone.", pos: "50% 35%", layout: "right", text: "I clienti prenotano la sera, tu al mattino trovi la lista già divisa per fascia di ritiro. Meno pane che avanza, meno foglietti sul bancone.", points: ["Prenotazioni fino all'ora che decidi", "Fasce di ritiro dal primo mattino", "Torte su ordinazione con preavviso"] },
    heroArt: {
      main: {
        kind: "catalog",
        shop: "Forno San Guido",
        status: "Prenota entro le 20:00 per domattina",
        tabs: ["Pane", "Focacce", "Torte", "Ricorrenze"],
        items: [
          { name: "Pane di semola", desc: "Lievito madre, 24 ore", price: "4,20", unit: "kg", c: "#e7d5b5" },
          { name: "Grissini stirati a mano", price: "12,00", unit: "kg", c: "#fde68a" },
          { name: "Focaccia genovese", desc: "Teglia intera", price: "9,00", unit: "pezzo", c: "#fef08a" },
          { name: "Torta di nocciole", desc: "Su ordinazione", price: "24,00", unit: "kg", tag: "2 giorni prima", c: "#d6b8a8" },
        ],
      },
      floats: [
        { icon: "clock", t: "Pane prenotato per domani", d: "Ritiro 7:30, 1 kg di semola" },
        { icon: "sparkle", t: "Colombe pasquali", d: "Prenotazioni aperte" },
      ],
    },
    showcase: [
      {
        tag: "Fasce di ritiro",
        title: "Il pane prenotato, diviso per orario di ritiro.",
        text: "Il cliente prenota la sera e sceglie quando passare. Al mattino hai la lista già divisa per fascia: incarti e prepari senza pensarci.",
        points: ["Fasce dalla prima apertura", "Ordini chiusi all'ora che decidi", "Pane a peso o a pezzo"],
        art: {
          kind: "slots",
          title: "Ritiro domattina",
          days: [{ d: "Mar", n: "14" }, { d: "Mer", n: "15" }, { d: "Gio", n: "16" }],
          slots: [
            { t: "7:00", s: "few" }, { t: "7:30", s: "sel" }, { t: "8:00", s: "full" },
            { t: "8:30", s: "free" }, { t: "9:00", s: "free" }, { t: "9:30", s: "free" },
          ],
          note: "Ritiro mercoledì alle 7:30",
        },
      },
      {
        tag: "Torte su ordinazione",
        title: "La torta del compleanno arriva con scritta e persone.",
        text: "Il cliente sceglie la torta, indica per quante persone e cosa scrivere sopra. Niente più dettagli persi tra telefonate e post-it.",
        points: ["Preavviso minimo per ogni prodotto", "Note per scritte e decorazioni", "Allergeni chiari per ogni dolce"],
        art: {
          kind: "order",
          who: "Paolo Marino",
          lines: ["1 × Torta di nocciole, 1,5 kg", "12 persone", "1 kg × Pane di semola"],
          total: "€ 40,20",
          when: "Ritiro sabato 10:30",
          extra: "Scritta: Buon compleanno nonna Rina",
        },
      },
    ],
    day: [
      { time: "La sera", text: "Arrivano le prenotazioni del pane per il mattino dopo." },
      { time: "7:00", text: "Il pane prenotato è già diviso per fascia di ritiro." },
      { time: "Lunedì", text: "Arriva l'ordine di una torta per il compleanno di sabato." },
      { time: "Marzo", text: "Apri le prenotazioni delle colombe pasquali." },
    ],
    uses: [
      { feature: "ordini-whatsapp", text: "Pane e torte su prenotazione, con data e fascia di ritiro." },
      { feature: "menu-digitale", text: "Catalogo con prezzo al chilo, ingredienti e allergeni." },
      { feature: "menu-a-orari", text: "Prodotti disponibili solo in certi giorni." },
      { feature: "clienti", text: "Chi ordina sempre e cosa." },
    ],
    faq: [
      { q: "Posso mostrare il prezzo al chilo?", a: "Sì, puoi mostrare il prezzo al chilo: ogni prodotto può averlo al chilo, a pezzo o a confezione." },
      { q: "Posso chiedere dettagli per una torta?", a: "Sì, per ogni torta il cliente può scrivere una nota con scritta, gusti e numero di persone." },
    ],
  },
  {
    slug: "gastronomie",
    name: "Gastronomie e rosticcerie",
    short: "Piatti pronti da asporto",
    icon: "bag",
    tone: "green",
    seo: {
      title: "Ordini online per gastronomie e rosticcerie",
      description:
        "Ordini online per gastronomie e rosticcerie: piatti del giorno a peso o a porzione, pranzo prenotato con la fascia di ritiro, menu delle feste. Prova gratis.",
    },
    hero: {
      title: "Ordinato alle dieci, pronto a mezzogiorno.",
      hl: "pronto",
      lead: "NovaMenu porta gli ordini online nella tua gastronomia: i piatti del giorno pubblicati ogni mattina, ordini a peso o a porzione con l'orario di ritiro, e il pranzo già pronto quando arriva il cliente.",
    },
    photo: { src: "/images/settori/gastronomia.webp", alt: "Nidi di tagliatelle fresche su una teglia infarinata, accanto alla sfoglia e alla macchina per la pasta", caption: "Fatto a mano, già ordinato.", pos: "50% 60%", layout: "center" },
    heroArt: {
      main: {
        kind: "catalog",
        shop: "Gastronomia Vercelli",
        status: "Ordini per il pranzo fino alle 11:30",
        tabs: ["Piatti del giorno", "Rosticceria", "Contorni"],
        items: [
          { name: "Lasagna al forno", desc: "Ragù e besciamella", price: "18,00", unit: "kg", tag: "Oggi", c: "#fca5a5" },
          { name: "Vitello tonnato", desc: "Salsa della casa", price: "32,00", unit: "kg", c: "#e7d5b5" },
          { name: "Pollo arrosto", desc: "Intero, con patate", price: "12,00", unit: "pezzo", c: "#fde68a" },
          { name: "Insalata russa", price: "16,00", unit: "kg", out: true, c: "#d9f99d" },
        ],
      },
      floats: [
        { icon: "bag", t: "Pranzo da ritirare", d: "12:30, 4 porzioni di lasagna" },
        { icon: "calendarCheck", t: "Menu di Natale", d: "Ordini aperti fino al 20" },
      ],
    },
    showcase: [
      {
        tag: "Pranzo da asporto",
        title: "Ordinano alle 10. Alle 12:30 è già incartato.",
        text: "Il cliente sceglie i piatti del giorno e la fascia di ritiro. Tu prepari in ordine di orario e la coda al banco si accorcia.",
        points: ["Fasce di ritiro per il pranzo", "Porzioni o peso a scelta", "Ordini chiusi all'ora che decidi"],
        art: {
          kind: "slots",
          title: "Ritiro oggi",
          days: [{ d: "Oggi", n: "14" }, { d: "Mer", n: "15" }, { d: "Gio", n: "16" }],
          slots: [
            { t: "12:00", s: "full" }, { t: "12:15", s: "few" }, { t: "12:30", s: "sel" },
            { t: "12:45", s: "free" }, { t: "13:00", s: "free" }, { t: "13:15", s: "free" },
          ],
          note: "Ritiro oggi alle 12:30",
        },
      },
      {
        tag: "Feste e pranzi della domenica",
        title: "Il menu delle feste si ordina in anticipo, a peso.",
        text: "Vitello tonnato, antipasti, arrosti: il cliente ordina per quante persone e tu vedi le quantità totali da preparare.",
        points: ["Menu speciali solo in certi giorni", "Quantità a peso già calcolate", "Messaggio ai clienti prima delle feste"],
        art: {
          kind: "order",
          who: "Famiglia Bertola",
          lines: ["800 g × Vitello tonnato", "1,5 kg × Lasagna al forno", "2 × Pollo arrosto"],
          total: "€ 76,60",
          when: "Ritiro 24 dicembre 11:00",
          extra: "Nota: lasagna in due teglie",
        },
      },
    ],
    day: [
      { time: "8:30", text: "Pubblichi i piatti del giorno dal telefono, con prezzo al chilo." },
      { time: "10:00", text: "Arrivano gli ordini del pranzo, già divisi per fascia." },
      { time: "12:30", text: "Il cliente passa, l'ordine è pronto, niente coda." },
      { time: "Dicembre", text: "Apri il menu delle feste e avvisi i clienti abituali." },
    ],
    uses: [
      { feature: "ordini-whatsapp", text: "Pranzi da asporto con fascia di ritiro e limite per fascia." },
      { feature: "menu-digitale", text: "Piatti del giorno a peso o a porzione, aggiornati ogni mattina." },
      { feature: "clienti", text: "I clienti abituali e cosa ordinano di solito." },
      { feature: "automazioni-whatsapp", text: "Un avviso prima delle feste ai clienti che hanno dato il consenso." },
    ],
    faq: [
      { q: "Posso cambiare i piatti ogni giorno?", a: "Sì, puoi cambiare i piatti ogni giorno: li attivi e disattivi dal telefono in pochi secondi, anche a voce con l'assistente." },
      { q: "Posso vendere a peso e a porzione?", a: "Sì, puoi vendere sia a peso sia a porzione: ogni piatto può avere il prezzo al chilo, a porzione o a pezzo." },
    ],
  },
]);

export const sectorBySlug = (slug: string) => sectors.find((s) => s.slug === slug);
