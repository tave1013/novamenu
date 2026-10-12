import Link from "next/link";

export default function NotFound() {
  return (
    <section className="py-28 md:py-40">
      <div className="wrap text-center">
        <p className="text-[15px] font-medium text-muted">Errore 404</p>
        <h1 className="display mx-auto mt-4 max-w-[760px]">Questa pagina non esiste.</h1>
        <p className="lead mx-auto mt-5 max-w-md">Forse il link è vecchio o c&apos;è un errore di battitura. Riparti da qui:</p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/" className="btn btn-dark">Torna alla home</Link>
          <Link href="/funzionalita/" className="btn btn-light">Vedi le funzionalità</Link>
        </div>
      </div>
    </section>
  );
}
