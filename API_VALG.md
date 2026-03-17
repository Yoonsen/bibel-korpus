# API-valg for konkordanser og opptelling

Dette notatet oppsummerer API-strategien i appen.

## Beslutning

- Standard: DH-lab-klienten i `app/src/lib/dhlab-client.ts`.
- Alternativ ved små utvalg: kall per bok (loop per URN/sesamid), og aggregering i frontend.

## Når bruke hva

- Bruk DH-lab standardmodus når:
  - korpuset er større
  - vi vil ha færre klientkall
  - vi vil ha enklest mulig drift
- Bruk per-bok-modus når:
  - antall bøker er lavt
  - respons i interaktiv sammenligning er viktig
  - vi aksepterer mulig treff-tak per bok

## Frasetelling

- FTS5-konkordans er god for gjenfinning/kontekst, men ikke ideell for eksakt telling av fraseforekomster.
- For lite korpus kan vi telle forekomster via egen frasemodus.
- I appen betyr det:
  - `dhlab-counts` brukes for enkeltord (inkl. relativ visning)
  - frasemodus brukes for eksakt forekomsttelling uten kapitaliseringsnormalisering
  - resultater skal merkes tydelig med valgt tellemetode
