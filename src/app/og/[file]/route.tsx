import fs from "node:fs";
import path from "node:path";
import { ImageResponse } from "next/og";
import { featureById } from "@/content";

/*
 * Immagini di anteprima (WhatsApp, social) delle pagine che ne hanno una propria,
 * generate a ogni build: /og/lista-ordini-it.png e /og/lista-ordini-en.png.
 */
export const dynamic = "force-static";
export const dynamicParams = false;

const PAGINE = ["lista-ordini"] as const;
const LINGUE = ["it", "en"] as const;

export function generateStaticParams() {
  return PAGINE.flatMap((p) => LINGUE.map((l) => ({ file: `${p}-${l}.png` })));
}

const font = (peso: string) => fs.readFileSync(path.join(process.cwd(), `node_modules/geist/dist/fonts/geist-sans/Geist-${peso}.ttf`));

const righe = [
  ["Farina tipo 00", "Flour type 00", "3"],
  ["Mozzarella fior di latte", "Fior di latte mozzarella", "12 kg"],
  ["Pomodoro pelato", "Peeled tomatoes", "2"],
  ["Olio extravergine", "Extra virgin olive oil", "6 l"],
  ["Lievito di birra", "Brewer's yeast", "4"],
  ["Basilico", "Basil", "3"],
  ["Detersivo piatti", "Washing-up liquid", "2"],
];

export async function GET(_req: Request, { params }: { params: Promise<{ file: string }> }) {
  const { file } = await params;
  const m = file.match(/^(.+)-(it|en)\.png$/);
  const f = m && featureById(m[1], m[2] as "it" | "en");
  if (!m || !f) return new Response("Not found", { status: 404 });
  const en = m[2] === "en";
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#fafaf8", fontFamily: "Geist", padding: 64, gap: 48 }}>
        <div style={{ display: "flex", flexDirection: "column", flex: 1, justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 44, height: 44, borderRadius: 11, background: "#0b0b0c", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                <div style={{ width: 20, height: 3, borderRadius: 2, background: "#fff" }} />
                <div style={{ width: 14, height: 3, borderRadius: 2, background: "#fff" }} />
                <div style={{ width: 17, height: 3, borderRadius: 2, background: "#fff" }} />
              </div>
            </div>
            <span style={{ fontSize: 30, fontWeight: 600, color: "#0b0b0c", letterSpacing: -1 }}>NovaMenu</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ display: "flex", alignSelf: "flex-start", background: "#9fe870", color: "#163300", fontSize: 24, fontWeight: 600, borderRadius: 999, padding: "6px 18px" }}>
              {f.name}
            </span>
            <span style={{ marginTop: 22, fontSize: 58, fontWeight: 600, color: "#0b0b0c", lineHeight: 1.05, letterSpacing: -2 }}>{f.hero.title}</span>
            <span style={{ marginTop: 18, fontSize: 26, color: "#52525b", lineHeight: 1.35 }}>{f.hero.lead}</span>
          </div>
          <span style={{ fontSize: 22, color: "#52525b" }}>{en ? "14-day free trial, no card needed" : "Prova gratis 14 giorni, senza carta"}</span>
        </div>
        <div style={{ width: 330, display: "flex", flexDirection: "column", background: "#fff", borderRadius: 10, padding: 26, boxShadow: "0 30px 60px -30px rgba(0,0,0,.35)", border: "1px solid #e7e7e4", transform: "rotate(2deg)" }}>
          <span style={{ fontSize: 22, fontWeight: 600, color: "#0b0b0c" }}>Pizzeria Fiore</span>
          <span style={{ fontSize: 14, color: "#52525b", marginTop: 4, paddingBottom: 10, borderBottom: "3px solid #b4532a" }}>
            {en ? "Supplier order, Tuesday 14 October" : "Ordine fornitori, martedì 14 ottobre"}
          </span>
          <span style={{ marginTop: 14, fontSize: 13, fontWeight: 600, color: "#fff", background: "#b4532a", borderRadius: 4, padding: "3px 8px" }}>
            {en ? "PIZZERIA" : "PIZZERIA"}
          </span>
          {righe.map(([it, eng, q]) => (
            <div key={it} style={{ display: "flex", alignItems: "center", gap: 8, padding: "9px 0", borderBottom: "1px dashed #d6d3d1", fontSize: 16 }}>
              <div style={{ width: 13, height: 13, border: "1.5px solid #a8a29e", borderRadius: 3 }} />
              <span style={{ flex: 1, color: "#0b0b0c" }}>{en ? eng : it}</span>
              <span style={{ fontWeight: 600, color: "#0b0b0c" }}>{q}</span>
            </div>
          ))}
          <span style={{ marginTop: "auto", fontSize: 12, color: "#52525b" }}>{en ? "Reviewed and confirmed by Giulia" : "Revisionato e confermato da Giulia"}</span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: "Geist", data: font("Regular"), weight: 400, style: "normal" },
        { name: "Geist", data: font("SemiBold"), weight: 600, style: "normal" },
      ],
    },
  );
}
