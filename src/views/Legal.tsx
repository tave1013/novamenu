import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui";
import { StampaButton } from "@/components/legal/StampaButton";
import { pageMeta } from "@/config/seo";
import { getLocale, t, tr } from "@/i18n";
import { localeInfo, locales, type Locale } from "@/i18n/config";
import { localizeLinks, to } from "@/i18n/link";
import { href, idOf, slugOf, type PageKey } from "@/i18n/routes";
import { AZIENDA } from "@/lib/legal/azienda";
import { DOCUMENTI, leggiDocumento, versioniArchiviate, type IdDocumento } from "@/lib/legal/documenti";

/* Sezione Legale: indice (/legale/), un documento per pagina (/legale/<documento>/) e archivio. */

const NOTA_EN =
  "This English version is provided for convenience. In case of conflict, the Italian version prevails, except for customers established in the United Kingdom, for whom the English version prevails.";

export const staticParams = (locale: Locale) => DOCUMENTI.map((id) => ({ slug: slugOf("legalDoc", id, locale) }));
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
    title: t(locale, "Archivio dei documenti legali"),
    description: t(locale, "Versioni precedenti dei documenti legali di NovaMenu: informative privacy, cookie policy, termini di servizio e accordo sul trattamento dei dati."),
  });
}

/** Selettore Italiano / English della pagina. */
function Lingue({ page, id }: { page: PageKey; id?: string }) {
  const corrente = getLocale();
  return (
    <nav aria-label={tr("Lingua del documento")} data-no-print className="inline-flex rounded-xl bg-mist p-1 text-[14px]">
      {locales.map((l) => (
        <a
          key={l}
          href={href(page, l, id)}
          hrefLang={localeInfo[l].hreflang}
          lang={localeInfo[l].hreflang}
          aria-current={l === corrente ? "true" : undefined}
          className={`inline-flex min-h-9 items-center rounded-lg px-3 font-medium transition-colors ${l === corrente ? "bg-card text-ink shadow-[0_1px_2px_rgba(0,0,0,.08)]" : "text-muted hover:text-ink"}`}
        >
          {localeInfo[l].name}
        </a>
      ))}
    </nav>
  );
}

function Intestazione({ titolo, versione, dataInVigore, page, id }: { titolo: string; versione?: string; dataInVigore?: string; page: PageKey; id?: string }) {
  const locale = getLocale();
  return (
    <header>
      <h1 className="text-[clamp(2rem,1.5rem+2vw,3rem)] font-semibold leading-[1.1] tracking-[-0.035em]">{titolo}</h1>
      {versione && (
        <p className="mt-4 text-[15px] font-medium text-text">{tr("Versione {v}, in vigore dal {data}", { v: versione, data: dataInVigore ?? "" })}</p>
      )}
      <p className="mt-1 text-[15px] text-muted">{tr("Ultimo aggiornamento: {data}", { data: AZIENDA.ultimoAggiornamento })}</p>
      <div className="mt-6 flex flex-wrap items-center gap-3" data-no-print>
        <Lingue page={page} id={id} />
        {page === "legalDoc" && <StampaButton label={tr("Stampa o salva in PDF")} />}
      </div>
      {locale === "en" && (
        <p className="mt-6 rounded-2xl border border-line bg-mist px-5 py-4 text-[15px] leading-relaxed text-text">{NOTA_EN}</p>
      )}
    </header>
  );
}

/** Link a tutti gli altri documenti legali, in fondo a ogni pagina. */
function AltriDocumenti({ corrente }: { corrente?: IdDocumento }) {
  const locale = getLocale();
  return (
    <nav aria-labelledby="altri-documenti" data-no-print className="mt-16 border-t border-line pt-8">
      <h2 id="altri-documenti" className="text-[17px] font-semibold tracking-[-0.01em]">
        {tr("Altri documenti legali")}
      </h2>
      <ul className="mt-4 grid gap-x-8 gap-y-1 sm:grid-cols-2">
        <li>
          <Link href={to("legal")} className="inline-flex min-h-10 items-center text-[15.5px] text-ink underline underline-offset-4 decoration-line hover:decoration-ink">
            {tr("Indice dei documenti legali")}
          </Link>
        </li>
        {DOCUMENTI.filter((d) => d !== corrente).map((d) => (
          <li key={d}>
            <Link href={to("legalDoc", d)} className="inline-flex min-h-10 items-center text-[15.5px] text-ink underline underline-offset-4 decoration-line hover:decoration-ink">
              {leggiDocumento(d, locale).meta.etichetta}
            </Link>
          </li>
        ))}
        <li>
          <Link href={to("legalArchive")} className="inline-flex min-h-10 items-center text-[15.5px] text-ink underline underline-offset-4 decoration-line hover:decoration-ink">
            {tr("Archivio delle versioni precedenti")}
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
      <details className="mt-8 rounded-2xl border border-line bg-card px-4 py-3 lg:hidden" data-no-print>
        <summary className="flex min-h-10 cursor-pointer items-center text-[15px] font-semibold text-ink">{tr("Indice")}</summary>
        <nav aria-label={tr("Indice")}>{voci}</nav>
      </details>
    );
  return (
    <aside className="hidden lg:block" data-no-print>
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
      <div className="wrap">
        <div data-no-print>
          <Breadcrumbs items={[{ name: tr("Legale"), href: to("legal") }, { name: doc.meta.etichetta, href: to("legalDoc", id) }]} />
        </div>
        <div className={`legal-grid mt-10 ${conIndice ? "lg:grid lg:grid-cols-[230px_minmax(0,720px)] lg:justify-center lg:gap-14" : ""}`}>
          {conIndice && <Indice sezioni={doc.sezioni} />}
          <article className={conIndice ? "min-w-0" : "mx-auto max-w-[720px]"}>
            <Intestazione titolo={doc.meta.titolo} versione={doc.meta.versione} dataInVigore={doc.meta.dataInVigore} page="legalDoc" id={id} />
            {conIndice && <Indice sezioni={doc.sezioni} mobile />}
            <div className="prose-legal mt-8 border-t border-line pt-2" dangerouslySetInnerHTML={{ __html: localizeLinks(doc.html) }} />
            <AltriDocumenti corrente={id} />
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
      <div className="wrap">
        <div data-no-print>
          <Breadcrumbs items={[{ name: tr("Legale"), href: to("legal") }]} />
        </div>
        <article className="mx-auto mt-10 max-w-[720px]">
          <Intestazione titolo={doc.meta.titolo} versione={doc.meta.versione} dataInVigore={doc.meta.dataInVigore} page="legal" />
          <div className="prose-legal mt-8 border-t border-line pt-2" dangerouslySetInnerHTML={{ __html: localizeLinks(doc.html) }} />
        </article>
      </div>
    </section>
  );
}

export function LegalArchiveView() {
  const locale = getLocale();
  const versioni = versioniArchiviate(locale);
  return (
    <section className="legal-page pb-20 pt-8 md:pb-28 md:pt-12">
      <div className="wrap">
        <div data-no-print>
          <Breadcrumbs items={[{ name: tr("Legale"), href: to("legal") }, { name: tr("Archivio"), href: to("legalArchive") }]} />
        </div>
        <article className="mx-auto mt-10 max-w-[720px]">
          <Intestazione titolo={tr("Archivio dei documenti legali")} page="legalArchive" />
          <div className="prose-legal mt-8 border-t border-line pt-2">
            <p>{tr("Qui restano consultabili le versioni precedenti dei documenti legali, con il periodo in cui sono state in vigore.")}</p>
            {versioni.length === 0 ? (
              <p>{tr("Non ci sono ancora versioni precedenti: tutti i documenti sono alla prima versione ({v}).", { v: AZIENDA.versioneDocumenti })}</p>
            ) : (
              <ul>
                {versioni.map((v) => (
                  <li key={v.file}>
                    {v.meta.titolo}, {tr("versione")} {v.versione}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <AltriDocumenti />
        </article>
      </div>
    </section>
  );
}
