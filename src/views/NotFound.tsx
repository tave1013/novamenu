import { tr } from "@/i18n";
import Link from "next/link";
import { lp } from "@/i18n/link";

export default function NotFound() {
  return (
    <section className="py-28 md:py-40">
      <div className="wrap text-center">
        <p className="text-[15px] font-medium text-muted">{tr("Errore 404")}</p>
        <h1 className="display mx-auto mt-4 max-w-[760px]">{tr("Questa pagina non esiste.")}</h1>
        <p className="lead mx-auto mt-5 max-w-md">{tr("Forse il link è vecchio o c'è un errore di battitura. Riparti da qui:")}</p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href={lp("/")} className="btn btn-dark">{tr("Torna alla home")}</Link>
          <Link href={lp("/funzionalita/")} className="btn btn-light">{tr("Vedi le funzionalità")}</Link>
        </div>
      </div>
    </section>
  );
}
