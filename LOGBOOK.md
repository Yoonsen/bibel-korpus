## Logbook

### 2025-12-03
- Satt opp Vite + TypeScript PWA for Bibel-korpus (tabs for korpus/konkordanser/kollokasjoner, GitHub Pages build → `docs/`).
- Wrappet DH-lab-API (`conc`, `urncolldist_urn`) med normalisering for kolonnebaserte responser og bayesiansk distanse → avg. distanse.
- Nytt korpus-UI med checkbokser, søk på tittel/forfatter/år/publisher/målform og status for hvor mange URN-er som er valgt.
- Konkordanse-skjema: vindu default 25, limit styrer både API og tabell; CSV-eksport for begge paneler, NB-lenker på hver rad.
- Dagens arbeid: la til `dhlabid` i korpus-JSON og bygde «Opptelling»-fane (ordliste → `/frequencies`, visning av freq/relfreq per bibel + CSV).
- Dokumentasjon lagt til: MANIFEST, ARCHITECTURE, README; beskriver oppsettet, API-parametre og deploy-flow.

