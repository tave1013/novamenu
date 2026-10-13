import type { Guide } from "./guides";
import { withId } from "./util";

/*
 * Guide pratiche per tipo di locale.
 * Nel testo, {{art:nome}} inserisce una grafica statica definita in `arts`.
 * I numeri dei riquadri "Fai i conti" sono esempi: servono a far fare i conti al lettore, non sono statistiche.
 */
export const sectorGuides: Guide[] = withId<Guide>([
  {
    slug: "pizzeria-ore-perse-al-telefono",
    seo: {
      title: "Pizzeria: quante ore perdi al telefono ogni mese",
      description:
        "Fai i conti delle telefonate per l'asporto in pizzeria e scopri 7 modi concreti per ridurle: ordini scritti, fasce di ritiro e pausa quando il forno è pieno.",
    },
    title: "Pizzeria: quante ore perdi al telefono ogni mese (e come recuperarle)",
    description:
      "Fai i conti delle telefonate per l'asporto e scopri 7 modi concreti per ridurle: ordini scritti, fasce di ritiro, link ovunque e pausa quando il forno è pieno.",
    date: "2026-10-12",
    readMinutes: 11,
    sector: "pizzerie",
    related: ["ordini-whatsapp", "menu-digitale", "assistente"],
    arts: {
      conti: {
        kind: "calc",
        title: "Le telefonate per l'asporto in un mese",
        rows: [
          { label: "Telefonate in una sera", value: "25" },
          { label: "Minuti per telefonata, tra dettagli e ripetizioni", value: "3 min" },
          { label: "Sere di apertura al mese", value: "22" },
        ],
        result: { label: "Ore al telefono al mese", value: "circa 27 ore" },
        note: "Esempio di calcolo. Prova con i tuoi numeri: basta contare le telefonate di un sabato.",
      },
      fasce: {
        kind: "slots",
        title: "Scegli quando ritirare",
        days: [{ d: "Ven", n: "17" }, { d: "Sab", n: "18" }, { d: "Dom", n: "19" }],
        slots: [
          { t: "19:00", s: "free" }, { t: "19:15", s: "few" }, { t: "19:30", s: "full" },
          { t: "19:45", s: "sel" }, { t: "20:00", s: "full" }, { t: "20:15", s: "free" },
        ],
        note: "Ritiro sabato alle 19:45",
      },
      ordine: {
        kind: "order",
        who: "Luca Bianchi",
        lines: ["2 × Margherita", "1 × Diavola, impasto integrale", "1 × Patatine"],
        total: "€ 27,50",
        when: "Ritiro sabato 19:45",
        extra: "Nota: tagliate a spicchi, grazie",
      },
    },
    html: `
<p>Il sabato sera il telefono della pizzeria suona di continuo. Ogni telefonata sembra breve, ma tra "che pizze avete?", "quanto costa la bufala?", "mi ripete il totale?" e il nome da scrivere sul foglietto, i minuti si sommano. E spesso a rispondere è proprio chi dovrebbe stare al forno o al banco.</p>
<p>In questa guida facciamo prima i conti, poi vediamo sette modi concreti per spostare gli ordini dal telefono allo scritto, senza perdere i clienti che preferiscono chiamare.</p>

<h2>Prima di tutto, fai i conti</h2>
<p>Prendi un sabato qualsiasi e segna su un foglio quante telefonate ricevi per l'asporto. Poi stima quanto dura in media una chiamata, contando anche quelle in cui il cliente richiama per cambiare qualcosa.</p>
{{art:conti}}
<p>Anche con numeri prudenti si arriva facilmente a più di venti ore al mese passate al telefono, quasi sempre nelle ore di punta. Sono ore in cui una persona non impasta, non serve e non controlla il forno. E sono anche le ore in cui nascono gli errori: un nome capito male, una pizza dimenticata, un orario di ritiro che si sovrappone ad altri dieci.</p>

<h2>1. Sposta l'ordine dalla voce allo scritto</h2>
<p>Il primo passo è dare al cliente un modo per ordinare scrivendo. Un ordine scritto si legge in cinque secondi, non va ripetuto e resta lì: se c'è un dubbio lo ricontrolli, non lo ricordi.</p>
<p>Il canale più semplice in Italia è WhatsApp, perché lo usano tutti, anche i clienti più grandi. Il cliente sceglie dal menu online, il carrello si trasforma in un messaggio già scritto e tu lo ricevi sul numero del locale. Ne parliamo in dettaglio nella guida su <a href="/guide/ordini-asporto-whatsapp-senza-commissioni/">come organizzare gli ordini da asporto su WhatsApp senza commissioni</a>.</p>
{{art:ordine}}

<h2>2. Fai rispondere il menu al posto tuo</h2>
<p>Ascolta per una sera le domande che ti fanno al telefono. Quasi sempre sono le stesse: i prezzi, gli impasti disponibili, se si può togliere un ingrediente, se c'è qualcosa senza glutine, fino a che ora si ritira. Ogni domanda ricorrente è un'informazione che il tuo menu online non dà abbastanza chiaramente.</p>
<ul>
<li><strong>Prezzi sempre visibili</strong>, anche delle aggiunte e degli impasti speciali.</li>
<li><strong>Varianti scritte</strong>: formato, impasto, "senza" e "con" con il loro prezzo.</li>
<li><strong>Allergeni indicati</strong> per ogni pizza, come spieghiamo nella guida sui <a href="/guide/allergeni-nel-menu/">14 allergeni nel menu</a>.</li>
<li><strong>Orari dell'asporto</strong> in alto, non nascosti in fondo alla pagina.</li>
</ul>

<h2>3. Dai un limite a ogni fascia di ritiro</h2>
<p>Il problema del sabato non è il numero di ordini, è che arrivano tutti per le 20. Se il forno sforna al massimo dieci pizze ogni quarto d'ora, accettare trenta ordini per le 20:00 significa clienti che aspettano e pizze che si raffreddano.</p>
<p>La soluzione è dividere la serata in fasce, per esempio ogni quindici minuti, e decidere quante pizze accetti in ciascuna. Quando una fascia è piena il cliente vede solo quelle libere e sceglie da solo un orario diverso.</p>
{{art:fasce}}
<p>All'inizio sembra di rinunciare a degli ordini. In realtà succede il contrario: il cliente che trova le 20:00 piena sceglie le 20:15, invece di chiamare, trovare occupato e ordinare altrove.</p>

<h2>4. Metti il link ovunque, non solo sul sito</h2>
<p>Un sistema di ordini funziona solo se i clienti lo trovano. Il link al menu deve essere in tutti i posti dove oggi c'è il tuo numero di telefono:</p>
<ul>
<li>Il profilo Google, nel campo dedicato agli ordini e nel sito web.</li>
<li>La bio di Instagram e la pagina Facebook.</li>
<li>Un QR code sul cartone della pizza e sullo scontrino: il prossimo ordine parte da lì.</li>
<li>Un adesivo in vetrina, per chi passa davanti a locale chiuso.</li>
<li>La risposta automatica di WhatsApp Business: "Ciao! Per ordinare usa questo link, ti rispondiamo in un attimo."</li>
</ul>

<h2>5. Metti in pausa gli ordini quando il forno è pieno</h2>
<p>Ci sono sere in cui, per un tavolo da venti o un forno che fatica, non riesci a stare dietro a tutto. Invece di lasciar squillare il telefono, metti in pausa gli ordini online per mezz'ora. Il cliente vede un messaggio chiaro e la prima fascia disponibile, e tu non accumuli ritardi che poi si trascinano fino a fine serata.</p>

<h2>6. Segna gli esauriti in tempo reale</h2>
<p>Finisce la bufala alle 20:15? Se il menu online continua a proporla, riceverai ordini che dovrai correggere, con una telefonata. Segnarla esaurita dal telefono richiede due secondi e la toglie dalle scelte. Con un assistente vocale puoi farlo anche a voce, con le mani nell'impasto: "bufala finita".</p>

<h2>7. Non spegnere il telefono, cambia il copione</h2>
<p>Alcuni clienti continueranno a chiamare, ed è giusto così. Ma puoi cambiare il modo in cui rispondi: "Se vuole le mando il link su WhatsApp, così sceglie con calma e vede l'orario libero". Dopo due o tre volte molti clienti abituali ordinano direttamente scrivendo.</p>
<p>Puoi anche registrare un messaggio sulla segreteria per i momenti in cui non riesci a rispondere, che indichi il link per ordinare.</p>

<h2>Un copione per chi risponde al telefono</h2>
<p>Chi risponde al telefono il sabato sera ha bisogno di frasi pronte, brevi e sempre uguali. Scrivile su un foglio vicino alla cassa:</p>
<blockquote><p>"Buonasera! Se vuole le mando subito il link su WhatsApp: sceglie con calma, vede l'orario libero e trova tutto già pronto."</p></blockquote>
<blockquote><p>"Per stasera alle 20 siamo pieni, le posso dare le 20:15 o le 20:30. Oppure dal link vede tutti gli orari ancora liberi."</p></blockquote>
<p>La seconda frase è importante: non dire "siamo pieni" e basta. Proponi sempre un orario alternativo, altrimenti il cliente ordina altrove.</p>

<h2>Usa i giorni lenti per spostare gli ordini</h2>
<p>Il martedì e il mercoledì il forno lavora a metà. Puoi usare quelle sere per abituare i clienti a ordinare scrivendo, con proposte che valgono solo online:</p>
<ul>
<li><strong>La pizza del mese</strong>, disponibile solo dal menu online, con ingredienti di stagione.</li>
<li><strong>Una combinazione a prezzo fisso</strong>, per esempio due pizze classiche e una bibita, solo per gli ordini online dal martedì al giovedì.</li>
<li><strong>Le fasce presto</strong>: chi ritira tra le 19:00 e le 19:30 trova una piccola sorpresa, come una porzione di patatine. Ti aiuta a riempire le fasce vuote e a svuotare quelle delle 20.</li>
</ul>

<h2>Il cartone che porta il prossimo ordine</h2>
<p>Il cartone della pizza resta sul tavolo di casa del cliente per tutta la cena. È il posto migliore per il tuo link. Un adesivo con il QR e una frase semplice basta:</p>
<blockquote><p>"Ti è piaciuta? La prossima volta ordina da qui in 30 secondi, senza telefonare."</p></blockquote>

<div class="box">
<p>Checklist per il primo sabato</p>
<ol>
<li>Menu online completo di prezzi, varianti e allergeni.</li>
<li>Fasce di ritiro da 15 minuti con il limite di pizze deciso insieme al pizzaiolo.</li>
<li>Link nel profilo Google, su Instagram e nella risposta automatica di WhatsApp Business.</li>
<li>Adesivi con il QR sui cartoni e in vetrina.</li>
<li>Copione per il telefono vicino alla cassa.</li>
<li>Conteggio delle telefonate di questo sabato, da confrontare tra un mese.</li>
</ol>
</div>

<h2>Gli errori da evitare</h2>
<ul>
<li><strong>Accettare ordini senza orario</strong>: ogni ordine deve avere la sua fascia di ritiro, anche quelli presi al telefono.</li>
<li><strong>Fasce troppo larghe</strong>: "tra le 19 e le 21" non serve a niente. Meglio quarti d'ora.</li>
<li><strong>Non aggiornare gli esauriti</strong>: un cliente che ordina la bufala e se la vede cambiare al ritiro non ordina più online.</li>
<li><strong>Rispondere ai messaggi uno per uno</strong>: se il carrello arriva già completo, basta confermare.</li>
</ul>

<h2>Cosa aspettarti nelle prime settimane</h2>
<p>Il passaggio non è immediato. Nelle prime due o tre settimane gli ordini scritti saranno una parte del totale, poi cresceranno man mano che il link gira e i clienti si abituano. Conviene misurare: conta le telefonate di un sabato prima di partire e di un sabato dopo un mese. È il modo più onesto per capire quante ore hai recuperato.</p>

<h2>Come farlo con {{brand}}</h2>
<p>Con {{brand}} il menu online, gli ordini su WhatsApp con le fasce di ritiro, la pausa ordini e gli esauriti sono nello stesso posto, e non paghi commissioni sugli ordini. Se vuoi vedere come funzionerebbe con il tuo menu, <a href="/demo/">prenota una demo di 20 minuti</a> oppure leggi la pagina dedicata alle <a href="/settori/pizzerie/">pizzerie</a>.</p>
`,
  },
  {
    slug: "gastronomia-vendere-di-piu-a-pranzo",
    seo: {
      title: "Gastronomia: 8 idee per vendere di più a pranzo",
      description:
        "8 idee per la tua gastronomia o rosticceria: piatti del giorno pubblicati presto, preordini con fascia di ritiro, ordini dagli uffici e menu delle feste.",
    },
    title: "Gastronomia e rosticceria: 8 idee concrete per vendere di più a pranzo",
    description:
      "Piatti del giorno pubblicati presto, preordini con fascia di ritiro, ordini di gruppo dagli uffici e menu delle feste in anticipo: 8 idee pratiche per la tua gastronomia.",
    date: "2026-10-11",
    readMinutes: 12,
    sector: "gastronomie",
    related: ["ordini-whatsapp", "menu-digitale", "clienti"],
    arts: {
      conti: {
        kind: "calc",
        title: "Quanto valgono i preordini del pranzo",
        rows: [
          { label: "Preordini in più al giorno", value: "10" },
          { label: "Scontrino medio a pranzo", value: "€ 14" },
          { label: "Giorni di apertura al mese", value: "24" },
        ],
        result: { label: "Incasso in più al mese", value: "€ 3.360" },
        note: "Esempio di calcolo. Il punto non è il numero esatto: anche pochi ordini in più al giorno, ripetuti per un mese, fanno una cifra importante.",
      },
      fasce: {
        kind: "slots",
        title: "Ritiro oggi",
        days: [{ d: "Oggi", n: "14" }, { d: "Mer", n: "15" }, { d: "Gio", n: "16" }],
        slots: [
          { t: "12:00", s: "full" }, { t: "12:15", s: "few" }, { t: "12:30", s: "sel" },
          { t: "12:45", s: "free" }, { t: "13:00", s: "free" }, { t: "13:15", s: "free" },
        ],
        note: "Ritiro oggi alle 12:30",
      },
      giornata: {
        kind: "dayparts",
        rows: [
          { t: "Pranzo", time: "11:30 a 14:30", on: true, items: "Piatti del giorno, preordini entro le 11:30" },
          { t: "Fine pranzo", time: "14:30 a 15:30", on: true, items: "Porzioni rimaste a meno 30%" },
          { t: "Box cena", time: "17:00 a 19:30", on: true, items: "Primo, secondo e contorno da scaldare a casa" },
        ],
      },
      feste: {
        kind: "order",
        who: "Famiglia Bertola",
        lines: ["800 g × Vitello tonnato", "1,5 kg × Lasagna al forno", "2 × Pollo arrosto"],
        total: "€ 76,60",
        when: "Ritiro 24 dicembre 11:00",
        extra: "Nota: lasagna in due teglie",
      },
    },
    html: `
<p>In una gastronomia il pranzo si gioca in un'ora e mezza. Tra le 12 e le 13:30 c'è la coda, il banco si svuota e chi entra alle 13:15 trova metà dei piatti finiti. Il resto della giornata è più tranquillo, ma è proprio lì che si può preparare il terreno per vendere di più.</p>
<p>Ecco otto idee pratiche, nessuna delle quali richiede di cambiare il modo in cui cucini.</p>

<h2>Perché conviene lavorare sui preordini</h2>
<p>Un cliente che ordina alle 10 per ritirare alle 12:30 non fa la coda, non trova il piatto finito e non va in un altro posto perché c'era troppa gente. Per te è un ordine sicuro, già pagato o quasi, che puoi preparare con calma.</p>
{{art:conti}}

<h2>1. Pubblica i piatti del giorno entro le 9</h2>
<p>Il cliente decide dove pranzare tra le 9 e le 11, spesso dal telefono. Se a quell'ora non sa cosa c'è al banco, sceglie in base all'abitudine o alla comodità. Pubblicare i piatti del giorno presto, con il prezzo al chilo o a porzione, ti mette nella sua lista.</p>
<ul>
<li>Aggiorna il menu online dal telefono appena i piatti sono pronti.</li>
<li>Condividi lo stesso link nello stato di WhatsApp e nelle storie di Instagram.</li>
<li>Una foto del banco vero, anche fatta con il telefono, vale più di dieci foto da catalogo.</li>
</ul>

<h2>2. Fai scegliere la fascia di ritiro</h2>
<p>Dividi il pranzo in fasce da un quarto d'ora e decidi quanti ordini accetti in ciascuna. Il cliente sceglie quando passare, tu prepari in ordine di orario e il banco non si blocca.</p>
{{art:fasce}}
<p>Chiudi i preordini a un'ora fissa, per esempio alle 11:30, così sai esattamente cosa mettere da parte prima dell'arrivo della coda.</p>

<h2>3. Peso o porzione: offri entrambi</h2>
<p>Il prezzo al chilo è giusto per te, ma per chi ordina dal telefono è difficile immaginare quanto sono 300 grammi di lasagna. Accanto al prezzo al chilo proponi una porzione standard a prezzo fisso, per esempio "porzione circa 350 g, 6,50 €". Chi vuole una quantità precisa la scrive, chi ha fretta sceglie la porzione.</p>

<h2>4. Proponi un "pranzo completo"</h2>
<p>Un primo, un contorno e una bottiglietta d'acqua a un prezzo unico funzionano meglio di tre prodotti separati. Il cliente non deve pensare, lo scontrino medio sale e tu sai in anticipo quante porzioni di contorno preparare.</p>

<h2>5. Cerca gli uffici vicini</h2>
<p>Studi, negozi, cantieri, ambulatori: chi lavora intorno a te pranza tutti i giorni e spesso in gruppo. Porta un biglietto con il QR del menu e proponi un ordine di gruppo con un solo ritiro: uno raccoglie le scelte dei colleghi entro le 11, passa alle 12:30 e ritira tutto insieme.</p>
<p>Sono clienti che, se si trovano bene, tornano ogni settimana.</p>

<h2>6. Apri il menu delle feste con largo anticipo</h2>
<p>Natale, Pasqua, la domenica delle Palme, Ferragosto: sono i giorni in cui la gastronomia lavora di più, ma anche quelli in cui gli ordini si accavallano. Aprire le prenotazioni due o tre settimane prima ti permette di sapere le quantità e di comprare le materie prime al momento giusto.</p>
{{art:feste}}
<p>Con gli ordini scritti hai anche il totale per prodotto: quanti chili di vitello tonnato, quante teglie di lasagna, quanti polli. È la lista della spesa già fatta.</p>

<h2>7. Tieni una lista dei clienti abituali</h2>
<p>Ogni ordine porta un nome e un numero. Con il consenso del cliente, puoi mandare un messaggio quando c'è un piatto che di solito ordina o quando apri il menu delle feste. Un messaggio al mese, mirato, funziona molto meglio di un volantino.</p>
<p>Attenzione al consenso: i messaggi promozionali vanno mandati solo a chi ha accettato di riceverli.</p>

<h2>8. Riduci lo spreco di fine giornata</h2>
<p>Più ordini arrivano prima, più la produzione diventa prevedibile. Prepara quello che è già prenotato più un margine per il banco, e osserva per qualche settimana quanto avanza. Spesso basta spostare una teglia da un giorno all'altro per trasformare lo spreco in guadagno.</p>

<h2>9. Pubblica il calendario della settimana</h2>
<p>Molti clienti scelgono la gastronomia per un piatto preciso: la trippa del martedì, il baccalà del venerdì, la lasagna della domenica. Se pubblichi il lunedì il calendario dei piatti della settimana, i clienti si organizzano e tu sai già quante porzioni preparare.</p>
<table>
<tr><th>Giorno</th><th>Piatto fisso</th></tr>
<tr><td>Martedì</td><td>Trippa in umido</td></tr>
<tr><td>Mercoledì</td><td>Bollito misto con salse</td></tr>
<tr><td>Venerdì</td><td>Baccalà e piatti di pesce</td></tr>
<tr><td>Domenica</td><td>Lasagna, arrosti e contorni da ordinare entro sabato</td></tr>
</table>

<h2>10. Dopo il pranzo: fine giornata e box cena</h2>
<p>Il pranzo non è l'unico momento della giornata. Quello che resta alle 14:30 può diventare un'offerta di fine pranzo, e il pomeriggio può portare un secondo incasso con la cena da portare a casa.</p>
{{art:giornata}}
<ul>
<li><strong>Fine pranzo a prezzo ridotto</strong>, sempre alla stessa ora, solo sulle porzioni del giorno.</li>
<li><strong>Box cena</strong> a prezzo fisso, pensato per chi esce tardi dal lavoro: primo, secondo e contorno con le istruzioni per scaldarli.</li>
<li><strong>Annuncio alle 17</strong> nello stato di WhatsApp, con la foto del box e l'orario di ritiro.</li>
</ul>

<h2>Messaggi d'esempio da copiare</h2>
<p>Ogni mattina, nello stato di WhatsApp o nelle storie:</p>
<blockquote><p>🍝 Oggi al banco: lasagna al forno, vitello tonnato, pollo arrosto e verdure grigliate. Ordina entro le 11:30 e ritira senza coda: [link]</p></blockquote>
<p>Agli uffici vicini, una volta sola, con il biglietto e il QR:</p>
<blockquote><p>Ciao! Siamo la gastronomia qui di fianco. Se in ufficio pranzate spesso insieme, potete ordinare dal nostro menu entro le 11 e passare a ritirare tutto in un'unica volta alle 12:30.</p></blockquote>

<h2>Gli errori da evitare</h2>
<ul>
<li><strong>Pubblicare i piatti alle 12</strong>: a quell'ora il cliente ha già deciso.</li>
<li><strong>Solo il prezzo al chilo</strong>: chi ordina dal telefono vuole sapere quanto spende per una porzione.</li>
<li><strong>Nessuna ora di chiusura dei preordini</strong>: ricevere un ordine alle 12:25 per le 12:30 crea più problemi che vantaggi.</li>
<li><strong>Box e offerte sempre diversi</strong>: per diventare un'abitudine devono essere riconoscibili.</li>
</ul>

<h2>Da dove partire</h2>
<p>Non serve fare tutto subito. Il primo passo che dà risultati più velocemente è il numero 1, i piatti del giorno online ogni mattina, seguito dalle fasce di ritiro. Gli uffici e le feste arrivano dopo, quando il sistema è rodato.</p>

<h2>Come farlo con {{brand}}</h2>
<p>Con {{brand}} pubblichi i piatti del giorno dal telefono con prezzo al chilo o a porzione, ricevi i preordini su WhatsApp con la fascia di ritiro e tieni la lista dei clienti, senza commissioni sugli ordini. Trovi tutti i dettagli nella pagina dedicata alle <a href="/settori/gastronomie/">gastronomie e rosticcerie</a>.</p>
`,
  },
  {
    slug: "panetteria-pane-prenotato-meno-spreco",
    seo: {
      title: "Panetteria: far prenotare il pane e buttarne meno",
      description:
        "Quanto pane avanza ogni mese in panetteria e come ridurlo: prenotazioni la sera prima, fasce di ritiro al mattino, ordini ricorrenti e torte con preavviso.",
    },
    title: "Panetteria: come far prenotare il pane la sera e buttarne meno",
    description:
      "Quanto pane avanza ogni mese e come ridurlo: prenotazioni la sera prima, fasce di ritiro al mattino, ordini ricorrenti e torte con preavviso. Guida pratica per panetterie e pasticcerie.",
    date: "2026-10-10",
    readMinutes: 12,
    sector: "panetterie",
    related: ["ordini-whatsapp", "menu-digitale", "menu-a-orari"],
    arts: {
      conti: {
        kind: "calc",
        title: "Il pane che avanza in un mese",
        rows: [
          { label: "Pane invenduto a fine giornata", value: "4 kg" },
          { label: "Prezzo medio al chilo", value: "€ 4,20" },
          { label: "Giorni di apertura al mese", value: "26" },
        ],
        result: { label: "Valore del pane invenduto", value: "€ 437" },
        note: "Esempio di calcolo a prezzo di vendita. Pesa l'invenduto per una settimana e rifai il conto con i tuoi dati.",
      },
      fasce: {
        kind: "slots",
        title: "Ritiro domattina",
        days: [{ d: "Mar", n: "14" }, { d: "Mer", n: "15" }, { d: "Gio", n: "16" }],
        slots: [
          { t: "7:00", s: "few" }, { t: "7:30", s: "sel" }, { t: "8:00", s: "full" },
          { t: "8:30", s: "free" }, { t: "9:00", s: "free" }, { t: "9:30", s: "free" },
        ],
        note: "Ritiro mercoledì alle 7:30",
      },
      catalogo: {
        kind: "catalog",
        shop: "Forno San Guido",
        status: "Prenota entro le 20:00 per domattina",
        tabs: ["Pane", "Focacce", "Torte", "Ricorrenze"],
        items: [
          { name: "Pane di semola", desc: "Pagnotta circa 500 g", price: "4,20", unit: "kg", c: "#e7d5b5" },
          { name: "Grissini stirati a mano", desc: "Sacchetto circa 250 g", price: "12,00", unit: "kg", c: "#fde68a" },
          { name: "Torta di nocciole", desc: "Su ordinazione, 2 giorni prima", price: "24,00", unit: "kg", c: "#d6b8a8" },
        ],
      },
      finesera: {
        kind: "dayparts",
        rows: [
          { t: "Pane del giorno", time: "7:00 a 18:00", on: true, items: "Prezzo pieno, tutto il catalogo" },
          { t: "Fine giornata", time: "18:00 a 19:30", on: true, items: "Pane e focacce del giorno a meno 30%" },
          { t: "Sacchetto sorpresa", time: "19:00 a 19:30", on: true, items: "Circa 2 kg di prodotti misti a 5 €" },
        ],
      },
      torta: {
        kind: "order",
        who: "Paolo Marino",
        lines: ["1 × Torta di nocciole, 1,5 kg", "12 persone", "1 kg × Pane di semola"],
        total: "€ 40,20",
        when: "Ritiro sabato 10:30",
        extra: "Scritta: Buon compleanno nonna Rina",
      },
    },
    html: `
<p>Ogni forno conosce il problema: alle 19 restano sugli scaffali pagnotte, focacce e grissini che domani non si potranno vendere allo stesso prezzo. Si cerca di indovinare la produzione in base all'esperienza, ma basta un giorno di pioggia o una festa in paese per sbagliare.</p>
<p>Le prenotazioni non eliminano il problema, ma spostano una parte della produzione dalla stima alla certezza. Vediamo come farle funzionare davvero.</p>

<h2>Quanto ti costa l'invenduto</h2>
<p>Per una settimana, pesa il pane che resta a fine giornata. Poi moltiplica per il prezzo medio e per i giorni di apertura.</p>
{{art:conti}}
<p>Anche recuperarne solo una parte, con le prenotazioni e una produzione più precisa, significa qualche centinaio di euro al mese che oggi finisce nel sacco del pane secco.</p>

<h2>1. Fai prenotare la sera prima</h2>
<p>Molti clienti comprano lo stesso pane ogni giorno. Se possono prenotarlo la sera, dal divano, tu sai la mattina quanto ne serve. Fissa un orario di chiusura delle prenotazioni, per esempio le 20, e al momento di impastare hai già la lista.</p>
<p>Per il cliente il vantaggio è altrettanto chiaro: il pane che vuole è messo da parte, anche se passa alle 9:30 quando lo scaffale è mezzo vuoto.</p>

<h2>2. Dividi il ritiro in fasce</h2>
<p>Il mattino in panetteria ha due picchi: chi passa prima del lavoro e chi passa dopo aver accompagnato i figli a scuola. Le fasce di ritiro ti permettono di preparare i sacchetti in ordine di orario, con il nome scritto sopra.</p>
{{art:fasce}}

<h2>3. Scrivi il prezzo al chilo e il peso indicativo</h2>
<p>Online il cliente non può guardare la pagnotta. Accanto al prezzo al chilo indica il peso indicativo di un pezzo: "pagnotta circa 500 g". Così sa quanto spenderà e tu eviti domande e sorprese alla cassa.</p>
{{art:catalogo}}

<h2>4. Proponi l'ordine ricorrente</h2>
<p>Chi prende un chilo di pane tutti i giorni non ha voglia di prenotarlo ogni sera. Proponi un ordine fisso, per esempio "dal lunedì al sabato, 1 kg di semola alle 7:30", da sospendere quando è in vacanza. Per te è la base della produzione di ogni giorno, già sicura.</p>

<h2>5. Torte su ordinazione con preavviso minimo</h2>
<p>Le torte su ordinazione sono un'ottima entrata, ma anche una fonte di stress se arrivano il venerdì pomeriggio per il sabato mattina. Stabilisci un preavviso minimo per ogni prodotto, per esempio due giorni, e chiedi tutto quello che serve in un'unica volta: peso o persone, gusto, scritta, eventuali allergie.</p>
{{art:torta}}

<h2>6. Prepara il calendario delle ricorrenze</h2>
<p>Colombe, panettoni, bugie di Carnevale, pane dei morti, torte per le comunioni: ogni anno arrivano negli stessi periodi. Segna sul calendario quando aprire le prenotazioni, almeno tre settimane prima, e avvisa i clienti abituali con un messaggio. Sapere le quantità in anticipo ti permette di organizzare turni e materie prime.</p>

<h2>7. Le offerte di fine giornata, fatte bene</h2>
<p>Una parte di invenduto resterà sempre, anche con le prenotazioni. La differenza la fa cosa ne fai nell'ultima ora e mezza di apertura. Un'offerta di fine giornata funziona se è <strong>sempre alla stessa ora</strong>, <strong>sempre con le stesse regole</strong> e <strong>comunicata prima</strong>: così diventa un'abitudine per una parte dei clienti, invece di uno sconto improvvisato.</p>
{{art:finesera}}
<p>Qualche regola pratica:</p>
<ul>
<li><strong>Non partire troppo presto.</strong> Se lo sconto inizia alle 17, i clienti che pagherebbero il prezzo pieno imparano ad aspettare. Tra le 18 e le 19:30 compra soprattutto chi esce dal lavoro e altrimenti non sarebbe passato.</li>
<li><strong>Uno sconto semplice.</strong> "Meno 30% su pane e focacce del giorno" si capisce al volo. Evita regole complicate come "il secondo a metà prezzo solo sui pezzi da mezzo chilo".</li>
<li><strong>Il sacchetto sorpresa.</strong> Nell'ultima mezz'ora un sacchetto di prodotti misti a prezzo fisso, per esempio circa 2 kg a 5 euro, svuota gli scaffali e fa conoscere prodotti che il cliente non avrebbe provato.</li>
<li><strong>Escludi le torte e i prodotti su ordinazione.</strong> L'offerta riguarda solo quello che altrimenti andrebbe perso.</li>
<li><strong>Fai vedere lo scaffale.</strong> Alle 17:45 una foto dello scaffale nello stato di WhatsApp e nelle storie di Instagram, con l'orario dell'offerta, porta in negozio chi abita vicino.</li>
</ul>
<blockquote><p>🥖 Dalle 18:00 alle 19:30 pane e focacce di oggi a meno 30%. Dalle 19 c'è anche il sacchetto sorpresa: circa 2 kg di prodotti misti a 5 €. Ti aspettiamo!</p></blockquote>
<p>Con un menu online a orari, la sezione "Fine giornata" compare da sola alle 18 e sparisce alla chiusura: il cliente che la apre alle 18:10 vede esattamente cosa trova.</p>

<h2>8. Trasforma il pane di ieri in un prodotto nuovo</h2>
<p>Quello che resta dopo l'offerta serale non deve per forza diventare uno scarto. Molti forni hanno un piccolo angolo di prodotti "di recupero" che si vendono bene:</p>
<ul>
<li><strong>Pangrattato</strong>, anche aromatizzato con erbe e scorza di limone, in sacchetti da 250 g.</li>
<li><strong>Crostini e pane per bruschetta</strong>, tostati e confezionati.</li>
<li><strong>Torta di pane</strong> o budino di pane, da vendere a fette.</li>
<li><strong>Kit panzanella</strong> d'estate: pane raffermo, ricetta stampata e qualche ingrediente.</li>
</ul>
<p>Mettili in una categoria a parte nel catalogo, con il prezzo al pezzo: non devono confondersi con il pane fresco.</p>

<h2>9. Dona quello che non riesci a vendere</h2>
<p>Per il pane che resta davvero, valuta una collaborazione con un'associazione o una mensa del territorio. La legge 166 del 2016, la cosiddetta legge Gadda, ha semplificato le donazioni di eccedenze alimentari da parte delle attività commerciali. Per i dettagli su documenti e aspetti fiscali chiedi alla tua associazione di categoria o al commercialista.</p>

<h2>Una settimana tipo, organizzata</h2>
<table>
<tr><th>Quando</th><th>Cosa fai</th></tr>
<tr><td>Ogni sera alle 20</td><td>Si chiudono le prenotazioni del pane per il giorno dopo</td></tr>
<tr><td>Ogni mattina</td><td>Impasti il prenotato più un margine per il banco</td></tr>
<tr><td>Ogni giorno alle 17:45</td><td>Foto dello scaffale e annuncio dell'offerta di fine giornata</td></tr>
<tr><td>Ogni giorno 18:00 a 19:30</td><td>Offerta di fine giornata, poi sacchetto sorpresa</td></tr>
<tr><td>Ogni lunedì</td><td>Guardi l'invenduto della settimana e correggi il margine</td></tr>
</table>

<h2>Gli errori da evitare</h2>
<ul>
<li><strong>Accettare prenotazioni fino a mezzanotte</strong>: se impasti alle 3, chiudi le prenotazioni a un'ora che ti permetta di organizzarti.</li>
<li><strong>Non indicare il peso</strong>: "1 pagnotta" per te è chiaro, per il cliente no.</li>
<li><strong>Scontare tutti i giorni prodotti diversi</strong>: il cliente non sa cosa aspettarsi e smette di passare.</li>
<li><strong>Dimenticare chi ha prenotato</strong>: i sacchetti prenotati vanno tenuti da parte con il nome ben visibile, fino all'orario di chiusura.</li>
</ul>

<h2>Da dove partire</h2>
<p>Comincia con le prenotazioni della sera e il prezzo al chilo ben visibile. Dopo un mese guarda i dati: quanti ordini arrivano, a che ora, quali prodotti. Poi aggiungi gli ordini ricorrenti e il calendario delle ricorrenze.</p>

<h2>Come farlo con {{brand}}</h2>
<p>Con {{brand}} hai il catalogo con prezzo al chilo e allergeni, le prenotazioni con fascia di ritiro che arrivano su WhatsApp e la chiusura degli ordini all'ora che decidi tu. Guarda come funziona nella pagina per <a href="/settori/panetterie/">panetterie e pasticcerie</a>.</p>
`,
  },
  {
    slug: "pastificio-ordini-di-natale",
    seo: {
      title: "Pastificio: organizzare gli ordini di Natale",
      description:
        "Ordini di Natale in pastificio: quando aprirli, come mettere un limite per giorno e per fascia, quanta pasta produrre e come far scorrere il ritiro del 23.",
    },
    title: "Pastificio: come organizzare gli ordini di Natale senza impazzire",
    description:
      "Quando aprire gli ordini, come mettere un limite per giorno e per fascia, come calcolare quanta pasta produrre e come far scorrere il ritiro del 23 e 24 dicembre. Guida per pastifici.",
    date: "2026-10-09",
    readMinutes: 12,
    sector: "pastifici",
    related: ["ordini-whatsapp", "menu-digitale", "automazioni-whatsapp"],
    arts: {
      conti: {
        kind: "calc",
        title: "Quanti ordini puoi gestire per fascia",
        rows: [
          { label: "Ordini attesi per Natale", value: "220" },
          { label: "Giorni di ritiro (20 a 24 dicembre)", value: "5" },
          { label: "Fasce da mezz'ora al giorno", value: "14" },
        ],
        result: { label: "Ordini per fascia", value: "circa 3" },
        note: "Esempio di calcolo. Con 3 ordini ogni mezz'ora il ritiro scorre; con 15 si forma la coda fuori dalla porta.",
      },
      fasce: {
        kind: "slots",
        title: "Ritiro per Natale",
        days: [{ d: "Sab", n: "20" }, { d: "Dom", n: "21" }, { d: "Lun", n: "22" }, { d: "Mar", n: "23", full: true }],
        slots: [
          { t: "9:00", s: "full" }, { t: "9:30", s: "few" }, { t: "10:00", s: "sel" },
          { t: "10:30", s: "free" }, { t: "11:00", s: "free" }, { t: "11:30", s: "few" },
        ],
        note: "Ritiro lunedì 22 alle 10:00",
      },
      produzione: {
        kind: "kpis",
        title: "Da preparare per lunedì 22",
        items: [
          { value: "38 kg", label: "Agnolotti del plin" },
          { value: "21 kg", label: "Tajarin" },
          { value: "64", label: "Vasetti di ragù" },
        ],
        note: "Il riepilogo nasce dalla somma degli ordini del giorno.",
      },
      ordine: {
        kind: "order",
        who: "Giovanna Ricci",
        lines: ["1 kg × Agnolotti del plin", "500 g × Tajarin", "1 × Ragù della casa, 500 g"],
        total: "€ 41,00",
        when: "Ritiro lunedì 22 alle 10:00",
      },
    },
    html: `
<p>Per un pastificio dicembre vale come due o tre mesi normali. Il problema non è la quantità di lavoro, a quella si è preparati. Il problema è che gli ordini arrivano da tutte le parti, a voce, al telefono, su un quaderno, e il 23 dicembre ci si ritrova con la coda fuori e qualche ordine scritto male.</p>
<p>Questa guida ti aiuta a organizzare le feste partendo da ottobre, quando c'è ancora tempo per farlo con calma.</p>

<h2>1. Decidi quando aprire gli ordini</h2>
<p>Aprire troppo presto significa ordini che poi cambiano; troppo tardi significa telefono che squilla senza sosta a metà dicembre. Per molti pastifici il momento giusto è la seconda metà di novembre. Scegli una data e comunicala: "Dal 20 novembre si prenota la pasta di Natale".</p>

<h2>2. Fai i conti con la tua capacità</h2>
<p>Prima di aprire, stima quanti ordini riceverai, guardando l'anno scorso, e quanti giorni di ritiro offri. Poi dividi per le fasce orarie. Il risultato ti dice quanti ordini puoi accettare ogni mezz'ora senza creare coda.</p>
{{art:conti}}

<h2>3. Metti un limite per giorno e per fascia</h2>
<p>Il 23 e il 24 dicembre li vogliono tutti. Se non metti un limite, finisci con il doppio degli ordini negli ultimi due giorni e i primi quasi vuoti. Con un limite per giorno, quando il 23 è pieno il cliente sceglie il 22, senza dover chiamare per chiedere.</p>
{{art:fasce}}
<p>Il ritiro anticipato funziona bene per la pasta fresca: si conserva in frigorifero o si congela, e puoi indicarlo chiaramente nella scheda del prodotto.</p>

<h2>4. Prepara un catalogo delle feste, corto</h2>
<p>A Natale non serve mettere online tutto quello che fai durante l'anno. Un catalogo più corto, con i prodotti delle feste e i sughi, rende gli ordini più semplici e la produzione più ordinata.</p>
<ul>
<li><strong>Prezzo al chilo</strong> per la pasta fresca e ripiena.</li>
<li><strong>Quantità minima</strong>, per esempio 250 o 500 grammi, per evitare ordini da 100 grammi.</li>
<li><strong>Prodotti a pezzo</strong> per sughi, lasagne e vasetti.</li>
<li><strong>Allergeni</strong> ben indicati: uova, glutine, latte, frutta a guscio nei ripieni.</li>
</ul>

<h2>5. Fatti dare tutto per scritto</h2>
<p>Un ordine scritto con pesi, giorno e fascia di ritiro elimina gran parte degli errori. Il cliente lo compone dal catalogo, tu lo ricevi su WhatsApp già in ordine.</p>
{{art:ordine}}

<h2>6. Trasforma gli ordini in una lista di produzione</h2>
<p>Ogni mattina ti serve una cosa sola: sapere quanto preparare per i ritiri del giorno dopo. Se gli ordini sono scritti e ordinati, la somma per prodotto si fa in un attimo.</p>
{{art:produzione}}

<h2>7. Prepara il ritiro come una catena</h2>
<ul>
<li>Confeziona gli ordini il giorno prima, con un'etichetta che riporta nome, fascia e totale.</li>
<li>Disponi le confezioni per fascia oraria, non in ordine alfabetico.</li>
<li>Tieni una persona dedicata solo alla consegna, separata da chi serve al banco.</li>
<li>Per gli ordini più grandi valuta un acconto al momento della prenotazione: riduce le dimenticanze.</li>
</ul>

<h2>8. Avvisa i clienti, prima e dopo</h2>
<p>Un messaggio ai clienti abituali qualche giorno prima dell'apertura degli ordini, solo a chi ha dato il consenso, vale più di qualsiasi cartello. E dopo le feste un messaggio di ringraziamento, magari con il prodotto di gennaio, ti riporta in negozio chi era passato solo per Natale.</p>

<h2>9. Decidi le regole per modifiche e annullamenti</h2>
<p>A dicembre gli ordini cambiano: arriva un ospite in più, la cena si sposta da un parente. Se non hai regole chiare, ogni modifica diventa una telefonata. Scrivile nel catalogo, sotto i prodotti:</p>
<ul>
<li><strong>Modifiche fino a 48 ore prima del ritiro</strong>, rispondendo al messaggio di conferma.</li>
<li><strong>Dopo, solo aggiunte</strong> se ci sono ancora prodotti disponibili.</li>
<li><strong>Annullamenti</strong> entro una data precisa, per esempio il 18 dicembre.</li>
<li><strong>Ordini non ritirati</strong>: indica fino a che ora resti aperto e cosa succede dopo.</li>
</ul>

<h2>10. Prepara i messaggi in anticipo</h2>
<p>A dicembre non avrai tempo di scrivere con calma. Prepara a ottobre i tre messaggi che ti servono.</p>
<p>Per l'apertura degli ordini, ai clienti che hanno dato il consenso:</p>
<blockquote><p>🎄 Da domani si prenota la pasta di Natale! Agnolotti del plin, tajarin, ravioli di magro e i nostri sughi. Scegli il giorno di ritiro dal 20 al 24 dicembre: i posti per il 23 finiscono presto. [link]</p></blockquote>
<p>Come conferma dell'ordine:</p>
<blockquote><p>Grazie Giovanna, il tuo ordine è confermato per lunedì 22 alle 10:00. Puoi modificarlo fino a sabato rispondendo a questo messaggio.</p></blockquote>
<p>A gennaio, per riportare in negozio chi è passato solo per le feste:</p>
<blockquote><p>Grazie per aver scelto la nostra pasta per Natale! A gennaio tornano i ravioli di zucca, solo il venerdì. Ti aspettiamo.</p></blockquote>

<h2>Gli errori da evitare</h2>
<ul>
<li><strong>Accettare tutti gli ordini per il 23 e il 24</strong>: è la causa principale della coda e degli errori.</li>
<li><strong>Prodotti senza quantità minima</strong>: cento ordini da 200 grammi richiedono lo stesso lavoro di cento ordini da un chilo.</li>
<li><strong>Il quaderno accanto al sistema online</strong>: tutti gli ordini, anche quelli presi al banco, vanno nello stesso posto.</li>
<li><strong>Nessuna regola sulle modifiche</strong>: senza una scadenza, le modifiche arrivano fino alla sera prima.</li>
</ul>

<h2>Il calendario in breve</h2>
<table>
<tr><th>Quando</th><th>Cosa fare</th></tr>
<tr><td>Fine ottobre</td><td>Stima degli ordini, scelta dei giorni e delle fasce di ritiro</td></tr>
<tr><td>Inizio novembre</td><td>Catalogo delle feste online, con prezzi e quantità minime</td></tr>
<tr><td>Metà novembre</td><td>Messaggio ai clienti abituali e apertura degli ordini</td></tr>
<tr><td>Dicembre</td><td>Lista di produzione ogni mattina, confezioni etichettate per fascia</td></tr>
<tr><td>Gennaio</td><td>Messaggio di ringraziamento e prodotto del mese</td></tr>
</table>

<h2>Come farlo con {{brand}}</h2>
<p>Con {{brand}} pubblichi il catalogo con i prezzi al chilo, ricevi gli ordini su WhatsApp con giorno e fascia di ritiro, metti un limite a ogni giorno e avvisi i clienti abituali. Guarda la pagina per <a href="/settori/pastifici/">pastifici</a> o <a href="/demo/">prenota una demo</a> prima che arrivi novembre.</p>
`,
  },
  {
    slug: "bar-scontrino-medio-colazione-aperitivo",
    seo: {
      title: "Bar: 6 modi per alzare lo scontrino medio",
      description:
        "6 idee per alzare lo scontrino medio del bar: menu giusto all'ora giusta, combinazioni a prezzo unico, prodotto del giorno e menu tradotto per i turisti.",
    },
    title: "Bar e caffetteria: 6 modi per alzare lo scontrino medio dalla colazione all'aperitivo",
    description:
      "Menu giusto all'ora giusta, combinazioni a prezzo unico, prodotto del giorno in evidenza e menu tradotto per i turisti: 6 idee concrete per far spendere qualcosa in più a ogni cliente del bar.",
    date: "2026-10-08",
    readMinutes: 11,
    sector: "bar",
    related: ["menu-a-orari", "traduzioni", "statistiche"],
    arts: {
      conti: {
        kind: "calc",
        title: "Quaranta centesimi a scontrino",
        rows: [
          { label: "Scontrini al giorno", value: "180" },
          { label: "Aumento medio per scontrino", value: "€ 0,40" },
          { label: "Giorni di apertura al mese", value: "26" },
        ],
        result: { label: "In più al mese", value: "€ 1.872" },
        note: "Esempio di calcolo. Nel bar i margini si fanno sui piccoli numeri moltiplicati per tanti clienti.",
      },
      orari: {
        kind: "dayparts",
        rows: [
          { t: "Colazione", time: "7:00 a 11:30", on: true, items: "Caffetteria, brioche, spremute" },
          { t: "Pranzo veloce", time: "12:00 a 15:00", on: true, items: "Toast, insalate, piatto del giorno" },
          { t: "Aperitivo", time: "18:00 a 21:00", on: true, items: "Spritz, cocktail, taglieri" },
        ],
      },
      lingue: {
        kind: "langs",
        dish: "Brioche alla crema",
        lines: [
          { flag: "🇬🇧", text: "Croissant filled with custard cream" },
          { flag: "🇩🇪", text: "Hörnchen mit Vanillecreme" },
          { flag: "🇪🇸", text: "Cruasán relleno de crema pastelera" },
        ],
      },
    },
    html: `
<p>In un bar ogni cliente spende poco, ma i clienti sono tanti. Per questo anche un piccolo aumento dello scontrino medio, qualche decina di centesimi, a fine mese fa una differenza che si vede.</p>
{{art:conti}}
<p>Non si tratta di alzare i prezzi, ma di far trovare al cliente la cosa giusta al momento giusto. Ecco sei modi pratici.</p>

<h2>1. Mostra il menu giusto all'ora giusta</h2>
<p>Alle 8 del mattino nessuno ha bisogno di vedere la carta dei cocktail, e alle 19 la lista delle brioche è solo un ostacolo. Un menu che cambia da solo durante la giornata mette in primo piano quello che il cliente sta cercando, e gli fa notare le cose che non avrebbe chiesto.</p>
{{art:orari}}
<p>Con un menu digitale lo stesso QR sul tavolino mostra la colazione, il pranzo o l'aperitivo in base all'ora, senza ristampare nulla.</p>

<h2>2. Crea combinazioni a prezzo unico</h2>
<p>"Cappuccino e brioche 2,80 €" vende più di un cappuccino a 1,60 e una brioche a 1,40 scritti in due righe diverse. La combinazione semplifica la scelta e spinge chi avrebbe preso solo il caffè ad aggiungere qualcosa.</p>
<ul>
<li><strong>Colazione</strong>: caffetteria più brioche, spremuta più toast.</li>
<li><strong>Pranzo</strong>: piatto del giorno, acqua e caffè.</li>
<li><strong>Aperitivo</strong>: due spritz e un tagliere piccolo.</li>
</ul>

<h2>3. Metti il prodotto del giorno in cima</h2>
<p>La brioche appena sfornata, la torta fatta in casa, il centrifugato di stagione: se sono in fondo alla lista nessuno li vede. Mettili in evidenza in cima al menu, con una riga di descrizione. Cambiarli ogni giorno dal telefono richiede pochi secondi.</p>

<h2>4. Usa le foto solo dove contano</h2>
<p>Un menu con cinquanta foto si legge male. Bastano tre o quattro foto dei prodotti che vuoi vendere di più: il tagliere dell'aperitivo, la torta del giorno, il cocktail della casa. Devono essere foto vere, con buona luce, anche fatte con il telefono vicino a una finestra.</p>

<h2>5. Parla la lingua dei turisti</h2>
<p>Se il tuo bar è in centro, vicino a una stazione o in una località turistica, una parte dei clienti non legge l'italiano. Un turista che non capisce il menu ordina la cosa più semplice, spesso un caffè. Se il menu si apre nella sua lingua, vede anche il resto.</p>
{{art:lingue}}
<p>Lascia in italiano i nomi dei prodotti tipici, come spritz, cornetto o tramezzino, e aggiungi una breve spiegazione: fanno parte dell'esperienza.</p>

<h2>6. Guarda cosa guardano i clienti</h2>
<p>Un menu digitale ti dice quali prodotti vengono aperti di più. Se un cocktail viene guardato tanto ma ordinato poco, forse il prezzo o la descrizione non convincono. Se un prodotto non lo apre nessuno, forse è da togliere. Sono informazioni che il menu di carta non può darti.</p>

<h2>7. Riempi le ore morte del pomeriggio</h2>
<p>Tra le 15 e le 17 molti bar sono quasi vuoti, ma il personale e le luci costano lo stesso. Qualche idea per dare a quelle ore un motivo per entrare:</p>
<ul>
<li><strong>La merenda</strong>: caffè o tè con una fetta di torta del giorno a prezzo fisso, solo dalle 15 alle 17.</li>
<li><strong>Chi lavora al computer</strong>: tavolino, presa e connessione, con un'offerta "secondo caffè a metà prezzo".</li>
<li><strong>Studenti e genitori all'uscita da scuola</strong>: succo e brioche o gelato confezionato a prezzo unico.</li>
</ul>
<p>Con un menu a orari, la proposta del pomeriggio compare solo in quella fascia: non confonde chi entra la mattina.</p>

<h2>8. L'aperitivo che si vende da solo</h2>
<p>L'aperitivo è il momento con lo scontrino più alto della giornata. Due accorgimenti fanno la differenza:</p>
<ul>
<li><strong>Una carta corta</strong>: cinque o sei cocktail fatti bene vendono più di una lista di venti.</li>
<li><strong>Il tagliere in vista</strong>: una foto del tagliere vero, in cima alla sezione aperitivo, e una versione per due persone a prezzo chiaro.</li>
<li><strong>L'annuncio alle 17:30</strong>: nello stato di WhatsApp e nelle storie, con la foto del banco e il cocktail della settimana.</li>
</ul>
<blockquote><p>🍹 Da stasera il cocktail della settimana è il Garibaldi con arance di Sicilia. Aperitivo dalle 18, tagliere per due a 12 €. Ti teniamo un tavolino?</p></blockquote>

<h2>Esempi di combinazioni</h2>
<table>
<tr><th>Momento</th><th>Combinazione</th><th>Prezzo indicativo</th></tr>
<tr><td>Colazione</td><td>Cappuccino e brioche</td><td>2,80 €</td></tr>
<tr><td>Colazione</td><td>Spremuta e toast</td><td>7,50 €</td></tr>
<tr><td>Pranzo</td><td>Piatto del giorno, acqua e caffè</td><td>11,00 €</td></tr>
<tr><td>Merenda</td><td>Caffè e fetta di torta</td><td>4,00 €</td></tr>
<tr><td>Aperitivo</td><td>Due spritz e tagliere piccolo</td><td>16,00 €</td></tr>
</table>
<p>I prezzi sono solo indicativi: calcolali sui tuoi costi, ma tieni la combinazione sempre leggermente più conveniente dei prodotti presi da soli.</p>

<h2>Gli errori da evitare</h2>
<ul>
<li><strong>Un unico menu lungo per tutta la giornata</strong>: il cliente fa fatica a trovare quello che cerca.</li>
<li><strong>Prezzi non aggiornati</strong>: un caffè che costa più di quello scritto crea sfiducia.</li>
<li><strong>Troppe foto</strong>: rallentano il menu e confondono.</li>
<li><strong>Il QR rovinato</strong>: controlla ogni settimana che gli adesivi sui tavolini siano leggibili.</li>
</ul>

<h2>In pratica, da domani</h2>
<ol>
<li>Dividi il menu in tre momenti della giornata.</li>
<li>Crea due combinazioni per la colazione e una per l'aperitivo.</li>
<li>Scegli ogni mattina un prodotto del giorno da mettere in evidenza.</li>
<li>Dopo un mese, confronta lo scontrino medio con quello del mese prima.</li>
</ol>

<h2>Come farlo con {{brand}}</h2>
<p>Con {{brand}} il menu cambia da solo in base all'orario, si traduce in quattro lingue e ti mostra quali prodotti vengono guardati di più. Scopri di più nella pagina per <a href="/settori/bar/">bar e caffetterie</a>.</p>
`,
  },
  {
    slug: "gelateria-vaschette-torte-gelato",
    seo: {
      title: "Gelateria: vendere più vaschette e torte gelato",
      description:
        "Idee pratiche per gelaterie: gusti del giorno online, vaschette prenotate per la domenica, torte gelato con preavviso e una stagione fredda pianificata bene.",
    },
    title: "Gelateria: come vendere più vaschette e torte gelato, anche quando fa freddo",
    description:
      "Gusti del giorno online, vaschette prenotate per il pranzo della domenica, torte gelato per i compleanni con preavviso e una stagione fredda pianificata. Idee pratiche per gelaterie.",
    date: "2026-10-07",
    readMinutes: 11,
    sector: "gelaterie",
    related: ["menu-digitale", "ordini-whatsapp", "ferie-e-chiusure"],
    arts: {
      conti: {
        kind: "calc",
        title: "Le torte gelato in un mese",
        rows: [
          { label: "Torte gelato a settimana", value: "6" },
          { label: "Prezzo medio di una torta", value: "€ 32" },
          { label: "Settimane", value: "4" },
        ],
        result: { label: "Incasso al mese", value: "€ 768" },
        note: "Esempio di calcolo. Le torte si vendono tutto l'anno, anche quando il cono non lo prende nessuno.",
      },
      gusti: {
        kind: "catalog",
        shop: "Gelateria Polo Nord",
        status: "Gusti aggiornati alle 10:12",
        tabs: ["Gusti di oggi", "Vaschette", "Torte gelato"],
        items: [
          { name: "Pistacchio di Bronte", desc: "Contiene frutta a guscio", price: "", out: true, c: "#bef264" },
          { name: "Nocciola Piemonte IGP", desc: "Contiene frutta a guscio, latte", price: "", tag: "Novità", c: "#e7d5b5" },
          { name: "Fragola", desc: "Sorbetto, senza latte", price: "", c: "#fda4af" },
        ],
      },
      torta: {
        kind: "order",
        who: "Chiara Moretti",
        lines: ["1 × Torta gelato, 8 persone", "Gusti: nocciola e fragola", "1 × Vaschetta da 500 g"],
        total: "€ 46,00",
        when: "Ritiro sabato 16:00",
        extra: "Scritta: Auguri Sofia!",
      },
    },
    html: `
<p>La gelateria vive di stagioni e di meteo. Una settimana di pioggia a giugno pesa sui conti quanto un mese di chiusura. Il cono resta il prodotto principale, ma vaschette e torte gelato sono la parte che si può programmare: si ordinano in anticipo, si vendono anche quando fa freddo e hanno uno scontrino molto più alto.</p>

<h2>Perché puntare su vaschette e torte</h2>
<p>Una torta gelato vale quanto dieci o quindici coni, ma richiede una sola vendita. E chi la ordina per un compleanno lo fa con giorni di anticipo, quindi la puoi preparare con calma.</p>
{{art:conti}}

<h2>1. Pubblica i gusti del giorno ogni mattina</h2>
<p>"Che gusti avete oggi?" è la domanda più frequente, al banco e al telefono. Se i gusti del giorno sono online, aggiornati ogni mattina, il cliente decide prima di uscire di casa. E se il pistacchio finisce alle 21, lo segni esaurito ed eviti di deludere chi arriva apposta.</p>
{{art:gusti}}
<p>Indica sempre gli allergeni: frutta a guscio, latte, uova. Per una gelateria è un'informazione che i clienti cercano attivamente.</p>

<h2>2. Fai prenotare le vaschette per la domenica</h2>
<p>La vaschetta da portare al pranzo della domenica è un classico. Se il cliente può prenotarla il sabato sera, con i gusti scelti e l'orario di ritiro, la trovi pronta in freezer e lui non fa la coda delle 13.</p>
<ul>
<li>Proponi formati chiari: 500 g, 750 g, 1 kg, con il numero di gusti per ciascuno.</li>
<li>Indica fino a che ora si prenota per il giorno dopo.</li>
<li>Aggiungi una borsa termica a pagamento per chi ha strada da fare.</li>
</ul>

<h2>3. Le torte gelato si ordinano con preavviso</h2>
<p>Una torta gelato richiede tempo. Stabilisci un preavviso minimo, per esempio 48 ore, e chiedi tutto in un'unica volta: numero di persone, gusti, scritta, eventuali allergie.</p>
{{art:torta}}
<p>Con l'ordine scritto non ci sono malintesi sulla scritta o sui gusti, e il cliente sa esattamente quando ritirare.</p>

<h2>4. Pianifica la stagione fredda</h2>
<p>Se resti aperto in inverno, cambia l'offerta invece di aspettare l'estate. Semifreddi, torte gelato per le feste, cioccolata calda, gelato in vaschetta per i pranzi di Natale. Se chiudi, programma la chiusura e comunicala bene: il menu online deve dire quando riapri, e gli ordini devono fermarsi da soli nei giorni di chiusura.</p>

<h2>5. Ricordati dei compleanni</h2>
<p>Chi ha ordinato una torta per un compleanno lo rifarà l'anno dopo, se glielo ricordi. Con il consenso del cliente, un messaggio una settimana prima della data, "L'anno scorso avete festeggiato con una nostra torta, vuoi prenotarla anche quest'anno?", porta ordini quasi certi.</p>

<h2>6. Pensa ai turisti</h2>
<p>Nelle località turistiche il gelato è uno dei prodotti più cercati dagli stranieri. Un menu dei gusti tradotto, con la spiegazione di gianduia, stracciatella o fiordilatte, aiuta il cliente a scegliere e lo fa sentire benvenuto.</p>

<h2>7. Il gusto della settimana</h2>
<p>Un gusto speciale che cambia ogni settimana dà ai clienti abituali un motivo per tornare e a te un argomento per comunicare. Annuncialo il lunedì, sempre nello stesso modo:</p>
<blockquote><p>🍨 Il gusto della settimana è ricotta, fichi e noci. Lo trovi fino a domenica, finché dura!</p></blockquote>
<p>Funziona ancora meglio se il gusto è legato al territorio o alla stagione: le pesche della valle, le nocciole delle Langhe, le castagne in autunno.</p>

<h2>8. Le giornate di pioggia e la fine della stagione</h2>
<p>Un giorno di pioggia in piena estate non deve essere un giorno perso. Puoi preparare un'offerta "pioggia" da attivare solo quando serve, per esempio una vaschetta da 1 kg a prezzo speciale da ritirare entro sera. Annunciala alle 16 nello stato di WhatsApp: chi è chiuso in casa ha voglia di un gelato sul divano.</p>
<p>A fine stagione, prima della chiusura, svuota le vetrine con un'ultima settimana di vaschette a prezzo ridotto e comunica la data di riapertura. Chi ha comprato l'ultima vaschetta è il primo che torna a primavera.</p>

<h2>9. Torte per ogni occasione, non solo compleanni</h2>
<p>Le torte gelato si vendono anche per comunioni, cresime, lauree, cene aziendali e feste di fine anno scolastico. Crea nel catalogo una categoria per ogni occasione, con formati e prezzi chiari:</p>
<table>
<tr><th>Formato</th><th>Persone</th><th>Preavviso</th></tr>
<tr><td>Torta piccola</td><td>6 a 8</td><td>48 ore</td></tr>
<tr><td>Torta media</td><td>10 a 14</td><td>48 ore</td></tr>
<tr><td>Torta grande o a piani</td><td>20 e più</td><td>5 giorni</td></tr>
<tr><td>Semifreddi monoporzione</td><td>a pezzo</td><td>24 ore</td></tr>
</table>

<h2>Gli errori da evitare</h2>
<ul>
<li><strong>Gusti online non aggiornati</strong>: il cliente che arriva per il pistacchio e non lo trova si ricorda della delusione, non del menu.</li>
<li><strong>Torte senza preavviso minimo</strong>: un ordine per domani alle 9 ricevuto alle 22 mette in difficoltà tutto il laboratorio.</li>
<li><strong>Chiudere senza avvisare</strong>: un cartello sulla porta non basta, il menu online deve dire quando riapri.</li>
<li><strong>Allergeni scritti solo al banco</strong>: frutta a guscio e latte sono le prime informazioni che i clienti cercano.</li>
</ul>

<h2>Da dove partire</h2>
<p>Il punto di partenza più semplice sono i gusti del giorno online, perché ti fanno risparmiare domande da subito. Poi aggiungi le vaschette prenotate per il weekend e, prima dell'inverno, il catalogo delle torte con il preavviso.</p>

<h2>Come farlo con {{brand}}</h2>
<p>Con {{brand}} aggiorni i gusti del giorno dal telefono, ricevi gli ordini di vaschette e torte su WhatsApp con giorno e ora di ritiro e programmi la chiusura stagionale. Trovi tutto nella pagina per le <a href="/settori/gelaterie/">gelaterie</a>.</p>
`,
  },
]);
