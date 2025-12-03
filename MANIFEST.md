## MANIFEST

### Formål

Bygge en JavaScript-basert PWA som gjør det mulig å hente concordancer og kollokasjoner fra Nasjonalbibliotekets DH-lab/Bibel-korpus, med støtte for å velge subkorpus basert på URN-verdier og laste data ned som CSV for videre analyse.

### Funksjoner

1. **Subkorpus-velger**
   - Viser alle URN-er fra `bibel-korpus.csv` (gjennom `src/data/corpus.ts`)
   - Søkefelt og «velg alle»/«fjern alle» kontroller
2. **Concordance-oppslag**
   - Input for SQLite FTS5-spørring, justerbar window/limit
   - Resultattabell med HTML-fremheving
   - CSV-eksport av siste treffliste
3. **Kollokasjonsoppslag**
   - Input for basiskord + antall ord før/etter + samplesize
   - Resultater sortert på frekvens
   - CSV-eksport av siste kollokasjonsliste
4. **GitHub Pages-ready build**
   - Vite-konfig satt til `outDir: ../docs` og `base: '/bibel-korpus/'`
   - `npm run build` publiserer direkte til Pages-katalogen

### Teknologi

- Vite 7 (vanilla-ts template)
- TypeScript 5.9
- Ren DOM-manipulasjon + CSS (ingen rammeverk)
- DH-lab HTTP-API (`https://api.nb.no/dhlab`)

### Data

- `bibel-korpus.csv`: kildedata (29 URN-er + metadata)
- `src/data/corpus.ts`: generert TypeScript-modul med `CORPUS` & `URNS`
- `docs/`: ferdig bundlet app for hosting

### Prioriterte krav

1. Ingen backend – alt skal kjøre i nettleser
2. Mulighet til å velge (og filtrere) subkorpus, default alle
3. Concordance- og kollokasjonssøk må bruke samme URN-utvalg
4. Resultater må kunne lastes ned (CSV per panel)
5. Build må fungere rett på GitHub Pages uten manuell kopi

### Milepæler (viser til LOGBOOK.md)

- 2025-12-02: Sette opp Vite-appen, implementere API-wrappere, importere URN-data
- 2025-12-02: Legge til UI for søk, tabeller og CSV-eksport, bygge pipeline til docs/
- 2025-12-02: Dokumentasjon (manifest, arkitektur, logg, README)


