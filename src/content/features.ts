import type { IconName } from "@/components/Icon";
import { withId } from "./util";

export type Tone = "green" | "blue" | "pink" | "amber" | "violet" | "orange" | "red" | "grey";

export type VisualKey =
  | "menu"
  | "ai"
  | "lingue"
  | "orari"
  | "prenotazioni"
  | "sala"
  | "chiusure"
  | "ordini"
  | "clienti"
  | "automazioni"
  | "statistiche"
  | "staff"
  | "assistente";

export type Feature = {
  /** Identificativo interno, uguale in tutte le lingue (è lo slug italiano). */
  id: string;
  slug: string;
  name: string;
  short: string;
  group: "Menu" | "Prenotazioni e sala" | "Vendite e clienti" | "Gestione";
  icon: IconName;
  tone: Tone;
  plan: "Base" | "Pro" | "Premium";
  visual: VisualKey;
  seo: { title: string; description: string };
  hero: { title: string; lead: string };
  steps: { title: string; text: string }[];
  sections: { title: string; text: string; points: string[] }[];
  benefits: { title: string; text: string }[];
  faq: { q: string; a: string }[];
  related: string[];
};

export const featureGroups = ["Menu", "Prenotazioni e sala", "Vendite e clienti", "Gestione"] as const;

export const features: Feature[] = withId<Feature>([
  {
    slug: "menu-digitale",
    name: "Menu digitale e QR",
    short: "Sempre aggiornato, senza ristampe",
    group: "Menu",
    icon: "qr",
    tone: "grey",
    plan: "Base",
    visual: "menu",
    seo: {
      title: "Menu digitale con QR per ristoranti e pizzerie",
      description:
        "Menu digitale con QR per il tuo locale: cambi un prezzo o togli un piatto finito dal telefono, senza ristampare. Con allergeni. Prova gratis 14 giorni.",
    },
    hero: {
      title: "Il menu del tuo locale, sempre giusto.",
      lead:
        "Il menu digitale di NovaMenu è una pagina con il tuo logo e i tuoi colori, che il cliente apre dal QR sul tavolo senza scaricare niente. Cambi un prezzo o segni un piatto esaurito dal telefono e si aggiorna subito, senza ristampe.",
    },
    steps: [
      { title: "Carica il menu", text: "Da una foto del menu cartaceo, da un PDF o scrivendo i piatti a mano." },
      { title: "Scegli lo stile", text: "Logo, colori, foto di copertina e ordine delle categorie." },
      { title: "Stampa il QR", text: "Scarichi il QR per tavoli, vetrina e volantini. Non cambia mai." },
    ],
    sections: [
      {
        title: "Fatto per essere letto con una mano, al tavolo",
        text:
          "Il cliente non scarica nessuna app. Apre il menu dal QR, scorre le categorie in alto e trova subito quello che cerca. Ogni piatto ha foto, descrizione, prezzo e allergeni.",
        points: [
          "Categorie fisse in alto mentre si scorre",
          "Foto grandi e testi leggibili anche alla luce delle candele",
          "Ricerca per nome del piatto e filtri per allergeni",
          "Pagina veloce anche con il 4G in terrazza",
        ],
      },
      {
        title: "Esaurito? Lo segni in un tocco",
        text:
          "Quando finisce la burrata o arriva il pesce del giorno, lo cambi dal telefono mentre sei in cucina. Il menu si aggiorna per tutti i tavoli nello stesso istante.",
        points: [
          "Piatti esauriti nascosti o segnati come non disponibili",
          "Piatti del giorno e fuori menu in evidenza",
          "Varianti, aggiunte e formati con il loro prezzo",
          "Prezzi diversi per sala e asporto",
        ],
      },
      {
        title: "Allergeni sempre in ordine",
        text:
          "Per ogni piatto scegli i 14 allergeni previsti dalla normativa europea con un tocco. Il cliente li vede accanto al piatto e può filtrare il menu.",
        points: [
          "I 14 allergeni del Regolamento UE 1169/2011",
          "Icone chiare e testo tradotto nelle lingue del menu",
          "Nota su tracce e contaminazioni",
        ],
      },
    ],
    benefits: [
      { title: "Niente ristampe", text: "Un QR per sempre. Cambi il menu tutte le volte che vuoi." },
      { title: "Il tuo marchio", text: "Logo, colori e, se vuoi, il dominio del tuo locale." },
      { title: "Più veloce del cartaceo", text: "Il cliente sceglie mentre aspetta, il cameriere prende la comanda prima." },
      { title: "Pronto in un pomeriggio", text: "E se vuoi lo carichiamo noi durante la demo." },
    ],
    faq: [
      { q: "Il cliente deve scaricare un'app?", a: "No, il cliente non deve scaricare nessuna app: il menu si apre nel browser del telefono inquadrando il QR, come una normale pagina web." },
      { q: "Posso usare il dominio del mio locale?", a: "Sì, con il piano Premium il menu può stare sul dominio del tuo locale, per esempio menu.illocale.it." },
      { q: "Se cambio il menu devo ristampare il QR?", a: "No, il QR non va mai ristampato: punta sempre allo stesso indirizzo, quindi cambi i piatti e il QR resta quello." },
      { q: "Posso avere un menu per la sala e uno per l'asporto?", a: "Sì, puoi avere piatti e prezzi diversi per la sala e per l'asporto: decidi tu cosa mostrare in ciascuno." },
    ],
    related: ["importa-menu-ai", "traduzioni", "menu-a-orari"],
  },
  {
    slug: "importa-menu-ai",
    name: "Importa il menu con l'AI",
    short: "Da una foto al menu online",
    group: "Menu",
    icon: "sparkle",
    tone: "green",
    plan: "Base",
    visual: "ai",
    seo: {
      title: "Crea il menu digitale da una foto in pochi minuti",
      description:
        "Crea il menu digitale da una foto del menu di carta o da un PDF: piatti, prezzi e allergeni vanno al loro posto. Tu controlli e pubblichi. Prova gratis.",
    },
    hero: {
      title: "Fai una foto al menu. Al resto pensiamo noi.",
      lead:
        "L'importazione del menu serve a non ricopiare niente a mano: carichi la foto del menu di carta o il PDF della tipografia e in pochi minuti piatti, descrizioni, prezzi, categorie e allergeni sono al loro posto. Tu controlli e pubblichi.",
    },
    steps: [
      { title: "Carica foto o PDF", text: "Anche più pagine insieme, anche fotografate con il telefono." },
      { title: "Controlla", text: "Vedi tutto in una tabella: correggi un prezzo o un nome con un tocco." },
      { title: "Pubblica", text: "Il menu è online e il QR è pronto da stampare." },
    ],
    sections: [
      {
        title: "Legge anche i menu scritti a mano",
        text:
          "L'intelligenza artificiale riconosce la struttura del menu: capisce cosa è una categoria, cosa è un piatto, quale è il prezzo e quali sono gli ingredienti.",
        points: [
          "Foto storte, ombre e lavagne scritte col gesso",
          "Prezzi con varianti, per esempio piccola e grande",
          "Più pagine in un solo caricamento",
          "Allergeni proposti in base agli ingredienti, da confermare",
        ],
      },
      {
        title: "Tu hai sempre l'ultima parola",
        text:
          "Niente viene pubblicato senza il tuo controllo. Ogni riga si può correggere, spostare o eliminare prima di andare online.",
        points: [
          "Anteprima del menu prima della pubblicazione",
          "Righe dubbie evidenziate da controllare",
          "Puoi aggiungere un nuovo menu senza toccare quello attuale",
        ],
      },
    ],
    benefits: [
      { title: "Minuti, non giorni", text: "Un menu di 80 piatti si importa in pochi minuti." },
      { title: "Zero ricopiatura", text: "Niente più ore a riscrivere piatti e prezzi." },
      { title: "Allergeni suggeriti", text: "Un punto di partenza da confermare, non da inventare." },
      { title: "Funziona per tutti", text: "Pizzerie, pastifici, bar: qualsiasi listino." },
    ],
    faq: [
      { q: "E se l'AI sbaglia un prezzo?", a: "Lo correggi prima di pubblicare: vedi tutti i piatti in una tabella e le righe meno sicure sono evidenziate." },
      { q: "Posso importare un listino in PDF?", a: "Sì, puoi importare un listino in PDF, oltre a foto e immagini, anche più file insieme." },
      { q: "Gli allergeni sono affidabili?", a: "Gli allergeni sono una proposta da confermare: vengono suggeriti in base agli ingredienti scritti nel menu e li controlli tu, che conosci le ricette." },
    ],
    related: ["menu-digitale", "traduzioni", "assistente"],
  },
  {
    slug: "traduzioni",
    name: "Menu tradotto",
    short: "Quattro lingue con un tocco",
    group: "Menu",
    icon: "globe",
    tone: "blue",
    plan: "Pro",
    visual: "lingue",
    seo: {
      title: "Menu tradotto in inglese per ristoranti e bar",
      description:
        "Menu tradotto in inglese, francese, tedesco e spagnolo con un tocco: si apre nella lingua del telefono del turista. Ritocchi ogni frase. Prova gratis.",
    },
    hero: {
      title: "Il turista legge il menu nella sua lingua.",
      lead:
        "Il menu tradotto porta tutti i tuoi piatti in inglese, francese, tedesco e spagnolo con un tocco. Si apre da solo nella lingua del telefono del cliente, così il cameriere non deve più tradurre ogni piatto. I nomi tipici restano in italiano, se lo vuoi tu.",
    },
    steps: [
      { title: "Scegli le lingue", text: "Inglese, francese, tedesco, spagnolo: attivi quelle che ti servono." },
      { title: "Traduci", text: "Tutti i piatti, le descrizioni e gli allergeni, in un tocco." },
      { title: "Ritocca", text: "Correggi a mano qualsiasi frase. Le tue correzioni restano." },
    ],
    sections: [
      {
        title: "Traduzioni pensate per la ristorazione",
        text:
          "Non è un traduttore generico. Sa che la carbonara resta carbonara e che il fiordilatte non è un latte di fiori. Spiega gli ingredienti senza snaturare i nomi.",
        points: [
          "Nomi tipici lasciati in italiano, con spiegazione",
          "Allergeni tradotti con la terminologia corretta",
          "Nuovi piatti tradotti in automatico appena li aggiungi",
        ],
      },
      {
        title: "Si apre nella lingua giusta",
        text:
          "Il menu riconosce la lingua del telefono e si apre già tradotto. Il cliente può sempre cambiare lingua dal selettore in alto.",
        points: ["Riconoscimento automatico della lingua", "Selettore con bandiere sempre visibile", "Anche il carrello e le prenotazioni sono tradotti"],
      },
    ],
    benefits: [
      { title: "Meno domande al tavolo", text: "Il cameriere non deve tradurre ogni piatto." },
      { title: "Più ordini dai turisti", text: "Chi capisce cosa ordina, ordina di più." },
      { title: "Sempre allineato", text: "Cambi un prezzo e vale per tutte le lingue." },
      { title: "Controllo totale", text: "Ogni frase si può correggere a mano." },
    ],
    faq: [
      { q: "Quante lingue posso attivare?", a: "Puoi attivare quattro lingue oltre all'italiano: inglese, francese, tedesco e spagnolo. Accendi solo quelle che ti servono." },
      { q: "Se aggiungo un piatto devo tradurlo io?", a: "No, ogni piatto nuovo viene tradotto in automatico appena lo aggiungi. Se vuoi, poi lo ritocchi." },
      { q: "Le mie correzioni vengono sovrascritte?", a: "No, le tue correzioni non vengono sovrascritte: le frasi che ritocchi a mano restano anche se ritraduci il resto del menu." },
    ],
    related: ["menu-digitale", "importa-menu-ai", "prenotazioni"],
  },
  {
    slug: "menu-a-orari",
    name: "Menu a orari",
    short: "Pranzo, aperitivo, cena",
    group: "Menu",
    icon: "clock",
    tone: "orange",
    plan: "Pro",
    visual: "orari",
    seo: {
      title: "Menu a orari: pranzo, aperitivo e cena da soli",
      description:
        "Menu a orari per bar e ristoranti: pranzo, aperitivo e cena cambiano da soli in base a ora e giorno, con un solo QR. Niente da ricordare. Prova gratis.",
    },
    hero: {
      title: "A mezzogiorno il pranzo. Alle sei l'aperitivo.",
      lead:
        "Il menu a orari mostra a ogni cliente il menu giusto per quell'ora. Imposti una volta quali menu valgono in quali ore e in quali giorni: il QR sul tavolo fa il resto, senza che nessuno debba ricordarsi di cambiarlo.",
    },
    steps: [
      { title: "Crea i menu", text: "Pranzo, aperitivo, cena, brunch della domenica: quanti ne servono." },
      { title: "Assegna gli orari", text: "Per ogni menu scegli giorni e fasce orarie." },
      { title: "Dimenticatene", text: "Il cambio avviene da solo, anche nei giorni festivi." },
    ],
    sections: [
      {
        title: "Un QR, tutti i tuoi menu",
        text:
          "Il cliente vede il menu attivo in quel momento, con la possibilità di guardare anche gli altri. Niente più cartelli da girare o lavagne da riscrivere.",
        points: ["Fasce orarie per giorno della settimana", "Menu speciali per date precise, come Natale o Pasqua", "Carta dei vini e dei cocktail sempre visibile"],
      },
    ],
    benefits: [
      { title: "Nessun errore", text: "Mai più il menu del pranzo alle nove di sera." },
      { title: "Più aperitivi", text: "L'offerta giusta compare proprio quando serve." },
      { title: "Eventi speciali", text: "Menu di San Valentino attivo solo quella sera." },
      { title: "Zero lavoro", text: "Lo imposti una volta, poi va da solo." },
    ],
    faq: [
      { q: "Il cliente può vedere anche gli altri menu?", a: "Sì, il cliente può vedere anche gli altri menu: quello attivo è in primo piano, gli altri restano consultabili." },
      { q: "Posso creare un menu solo per una data?", a: "Sì, puoi creare un menu valido solo per una data, per esempio quello di Capodanno attivo il 31 dicembre dalle 20:00." },
    ],
    related: ["menu-digitale", "ferie-e-chiusure", "statistiche"],
  },
  {
    slug: "prenotazioni",
    name: "Prenotazioni online",
    short: "Confermate con un tocco",
    group: "Prenotazioni e sala",
    icon: "calendarCheck",
    tone: "pink",
    plan: "Pro",
    visual: "prenotazioni",
    seo: {
      title: "Prenotazione tavoli online senza commissioni",
      description:
        "Prenotazione tavoli online dal tuo link, da Google e dai social: confermi con un tocco e il cliente lo sa su WhatsApp. Zero costi a coperto. Prova gratis.",
    },
    hero: {
      title: "Le prenotazioni arrivano. Tu confermi con un tocco.",
      lead:
        "Con le prenotazioni online il cliente prenota un tavolo dal tuo link in trenta secondi: giorno, orario, persone, seggiolini. Tu accetti la richiesta o proponi un altro orario, e lui riceve la conferma su WhatsApp. Senza costi a coperto.",
    },
    steps: [
      { title: "Imposta i turni", text: "Orari, durata del tavolo e coperti massimi per fascia." },
      { title: "Condividi il link", text: "Su Google, Instagram, sito e nel menu digitale." },
      { title: "Conferma", text: "Accetti, rifiuti o proponi un orario. Il cliente lo sa subito." },
    ],
    sections: [
      {
        title: "Prenotare è facile come mandare un messaggio",
        text:
          "Il cliente sceglie il giorno da una striscia di date, vede solo gli orari ancora liberi, indica quante persone e se servono seggiolini. Nessuna registrazione.",
        points: ["Solo gli orari davvero disponibili", "Seggiolini e note per allergie o compleanni", "Nella lingua del cliente", "Collegabile al pulsante Prenota di Google"],
      },
      {
        title: "Accettazione automatica o manuale",
        text:
          "Decidi tu: puoi confermare in automatico fino a un certo numero di persone e tenere per te solo le richieste grandi, o controllare tutto a mano.",
        points: ["Conferma automatica per tavoli piccoli", "Gruppi e serate speciali sempre a mano", "Proposta di orario alternativo con un tocco", "Lista d'attesa quando sei pieno"],
      },
      {
        title: "Meno tavoli vuoti",
        text:
          "Il giorno prima il cliente riceve un promemoria su WhatsApp con i pulsanti Confermo e Annulla. Se annulla, il tavolo torna libero subito.",
        points: ["Promemoria automatico il giorno prima", "Disdetta con un tocco, senza telefonate", "Storico dei clienti che non si presentano"],
      },
    ],
    benefits: [
      { title: "Zero commissioni", text: "Nessun costo a coperto, a differenza dei portali." },
      { title: "Meno telefonate", text: "Il telefono squilla meno durante il servizio." },
      { title: "Meno no-show", text: "Promemoria e disdetta facile riducono i tavoli vuoti." },
      { title: "I clienti restano tuoi", text: "Nomi e numeri finiscono nella tua lista clienti." },
    ],
    faq: [
      { q: "Quanto costa ogni prenotazione?", a: "Ogni prenotazione costa zero: sono incluse nel piano Pro, senza costi a coperto." },
      { q: "Posso bloccare le prenotazioni per una sera?", a: "Sì, puoi bloccare le prenotazioni per un giorno intero o per un solo turno, dalla dashboard o con un messaggio all'assistente su Telegram." },
      { q: "Il cliente deve registrarsi?", a: "No, il cliente non deve registrarsi: lascia nome e telefono e riceve la conferma su WhatsApp." },
      { q: "Posso gestire i seggiolini?", a: "Sì, puoi gestire i seggiolini: indichi quanti ne hai e non vengono accettate più richieste di quelle che puoi soddisfare." },
    ],
    related: ["sala-e-tavoli", "ferie-e-chiusure", "automazioni-whatsapp"],
  },
  {
    slug: "sala-e-tavoli",
    name: "Sala e tavoli",
    short: "La sala in tempo reale",
    group: "Prenotazioni e sala",
    icon: "tables",
    tone: "violet",
    plan: "Pro",
    visual: "sala",
    seo: {
      title: "Gestione tavoli del ristorante e piantina sala",
      description:
        "Gestione tavoli del ristorante con la piantina della sala: assegni le prenotazioni e vedi chi è seduto, chi arriva e cosa si libera. Prova gratis 14 giorni.",
    },
    hero: {
      title: "Tutta la sala sotto controllo, a colpo d'occhio.",
      lead:
        "Sala e tavoli è la piantina del tuo locale, sul telefono o sul tablet. Disegni la sala una volta, con i tavoli veri, poi trascini le prenotazioni sui tavoli e vedi in ogni momento chi è seduto, chi deve arrivare e cosa si libera.",
    },
    steps: [
      { title: "Disegna la sala", text: "Tavoli tondi e quadrati, sale interne e dehors." },
      { title: "Assegna", text: "Trascini la prenotazione sul tavolo, anche unendo più tavoli." },
      { title: "Segui il servizio", text: "Arrivati, seduti, al conto, liberi: i colori dicono tutto." },
    ],
    sections: [
      {
        title: "La serata in un colpo d'occhio",
        text:
          "Ogni tavolo cambia colore in base allo stato. Il responsabile di sala vede subito dove far sedere chi arriva senza prenotazione.",
        points: ["Stati del tavolo con colori chiari", "Linea del tempo della serata", "Più sale e dehors", "Funziona su tablet e telefono"],
      },
    ],
    benefits: [
      { title: "Più coperti", text: "Incastri meglio i tavoli e fai un turno in più." },
      { title: "Meno caos", text: "Tutto lo staff vede la stessa sala." },
      { title: "Walk-in gestiti", text: "Sai subito se e dove far sedere chi entra." },
      { title: "Su ogni dispositivo", text: "Tablet alla cassa, telefono in sala." },
    ],
    faq: [
      { q: "Posso unire più tavoli?", a: "Sì, puoi unire più tavoli: selezioni quelli da unire e la prenotazione occupa tutti quelli scelti." },
      { q: "Serve un tablet dedicato?", a: "No, non serve un tablet dedicato: funziona su qualsiasi tablet, telefono o computer con un browser." },
    ],
    related: ["prenotazioni", "staff-e-turni", "clienti"],
  },
  {
    slug: "ferie-e-chiusure",
    name: "Ferie e chiusure",
    short: "Programmate una volta sola",
    group: "Prenotazioni e sala",
    icon: "calendarX",
    tone: "amber",
    plan: "Base",
    visual: "chiusure",
    seo: {
      title: "Orari, ferie e chiusure del locale sempre giusti",
      description:
        "Orari, ferie e chiusure del locale impostati una volta: ordini e prenotazioni si fermano e ripartono da soli e il cliente vede quando riapri. Prova gratis.",
    },
    hero: {
      title: "Chiudi per ferie. Il sito lo sa già.",
      lead:
        "Ferie e chiusure è il calendario del tuo locale: imposti orari, giorni di riposo, ferie e chiusure straordinarie una volta sola. Ordini e prenotazioni si fermano e ripartono da soli, e i clienti vedono un avviso con la data di riapertura.",
    },
    steps: [
      { title: "Orari settimanali", text: "Pranzo e cena, giorno per giorno." },
      { title: "Ferie e chiusure", text: "Scegli le date sul calendario e scrivi un messaggio." },
      { title: "Fatto", text: "Tutto si ferma e riparte da solo." },
    ],
    sections: [
      {
        title: "Un solo posto per gli orari",
        text:
          "Gli orari che imposti valgono ovunque: menu, ordini da asporto e prenotazioni. Non devi ricordarti di cambiare tre cose diverse.",
        points: ["Orari diversi per pranzo e cena", "Chiusure straordinarie per un solo turno", "Ferie programmate con mesi di anticipo", "Avviso personalizzato per i clienti"],
      },
    ],
    benefits: [
      { title: "Nessuna prenotazione sbagliata", text: "Nessuno prenota quando sei chiuso." },
      { title: "Clienti informati", text: "Vedono quando riapri." },
      { title: "Programmi in anticipo", text: "Le ferie di agosto si impostano a giugno." },
      { title: "Anche dal telefono", text: "O con un vocale all'assistente." },
    ],
    faq: [
      { q: "Posso chiudere solo la cena di un giorno?", a: "Sì, puoi chiudere anche solo la cena: scegli se fermare un giorno intero o un solo turno." },
      { q: "Cosa vedono i clienti?", a: "I clienti vedono un avviso con il tuo messaggio e la data di riapertura. Il menu resta consultabile." },
    ],
    related: ["prenotazioni", "ordini-whatsapp", "assistente"],
  },
  {
    slug: "ordini-whatsapp",
    name: "Ordini su WhatsApp",
    short: "Asporto senza commissioni",
    group: "Vendite e clienti",
    icon: "bag",
    tone: "green",
    plan: "Pro",
    visual: "ordini",
    seo: {
      title: "Ordini da asporto su WhatsApp, senza commissioni",
      description:
        "Ordini da asporto su WhatsApp dal tuo menu digitale: arrivano scritti, con orario di ritiro e totale. Zero commissioni sugli ordini. Prova gratis 14 giorni.",
    },
    hero: {
      title: "Ordini da asporto su WhatsApp. Zero commissioni.",
      lead:
        "Con gli ordini su WhatsApp il cliente sceglie dal tuo menu digitale, indica l'orario di ritiro e ti manda l'ordine già scritto, con il totale. Lo trovi anche in dashboard, in ordine di ritiro. Senza commissioni: paghi solo l'abbonamento.",
    },
    steps: [
      { title: "Il cliente sceglie", text: "Dal menu digitale, con varianti e aggiunte." },
      { title: "Sceglie l'orario", text: "Solo le fasce di ritiro che puoi davvero gestire." },
      { title: "Arriva su WhatsApp", text: "Messaggio ordinato, con totale e orario." },
    ],
    sections: [
      {
        title: "Niente più ordini dettati al telefono",
        text:
          "Ogni ordine arriva scritto, con i piatti, le aggiunte, il totale e l'orario. Niente errori di comprensione nel pieno del servizio.",
        points: ["Messaggio già pronto con tutti i dettagli", "Ordini registrati in dashboard anche se il messaggio non parte", "Note per allergie e richieste"],
      },
      {
        title: "Tu decidi quanti ordini accettare",
        text:
          "Imposti le fasce di ritiro e quanti ordini al massimo per fascia. Se la cucina è piena, metti in pausa gli ordini per mezz'ora con un tocco.",
        points: ["Fasce di ritiro ogni 15 minuti", "Limite di ordini per fascia", "Pausa ordini temporanea", "Anticipo minimo richiesto"],
      },
    ],
    benefits: [
      { title: "0% di commissioni", text: "Paghi solo l'abbonamento, l'incasso è tutto tuo." },
      { title: "Meno telefonate", text: "Le linee restano libere nelle ore di punta." },
      { title: "Ordini più ricchi", text: "Con le foto si aggiunge più facilmente una bibita o un dolce." },
      { title: "Clienti tuoi", text: "Ogni ordine crea la scheda del cliente." },
    ],
    faq: [
      { q: "Prendete una percentuale sugli ordini?", a: "No, non prendiamo nessuna percentuale sugli ordini: paghi solo l'abbonamento mensile o annuale." },
      { q: "Posso mettere in pausa gli ordini?", a: "Sì, puoi mettere in pausa gli ordini per il tempo che decidi tu, dalla dashboard o con un messaggio all'assistente." },
      { q: "Serve WhatsApp Business?", a: "Non è obbligatorio: funziona con il numero WhatsApp del locale. Ti consigliamo comunque WhatsApp Business, che è gratuito." },
      { q: "Il cliente paga online?", a: "No, per ora il cliente paga al ritiro, in contanti o con il POS del locale." },
    ],
    related: ["menu-digitale", "clienti", "automazioni-whatsapp"],
  },
  {
    slug: "clienti",
    name: "Clienti",
    short: "Schede, note e contatti",
    group: "Vendite e clienti",
    icon: "users",
    tone: "blue",
    plan: "Premium",
    visual: "clienti",
    seo: {
      title: "Gestione clienti del ristorante: schede e storico",
      description:
        "Gestione clienti del ristorante: ogni ordine e prenotazione crea la scheda con visite, preferenze, allergie e compleanno. I dati restano tuoi. Prova gratis.",
    },
    hero: {
      title: "Ricordati di ogni cliente come fa il tuo cameriere migliore.",
      lead:
        "Le schede clienti si creano da sole, a ogni prenotazione e a ogni ordine. Vedi quante volte un cliente è venuto, cosa ordina, se ha allergie e quando compie gli anni: lo riconosci prima ancora che si sieda.",
    },
    steps: [
      { title: "Si crea da sola", text: "Da ordini e prenotazioni, senza inserire nulla." },
      { title: "Si arricchisce", text: "Aggiungi note: tavolo preferito, allergie, vino." },
      { title: "La usi", text: "Riconosci il cliente al telefono e gli scrivi al momento giusto." },
    ],
    sections: [
      {
        title: "Tutto quello che sai di un cliente, in una scheda",
        text: "Visite, spesa media, piatti preferiti, note dello staff. Quando prenota di nuovo, la sala sa già chi sta arrivando.",
        points: ["Storico di visite e ordini", "Etichette come abituale, VIP, da richiamare", "Compleanno e consensi privacy", "Esportazione in Excel quando vuoi"],
      },
    ],
    benefits: [
      { title: "Clienti abituali riconosciuti", text: "Il tavolo preferito è già pronto." },
      { title: "Dati tuoi", text: "Non restano chiusi in un portale esterno." },
      { title: "Privacy in regola", text: "Consensi raccolti e registrati." },
      { title: "Base per le automazioni", text: "Promemoria, auguri e messaggi mirati." },
    ],
    faq: [
      { q: "Devo inserire i clienti a mano?", a: "No, non devi inserire i clienti a mano: le schede si creano da prenotazioni e ordini. Puoi anche importare una lista esistente." },
      { q: "I dati sono al sicuro?", a: "Sì, i dati sono al sicuro: stanno su server in Europa e li vedete solo tu e lo staff che autorizzi." },
    ],
    related: ["automazioni-whatsapp", "prenotazioni", "statistiche"],
  },
  {
    slug: "automazioni-whatsapp",
    name: "Automazioni WhatsApp",
    short: "Promemoria, recensioni, campagne",
    group: "Vendite e clienti",
    icon: "chat",
    tone: "pink",
    plan: "Premium",
    visual: "automazioni",
    seo: {
      title: "Messaggi WhatsApp automatici per ristoranti",
      description:
        "Messaggi WhatsApp automatici dal numero del tuo locale: promemoria, richiesta di recensione, auguri e un saluto a chi non torna da tempo. Prova gratis.",
    },
    hero: {
      title: "I messaggi giusti partono da soli.",
      lead:
        "Le automazioni WhatsApp sono messaggi che partono da soli dal numero del tuo locale: promemoria il giorno prima, richiesta di recensione il giorno dopo, auguri di compleanno, un saluto a chi non torna da due mesi. Li scegli una volta sola.",
    },
    steps: [
      { title: "Collega WhatsApp", text: "Il numero di sempre, in pochi minuti." },
      { title: "Scegli le automazioni", text: "Le attivi con un interruttore e ritocchi il testo." },
      { title: "Guarda i risultati", text: "Quante conferme, quante recensioni, quanti ritorni." },
    ],
    sections: [
      {
        title: "Automazioni pronte, scritte bene",
        text: "Partono con testi già pensati per la ristorazione. Puoi cambiarli come vuoi.",
        points: [
          "Promemoria con pulsanti Confermo e Annulla",
          "Richiesta di recensione su Google dopo la visita",
          "Auguri di compleanno con un omaggio",
          "Messaggio a chi non torna da 60 giorni",
        ],
      },
      {
        title: "Messaggi a gruppi di clienti",
        text: "Nuovo menu, serata a tema, la pizza del mese: scegli a chi scrivere tra i clienti che hanno dato il consenso.",
        points: ["Gruppi per etichetta, visite o spesa", "Solo a chi ha dato il consenso", "Costo dei messaggi visibile prima dell'invio"],
      },
    ],
    benefits: [
      { title: "Più recensioni", text: "Chiederle al momento giusto fa la differenza." },
      { title: "Meno no-show", text: "Il promemoria riduce le assenze." },
      { title: "Clienti che tornano", text: "Un messaggio al momento giusto li riporta." },
      { title: "Dal tuo numero", text: "I clienti vedono il nome del tuo locale." },
    ],
    faq: [
      { q: "Devo cambiare numero WhatsApp?", a: "No, non devi cambiare numero: colleghi quello che usi già e continui a rispondere dall'app WhatsApp Business." },
      { q: "Quanto costano i messaggi?", a: "Alcuni messaggi WhatsApp hanno un costo fissato da Meta, di pochi centesimi l'uno. Lo vedi sempre prima di inviare." },
      { q: "È in regola con la privacy?", a: "Sì: i messaggi promozionali partono solo verso chi ha dato il consenso, che viene registrato nella scheda del cliente." },
    ],
    related: ["clienti", "prenotazioni", "statistiche"],
  },
  {
    slug: "statistiche",
    name: "Statistiche",
    short: "Cosa vendi e quando",
    group: "Gestione",
    icon: "chart",
    tone: "violet",
    plan: "Pro",
    visual: "statistiche",
    seo: {
      title: "Statistiche del ristorante: piatti e ore di punta",
      description:
        "Statistiche del ristorante chiare: i piatti più visti e ordinati, le ore di punta, i coperti e gli ordini della settimana. Prova gratis 14 giorni.",
    },
    hero: {
      title: "Numeri semplici, per decidere meglio.",
      lead: "Le statistiche ti dicono quali piatti guardano di più, quali ordinano, a che ora e da dove arrivano i clienti. Tutto in una schermata che capisci in dieci secondi, senza termini tecnici.",
    },
    steps: [
      { title: "Si raccolgono da sole", text: "Ogni visita al menu, ordine e prenotazione." },
      { title: "Le leggi", text: "Grafici chiari, senza termini tecnici." },
      { title: "Decidi", text: "Cambi il menu, i prezzi o gli orari con i numeri in mano." },
    ],
    sections: [
      {
        title: "Le domande che ti fai davvero",
        text: "Quale pizza devo togliere? Conviene aprire il lunedì? Quanto vale l'asporto? Le statistiche rispondono a questo.",
        points: ["Piatti più visti e più ordinati", "Ore e giorni di punta", "Coperti e ordini per settimana", "Lingue dei visitatori"],
      },
    ],
    benefits: [
      { title: "Menu più snello", text: "Togli quello che nessuno guarda." },
      { title: "Prezzi giusti", text: "Vedi cosa vende davvero." },
      { title: "Personale giusto", text: "Sai quando servono più mani." },
      { title: "Report mensile", text: "Un riassunto chiaro ogni mese." },
    ],
    faq: [
      { q: "Le statistiche rispettano la privacy?", a: "Sì, le statistiche rispettano la privacy: sono dati aggregati e anonimi sulle visite al menu." },
      { q: "Posso esportarle?", a: "Sì, puoi esportare le statistiche in Excel." },
    ],
    related: ["menu-digitale", "ordini-whatsapp", "clienti"],
  },
  {
    slug: "staff-e-turni",
    name: "Staff e turni",
    short: "Accessi e turni del team",
    group: "Gestione",
    icon: "badge",
    tone: "grey",
    plan: "Premium",
    visual: "staff",
    seo: {
      title: "Turni del personale e accessi dello staff",
      description:
        "Turni del personale di sala e cucina sempre visibili dal telefono, e un accesso per ogni collaboratore con i permessi giusti. Niente password condivise.",
    },
    hero: {
      title: "Il team sa sempre chi lavora e quando.",
      lead: "Staff e turni dà a ogni collaboratore il suo accesso, con i permessi giusti, e mette i turni della settimana sul telefono di tutti. Tu li prepari una volta, loro smettono di chiederteli.",
    },
    steps: [
      { title: "Invita lo staff", text: "Un invito per email o WhatsApp." },
      { title: "Scegli i permessi", text: "Chi vede le prenotazioni, chi cambia il menu." },
      { title: "Pubblica i turni", text: "La settimana di sala e cucina, sempre aggiornata." },
    ],
    sections: [
      {
        title: "Ognuno vede solo quello che gli serve",
        text: "Il cameriere conferma le prenotazioni, il cuoco segna i piatti esauriti, solo tu vedi incassi e impostazioni.",
        points: ["Ruoli pronti: titolare, sala, cucina", "Permessi su misura", "Registro di chi ha cambiato cosa"],
      },
    ],
    benefits: [
      { title: "Niente password condivise", text: "Ognuno con il suo accesso." },
      { title: "Turni chiari", text: "Niente gruppi WhatsApp confusi." },
      { title: "Più autonomia", text: "Lo staff aggiorna il menu senza chiamarti." },
      { title: "Sicurezza", text: "Togli l'accesso a chi non lavora più con te." },
    ],
    faq: [
      { q: "Quanti collaboratori posso aggiungere?", a: "Nel piano Premium puoi aggiungere tutti i collaboratori che vuoi: non ci sono limiti al numero di accessi." },
    ],
    related: ["sala-e-tavoli", "prenotazioni", "assistente"],
  },
  {
    slug: "assistente",
    name: "Assistente vocale",
    short: "Gestisci tutto con un vocale",
    group: "Gestione",
    icon: "mic",
    tone: "blue",
    plan: "Pro",
    visual: "assistente",
    seo: {
      title: "Assistente vocale per gestire il ristorante",
      description:
        "Assistente vocale per il tuo locale: mandi un vocale su Telegram e aggiorna menu, orari e prenotazioni, dopo la tua conferma. Prova gratis 14 giorni.",
    },
    hero: {
      title: "Lo dici a voce. Il locale si aggiorna.",
      lead:
        "L'assistente vocale ti fa gestire il locale con un messaggio su Telegram, mentre sei in cucina: \"segna esauriti i tonnarelli\", \"stasera chiudiamo alle 22\", \"tavolo per quattro alle 20 a nome Rossi\". Capisce, ti chiede conferma e aggiorna tutto.",
    },
    steps: [
      { title: "Collega Telegram", text: "Dalla dashboard, con un tocco." },
      { title: "Parla o scrivi", text: "Come lo diresti a un collaboratore." },
      { title: "Conferma", text: "L'assistente ti riepiloga e tu confermi." },
    ],
    sections: [
      {
        title: "Tutto quello che faresti dalla dashboard",
        text: "Senza aprire nulla, con le mani occupate. L'assistente conosce il tuo menu, i tuoi orari e le tue prenotazioni.",
        points: [
          "Segnare piatti esauriti o di nuovo disponibili",
          "Aggiungere, spostare o annullare prenotazioni",
          "Chiudere un turno o bloccare le prenotazioni",
          "Mettere in pausa gli ordini per mezz'ora",
          "Chiedere \"quanti coperti stasera?\"",
        ],
      },
      {
        title: "Sicuro per definizione",
        text: "Prima di ogni modifica importante l'assistente ti mostra cosa sta per fare e aspetta il tuo sì. Può usarlo solo chi hai collegato tu.",
        points: ["Conferma prima di ogni modifica", "Solo i numeri autorizzati", "Storico di ogni azione"],
      },
    ],
    benefits: [
      { title: "Mani libere", text: "Un vocale mentre impasti." },
      { title: "Dieci secondi", text: "Più veloce di qualsiasi menu." },
      { title: "Per tutto lo staff", text: "Ognuno con i suoi permessi." },
      { title: "Capisce il dialetto del locale", text: "Conosce i nomi dei tuoi piatti." },
    ],
    faq: [
      { q: "Funziona anche su WhatsApp?", a: "Per ora l'assistente funziona su Telegram, che è gratuito. WhatsApp arriverà più avanti." },
      { q: "E se capisce male?", a: "Se capisce male non succede niente: prima di modificare qualcosa ti mostra il riepilogo e aspetta la tua conferma." },
      { q: "Chi può usarlo?", a: "Possono usarlo solo le persone che colleghi dalla dashboard, con i permessi che scegli tu." },
    ],
    related: ["ferie-e-chiusure", "prenotazioni", "menu-digitale"],
  },
]);

export const featureBySlug = (slug: string) => features.find((f) => f.slug === slug);
