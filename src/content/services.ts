import type { IconName } from "@/components/Icon";
import { withId } from "./util";

export type Service = { id: string; slug: string; name: string; icon: IconName; desc: string };

export const services: Service[] = withId<Service>([
  { slug: "foto-e-video", name: "Foto e video", icon: "camera", desc: "Piatti, locale e video per i social" },
  { slug: "presenza-online", name: "Presenza online", icon: "globe", desc: "Google, TripAdvisor e i tuoi canali" },
]);
