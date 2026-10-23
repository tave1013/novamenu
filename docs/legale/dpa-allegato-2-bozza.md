# DPA, Allegato 2, punto 8: testo corretto (bozza, NON pubblicato)

Stato: **punto aperto**. Il testo online dice ancora che nessun dato dei Clienti finali va a servizi di intelligenza artificiale, ma l'assistente su Telegram lo fa. Questo testo sostituirà il punto 8 quando l'elenco dei fornitori della piattaforma sarà confermato e quando mi dirai di pubblicarlo.

Fonte usata per ora: il codice della piattaforma (repository piattaforma-menu, ramo main):
- `supabase/functions/telegram-webhook/`: i messaggi arrivano da Telegram;
- `supabase/functions/_shared/assistente/interpreta.ts`: il testo è interpretato con Anthropic (modelli Claude);
- `supabase/functions/_shared/assistente/trascrivi.ts`: i vocali sono trascritti con OpenAI (gpt-4o-mini-transcribe).

Da verificare con l'elenco fornitori dell'agente della piattaforma: nomi esatti delle società, paesi, garanzie per il trasferimento, se i fornitori conservano i dati e per quanto, e se i dati sono esclusi dall'addestramento dei modelli.

## Testo attuale (online)

> 8. **Minimizzazione**: il Servizio raccoglie solo i dati necessari alle funzioni attive; le allergie si salvano solo con il consenso esplicito; nessun invio di dati dei Clienti finali a servizi di intelligenza artificiale o di analisi di terzi.

## Testo proposto (italiano)

> 8. **Minimizzazione e intelligenza artificiale**: il Servizio raccoglie solo i dati necessari alle funzioni attive; le allergie si salvano solo con il consenso esplicito. I dati dei Clienti finali non vengono inviati a servizi di analisi di terzi. Le funzioni di traduzione e di importazione del menu inviano ai fornitori di intelligenza artificiale solo testi e immagini del menu, senza dati dei Clienti finali. Se il Titolare o i suoi Utenti usano l'**assistente su Telegram**, i messaggi e i vocali che inviano, che possono contenere dati dei Clienti finali (per esempio il nome e l'orario di una prenotazione), sono trasmessi tramite Telegram e trattati da fornitori di intelligenza artificiale (per l'interpretazione del testo e la trascrizione dei vocali) solo per eseguire il comando richiesto, senza che i fornitori li usino per addestrare i propri modelli. Questi fornitori sono sub-responsabili e sono indicati nell'elenco dell'articolo 6.1. L'assistente si usa solo se il Titolare lo attiva.

## Testo proposto (inglese)

> 8. **Data minimisation and artificial intelligence**: the Service collects only the data needed for the active features; allergies are saved only with explicit consent. End Customer data is not sent to third-party analytics services. The menu translation and menu import features send to artificial intelligence providers only menu text and images, without End Customer data. If the Controller or its Users use the **Telegram assistant**, the messages and voice notes they send, which may contain End Customer data (for example the name and time of a booking), are transmitted through Telegram and processed by artificial intelligence providers (to interpret the text and transcribe voice notes) only to carry out the requested command, without the providers using them to train their models. These providers are sub-processors and are listed in the list referred to in clause 6.1. The assistant is used only if the Controller switches it on.

## Da cambiare insieme

- **DPA, Allegato 1, "Categorie di dati" o "Natura del trattamento"**: aggiungere che, se l'assistente è attivo, i comandi inviati possono contenere dati dei Clienti finali.
- **Pagina Fornitori**: Telegram, Anthropic e OpenAI con paese e garanzia (dall'elenco della piattaforma).
- **Informativa privacy, punto 8**: tra i fornitori che trattano dati per nostro conto, "servizi di intelligenza artificiale per le traduzioni dei menu" diventa "servizi di intelligenza artificiale per le traduzioni e l'importazione dei menu e per l'assistente".
