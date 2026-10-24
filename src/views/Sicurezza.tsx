import type { Metadata } from "next";
import Link from "next/link";
import { t, tr } from "@/i18n";
import type { Locale } from "@/i18n/config";
import { pageMeta } from "@/config/seo";
import { site } from "@/config/site";
import { SICUREZZA } from "@/config/sicurezza";
import { Breadcrumbs, CtaBand } from "@/components/ui";
import { Icon, type IconName } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import { to } from "@/i18n/link";

/*
 * Sicurezza e privacy, per i ristoratori: testi semplici, solo cose vere.
 * Le regioni vengono dall'elenco fornitori (src/content/legale/fornitori.ts); il resto è verificato
 * nel codice della piattaforma (verifica in due passaggi obbligatoria, registro privacy, esportazione,
 * cancellazione del cliente, consensi, 90 giorni dopo la disdetta). Il backup giornaliero si mostra
 * solo con SICUREZZA.backupGiornalieri (src/config/sicurezza.ts).
 */
export const meta = (locale: Locale): Metadata =>
  pageMeta({
    locale,
    page: "security",
    title: t(locale, "Sicurezza e privacy: come proteggiamo i dati del tuo locale"),
    description: t(locale, "Dove sono i dati del tuo locale e dei tuoi clienti, come li proteggiamo e come li porti via quando vuoi. Spiegato in parole semplici, per chi gestisce un locale."),
  });

type Voce = { icon: IconName; titolo: string; testo: string };

function Schede({ voci }: { voci: Voce[] }) {
  return (
    <ul className="mt-8 grid gap-3 sm:grid-cols-2">
      {voci.map((v, i) => (
        <Reveal as="li" key={v.titolo} delay={i * 60} className="rounded-[20px] border border-line bg-white p-5 md:p-6">
          <span className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-p-green text-p-green-ink">
            <Icon name={v.icon} size={19} stroke={2} />
          </span>
          <h3 className="mt-4 text-[17px] font-semibold tracking-[-0.015em] text-ink">{v.titolo}</h3>
          <p className="mt-1.5 text-[15.5px] leading-relaxed text-muted">{v.testo}</p>
        </Reveal>
      ))}
    </ul>
  );
}

function Sezione({ id, titolo, testo, children }: { id: string; titolo: string; testo?: string; children?: React.ReactNode }) {
  return (
    <section id={id} className="border-t border-line-soft py-12 md:py-16">
      <div className="wrap max-w-[960px]">
        <Reveal>
          <h2 className="h-block max-md:text-[1.75rem] max-md:leading-[1.15]">{titolo}</h2>
          {testo && <p className="mt-3 max-w-[720px] text-[16px] leading-relaxed text-muted md:text-[17px]">{testo}</p>}
        </Reveal>
        {children}
      </div>
    </section>
  );
}

export default function SicurezzaPage() {
  const protezione: Voce[] = [
    { icon: "lock", titolo: tr("Connessione cifrata"), testo: tr("Tra il tuo telefono o computer e NovaMenu i dati viaggiano sempre cifrati, anche sul menu che vedono i tuoi clienti.") },
    { icon: "shield", titolo: tr("Database cifrato"), testo: tr("I dati salvati sono cifrati dal fornitore del database. Ogni locale vede solo i propri.") },
    { icon: "phone", titolo: tr("Verifica in due passaggi"), testo: tr("Per entrare nella dashboard servono la password e un codice dall'app di autenticazione sul telefono. È obbligatoria per tutti.") },
    { icon: "users", titolo: tr("Permessi per lo staff"), testo: tr("Decidi tu cosa vede e cosa può fare ogni dipendente, anche chi può vedere le allergie. Solo il titolare può cancellare un cliente.") },
    { icon: "clipboard", titolo: tr("Registro degli accessi"), testo: tr("Chi apre le allergie di un cliente, chi esporta o cancella i suoi dati: resta tutto scritto nel registro privacy.") },
    { icon: "chat", titolo: tr("Assistenza solo se la chiedi"), testo: tr("Il nostro supporto entra nella tua dashboard solo se lo attivi tu, per 30 minuti alla volta. Ogni accesso compare nella cronologia.") },
    ...(SICUREZZA.backupGiornalieri ? [{ icon: "repeat" as const, titolo: tr("Backup automatici giornalieri"), testo: tr("Ogni giorno facciamo una copia di sicurezza dei dati, in automatico.") }] : []),
  ];
  const tuoi: Voce[] = [
    { icon: "layers", titolo: tr("Esportazione completa"), testo: tr("Con «Scarica tutto» ricevi un file con menu, prodotti, foto, orari, ordini e, se le usi, clienti e prenotazioni. Quando vuoi.") },
    { icon: "x", titolo: tr("Cancellazione del singolo cliente"), testo: tr("Se un cliente te lo chiede, esporti o cancelli i suoi dati dalla sua scheda. Restano solo i numeri, senza il nome.") },
    { icon: "heart", titolo: tr("Allergie solo con il consenso"), testo: tr("Le allergie si salvano solo se il cliente dà il consenso. Se lo ritira, le allergie si cancellano.") },
    { icon: "send", titolo: tr("Promozioni solo con il consenso"), testo: tr("I messaggi promozionali partono solo a chi ha detto sì, e ognuno può cambiare idea quando vuole.") },
  ];
  return (
    <>
      <section className="pb-10 pt-8 md:pb-14 md:pt-12">
        <div className="wrap max-w-[960px]">
          <Breadcrumbs items={[{ name: tr("Sicurezza e privacy"), href: to("security") }]} />
          <h1 className="display anim-fade-up mt-10">
            {tr("Sicurezza e")} <span className="hl">{tr("privacy")}</span>
          </h1>
          <p className="lead anim-fade-up mt-6 max-w-[640px]" style={{ animationDelay: "80ms" }}>
            {tr("I dati del tuo locale e dei tuoi clienti sono protetti e restano tuoi. Qui ti spieghiamo, in parole semplici, dove sono e come li proteggiamo.")}
          </p>
        </div>
      </section>

      <Sezione id="dove" titolo={tr("Dove sono i tuoi dati")}>
        <Reveal className="mt-6 grid gap-3 md:grid-cols-2">
          <div className="rounded-[20px] border border-line bg-white p-5 md:p-6">
            <p className="flex items-center gap-2 text-[15px] font-semibold text-ink">
              <Icon name="pin" size={17} stroke={2} />
              {tr("Nell'Unione europea, a Francoforte")}
            </p>
            <p className="mt-2 text-[15.5px] leading-relaxed text-muted">
              {tr("Il database con i dati del locale e dei clienti (menu, ordini, prenotazioni, schede dei clienti) è a Francoforte, in Germania. Lì girano anche le funzioni del server del sito e della dashboard.")}
            </p>
          </div>
          <div className="rounded-[20px] border border-line bg-white p-5 md:p-6">
            <p className="flex items-center gap-2 text-[15px] font-semibold text-ink">
              <Icon name="globe" size={17} stroke={2} />
              {tr("Alcuni servizi anche negli Stati Uniti")}
            </p>
            <p className="mt-2 text-[15.5px] leading-relaxed text-muted">
              {tr("L'invio delle email automatiche, l'intelligenza artificiale dell'assistente e dell'importazione del menu, i pagamenti e le notifiche sull'iPhone lavorano anche negli Stati Uniti, con le garanzie previste dalla legge.")}
            </p>
          </div>
        </Reveal>
        <p className="mt-5 text-[15.5px]">
          <Link href={to("legalDoc", "fornitori")} className="link-arrow min-h-11 font-medium">
            {tr("L'elenco completo dei fornitori, con paese e garanzie")}
            <Icon name="arrowRight" size={15} stroke={2} />
          </Link>
        </p>
      </Sezione>

      <Sezione id="protezione" titolo={tr("Come li proteggiamo")}>
        <Schede voci={protezione} />
      </Sezione>

      <Sezione id="tuoi" titolo={tr("I dati dei tuoi clienti restano tuoi")} testo={tr("Per i dati dei tuoi clienti il titolare sei tu: NovaMenu li tratta solo per conto tuo e ti dà gli strumenti per gestirli.")}>
        <Schede voci={tuoi} />
      </Sezione>

      <Sezione id="documenti" titolo={tr("Documenti chiari, sempre a portata di mano")}>
        <Reveal className="mt-6 grid gap-3 md:grid-cols-2">
          <div className="rounded-[20px] border border-line bg-white p-5 md:p-6">
            <h3 className="text-[17px] font-semibold tracking-[-0.015em] text-ink">{tr("Il DPA è già pronto")}</h3>
            <p className="mt-1.5 text-[15.5px] leading-relaxed text-muted">
              {tr("L'accordo sul trattamento dei dati (DPA) lo accetti quando ti registri e lo ritrovi nella dashboard, in Impostazioni, Privacy e documenti, con la versione che hai accettato. Si scarica anche in PDF.")}
            </p>
            <Link href={to("legalDoc", "dpa")} className="link-arrow mt-3 min-h-11 text-[15px] font-medium">
              {tr("Leggi il DPA")}
              <Icon name="arrowRight" size={15} stroke={2} />
            </Link>
          </div>
          <div className="rounded-[20px] border border-line bg-white p-5 md:p-6">
            <h3 className="text-[17px] font-semibold tracking-[-0.015em] text-ink">{tr("I fornitori sono pubblici")}</h3>
            <p className="mt-1.5 text-[15.5px] leading-relaxed text-muted">
              {tr("Chi tratta i dati per noi, a cosa serve e dove lavora: è tutto in una pagina pubblica. Se cambia un fornitore, ti avvisiamo almeno 30 giorni prima.")}
            </p>
            <Link href={to("legalDoc", "fornitori")} className="link-arrow mt-3 min-h-11 text-[15px] font-medium">
              {tr("Vedi i fornitori")}
              <Icon name="arrowRight" size={15} stroke={2} />
            </Link>
          </div>
        </Reveal>
      </Sezione>

      <Sezione
        id="disdetta"
        titolo={tr("Se disdici")}
        testo={tr("Alla fine dell'abbonamento il menu va offline, ma per 90 giorni puoi entrare, vedere e scaricare tutti i tuoi dati, e riattivare ritrovando tutto com'era. Dopo i 90 giorni i dati vengono eliminati, tranne quelli che la legge ci chiede di conservare, come le fatture.")}
      />

      <section className="border-t border-line-soft py-12 md:py-16">
        <div className="wrap max-w-[960px]">
          <p className="text-[16px] leading-relaxed text-muted">
            {tr("Hai una domanda sulla privacy? Scrivici a {email}. Trovi tutti i dettagli nell'", { email: site.email })}
            <Link href={to("legalDoc", "privacy")} className="font-medium text-ink underline underline-offset-2">
              {tr("informativa privacy")}
            </Link>
            .
          </p>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
