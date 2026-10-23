#!/usr/bin/env python3
"""
Confronto dei documenti legali per l'avvocato: per ogni documento cambiato rispetto a un ramo
(di solito main, cioè quello online) crea in docs/legale/ un file HTML con il testo prima e dopo,
le parti tolte in rosso barrato e quelle aggiunte in verde.

- I dati della società ({{numeroSocieta}} ecc.) sono scritti con i valori attuali, così il confronto
  mostra solo le modifiche al testo; i dati che mancano compaiono come «da fornire: ...».
- Le parti che il sito mostra solo quando c'è un dato ({{#se ...}}) restano visibili e segnalate.

Uso: python3 scripts/confronto-legale.py [ramo]      (predefinito: main)
"""
import difflib, html, re, subprocess, sys, pathlib, datetime

RAMO = sys.argv[1] if len(sys.argv) > 1 else "main"
RADICE = pathlib.Path(__file__).resolve().parent.parent
USCITA = RADICE / "docs" / "legale"
DOCUMENTI = ["note-legali", "privacy", "privacy-app", "cookie", "termini", "dpa", "fornitori", "indice"]
NOMI_PRIMA = {"fornitori": "sub-responsabili"}
TITOLI = {"note-legali": "Note legali", "privacy": "Informativa privacy", "privacy-app": "Informativa privacy dell'app",
          "cookie": "Cookie policy", "termini": "Termini e condizioni", "dpa": "Accordo sul trattamento dei dati (DPA)",
          "fornitori": "Fornitori (sub-responsabili)", "indice": "Indice dei documenti legali"}

VALORI = {
    "marchio": "NovaMenu", "ragioneSociale": "MA & CO LIMITED", "numeroSocieta": "09272992",
    "sedeLegale": "C/O Entwistle Chartered Accountants, Suite 12 Blackburn Business Centre, Davyfield Road, Blackburn, Lancashire, BB1 2QY, Regno Unito",
    "tipo": "private limited company costituita in Inghilterra e Galles", "Tipo": "Private limited company costituita in Inghilterra e Galles",
    "emailContatto": "info@novamenu.eu", "emailPrivacy": "info@novamenu.eu (finché non c'è l'email privacy)",
    "sito": "novamenu.eu", "piattaforma": "app.novamenu.eu", "giorniAnnullaEliminazione": "30",
    "tabellaCookie": "[tabella dei cookie, generata dall'elenco del sito]", "tabellaFornitori": "[tabella dei fornitori, dall'elenco della piattaforma]",
}
MANCANTI = {
    "numeroICO": "numero ICO", "registrazioneICO": "numero ICO", "partitaIva": "partita IVA / VAT", "rappresentanteUE": "nome e indirizzo del rappresentante UE",
    "emailRappresentanteUE": "email del rappresentante UE", "dataInVigore": "data di entrata in vigore", "versione": "versione",
    "strumentiStatistica": "strumenti di statistica attivi", "strumentiSito": "strumenti attivi sul sito",
}
CONDIZIONI = {
    "numeroICO": "numero ICO", "partitaIva": "partita IVA / VAT", "rappresentanteUE": "rappresentante UE", "emailRappresentanteUE": "email del rappresentante UE",
    "fornitori": "elenco dei fornitori pubblicato", "richiestePrivacy": "pagina Richieste privacy attiva (email privacy e server pronti)",
    "strumentiStatistica": "strumenti di statistica attivi (Google Analytics o Clarity)", "strumentiSito": "strumenti di statistica o marketing attivi",
    "ga4": "Google Analytics attivo", "clarity": "Microsoft Clarity attivo", "metaPixel": "Meta Pixel attivo",
}


def leggi(percorso: str, ramo: str | None) -> str:
    if ramo:
        r = subprocess.run(["git", "show", f"{ramo}:{percorso}"], cwd=RADICE, capture_output=True, text=True)
        return r.stdout if r.returncode == 0 else ""
    p = RADICE / percorso
    return p.read_text() if p.exists() else ""


def prepara(testo: str) -> str:
    testo = re.sub(r"^---\n.*?\n---\n", "", testo, flags=re.S)
    testo = re.sub(r"<!--.*?-->", "", testo, flags=re.S)
    testo = re.sub(r"\{\{#se ([\w ]+)\}\}", lambda m: "⟦solo con: " + ", ".join(CONDIZIONI.get(k, k) for k in m.group(1).split()) + "⟧ ", testo)
    testo = re.sub(r"\{\{#senza ([\w ]+)\}\}", lambda m: "⟦solo finché manca: " + ", ".join(CONDIZIONI.get(k, k) for k in m.group(1).split()) + "⟧ ", testo)
    testo = re.sub(r"\{\{/(se|senza)\}\}", " ⟦fine⟧", testo)
    testo = re.sub(r"\{\{(\w+)\}\}", lambda m: VALORI.get(m.group(1)) or f"«da fornire: {MANCANTI.get(m.group(1), m.group(1))}»", testo)
    testo = re.sub(r"\[([^\]]+)\]\((/[^)]*|mailto:[^)]*|https?://[^)]*)\)", r"\1", testo)  # link: resta il testo
    testo = testo.replace("**", "").replace("<br>", "")
    return testo


def parole(t: str) -> list[str]:
    return re.findall(r"\s+|[^\s]+", t)


def confronto_html(prima: str, dopo: str) -> str:
    a, b = parole(prima), parole(dopo)
    pezzi = []
    for op, i1, i2, j1, j2 in difflib.SequenceMatcher(None, a, b, autojunk=False).get_opcodes():
        if op == "equal":
            pezzi.append(html.escape("".join(a[i1:i2])))
        if op in ("delete", "replace"):
            pezzi.append(f"<del>{html.escape(''.join(a[i1:i2]))}</del>")
        if op in ("insert", "replace"):
            pezzi.append(f"<ins>{html.escape(''.join(b[j1:j2]))}</ins>")
    return "".join(pezzi)


STILE = """
body{font:16px/1.6 -apple-system,Segoe UI,Helvetica,Arial,sans-serif;max-width:900px;margin:32px auto;padding:0 16px;color:#111}
h1{font-size:24px;margin-bottom:4px} .nota{color:#555;font-size:14px}
pre{white-space:pre-wrap;font:inherit;border:1px solid #ddd;border-radius:10px;padding:16px;background:#fff}
del{background:#fde2e2;color:#9b1c1c;text-decoration:line-through} ins{background:#dcfce7;color:#14532d;text-decoration:none}
.legenda span{padding:1px 6px;border-radius:4px;margin-right:8px}
"""


def main() -> None:
    USCITA.mkdir(parents=True, exist_ok=True)
    creati = []
    for lingua in ("it", "en"):
        for doc in DOCUMENTI:
            prima_raw = leggi(f"src/content/legale/{lingua}/{NOMI_PRIMA.get(doc, doc)}.md", RAMO) or leggi(f"src/content/legale/{lingua}/{doc}.md", RAMO)
            dopo_raw = leggi(f"src/content/legale/{lingua}/{doc}.md", None)
            prima, dopo = prepara(prima_raw), prepara(dopo_raw)
            if prima == dopo:
                continue
            corpo = confronto_html(prima, dopo)
            nome = f"{doc}-{lingua}-modifiche.html"
            titolo = TITOLI[doc] + (" (inglese)" if lingua == "en" else "")
            (USCITA / nome).write_text(
                f"<!doctype html><html lang='{lingua}'><head><meta charset='utf-8'><meta name='viewport' content='width=device-width,initial-scale=1'>"
                f"<title>{html.escape(titolo)}: modifiche</title><style>{STILE}</style></head><body>"
                f"<h1>{html.escape(titolo)}: modifiche</h1>"
                f"<p class='nota'>Bozza per l'avvocato. Confronto tra la versione online (ramo {RAMO}) e la nuova versione, generato il {datetime.date.today().isoformat()}. "
                f"⟦solo con: ...⟧ indica le parti che il sito mostra solo quando c'è quel dato; ⟦solo finché manca: ...⟧ le parti che spariscono quando il dato arriva.</p>"
                f"<p class='legenda'><span style='background:#fde2e2'>testo tolto</span><span style='background:#dcfce7'>testo aggiunto</span></p>"
                f"<pre>{corpo}</pre></body></html>"
            )
            creati.append((titolo, nome))
    indice = ["# Documenti legali: modifiche da far controllare", "", f"Confronto con la versione online (ramo `{RAMO}`). Apri i file .html nel browser: in rosso il testo tolto, in verde quello aggiunto.", ""]
    indice += [f"- [{t}]({n})" for t, n in creati]
    (USCITA / "modifiche.md").write_text("\n".join(indice) + "\n")
    print("\n".join(n for _, n in creati))


if __name__ == "__main__":
    main()
