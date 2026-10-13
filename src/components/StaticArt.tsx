import { tr } from "@/i18n";
import type { Feature } from "@/content/features";
import { Icon, IconTile, type IconName } from "./Icon";

/** Sfumature pastello per ogni colore delle funzionalità. */
export const toneGlow: Record<string, string> = {
  green: "radial-gradient(70% 60% at 20% 10%, #dcfce7 0%, transparent 70%), radial-gradient(60% 60% at 90% 90%, #e0f2fe 0%, transparent 70%)",
  blue: "radial-gradient(70% 60% at 20% 10%, #dbeafe 0%, transparent 70%), radial-gradient(60% 60% at 90% 90%, #e0e7ff 0%, transparent 70%)",
  pink: "radial-gradient(70% 60% at 20% 10%, #fce7f3 0%, transparent 70%), radial-gradient(60% 60% at 90% 90%, #ffedd5 0%, transparent 70%)",
  amber: "radial-gradient(70% 60% at 20% 10%, #fef3c7 0%, transparent 70%), radial-gradient(60% 60% at 90% 90%, #fee2e2 0%, transparent 70%)",
  violet: "radial-gradient(70% 60% at 20% 10%, #e0e7ff 0%, transparent 70%), radial-gradient(60% 60% at 90% 90%, #fce7f3 0%, transparent 70%)",
  orange: "radial-gradient(70% 60% at 20% 10%, #ffedd5 0%, transparent 70%), radial-gradient(60% 60% at 90% 90%, #fef3c7 0%, transparent 70%)",
  red: "radial-gradient(70% 60% at 20% 10%, #fee2e2 0%, transparent 70%), radial-gradient(60% 60% at 90% 90%, #ffedd5 0%, transparent 70%)",
  grey: "radial-gradient(70% 60% at 20% 10%, #ececf0 0%, transparent 70%), radial-gradient(60% 60% at 90% 90%, #dcfce7 0%, transparent 70%)",
};

/**
 * Grafica statica: una scheda dell'app con le voci della funzione, una notifica e un'etichetta che fluttuano attorno.
 * Non si muove: serve ad alternare le sezioni animate.
 */
export function FeatureComposite({
  feature,
  title,
  points,
  note,
}: {
  feature: Feature;
  title: string;
  points: string[];
  note: { title: string; text: string };
}) {
  return (
    <div className="relative overflow-hidden rounded-[24px] border border-line bg-white px-5 pb-16 pt-14 md:px-10 md:pb-20 md:pt-28" style={{ backgroundImage: toneGlow[feature.tone] }}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          backgroundImage: "radial-gradient(rgba(11,11,12,.07) 1px, transparent 1px)",
          backgroundSize: "18px 18px",
          maskImage: "linear-gradient(180deg,#000,transparent 85%)",
          WebkitMaskImage: "linear-gradient(180deg,#000,transparent 85%)",
        }}
      />
      <div className="relative mx-auto max-w-[400px] rounded-[18px] border border-line bg-white shadow-[0_30px_60px_-35px_rgba(0,0,0,.35)]">
        <div className="flex items-center gap-3 border-b border-line-soft px-4 py-3.5">
          <IconTile name={feature.icon} tone={feature.tone} size={34} radius={9} />
          <span className="min-w-0 flex-1">
            <span className="block text-[14px] font-semibold leading-tight text-ink">{feature.name}</span>
            <span className="block text-[12px] text-muted">{title.length > 34 ? tr("Impostazioni") : title}</span>
          </span>
          <span className="flex flex-none items-center gap-1.5 rounded-full bg-p-green px-2 py-0.5 text-[11.5px] font-medium text-p-green-ink">
            <span className="h-1.5 w-1.5 rounded-full bg-[#16a34a]" />
            {tr("Attivo")}
          </span>
        </div>
        <ul className="px-4 py-1.5">
          {points.slice(0, 4).map((p) => (
            <li key={p} className="flex items-center gap-3 border-b border-line-soft py-3 text-[13px] leading-snug text-text last:border-0">
              <span className="min-w-0 flex-1">{p}</span>
              <span data-on="true" className="toggle toggle-sm" />
            </li>
          ))}
        </ul>
      </div>

      <div className="relative mx-auto mt-3 flex max-w-[400px] justify-end md:absolute md:right-5 md:top-5 md:mt-0">
        <div className="flex max-w-[230px] items-center gap-2.5 rounded-[14px] border border-line bg-white px-3 py-2.5 shadow-[0_18px_40px_-24px_rgba(0,0,0,.3)]">
          <span className="flex h-8 w-8 flex-none items-center justify-center rounded-[9px] bg-ink text-white">
            <Icon name="bolt" size={15} stroke={2} />
          </span>
          <span className="min-w-0 text-[12px] leading-[1.35]">
            <span className="block font-semibold text-ink">{note.title}</span>
            <span className="block text-[#71717a]">{note.text}</span>
          </span>
        </div>
      </div>

      <div className="relative mx-auto mt-3 flex max-w-[400px] md:absolute md:bottom-5 md:left-5 md:mt-0">
        <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3 py-1.5 text-[12px] font-medium text-ink shadow-[0_12px_30px_-20px_rgba(0,0,0,.3)]">
          <Icon name="check" size={13} stroke={2.6} className="text-[#16a34a]" />
          {tr("Dal piano")}{" "}{feature.plan}{tr(", senza commissioni")}
        </span>
      </div>
    </div>
  );
}

/** Icone per i box dei vantaggi, in ordine. */
export const benefitIcons: IconName[] = ["bolt", "euro", "users", "shield", "clock", "star"];
