import type { SectorArt } from "./sectors";
import { sectorGuides } from "./guides-settori";
import { withId } from "./util";

export type Guide = {
  /** Identificativo interno, uguale in tutte le lingue (è lo slug italiano). */
  id: string;
  slug: string;
  title: string;
  description: string;
  /** Titolo e descrizione per i motori di ricerca, più corti di quelli mostrati nella pagina. */
  seo?: { title: string; description: string };
  date: string;
  readMinutes: number;
  related: string[];
  html: string;
  /** Settore a cui è dedicata la guida, se c'è. */
  sector?: string;
  /** Grafiche richiamate nel testo con {{art:nome}}. */
  arts?: Record<string, SectorArt>;
};

const baseGuides: Guide[] = withId<Guide>([
  {
    slug: "come-creare-menu-digitale-qr",
    seo: {
      title: "Come creare un menu digitale con QR code",
      description:
        "Come creare un menu digitale con QR code partendo dal menu di carta: cosa serve, come organizzarlo, dove mettere il QR e gli errori da evitare. Guida pratica.",
    },
    title: "Come creare un menu digitale con QR code per il tuo locale",
    description:
      "Guida pratica per passare dal menu cartaceo al menu digitale con QR code: cosa serve, come organizzarlo, dove mettere il QR e gli errori da evitare.",
    date: "2026-10-01",
    readMinutes: 10,
    related: ["menu-digitale", "importa-menu-ai", "traduzioni"],
    arts: {
      scheda: {
        kind: "catalog",
        shop: "Trattoria del Borgo",
        status: "Cucina aperta fino alle 22:30",
        tabs: ["Antipasti", "Primi", "Secondi", "Dolci"],
        items: [
          { name: "Tajarin al ragù", desc: "Pasta all'uovo tirata a mano, ragù di vitello. Glutine, uova, sedano", price: "12,00", c: "#fde68a" },
          { name: "Agnolotti del plin", desc: "Ripieno di tre carni, sugo d'arrosto. Glutine, uova, latte", price: "13,00", tag: "Della casa", c: "#fed7aa" },
          { name: "Vitello tonnato", desc: "Salsa della casa con capperi. Uova, pesce", price: "11,00", c: "#e7d5b5" },
        ],
      },
    },
    html: `
<p>Un menu digitale con QR code è una pagina web che il cliente apre inquadrando un codice sul tavolo. Non serve scaricare nessuna app: basta la fotocamera del telefono. Per il locale significa poter cambiare piatti e prezzi in qualsiasi momento, senza ristampare nulla.</p>
<p>In questa guida vediamo come crearne uno fatto bene, dall'organizzazione dei piatti alla stampa del QR.</p>

<h2>1. Parti dal menu che hai già</h2>
<p>Non serve riscrivere tutto da zero. Le piattaforme più recenti permettono di <a href="/funzionalita/importa-menu-ai/">importare il menu da una foto o da un PDF</a>: l'intelligenza artificiale riconosce categorie, piatti, descrizioni e prezzi, e tu devi solo controllare.</p>
<p>Prima di importarlo, però, conviene fare pulizia. Un menu digitale non ha limiti di spazio, ma un menu troppo lungo resta difficile da leggere anche sullo schermo.</p>

<h2>2. Organizza le categorie come le cerca il cliente</h2>
<p>Al tavolo il cliente scorre con il pollice. Le categorie devono essere poche, chiare e nell'ordine in cui si mangia.</p>
<ul>
<li><strong>Antipasti, primi, secondi, contorni, dolci, bevande</strong> per un ristorante.</li>
<li><strong>Pizze classiche, pizze speciali, fritti, bibite, dolci</strong> per una pizzeria.</li>
<li>Evita categorie con un solo piatto: meglio unirle.</li>
</ul>

<h2>3. Ogni piatto: nome, descrizione breve, prezzo, allergeni</h2>
<p>Una buona scheda piatto ha un nome riconoscibile, una descrizione di una riga con gli ingredienti principali, il prezzo e gli allergeni. Le foto aiutano, ma solo se sono buone: una foto scura fa più danni di nessuna foto.</p>
<p>Per gli allergeni puoi seguire la nostra guida su <a href="/guide/allergeni-nel-menu/">come indicare i 14 allergeni nel menu</a>.</p>

<h3>Come scrivere una descrizione che fa venire fame</h3>
<p>Una buona descrizione dice in una riga cosa c'è nel piatto e perché è speciale. Confronta:</p>
<ul>
<li><strong>Prima</strong>: "Tajarin al ragù."</li>
<li><strong>Dopo</strong>: "Tajarin tirati a mano con 40 tuorli, ragù di vitello cotto sei ore."</li>
</ul>
<p>Non serve essere poetici: bastano un ingrediente di qualità, una lavorazione o una provenienza. E sempre gli allergeni in fondo.</p>
{{art:scheda}}

<h2>4. Pensa ai turisti</h2>
<p>Se il tuo locale lavora con clienti stranieri, un menu tradotto fa la differenza. Il vantaggio del digitale è che il menu può aprirsi da solo nella lingua del telefono. Attenzione alle traduzioni automatiche generiche: i nomi dei piatti tipici, come carbonara o fiordilatte, vanno lasciati in italiano e spiegati.</p>

<h2>5. Dove mettere il QR code</h2>
<ul>
<li><strong>Sul tavolo</strong>, con un supporto stabile o un adesivo resistente.</li>
<li><strong>In vetrina</strong>, per chi guarda il menu prima di entrare.</li>
<li><strong>Su scontrini, volantini e cartoni della pizza</strong>, per gli ordini da asporto.</li>
<li><strong>Online</strong>: su Google, Instagram e Facebook va messo il link, non il QR.</li>
</ul>
<p>Accanto al QR scrivi sempre una frase chiara, come "Inquadra per vedere il menu". Non tutti lo capiscono al primo sguardo.</p>

<h2>6. Gli errori più comuni</h2>
<ul>
<li><strong>Il PDF del menu cartaceo</strong> messo online: sul telefono si legge male e va ingrandito.</li>
<li><strong>QR collegato a un indirizzo che cambia</strong>: se cambi fornitore devi ristampare tutto. Meglio un indirizzo che resta tuo.</li>
<li><strong>Prezzi non aggiornati</strong>: il vantaggio del digitale è proprio cambiarli in un secondo.</li>
<li><strong>Nessuna alternativa cartacea</strong>: tieni sempre qualche menu stampato per chi lo preferisce.</li>
</ul>

<h2>7. Tienilo vivo</h2>
<p>Il menu digitale dà il meglio quando cambia. Qualche abitudine semplice:</p>
<ul>
<li><strong>Il piatto del giorno</strong> in cima, aggiornato ogni mattina.</li>
<li><strong>Gli esauriti</strong> segnati appena finiscono, non a fine serata.</li>
<li><strong>Le novità di stagione</strong> con un'etichetta "Nuovo" per qualche settimana.</li>
<li><strong>Una revisione al mese</strong>: togli i piatti che nessuno ordina e sistema le descrizioni che generano domande.</li>
</ul>

<div class="box">
<p>Checklist prima di stampare i QR</p>
<ol>
<li>Tutti i piatti hanno nome, descrizione breve, prezzo e allergeni.</li>
<li>Le categorie seguono l'ordine in cui si mangia.</li>
<li>Il menu si apre bene su un telefono vecchio e con poca connessione.</li>
<li>L'indirizzo del menu è tuo e non cambierà.</li>
<li>Accanto al QR c'è scritto "Inquadra per vedere il menu".</li>
<li>Al locale restano alcune copie stampate per chi le preferisce.</li>
</ol>
</div>

<h2>Quanto costa</h2>
<p>Un menu digitale fatto bene costa meno di una ristampa all'anno. Con ${"{{brand}}"} parti dal piano Base a 19 euro al mese, con importazione tramite AI, QR e aggiornamenti illimitati. Puoi provarlo gratis per 14 giorni.</p>
`,
  },
  {
    slug: "allergeni-nel-menu",
    seo: {
      title: "Allergeni nel menu: i 14 da indicare e come",
      description:
        "Allergeni nel menu digitale e di carta: quali sono i 14 del Regolamento UE 1169/2011, come indicarli in ristorante o pizzeria e come renderli chiari.",
    },
    title: "Allergeni nel menu: quali sono i 14 da indicare e come mostrarli",
    description:
      "I 14 allergeni previsti dal Regolamento UE 1169/2011, come indicarli nel menu del ristorante o della pizzeria e come renderli chiari anche nel menu digitale.",
    date: "2026-09-24",
    readMinutes: 9,
    related: ["menu-digitale", "traduzioni", "importa-menu-ai"],
    html: `
<p>Chi somministra cibo deve informare i clienti sulla presenza di allergeni. In Europa la regola di riferimento è il <strong>Regolamento UE 1169/2011</strong>, che elenca 14 sostanze o prodotti che possono provocare allergie o intolleranze.</p>
<p>Questa guida è un riassunto pratico e non sostituisce un parere professionale: per i dettagli del tuo caso confrontati con la tua associazione di categoria o con l'ASL.</p>

<h2>I 14 allergeni da indicare</h2>
<table>
<thead><tr><th>Allergene</th><th>Dove si trova spesso</th></tr></thead>
<tbody>
<tr><td>Cereali contenenti glutine</td><td>Pane, pasta, pizza, panature, birra</td></tr>
<tr><td>Crostacei</td><td>Gamberi, scampi, granchi</td></tr>
<tr><td>Uova</td><td>Pasta fresca, dolci, maionese</td></tr>
<tr><td>Pesce</td><td>Alici, colatura, alcuni brodi</td></tr>
<tr><td>Arachidi</td><td>Dolci, salse, oli di semi</td></tr>
<tr><td>Soia</td><td>Salse, prodotti vegetali, margarine</td></tr>
<tr><td>Latte</td><td>Formaggi, burro, panna, mozzarella</td></tr>
<tr><td>Frutta a guscio</td><td>Pistacchio, noci, nocciole, mandorle</td></tr>
<tr><td>Sedano</td><td>Soffritti, brodi, sughi</td></tr>
<tr><td>Senape</td><td>Salse e condimenti</td></tr>
<tr><td>Semi di sesamo</td><td>Pane, grissini, panature</td></tr>
<tr><td>Anidride solforosa e solfiti</td><td>Vino, frutta secca, aceto</td></tr>
<tr><td>Lupini</td><td>Farine e alcuni prodotti da forno</td></tr>
<tr><td>Molluschi</td><td>Cozze, vongole, calamari, polpo</td></tr>
</tbody>
</table>

<h2>Come indicarli nel menu</h2>
<p>Il modo più chiaro è indicare gli allergeni accanto a ogni piatto, con il nome o con un'icona accompagnata da una legenda. Altre soluzioni ammesse nella pratica, come un registro consultabile su richiesta, rendono però la vita più difficile sia al cliente sia allo staff.</p>
<ul>
<li><strong>Accanto al piatto</strong>: il cliente vede subito cosa contiene.</li>
<li><strong>Con le icone</strong>: sempre con una legenda, perché non tutti le riconoscono.</li>
<li><strong>Con una nota sulle contaminazioni</strong>: per esempio "In cucina si usano anche frutta a guscio e sesamo".</li>
</ul>

<h2>Il vantaggio del menu digitale</h2>
<p>In un <a href="/funzionalita/menu-digitale/">menu digitale</a> gli allergeni si aggiornano insieme alla ricetta, si traducono nelle lingue del menu e il cliente può filtrare i piatti, per esempio nascondendo tutto quello che contiene latte.</p>
<p>Quando cambi un ingrediente, aggiorni anche gli allergeni nello stesso momento: è il modo più semplice per non avere informazioni vecchie in giro.</p>

<h2>Una lista di controllo veloce</h2>
<ol>
<li>Per ogni piatto, controlla gli ingredienti di tutti i semilavorati (sughi, impasti, basi).</li>
<li>Segna gli allergeni anche per bevande e dolci.</li>
<li>Forma lo staff: deve sapere dove trovare l'informazione e cosa rispondere.</li>
<li>Rivedi il menu ogni volta che cambia un fornitore o una ricetta.</li>
</ol>

<h2>Le contaminazioni: cosa scrivere</h2>
<p>Anche se un piatto non contiene un allergene tra gli ingredienti, in cucina può entrarci in contatto: la stessa friggitrice, lo stesso piano di lavoro, la stessa farina nell'aria. È bene indicarlo in modo chiaro, con una nota generale in fondo al menu e, dove serve, accanto al piatto.</p>
<blockquote><p>Nella nostra cucina si utilizzano anche glutine, frutta a guscio e sesamo. Se hai un'allergia o un'intolleranza, parlane con il personale prima di ordinare.</p></blockquote>
<p>Attenzione alle diciture come "senza glutine": hanno regole precise. Se non hai un percorso dedicato, è più corretto parlare di piatti "preparati con ingredienti privi di glutine", spiegando il rischio di contaminazione.</p>

<h2>Cosa risponde lo staff</h2>
<p>La domanda "c'è qualcosa senza latte?" arriva sempre nel momento meno comodo. Lo staff deve sapere tre cose: dove trovare l'informazione, cosa dire e quando chiamare la cucina.</p>
<ol>
<li><strong>Controlla sul menu</strong> o sul tablet gli allergeni del piatto.</li>
<li><strong>Non improvvisare</strong>: "credo di no" non è una risposta. Se c'è un dubbio, chiedi in cucina.</li>
<li><strong>Riferisci in cucina</strong> l'allergia insieme all'ordine, scritta, non a voce.</li>
</ol>

<h2>Un esempio di menu ben fatto</h2>
<table>
<thead><tr><th>Piatto</th><th>Allergeni</th></tr></thead>
<tbody>
<tr><td>Pizza margherita</td><td>Glutine, latte</td></tr>
<tr><td>Tajarin al ragù</td><td>Glutine, uova, sedano</td></tr>
<tr><td>Vitello tonnato</td><td>Uova, pesce</td></tr>
<tr><td>Tiramisù</td><td>Glutine, uova, latte</td></tr>
<tr><td>Sorbetto al limone</td><td>Nessuno dei 14</td></tr>
</tbody>
</table>

<div class="box">
<p>Da fare questa settimana</p>
<ul>
<li>Stampa la tabella dei 14 allergeni e appendila in cucina.</li>
<li>Controlla le schede tecniche dei semilavorati che compri: sughi, basi, gelati, panature.</li>
<li>Aggiungi la nota sulle contaminazioni in fondo al menu.</li>
<li>Fai una prova con lo staff: "Un cliente è allergico alle nocciole, cosa gli consigli?"</li>
</ul>
</div>
`,
  },
  {
    slug: "ordini-asporto-whatsapp-senza-commissioni",
    seo: {
      title: "Ordini da asporto su WhatsApp: come organizzarli",
      description:
        "Come ricevere ordini da asporto su WhatsApp con orario di ritiro e senza commissioni alle app di consegna. Consigli per pizzerie e ristoranti.",
    },
    title: "Ordini da asporto su WhatsApp senza commissioni: come organizzarli",
    description:
      "Come ricevere ordini da asporto su WhatsApp in modo ordinato, con orario di ritiro e senza pagare commissioni alle app di delivery. Consigli pratici per pizzerie e ristoranti.",
    date: "2026-09-17",
    readMinutes: 10,
    related: ["ordini-whatsapp", "menu-digitale", "clienti"],
    arts: {
      ordine: {
        kind: "order",
        who: "Marta Conti",
        lines: ["2 × Margherita", "1 × Capricciosa, senza funghi", "1 × Coca-Cola 33 cl"],
        total: "€ 25,50",
        when: "Ritiro venerdì 20:15",
        extra: "Nota: citofono Conti, arrivo a piedi",
      },
    },
    html: `
<p>Le app di delivery portano visibilità, ma trattengono in genere una percentuale importante su ogni ordine. Per i clienti che ti conoscono già, quelli che ordinano ogni settimana, quella commissione è un costo che puoi evitare.</p>
<p>WhatsApp è il canale che i tuoi clienti usano già. Il problema è che, senza organizzazione, diventa un caos: messaggi vocali, ordini incompleti, orari non chiari.</p>

<h2>Il problema degli ordini "a mano"</h2>
<ul>
<li>Il cliente scrive "due margherite e una diavola per stasera", senza orario.</li>
<li>Bisogna rispondere, chiedere, confermare: tempo sottratto alla cucina.</li>
<li>Le aggiunte e le varianti si perdono tra un messaggio e l'altro.</li>
<li>Nelle ore di punta i messaggi si accumulano e qualcuno resta indietro.</li>
</ul>

<h2>La soluzione: il cliente ordina dal menu, tu ricevi l'ordine già scritto</h2>
<p>Con un <a href="/funzionalita/ordini-whatsapp/">sistema di ordini su WhatsApp</a> il cliente apre il tuo menu digitale, aggiunge i piatti al carrello, sceglie l'orario di ritiro tra quelli disponibili e invia. Su WhatsApp arriva un messaggio ordinato con piatti, varianti, totale e orario.</p>

<p>Ecco come appare un ordine quando arriva già completo: niente domande, niente richiami.</p>
{{art:ordine}}

<h2>Come organizzare le fasce di ritiro</h2>
<ol>
<li><strong>Dividi la serata in fasce</strong> da 15 minuti.</li>
<li><strong>Stabilisci quanti ordini puoi gestire per fascia</strong>, in base al forno e al personale.</li>
<li><strong>Imposta un anticipo minimo</strong>, per esempio 30 minuti.</li>
<li><strong>Tieni un pulsante di pausa</strong> per i momenti in cui la cucina è piena.</li>
</ol>

<h2>Quanto puoi risparmiare</h2>
<p>Facciamo un esempio. Se ogni settimana ricevi 80 ordini da asporto da 25 euro, e una piattaforma trattiene il 20 per cento, paghi circa 400 euro al mese di commissioni. Spostando anche solo metà di quegli ordini sui tuoi canali diretti, risparmi circa 200 euro al mese, molto più del costo di un abbonamento.</p>

<h2>Come far conoscere il nuovo canale</h2>
<ul>
<li>Un QR sul cartone della pizza e sugli scontrini: "La prossima volta ordina qui".</li>
<li>Il link nella bio di Instagram e nel profilo Google.</li>
<li>Un messaggio ai clienti abituali che hanno dato il consenso.</li>
</ul>

<h2>Imposta bene WhatsApp Business</h2>
<p>Se usi ancora WhatsApp normale per il locale, passa a WhatsApp Business: è gratuito e ti dà strumenti utili per gli ordini.</p>
<ul>
<li><strong>Profilo completo</strong>: orari, indirizzo, link al menu.</li>
<li><strong>Messaggio di benvenuto</strong> per chi scrive per la prima volta, con il link per ordinare.</li>
<li><strong>Messaggio di assenza</strong> fuori orario, che spiega quando riapri e come prenotare un ordine per domani.</li>
<li><strong>Risposte rapide</strong> per le frasi che scrivi più spesso, come la conferma dell'ordine.</li>
</ul>
<blockquote><p>Ciao! Per ordinare usa il nostro menu: scegli le pizze e l'orario di ritiro, ci arriva tutto qui. [link] Rispondiamo in pochi minuti.</p></blockquote>

<h2>Conferma sempre, in pochi secondi</h2>
<p>Il cliente che ha ordinato vuole sapere che l'ordine è arrivato. Una conferma breve, con l'orario, basta. Se c'è un problema, come un prodotto finito, proponi subito un'alternativa invece di chiedere "cosa vuole fare?".</p>
<blockquote><p>Ricevuto Marta, ti aspettiamo alle 20:15. La capricciosa sarà senza funghi come hai chiesto.</p></blockquote>

<h2>Gli errori da evitare</h2>
<ul>
<li><strong>Accettare ordini vocali</strong>: vanno ascoltati, interpretati e spesso richiamati. Rispondi con il link.</li>
<li><strong>Non chiedere l'orario</strong>: ogni ordine deve avere la sua fascia.</li>
<li><strong>Usare il numero personale</strong>: il numero del locale deve restare del locale, anche se cambia il personale.</li>
<li><strong>Mandare promozioni a tutti</strong>: i messaggi promozionali vanno solo a chi ha dato il consenso.</li>
</ul>
`,
  },
  {
    slug: "ridurre-no-show-ristorante",
    seo: {
      title: "Come ridurre i tavoli vuoti al ristorante",
      description:
        "5 metodi concreti per ridurre le prenotazioni non rispettate al ristorante: promemoria su WhatsApp, disdetta facile, lista d'attesa e conferma dei gruppi.",
    },
    title: "Come ridurre i tavoli vuoti per le prenotazioni non rispettate",
    description:
      "Cinque metodi concreti per ridurre i no-show al ristorante: promemoria su WhatsApp, disdetta facile, lista d'attesa, conferma per i gruppi e storico dei clienti.",
    date: "2026-09-10",
    readMinutes: 9,
    related: ["prenotazioni", "automazioni-whatsapp", "clienti"],
    arts: {
      sera: {
        kind: "booking",
        title: "Sabato sera",
        sub: "Promemoria inviati ieri alle 11:00",
        used: 58,
        total: 70,
        list: [
          { name: "Famiglia Rossi", n: 6, time: "20:00", note: "Ha confermato" },
          { name: "Marco e Giulia", n: 2, time: "20:15", note: "Ha confermato" },
          { name: "Luca Ferrero", n: 4, time: "20:30", note: "Ha annullato, tavolo riassegnato" },
        ],
      },
    },
    html: `
<p>Un tavolo prenotato e non occupato è un doppio danno: perdi l'incasso e hai detto di no a qualcun altro. Il fenomeno si chiama <em>no-show</em> e capita a tutti i locali. Non si elimina del tutto, ma si può ridurre molto.</p>

<h2>1. Un promemoria il giorno prima</h2>
<p>Il modo più efficace è il più semplice. Un messaggio su WhatsApp il giorno prima, con due pulsanti, <strong>Confermo</strong> e <strong>Annulla</strong>. Chi si era dimenticato se ne ricorda, chi non può venire lo dice con un tocco invece di sparire.</p>

<p>Un esempio di promemoria che funziona: breve, con i dati della prenotazione e un modo semplice per rispondere.</p>
<blockquote><p>Ciao Luca, ti ricordiamo la prenotazione di domani, sabato, alle 20:30 per 4 persone da Trattoria del Borgo. Rispondi SÌ per confermare o NO se non riesci a venire: libereremo il tavolo per qualcun altro. Grazie!</p></blockquote>
{{art:sera}}

<h2>2. Rendere facile disdire</h2>
<p>Molti non si presentano perché telefonare per disdire è scomodo. Se disdire richiede un tocco, lo fanno. E il tavolo torna libero in tempo per essere riassegnato.</p>

<h2>3. Una lista d'attesa</h2>
<p>Quando sei pieno, non dire solo di no: raccogli nome e numero. Se un tavolo si libera, avvisi subito chi è in lista.</p>

<h2>4. Conferma obbligatoria per i gruppi</h2>
<p>I tavoli grandi pesano di più. Per i gruppi oltre un certo numero di persone puoi decidere di confermare sempre a mano e chiedere una conferma esplicita il giorno prima.</p>

<h2>5. Lo storico dei clienti</h2>
<p>Con una <a href="/funzionalita/clienti/">scheda per ogni cliente</a> sai chi si presenta sempre e chi ha già saltato due prenotazioni. Con i secondi puoi chiedere una conferma in più.</p>

<h2>Da dove partire</h2>
<p>Se oggi prendi le prenotazioni al telefono, il primo passo è un <a href="/funzionalita/prenotazioni/">sistema di prenotazione online</a> che raccolga il numero del cliente. Da lì, promemoria e disdetta facile si attivano con un interruttore.</p>

<h2>Caparra sì o no?</h2>
<p>Per le serate speciali, come San Valentino, Capodanno o i pranzi delle feste, molti locali chiedono una caparra al momento della prenotazione. Funziona, ma va usata con misura: per una cena normale del venerdì rischia di far scegliere un altro ristorante. Una via di mezzo è chiederla solo per i gruppi grandi e per le date in cui sai già che dirai di no a molte persone.</p>

<h2>Non compensare con l'overbooking</h2>
<p>Accettare più prenotazioni dei posti, contando su qualche assenza, sembra una soluzione furba. Ma la sera in cui si presentano tutti, qualcuno aspetta in piedi o viene mandato via, e quel cliente non torna. Meglio lavorare su promemoria, disdetta facile e lista d'attesa.</p>

<h2>Misura i risultati</h2>
<p>Per un mese segna, ogni sera, quante prenotazioni avevi e quante persone non si sono presentate senza avvisare. Poi attiva promemoria e disdetta facile e confronta il mese dopo. È il modo più semplice per capire quanto stai recuperando.</p>

<div class="box">
<p>In sintesi</p>
<ol>
<li>Raccogli sempre il numero di telefono con la prenotazione.</li>
<li>Manda un promemoria il giorno prima, in tarda mattinata.</li>
<li>Rendi la disdetta facile come la conferma.</li>
<li>Tieni una lista d'attesa per le sere piene.</li>
<li>Chiedi una conferma esplicita ai gruppi e a chi ha già saltato.</li>
</ol>
</div>
`,
  },
]);

/** Dalla più recente alla più vecchia. */
export const guides: Guide[] = [...sectorGuides, ...baseGuides].sort((a, b) => b.date.localeCompare(a.date));

export const guideBySlug = (slug: string) => guides.find((g) => g.slug === slug);
