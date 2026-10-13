import type { Metadata } from "next";
import { comparison, generalFaq, plans } from "@/content/plans";
import { signupUrl } from "@/config/site";
import { Icon } from "@/components/Icon";
import { Breadcrumbs, CtaBand, Faq, JsonLd } from "@/components/ui";
import { pageMeta, softwareApplicationLd } from "@/config/seo";
import { Pricing } from "@/components/Pricing";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = pageMeta({
  title: "Prezzi: da 19 euro al mese, senza commissioni",
  description:
    "Prezzi del menu digitale NovaMenu: Base 19 €, Pro 39 € e Premium 69 € al mese. Nessuna commissione sugli ordini. Prova gratis 14 giorni, disdici quando vuoi.",
  path: "/prezzi/",
});

function Cell({ v }: { v: boolean | string }) {
  if (v === true)
    return (
      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-p-green text-p-green-ink">
        <Icon name="check" size={14} stroke={2.6} title="Incluso" />
      </span>
    );
  if (v === false)
    return (
      <span className="inline-flex h-6 w-6 items-center justify-center text-[#c7c7cc]">
        <Icon name="minus" size={16} stroke={2} title="Non incluso" />
      </span>
    );
  return <span className="text-[14px] text-text">{v}</span>;
}

export default function PrezziPage() {
  return (
    <>
      <JsonLd data={softwareApplicationLd()} />
      <section className="pb-20 pt-8 md:pb-28 md:pt-12">
        <div className="wrap">
          <Breadcrumbs items={[{ name: "Prezzi", href: "/prezzi/" }]} />
          <div className="mx-auto mt-10 max-w-3xl text-center">
            <h1 className="display anim-fade-up">Un abbonamento. <span className="hl">Zero commissioni</span>.</h1>
            <p className="lead anim-fade-up mx-auto mt-6 max-w-[600px]" style={{ animationDelay: "80ms" }}>
              Scegli il piano per come lavori oggi e cambialo quando vuoi. Tutti i piani partono con 14 giorni gratis, senza carta di credito.
            </p>
          </div>
          <div className="anim-fade-up mt-12" style={{ animationDelay: "140ms" }}>
            <Pricing />
          </div>
        </div>
      </section>

      <section className="bg-mist py-20 md:py-28">
        <div className="wrap">
          <Reveal className="max-w-2xl">
            <h2 className="h-section">Confronta i piani</h2>
            <p className="lead mt-4">Tutto quello che è incluso, voce per voce.</p>
          </Reveal>
          <div className="mt-10 overflow-x-auto rounded-[20px] border border-line bg-white">
            <table className="w-full min-w-[640px] border-collapse text-left">
              <thead className="sticky top-0">
                <tr className="border-b border-line">
                  <th scope="col" className="w-[40%] p-5 text-[14px] font-medium text-muted">
                    <span className="sr-only">Funzione</span>
                  </th>
                  {plans.map((p) => (
                    <th key={p.id} scope="col" className="p-5 text-center">
                      <span className="block text-[17px] font-semibold text-ink">{p.name}</span>
                      <span className="block text-[13px] font-normal text-muted">{p.monthly} € al mese</span>
                    </th>
                  ))}
                </tr>
              </thead>
              {comparison.map((g) => (
                <tbody key={g.group}>
                  <tr>
                    <th colSpan={4} scope="colgroup" className="bg-mist/60 px-5 py-3 text-[13.5px] font-semibold text-ink">
                      {g.group}
                    </th>
                  </tr>
                  {g.rows.map((r) => (
                    <tr key={r.label} className="border-t border-line-soft">
                      <th scope="row" className="px-5 py-4 text-[15px] font-normal text-text">
                        {r.label}
                      </th>
                      <td className="px-5 py-4 text-center">
                        <Cell v={r.base} />
                      </td>
                      <td className="px-5 py-4 text-center">
                        <Cell v={r.pro} />
                      </td>
                      <td className="px-5 py-4 text-center">
                        <Cell v={r.premium} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              ))}
              <tfoot>
                <tr className="border-t border-line">
                  <td className="p-5" />
                  {plans.map((p) => (
                    <td key={p.id} className="p-5 text-center">
                      <a href={`${signupUrl}?piano=${p.id}`} className={`btn btn-sm ${p.popular ? "btn-dark" : "btn-light"}`}>
                        Prova {p.name}
                      </a>
                    </td>
                  ))}
                </tr>
              </tfoot>
            </table>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              { t: "Prova gratuita", d: "14 giorni con tutte le funzioni del piano Pro. Non chiediamo la carta di credito." },
              { t: "Nessun vincolo", d: "Con il piano mensile disdici quando vuoi, in tre passaggi dalla dashboard." },
              { t: "Messaggi WhatsApp", d: "Alcuni messaggi hanno un costo fissato da Meta, di pochi centesimi. Lo vedi prima di ogni invio." },
            ].map((x) => (
              <div key={x.t} className="border-t border-black pt-5">
                <h3 className="text-[18px] font-semibold tracking-[-0.02em]">{x.t}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{x.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Faq items={generalFaq} />
      <CtaBand />
    </>
  );
}
