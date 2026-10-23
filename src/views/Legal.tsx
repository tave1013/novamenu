import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui";
import { BloccoStampa } from "@/components/legal/BloccoStampa";
import { pageMeta } from "@/config/seo";
import { getLocale, t, tr } from "@/i18n";
import type { Locale } from "@/i18n/config";
import { localizeLinks, to } from "@/i18n/link";
import { idOf, slugOf } from "@/i18n/routes";
import { DOCUMENTI_PDF, rigaVersione, urlPdf, type DocumentoPdf } from "@/lib/legal/pdf";
import { ModuloRichiestaPrivacy } from "@/components/legal/ModuloRichiestaPrivacy";
import { emailPrivacy } from "@/lib/legal/azienda";
import { documentiVisibili, leggiArchiviato, leggiDocumento, versioniArchiviate, type IdDocumento, type MetaDocumento } from "@/lib/legal/documenti";

/* Sezione Legale: indice (/legale/), un documento per pagina (/legale/<documento>/) e archivio. */

const NOTA_EN =
  "This English version is provided for convenience. In case of conflict, the Italian version prevails, except for customers established in the United Kingdom, for whom the English version prevails.";

export const staticParams = (locale: Locale) => documentiVisibili().map((id) => ({ slug: slugOf("legalDoc", id, locale) }));
export const staticParamsArchivio = (locale: Locale) => versioniArchiviate(locale).map((v) => ({ file: v.file.replace(/\.md$/, "") }));
const docId = (locale: Locale, slug: string) => idOf("legalDoc", slug, locale) as IdDocumento;

export function metaDoc(locale: Locale, slug: string): Metadata {
  const id = docId(locale, slug);
  const { meta } = leggiDocumento(id, locale);
  return pageMeta({ locale, page: "legalDoc", id, title: meta.etichetta, description: meta.descrizione });
}

export function metaIndice(locale: Locale): Metadata {
  const { meta } = leggiDocumento("indice", locale);
  return pageMeta({ locale, page: "legal", title: meta.titolo, description: meta.descrizione });
}

export function metaArchivio(locale: Locale): Metadata {
  return pageMeta({
    locale,
    page: "legalArchive",
    title: t(locale, "Versioni dei documenti"),
    description: t(locale, "Versione in vigore e versioni precedenti dei documenti legali di NovaMenu: informative privacy, cookie policy, termini di servizio e accordo sul trattamento dei dati."),
  });
}

function Intestazione({ titolo, meta, pdf }: { titolo: string; meta?: MetaDocumento; pdf?: string }) {
  return (
    <header>
      <h1 className="text-[clamp(2rem,1.5rem+2vw,3rem)] font-semibold leading-[1.1] tracking-[-0.035em]">{titolo}</h1>
      {meta?.versione && <p className="mt-4 text-[15px] font-medium text-text">{rigaVersione(meta, getLocale())}</p>}
      {pdf && (
        <a href={pdf} download className="mt-1.5 inline-flex min-h-8 items-center gap-1.5 text-[14px] font-medium text-ink underline underline-offset-4 decoration-line hover:decoration-ink">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 4v11M7 10l5 5 5-5M5 20h14" />
          </svg>
          {tr("Scarica PDF")}
        </a>
      )}
    </header>
  );
}

/**
 * Fine di ogni pagina legale: nella versione inglese la nota sulla versione che prevale,
 * il blocco di Ctrl+P / Cmd+P e il messaggio che compare al posto della pagina se la si stampa.
 */
function Chiusura() {
  return (
    <>
      {getLocale() === "en" && <p className="mt-10 text-[15px] leading-relaxed text-muted">{NOTA_EN}</p>}
      <BloccoStampa />
    </>
  );
}

function MessaggioStampa() {
  return <p className="stampa-non-disponibile">{tr("La stampa di questa pagina non è disponibile. Puoi consultare i documenti su {indirizzo}.", { indirizzo: getLocale() === "en" ? "novamenu.eu/en/legal" : "novamenu.eu/legale" })}</p>;
}

/** Link a tutti gli altri documenti legali, in fondo a ogni pagina. */
function AltriDocumenti({ corrente }: { corrente?: IdDocumento }) {
  const locale = getLocale();
  return (
    <nav aria-labelledby="altri-documenti" className="mt-16 border-t border-line pt-8">
      <h2 id="altri-documenti" className="text-[17px] font-semibold tracking-[-0.01em]">
        {tr("Altri documenti legali")}
      </h2>
      <ul className="mt-4 grid gap-x-8 gap-y-1 sm:grid-cols-2">
        <li>
          <Link href={to("legal")} className="inline-flex min-h-10 items-center text-[15.5px] text-ink underline underline-offset-4 decoration-line hover:decoration-ink">
            {tr("Indice dei documenti legali")}
          </Link>
        </li>
        {documentiVisibili().filter((d) => d !== corrente).map((d) => (
          <li key={d}>
            <Link href={to("legalDoc", d)} className="inline-flex min-h-10 items-center text-[15.5px] text-ink underline underline-offset-4 decoration-line hover:decoration-ink">
              {leggiDocumento(d, locale).meta.etichetta}
            </Link>
          </li>
        ))}
        <li>
          <Link href={to("legalArchive")} className="inline-flex min-h-10 items-center text-[15.5px] text-ink underline underline-offset-4 decoration-line hover:decoration-ink">
            {tr("Versioni dei documenti")}
          </Link>
        </li>
      </ul>
    </nav>
  );
}

function Indice({ sezioni, mobile }: { sezioni: { id: string; titolo: string }[]; mobile?: boolean }) {
  const voci = (
    <ol className="mt-3 flex flex-col gap-0.5">
      {sezioni.map((s) => (
        <li key={s.id}>
          <a href={`#${s.id}`} className="block rounded-lg px-2 py-1.5 text-[14.5px] leading-snug text-muted transition-colors hover:bg-mist hover:text-ink">
            {s.titolo}
          </a>
        </li>
      ))}
    </ol>
  );
  if (mobile)
    return (
      <details className="mt-8 rounded-2xl border border-line bg-card px-4 py-3 lg:hidden">
        <summary className="flex min-h-10 cursor-pointer items-center text-[15px] font-semibold text-ink">{tr("Indice")}</summary>
        <nav aria-label={tr("Indice")}>{voci}</nav>
      </details>
    );
  return (
    <aside className="hidden lg:block">
      <nav aria-label={tr("Indice")} className="sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto pr-2">
        <p className="eyebrow">{tr("Indice")}</p>
        {voci}
      </nav>
    </aside>
  );
}

export function LegalDocView({ slug }: { slug: string }) {
  const locale = getLocale();
  const id = docId(locale, slug);
  const doc = leggiDocumento(id, locale);
  const conIndice = doc.sezioni.length > 2;
  return (
    <section className="legal-page pb-20 pt-8 md:pb-28 md:pt-12">
      <MessaggioStampa />
      <div className="wrap">
        <Breadcrumbs items={[{ name: tr("Legale"), href: to("legal") }, { name: doc.meta.etichetta, href: to("legalDoc", id) }]} />
        <div className={`mt-10 ${conIndice ? "lg:grid lg:grid-cols-[230px_minmax(0,720px)] lg:justify-center lg:gap-14" : ""}`}>
          {conIndice && <Indice sezioni={doc.sezioni} />}
          <article className={conIndice ? "min-w-0" : "mx-auto max-w-[720px]"}>
            <Intestazione
              titolo={doc.meta.titolo}
              meta={doc.meta}
              pdf={(DOCUMENTI_PDF as string[]).includes(id) ? urlPdf(id as DocumentoPdf, locale, doc.meta.versione) : undefined}
            />
            {conIndice && <Indice sezioni={doc.sezioni} mobile />}
            <div className="prose-legal mt-8 border-t border-line pt-2" dangerouslySetInnerHTML={{ __html: localizeLinks(doc.html) }} />
            <AltriDocumenti corrente={id} />
            <Chiusura />
          </article>
        </div>
      </div>
    </section>
  );
}

export function LegalIndexView() {
  const doc = leggiDocumento("indice", getLocale());
  return (
    <section className="legal-page pb-20 pt-8 md:pb-28 md:pt-12">
      <MessaggioStampa />
      <div className="wrap">
        <Breadcrumbs items={[{ name: tr("Legale"), href: to("legal") }]} />
        <article className="mx-auto mt-10 max-w-[720px]">
          <Intestazione titolo={doc.meta.titolo} meta={doc.meta} />
          <div className="prose-legal mt-8 border-t border-line pt-2" dangerouslySetInnerHTML={{ __html: localizeLinks(doc.html) }} />
          <Chiusura />
        </article>
      </div>
    </section>
  );
}

/** Versioni dei documenti: per ognuno la versione in vigore e quelle precedenti, consultabili. */
export function LegalArchiveView() {
  const locale = getLocale();
  const archivio = versioniArchiviate(locale);
  return (
    <section className="legal-page pb-20 pt-8 md:pb-28 md:pt-12">
      <MessaggioStampa />
      <div className="wrap">
        <Breadcrumbs items={[{ name: tr("Legale"), href: to("legal") }, { name: tr("Versioni dei documenti"), href: to("legalArchive") }]} />
        <article className="mx-auto mt-10 max-w-[720px]">
          <Intestazione titolo={tr("Versioni dei documenti")} />
          <div className="prose-legal mt-8 border-t border-line pt-2">
            <p>{tr("Per ogni documento trovi la versione in vigore e le versioni precedenti, con il periodo in cui sono state in vigore.")}</p>
            {documentiVisibili().map((d) => {
              const { meta } = leggiDocumento(d, locale);
              const precedenti = archivio.filter((v) => v.documento === d);
              return (
                <div key={d}>
                  <h2 id={d}>{meta.etichetta}</h2>
                  <p>
                    <strong>{tr("In vigore")}:</strong> <Link href={to("legalDoc", d)}>{rigaVersione(meta, locale)}</Link>
                    {(DOCUMENTI_PDF as string[]).includes(d) && (
                      <>
                        {" "}(<a href={urlPdf(d as DocumentoPdf, locale, meta.versione)} download>{tr("Scarica PDF")}</a>)
                      </>
                    )}
                  </p>
                  {precedenti.length === 0 ? (
                    <p>{tr("Versioni precedenti: nessuna, questa è la prima versione.")}</p>
                  ) : (
                    <ul>
                      {precedenti.map((v) => (
                        <li key={v.file}>
                          <Link href={`${to("legalArchive")}${v.file.replace(/\.md$/, "")}/`}>{rigaVersione(v.meta, locale)}</Link>
                          {(DOCUMENTI_PDF as string[]).includes(v.documento) && (
                            <>
                              {" "}(<a href={urlPdf(v.documento as DocumentoPdf, locale, v.versione)} download>{tr("Scarica PDF")}</a>)
                            </>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
          <AltriDocumenti />
          <Chiusura />
        </article>
      </div>
    </section>
  );
}

/** Una versione precedente di un documento, consultabile com'era. */
export function LegalArchivedView({ file }: { file: string }) {
  const locale = getLocale();
  const doc = leggiArchiviato(file, locale);
  if (!doc) return null;
  return (
    <section className="legal-page pb-20 pt-8 md:pb-28 md:pt-12">
      <MessaggioStampa />
      <div className="wrap">
        <Breadcrumbs items={[{ name: tr("Legale"), href: to("legal") }, { name: tr("Versioni dei documenti"), href: to("legalArchive") }, { name: `${doc.meta.etichetta} ${doc.meta.versione}`, href: `${to("legalArchive")}${file}/` }]} />
        <article className="mx-auto mt-10 max-w-[720px]">
          <p className="mb-4 rounded-xl border border-line bg-card px-4 py-3 text-[15px]">
            {tr("Questa versione non è più in vigore.")} <Link href={to("legalDoc", doc.documento)}>{tr("Leggi la versione in vigore")}</Link>
          </p>
          <Intestazione titolo={doc.meta.titolo} meta={doc.meta} />
          <div className="prose-legal mt-8 border-t border-line pt-2" dangerouslySetInnerHTML={{ __html: localizeLinks(doc.html) }} />
          <Chiusura />
        </article>
      </div>
    </section>
  );
}

export function metaRichieste(locale: Locale): Metadata {
  return pageMeta({
    locale,
    page: "legalRequests",
    title: t(locale, "Richieste privacy"),
    description: t(locale, "Chiedi a NovaMenu accesso, correzione, cancellazione, opposizione o portabilità dei tuoi dati personali. Ti rispondiamo entro 30 giorni."),
  });
}

/** Richieste privacy: modulo per esercitare i diritti. Si pubblica solo quando c'è l'email privacy. */
export function LegalRequestsView() {
  const locale = getLocale();
  return (
    <section className="legal-page pb-20 pt-8 md:pb-28 md:pt-12">
      <MessaggioStampa />
      <div className="wrap">
        <Breadcrumbs items={[{ name: tr("Legale"), href: to("legal") }, { name: tr("Richieste privacy"), href: to("legalRequests") }]} />
        <article className="mx-auto mt-10 max-w-[720px]">
          <Intestazione titolo={tr("Richieste privacy")} />
          <div className="prose-legal mt-8 border-t border-line pt-2">
            <p>
              {tr("Con questo modulo puoi chiederci di accedere ai tuoi dati, correggerli, cancellarli, opporti a un trattamento o riceverli in un file. Ti rispondiamo entro 30 giorni. Potremmo chiederti informazioni per verificare la tua identità.")}
            </p>
            <p>
              {tr("Se sei cliente di un ristorante e la richiesta riguarda i dati che hai lasciato al ristorante, indica quale: inoltriamo la richiesta al locale, che è il titolare di quei dati.")}{" "}
              <Link href={to("legalDoc", "privacy")}>{tr("Informativa privacy")}</Link>
            </p>
            <ModuloRichiestaPrivacy emailPrivacy={emailPrivacy()} />
            <p className="mt-6">{tr("Puoi anche scriverci a {email}.", { email: emailPrivacy() })}</p>
          </div>
          <AltriDocumenti />
          <Chiusura />
        </article>
      </div>
    </section>
  );
}
