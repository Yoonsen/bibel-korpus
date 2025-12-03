## Bibel-korpus PWA

En enkel nettapplikasjon (Vite + TypeScript) som lar brukeren velge bibel-URN-er fra Nasjonalbibliotekets DH-lab, gjøre concordance- og kollokasjonsoppslag via API-et og laste ned resultatene som CSV-filer. Prosjektet er satt opp for GitHub Pages-deploy ved å bygge til `docs/`.

### Systemoversikt

- `app/`: Vite-appen med all frontendkode
  - `src/api.ts`: wrappere for `/conc` og `/urncolldist_urn`
  - `src/data/corpus.ts`: auto-generert metadata fra `bibel-korpus.csv`
  - `src/main.ts`: UI-logikk, formulærhåndtering, CSV-eksport
  - `src/style.css`: hele designet (hero, paneler, tabeller)
  - `vite.config.ts`: setter `base` og `outDir` slik at GitHub Pages fungerer
- `docs/`: build-artefakter som Pages serverer (genereres av `npm run build`)
- `bibel-korpus.csv`: originalliste over URN-verdier (grunnlag for `corpus.ts`)
- `MANIFEST.md`, `ARCHITECTURE.md`, `LOGBOOK.md`: prosjektbeskrivelser og historikk

### Kom i gang

```bash
cd app
npm install        # én gang
npm run dev        # lokal utviklingsserver (http://localhost:5173)
```

### Bygge for GitHub Pages

```bash
cd app
npm run build      # skriver artefakter til ../docs/
```

Commit og push både `app/`-endringer og nye filer under `docs/`. GitHub Pages må peke på `main` + `docs/`.

### API-endepunkter

- `POST https://api.nb.no/dhlab/conc`
  - JSON: `{ urns: string[] | null, query: string, window: number (1-25), limit: number (≤1000) }`
  - Respons kan være tabell (kolonneobjekt), normaliseres i `fetchConcordance`
- `POST https://api.nb.no/dhlab/urncolldist_urn`
  - JSON: `{ urn: string[] | null, word: string, before: number, after: number, samplesize: number }`
  - Respons inneholder `counts/dist/bdist`; konverteres til radliste i `fetchCollocations`

Alle kall skjer fra nettleseren, så det kreves ingen server-side komponenter.

### Videre arbeid

- Legge på PWA-manifest/service worker via `vite-plugin-pwa`
- Implementere flere DH-lab-tjenester (f.eks. dokument-term-matriser, tellinger)
- Automatisere bygg til `docs/` med GitHub Actions


