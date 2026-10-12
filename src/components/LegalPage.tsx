import { site } from "@/config/site";
import { Breadcrumbs } from "./ui";

export function LegalPage({ title, slug, updated, html }: { title: string; slug: string; updated: string; html: string }) {
  const body = html
    .replaceAll("{{brand}}", site.name)
    .replaceAll("{{company}}", site.company.legalName)
    .replaceAll("{{vat}}", site.company.vat)
    .replaceAll("{{address}}", site.company.address)
    .replaceAll("{{pec}}", site.company.pec)
    .replaceAll("{{email}}", site.email)
    .replaceAll("{{url}}", site.url);
  return (
    <section className="pb-20 pt-8 md:pb-28 md:pt-12">
      <div className="wrap">
        <Breadcrumbs items={[{ name: title, href: `/${slug}/` }]} />
        <div className="mx-auto mt-10 max-w-[760px]">
          <h1 className="text-[clamp(2.2rem,1.6rem+2.4vw,3.5rem)] font-semibold leading-[1.12] md:leading-[1.04] tracking-[-0.04em]">{title}</h1>
          <p className="mt-4 text-[14px] text-muted">Ultimo aggiornamento: {updated}</p>
          <div className="prose-legal mt-8 border-t border-line pt-2" dangerouslySetInnerHTML={{ __html: body }} />
        </div>
      </div>
    </section>
  );
}
