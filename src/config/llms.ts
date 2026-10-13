import { site } from "./site";
import { features, featureGroups } from "@/content/features";
import { sectors } from "@/content/sectors";
import { guides } from "@/content/guides";
import { annualMonthly, fmtEuro, generalFaq, plans } from "@/content/plans";

const u = (path: string) => `${site.url}${path}`;

const intro = [
  `# ${site.name}`,
  "",
  `> ${site.name} è una piattaforma italiana per piccoli locali della ristorazione: menu digitale con QR, ordini da asporto su WhatsApp e prenotazioni dei tavoli online. Il locale paga solo l'abbonamento, senza commissioni su ordini e prenotazioni. Si prova gratis per 14 giorni, senza carta di credito.`,
  "",
  "## Per chi è",
  "",
  `Per chi gestisce un locale e ha poco tempo: ${sectors.map((s) => s.name.toLowerCase()).join(", ")}.`,
];

const prices = [
  "## Prezzi",
  "",
  ...plans.map(
    (p) =>
      `- Piano ${p.name}: ${p.monthly} € al mese, oppure ${p.monthly * 10} € all'anno (2 mesi gratis, pari a ${fmtEuro(annualMonthly(p.monthly))} € al mese). Prezzi IVA esclusa. ${p.desc} Include: ${p.highlights.join(", ")}.`
  ),
  "- Commissioni su ordini e prenotazioni: 0% in tutti i piani.",
  "- Prova gratuita: 14 giorni con le funzioni del piano Pro, senza carta di credito.",
  "- Con il piano mensile si disdice quando si vuole.",
  `- Dettagli: ${u("/prezzi/")}`,
];

/** Indice breve del sito per i motori basati su intelligenza artificiale (llms.txt). */
export function llmsTxt() {
  return [
    ...intro,
    "",
    "## Funzioni principali",
    "",
    ...features.map((f) => `- [${f.name}](${u(`/funzionalita/${f.slug}/`)}): ${f.seo.description.split(". ")[0]}. Dal piano ${f.plan}.`),
    "",
    ...prices,
    "",
    "## Settori",
    "",
    ...sectors.map((s) => `- [${s.name}](${u(`/settori/${s.slug}/`)}): ${s.seo.description.split(". ")[0]}.`),
    "",
    "## Guide",
    "",
    ...guides.map((g) => `- [${g.title}](${u(`/guide/${g.slug}/`)}): ${g.description}`),
    "",
    "## Altre pagine",
    "",
    `- [Tutte le funzionalità](${u("/funzionalita/")}): l'elenco completo, diviso per gruppo.`,
    `- [Prenota una demo](${u("/demo/")}): 20 minuti in videochiamata o al telefono, sul menu vero del locale.`,
    `- [Contatti](${u("/contatti/")}): WhatsApp ed email, risposta in italiano.`,
    `- [Versione estesa di questo file](${u("/llms-full.txt")}): i testi principali in Markdown.`,
    "",
  ].join("\n");
}

/** Testi principali del sito in Markdown (llms-full.txt). */
export function llmsFullTxt() {
  const out: string[] = [...intro, "", ...prices, "", "# Funzionalità", ""];
  for (const g of featureGroups) {
    for (const f of features.filter((x) => x.group === g)) {
      out.push(`## ${f.name}`, "", `Pagina: ${u(`/funzionalita/${f.slug}/`)}. Gruppo: ${g}. Disponibile dal piano ${f.plan}.`, "", f.hero.lead, "");
      out.push("Come funziona:", ...f.steps.map((s, i) => `${i + 1}. ${s.title}: ${s.text}`), "");
      for (const s of f.sections) out.push(`### ${s.title}`, "", s.text, "", ...s.points.map((p) => `- ${p}`), "");
      out.push("Domande frequenti:", "", ...f.faq.flatMap((q) => [`**${q.q}**`, q.a, ""]));
    }
  }
  out.push("# Settori", "");
  for (const s of sectors) {
    out.push(`## ${s.name}`, "", `Pagina: ${u(`/settori/${s.slug}/`)}.`, "", s.hero.lead, "");
    for (const b of s.showcase) out.push(`### ${b.title}`, "", b.text, "", ...b.points.map((p) => `- ${p}`), "");
    out.push("Domande frequenti:", "", ...s.faq.flatMap((q) => [`**${q.q}**`, q.a, ""]));
  }
  out.push("# Domande frequenti generali", "", ...generalFaq.flatMap((q) => [`**${q.q}**`, q.a, ""]));
  return out.join("\n");
}
