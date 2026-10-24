# Istruzioni per il sito novamenu.eu: invio dei moduli alla piattaforma

Le chiamate partono SOLO dal server del sito (funzioni Vercel /api/consenso/, /api/richiesta-demo/ e quella del modulo privacy), mai dal browser.

## Chiave condivisa

- Variabile d'ambiente su Vercel (progetto novamenu, Production): `SITO_CHIAVE_CONDIVISA`
- Si legge con `process.env.SITO_CHIAVE_CONDIVISA` e si manda nell'intestazione `x-chiave-sito`.
- Non va mai nel codice del browser, nei log o nelle risposte.
- Dopo aver collegato i moduli serve una nuova pubblicazione perché la variabile sia letta.

## Per tutti e tre gli indirizzi

- Metodo: `POST`
- Intestazioni:
  - `Content-Type: application/json`
  - `x-chiave-sito: <process.env.SITO_CHIAVE_CONDIVISA>`
  - `x-ip-visitatore: <IP del visitatore = primo valore di x-forwarded-for della richiesta arrivata al sito>`
- L'IP serve solo per i limiti e la piattaforma non lo salva. Se manca, valgono solo i limiti totali.
- Campo trappola `website`: campo nascosto nel modulo, da inoltrare così com'è. Se è pieno la risposta è `{"ok": true}` ma non si salva niente.
- Risposte possibili:
  - `200 {"ok": true, ...}`: salvato (o scartato in silenzio dalla trappola)
  - `400 {"ok": false, "errore": "..."}`: campi mancanti o sbagliati, oppure corpo non JSON
  - `401 {"ok": false, "errore": "Chiave non valida"}`
  - `404 {"ok": false, "errore": "Indirizzo sconosciuto: ..."}`
  - `405 {"ok": false, "errore": "Solo POST"}`
  - `429 {"ok": false, "errore": "Troppe richieste in poco tempo. ..."}`
  - `500 {"ok": false, "errore": "..."}`: errore del server, riprovare più tardi
  - `503 {"ok": false, "errore": "Servizio non configurato"}`
- Al visitatore mostrare un messaggio semplice; il testo di "errore" va bene per i 400.

## 1) Consensi cookie

URL: `https://pprjwaqzbrtigxfvdkcd.supabase.co/functions/v1/sito/consenso-cookie`

Campi del JSON:

- `identificativo` (testo, obbligatorio): casuale, creato nel browser e tenuto nel cookie del consenso; da 8 a 64 caratteri tra lettere, numeri, - e _
- `scelte` (oggetto, obbligatorio): da 1 a 12 voci, nomi in minuscolo, valori true o false. Esempio: `{"necessari": true, "statistiche": false, "marketing": false}`
- `versione_policy` (testo, obbligatorio, max 40): versione della cookie policy mostrata
- `lingua` (testo, facoltativo): "it", "en", "en-GB"
- `paese` (testo, facoltativo): due lettere, "IT", "GB"
- `website` (testo): campo trappola, vuoto

Data e ora le mette la piattaforma. Ogni cambio di scelta è una chiamata nuova (riga nuova).

Risposta 200: `{"ok": true, "id": "uuid", "registrato_at": "data ISO"}`

Limiti: 20 all'ora per visitatore, 3000 all'ora in tutto.

## 2) Richieste di demo

URL: `https://pprjwaqzbrtigxfvdkcd.supabase.co/functions/v1/sito/richiesta-demo`

Campi del JSON:

- `nome` (testo, obbligatorio, max 120)
- `email` (testo) e/o `telefono` (testo, max 30): almeno uno dei due valido
- `messaggio` (testo, max 4000)
- `pagina` (testo, max 300): pagina di provenienza, es. "/prezzi"
- `versione_informativa` (testo, max 40): versione dell'informativa mostrata sotto il modulo
- `testo_mostrato` (testo, max 2000): il testo esatto mostrato sotto il modulo
- `consensi` (elenco, fino a 10 voci): `[{"tipo": "ricontatto", "valore": true, "data": "2026-10-24T10:00:00Z", "testo": "testo della casella"}]`
  - tipo e valore obbligatori; data = quando il visitatore ha spuntato (ISO), se manca o non ha senso vale l'ora della piattaforma
- `lingua` (testo, facoltativo)
- `t` (numero, obbligatorio): millisecondi passati sul modulo; sotto 3000 non si salva (risponde comunque `{"ok": true}`)
- `website` (testo): campo trappola, vuoto

Risposta 200: `{"ok": true, "numero": 12}`

Limiti: 3 all'ora per visitatore, 30 all'ora in tutto.

## 3) Richieste privacy

URL: `https://pprjwaqzbrtigxfvdkcd.supabase.co/functions/v1/sito/richiesta-privacy`

Campi del JSON:

- `nome` (testo, obbligatorio, max 120)
- `email` (testo) e/o `telefono` (testo, max 30): almeno uno dei due valido
- `tipo` (testo): uno tra accesso, cancellazione, rettifica, opposizione, portabilita, limitazione, revoca_consenso, altro (altri valori diventano "altro")
- `messaggio` (testo, max 4000)
- `locale` (testo, max 120): nome o indirizzo del locale di cui si parla (es. pizzart.novamenu.eu)
- `captcha` (testo): solo se si usa Cloudflare Turnstile, il token del widget
- `t` (numero, obbligatorio): come sopra, almeno 3000
- `website` (testo): campo trappola, vuoto

Risposta 200: `{"ok": true, "numero": 5, "scadenza": "2026-11-23"}`

Limiti: 3 all'ora per visitatore, 50 all'ora in tutto.

## Esempio (server del sito, Node)

```js
const r = await fetch("https://pprjwaqzbrtigxfvdkcd.supabase.co/functions/v1/sito/richiesta-demo", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "x-chiave-sito": process.env.SITO_CHIAVE_CONDIVISA,
    "x-ip-visitatore": String(req.headers["x-forwarded-for"] ?? "").split(",")[0].trim(),
  },
  body: JSON.stringify(dati),
});
const esito = await r.json();
```
