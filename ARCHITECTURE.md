## Arkitektur

### Oversikt

```
repo-root
├── app/
│   ├── src/
│   │   ├── api.ts
│   │   ├── data/corpus.ts
│   │   ├── main.ts
│   │   └── style.css
│   ├── vite.config.ts
│   └── package.json (Vite)
├── docs/ (generert build)
├── bibel-korpus.csv
├── MANIFEST.md / ARCHITECTURE.md / LOGBOOK.md / README.md
└── øvrige filer (pyproject, main.py osv. – ikke i aktiv bruk ennå)
```

### Komponenter

| Modul | Ansvar |
| --- | --- |
| `src/api.ts` | Wrapper for DH-lab API: `fetchConcordance` og `fetchCollocations`. Normaliserer JSON fra API (kolonne- eller strengbasert) til rader og håndterer grensesnitt-feil. |
| `src/data/corpus.ts` | Typedefinisjon + `CORPUS`-array. Generert fra `bibel-korpus.csv`, sikrer at UI alltid har oppdatert URN-liste. |
| `src/main.ts` | Oppretter hele DOM-strukturen, binder eventer for subkorpus, skjemaer og nedlasting, samt gir lager for sist innhentede datasett. |
| `src/style.css` | All styling (hero, paneler, tabeller, meldinger, knapper). Ingen tredjepartsrammeverk. |
| `vite.config.ts` | Setter `base` til `/bibel-korpus/` og `build.outDir` til `../docs`, slik at `npm run build` publiserer rett til Pages-katalogen. |

### Kontrollflyt

1. **Init**
   - `main.ts` injiserer HTML-mal i `#app`, leser `CORPUS` og fyller `<select>`
   - Alle URN-er velges som default
2. **Concordance**
   - Bruker sender skjema → `fetchConcordance(DEFAULT_BASE_URL, params)`
   - Resultatet normaliseres og vises i tabell (HTML i `conc` beholdes)
   - Dataset lagres i minne (`concRows + concTableColumns`) for CSV-eksport
3. **Kollokasjoner**
   - Samme mønster, men `fetchCollocations` konverterer counts/dist/bdist til radliste
4. **CSV-eksport**
   - Knappene henter siste dataset, fjerner HTML-tags, escaper CSV og trigger blob-nedlasting

### Dataflyt

```
bibel-korpus.csv ──(script)──> src/data/corpus.ts ──> UI
UI-valg ──> fetchConcordance/fetchCollocations ──> tabeller & CSV
```

*NB:* scriptet som genererte `corpus.ts` ligger ikke som npm-kommando ennå, men `corpus.ts` indikerer at CSV-en bør redigeres som sannhetskilde.

### Bygg og deploy

- Lokalt: `npm run dev` (Vite devserver)
- Prod: `npm run build` → skriver til `docs/`
- GitHub Pages: peker på `main` + `docs/`. Ingen ytterligere konfig kreves.

### Videre utvidelser

- Felles modul for flere DH-lab-endepunkter (document-term, frekvens)
- Script/CLI for å regenerere `corpus.ts` automatisk ved CSV-endringer
- Service worker + manifest (PWA) og offline caching
*** End Patch

