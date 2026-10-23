# Per l'agente della piattaforma: cosa serve al sito novamenu.eu

Il sito manda ai server della piattaforma alcune righe da salvare. Tutte passano da funzioni del sito
(`/api/...` su novamenu.eu), che aggiungono `ricevuto_il` (data e ora ISO), `paese` (codice del paese
dell'IP, per esempio IT o GB, senza l'IP) e `origine` (dominio), e poi fanno una POST JSON all'indirizzo
configurato su Vercel con l'intestazione `Authorization: Bearer <PIATTAFORMA_MODULI_CHIAVE>`.

Variabili da impostare sul progetto Vercel del sito (le preparate voi, io non le invento):

| Variabile | Cosa riceve |
| --- | --- |
| `REGISTRO_CONSENSI_URL` | registro dei consensi ai cookie |
| `RICHIESTE_DEMO_URL` | richieste di demo e di contatto, con informativa mostrata e consensi |
| `RICHIESTE_PRIVACY_URL` | richieste privacy, da aprire nella console con scadenza a 30 giorni |
| `PIATTAFORMA_MODULI_CHIAVE` | chiave segreta condivisa, la stessa per i tre indirizzi |

Rispondete 2xx se la riga è salvata. Finché un indirizzo manca, il sito non salva niente e lo dice nella risposta.

## 1. Registro dei consensi (`REGISTRO_CONSENSI_URL`)

```json
{
  "id_anonimo": "uuid casuale del browser, non collegato a nome, email o IP",
  "azione": "accetta_tutti | rifiuta | personalizza | chiusura_x | revoca",
  "necessari": true,
  "statistiche": false,
  "marketing": false,
  "versione_consenso": "2-tecnici",
  "versione_cookie_policy": "1.0",
  "lingua": "it | en",
  "ricevuto_il": "2026-10-23T10:00:00.000Z",
  "paese": "IT",
  "origine": "novamenu.eu"
}
```

Da conservare 24 mesi (lo dice la cookie policy). Nessun dato personale in chiaro.

## 2. Richieste di demo e di contatto (`RICHIESTE_DEMO_URL`)

```json
{
  "tipo": "demo | contatto",
  "nome": "...", "attivita": "...", "email": "... o null", "telefono": "...",
  "messaggio": "giorno e ora scelti, modalità, obiettivo (demo) o testo del messaggio (contatto)",
  "lingua": "it | en",
  "testo_mostrato": "Inviando la richiesta accetti di essere ricontattato. Informativa privacy",
  "informativa_privacy_versione": "1.0",
  "consensi": { "whatsapp": false },
  "ricevuto_il": "...", "paese": "IT", "origine": "novamenu.eu"
}
```

La richiesta vera continua ad arrivare su WhatsApp come prima: questa riga è la prova di cosa è stato mostrato e accettato.

## 3. Richieste privacy (`RICHIESTE_PRIVACY_URL`)

```json
{
  "nome": "...", "email": "...",
  "tipo_richiesta": "accesso | correzione | cancellazione | opposizione | portabilita | altro",
  "locale_coinvolto": "nome del ristorante o null",
  "messaggio": "...",
  "lingua": "it | en",
  "informativa_privacy_versione": "1.0",
  "scadenza_giorni": 30,
  "ricevuto_il": "...", "paese": "IT", "origine": "novamenu.eu"
}
```

La console apre la richiesta con scadenza `ricevuto_il + 30 giorni`. Chi scrive vede: «Abbiamo ricevuto la tua richiesta. Ti rispondiamo entro 30 giorni.»
La pagina del modulo compare solo quando ci sono l'email privacy (nel file dei dati della società) e `RICHIESTE_PRIVACY_URL`.

## 4. Versioni dei documenti: https://novamenu.eu/legale/versioni.json

Per ogni documento: `id`, `versione`, `in_vigore_dal` (AAAA-MM-GG oppure null), indirizzi in italiano e inglese e, per Termini e DPA, il PDF.
Quando il ristoratore accetta Termini, DPA e privacy, salvate le versioni lette da qui (oggi la piattaforma salva solo `terms_accepted_at`, senza versione).

## 5. Elenco dei fornitori

Serve un file `docs/legale/fornitori.md` nel repository piattaforma-menu con, per ogni fornitore: nome della società, a cosa serve, quali dati tratta, dove sono i dati, garanzia per il trasferimento (adeguatezza, Data Privacy Framework, Clausole contrattuali standard, addendum UK). Comprese le funzioni dell'assistente (Telegram, Anthropic, OpenAI).
Dal sito lo copio in `src/content/legale/fornitori.ts`: la pagina Fornitori compare da sola.

## 6. Cookie `nm_accesso`

Già fatto e online (`src/admin/auth/CookieAccessoSito.tsx`).
