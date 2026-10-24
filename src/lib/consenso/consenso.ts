import { VERSIONI } from "@/lib/legal/azienda";

/**
 * Gestione del consenso ai cookie, senza servizi esterni.
 * - La scelta sta nel cookie tecnico nm_consenso per 6 mesi.
 * - Google Analytics, Microsoft Clarity e Meta Pixel si caricano solo dopo il consenso alla loro categoria.
 * - Ogni scelta viene mandata al registro dei consensi tramite /api/consenso/, senza indirizzo IP né dati personali.
 * Funziona solo nel browser.
 */

/** Strumenti collegati. Senza identificativo lo strumento non viene mai caricato. */
export type Strumenti = { ga4?: string; clarity?: string; metaPixel?: string };

export const STRUMENTI_SITO: Strumenti = {
  ga4: process.env.NEXT_PUBLIC_GA4_ID || undefined,
  clarity: process.env.NEXT_PUBLIC_CLARITY_ID || undefined,
  metaPixel: process.env.NEXT_PUBLIC_META_PIXEL_ID || undefined,
};

/**
 * Versione del consenso: cambia da sola quando si collegano o si tolgono strumenti
 * (così il banner ricompare a tutti e nessuno strumento nuovo parte con un consenso vecchio).
 * Alza il numero anche quando cambiano in modo rilevante le categorie o i fornitori.
 */
export const VERSIONE_CONSENSO = `2-${(["ga4", "clarity", "metaPixel"] as const).filter((k) => STRUMENTI_SITO[k]).join("+") || "tecnici"}`;
export const COOKIE_CONSENSO = "nm_consenso";
const DURATA_GIORNI = 182; // 6 mesi

export type Azione = "accetta_tutti" | "rifiuta" | "personalizza" | "chiusura_x" | "revoca";
export type Scelte = { statistiche: boolean; marketing: boolean };
export type Consenso = Scelte & { versione: string; idBrowser: string; data: number };

/**
 * Il browser manda ogni scelta alla nostra funzione /api/consenso/ (stesso dominio, nessun servizio esterno),
 * che aggiunge data, ora e paese e la inoltra al registro dei consensi della piattaforma.
 */
export const REGISTRO_CONSENSI = "/api/consenso/";

/** Evento che riapre il pannello: lo usa il link "Preferenze cookie" del footer. */
export const EVENTO_PREFERENZE = "nm:preferenze-cookie";
export function apriPreferenzeCookie() {
  window.dispatchEvent(new Event(EVENTO_PREFERENZE));
}

type W = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
  clarity?: ((...args: unknown[]) => void) & { q?: unknown[] };
  fbq?: ((...args: unknown[]) => void) & { callMethod?: (...a: unknown[]) => void; queue?: unknown[]; loaded?: boolean; version?: string; push?: unknown };
  _fbq?: unknown;
  [k: string]: unknown;
};
const w = () => window as unknown as W;

/* ---------- lettura e scrittura della scelta ---------- */

export function leggiConsenso(): Consenso | null {
  try {
    const raw = document.cookie.split("; ").find((c) => c.startsWith(`${COOKIE_CONSENSO}=`));
    if (!raw) return null;
    const v = JSON.parse(decodeURIComponent(raw.slice(COOKIE_CONSENSO.length + 1)));
    const c: Consenso = { versione: String(v.v), idBrowser: String(v.id), statistiche: v.s === 1, marketing: v.m === 1, data: Number(v.t) };
    if (c.versione !== VERSIONE_CONSENSO) return null;
    if (!c.data || Date.now() - c.data > DURATA_GIORNI * 864e5) return null;
    return c;
  } catch {
    return null;
  }
}

function idCasuale(): string {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
}

function scriviConsenso(c: Consenso) {
  const value = encodeURIComponent(JSON.stringify({ v: c.versione, id: c.idBrowser, s: c.statistiche ? 1 : 0, m: c.marketing ? 1 : 0, t: c.data }));
  const secure = location.protocol === "https:" ? "; Secure" : "";
  // Cookie del solo dominio corrente: non arriva ai sottodomini (menu dei locali, piattaforma).
  document.cookie = `${COOKIE_CONSENSO}=${value}; Max-Age=${DURATA_GIORNI * 86400}; Path=/; SameSite=Lax${secure}`;
}

/* ---------- strumenti ---------- */

function caricaScript(src: string, id: string) {
  if (document.getElementById(id)) return;
  const s = document.createElement("script");
  s.async = true;
  s.src = src;
  s.id = id;
  document.head.appendChild(s);
}

/** Google Consent Mode v2: tutto negato prima di qualunque tag Google. */
export function impostaConsentModeDefault() {
  const win = w();
  win.dataLayer = win.dataLayer || [];
  if (!win.gtag) {
    win.gtag = function gtag() {
      // gtag vuole proprio l'oggetto arguments
      // eslint-disable-next-line prefer-rest-params
      win.dataLayer!.push(arguments);
    };
    win.gtag("consent", "default", { ad_storage: "denied", analytics_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" });
  }
}

function aggiornaConsentMode(s: Scelte) {
  w().gtag?.("consent", "update", {
    analytics_storage: s.statistiche ? "granted" : "denied",
    ad_storage: s.marketing ? "granted" : "denied",
    ad_user_data: s.marketing ? "granted" : "denied",
    ad_personalization: s.marketing ? "granted" : "denied",
  });
}

function avviaGa4(id: string) {
  const win = w();
  win[`ga-disable-${id}`] = false;
  if (document.getElementById("nm-ga4")) return;
  caricaScript(`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`, "nm-ga4");
  win.gtag!("js", new Date());
  // In GA4 l'IP non viene mai registrato. Google Signals e condivisione dati restano spenti.
  win.gtag!("config", id, { allow_google_signals: false, allow_ad_personalization_signals: false });
}

function avviaClarity(id: string, s: Scelte) {
  const win = w();
  if (!win.clarity) {
    const c = function clarity(...args: unknown[]) {
      (c.q = c.q || []).push(args);
    } as ((...args: unknown[]) => void) & { q?: unknown[] };
    win.clarity = c;
    caricaScript(`https://www.clarity.ms/tag/${encodeURIComponent(id)}`, "nm-clarity");
  }
  win.clarity!("consentv2", { ad_Storage: s.marketing ? "granted" : "denied", analytics_Storage: "granted" });
}

function avviaMetaPixel(id: string) {
  const win = w();
  if (!win.fbq) {
    const f = function fbq(...args: unknown[]) {
      if (f.callMethod) f.callMethod(...args);
      else f.queue!.push(args);
    } as NonNullable<W["fbq"]>;
    f.push = f;
    f.loaded = true;
    f.version = "2.0";
    f.queue = [];
    win.fbq = f;
    if (!win._fbq) win._fbq = f;
    caricaScript("https://connect.facebook.net/en_US/fbevents.js", "nm-meta-pixel");
    // Niente Advanced Matching: init senza dati dell'utente.
    f("consent", "grant");
    f("init", id);
    f("track", "PageView");
    return;
  }
  win.fbq("consent", "grant");
}

/** Accende gli strumenti per cui c'è il consenso. Da chiamare all'avvio e dopo ogni scelta. */
export function applicaConsenso(s: Scelte, strumenti: Strumenti) {
  impostaConsentModeDefault();
  aggiornaConsentMode(s);
  if (s.statistiche && strumenti.ga4) avviaGa4(strumenti.ga4);
  if (s.statistiche && strumenti.clarity) avviaClarity(strumenti.clarity, s);
  if (s.marketing && strumenti.metaPixel) avviaMetaPixel(strumenti.metaPixel);
}

/** Cancella un cookie dal dominio corrente e dai domini superiori (es. .novamenu.eu). */
function cancellaCookie(nome: string) {
  const parti = location.hostname.split(".");
  const domini = [""];
  for (let i = 0; i < parti.length - 1; i++) domini.push(`; Domain=.${parti.slice(i).join(".")}`);
  for (const d of domini) document.cookie = `${nome}=; Max-Age=0; Path=/${d}`;
}

const COOKIE_STATISTICHE = [/^_ga$/, /^_ga_/, /^_clck$/, /^_clsk$/];
const COOKIE_MARKETING = [/^_fbp$/];

/** Spegne subito gli strumenti revocati e cancella i loro cookie di prima parte. */
function spegni(revocate: Scelte, strumenti: Strumenti) {
  const win = w();
  if (revocate.statistiche) {
    if (strumenti.ga4) win[`ga-disable-${strumenti.ga4}`] = true;
    win.clarity?.("consent", false);
  }
  if (revocate.marketing) win.fbq?.("consent", "revoke");
  const regole = [...(revocate.statistiche ? COOKIE_STATISTICHE : []), ...(revocate.marketing ? COOKIE_MARKETING : [])];
  for (const nome of document.cookie.split("; ").map((c) => c.split("=")[0])) {
    if (regole.some((r) => r.test(nome))) cancellaCookie(nome);
  }
}

/* ---------- registro dei consensi ---------- */

/**
 * Una riga del registro: identificativo casuale del browser (non collegato a nome, email o IP),
 * scelte, versioni, lingua. Data, ora e paese li aggiunge il server.
 */
function registra(c: Consenso, azione: Azione, lingua: string) {
  const body = JSON.stringify({
    identificativo: c.idBrowser,
    azione,
    statistiche: c.statistiche,
    marketing: c.marketing,
    versione_policy: VERSIONI.cookie.versione,
    lingua,
    website: "",
  });
  try {
    fetch(REGISTRO_CONSENSI, { method: "POST", headers: { "Content-Type": "application/json" }, body, keepalive: true, credentials: "omit" }).catch(() => {});
  } catch {
    /* il registro non deve mai bloccare la navigazione */
  }
}

/**
 * Salva una scelta: scrive il cookie, registra la riga, accende o spegne gli strumenti.
 * Restituisce true se la pagina va ricaricata per togliere del tutto gli script già caricati.
 */
export function salvaScelta(scelte: Scelte, azione: Azione, opzioni: { lingua: string; strumenti: Strumenti; utenteId?: string | null }): boolean {
  const prima = leggiConsenso();
  const c: Consenso = { ...scelte, versione: VERSIONE_CONSENSO, idBrowser: prima?.idBrowser ?? idCasuale(), data: Date.now() };
  const revocate: Scelte = { statistiche: !!prima?.statistiche && !scelte.statistiche, marketing: !!prima?.marketing && !scelte.marketing };
  const azioneReale: Azione = (revocate.statistiche || revocate.marketing) && azione === "personalizza" ? "revoca" : azione;
  scriviConsenso(c);
  registra(c, azioneReale, opzioni.lingua);
  if (revocate.statistiche || revocate.marketing) {
    aggiornaConsentMode(scelte);
    spegni(revocate, opzioni.strumenti);
    return true;
  }
  applicaConsenso(scelte, opzioni.strumenti);
  return false;
}
