"use client";

import type { VisualKey } from "@/content/features";
import { AiVisual, LingueVisual, MenuVisual, OrariVisual, PrenotazioniVisual } from "./VisualsA";
import {
  AssistenteVisual,
  AutomazioniVisual,
  ChiusureVisual,
  ClientiVisual,
  OrdiniVisual,
  SalaVisual,
  StaffVisual,
  StatisticheVisual,
} from "./VisualsB";
import { TelefonoLista } from "./ListaOrdini";

const map: Record<VisualKey, (p: { bare?: boolean }) => React.JSX.Element> = {
  menu: MenuVisual,
  ai: AiVisual,
  lingue: LingueVisual,
  orari: OrariVisual,
  prenotazioni: PrenotazioniVisual,
  sala: SalaVisual,
  chiusure: ChiusureVisual,
  ordini: OrdiniVisual,
  clienti: ClientiVisual,
  automazioni: AutomazioniVisual,
  statistiche: StatisticheVisual,
  staff: StaffVisual,
  assistente: AssistenteVisual,
  listaOrdini: () => <div className="flex justify-center"><TelefonoLista /></div>,
};

export function FeatureVisual({ k }: { k: VisualKey }) {
  const C = map[k];
  return <C />;
}
