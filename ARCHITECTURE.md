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
   - `main.ts` bygger hele UI-et (hero + faner for `Korpus`, `Konkordanser`, `Kollokasjoner`)
   - `CORPUS` lastes inn som en infokort-liste med checkbokser, søk på tittel/forfatter/år/publisher/målform og “velg alle/fjern alle”
   - Valgte URN-er holdes i et `Set` og speiles i statusfeltet
2. **Konkordanser**
   - Brukeren sender skjema → `fetchConcordance(DEFAULT_BASE_URL, params)` (window default 25, limit justerbar)
   - Resultatet normaliseres og vises i tabell med NB-lenker (HTML i `conc` beholdes)
   - Dataset lagres i minne (`concRows + concTableColumns`) for CSV-eksport (alle rader som API-et returnerer)
3. **Kollokasjoner**
   - Samme mønster, men `fetchCollocations` konverterer counts/dist/bdist til radliste, og regner ut gjennomsnittlig distanse (`distance/count`) før sortering
4. **Opptelling**
   - Brukeren oppgir en kommaseparert ordliste → `fetchFrequencies(DEFAULT_BASE_URL, { urns, words, cutoff })`
   - API-et returnerer rader med `[urn(dhlabid), word, freq, urncount]`; vi beregner `relfreq`, kobler til metainfo og viser/pivoterer i tabell
5. **CSV-eksport**
   - Knappene henter siste dataset per fane, fjerner HTML-tags, escaper CSV og trigger blob-nedlasting

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


