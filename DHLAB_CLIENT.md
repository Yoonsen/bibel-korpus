# DH-lab Klientbibliotek

Dette dokumentet beskriver den gjenbrukbare TypeScript-modulen `app/src/lib/dhlab-client.ts`.

## Oversikt

- Plassering: `app/src/lib/dhlab-client.ts`
- Standard base-URL: `https://api.nb.no/dhlab` (eksporteres som `DEFAULT_BASE_URL`)
- Kall:
  - `fetchConcordance(baseUrl, params)`
  - `fetchCollocations(baseUrl, params)`
  - `fetchFrequencies(baseUrl, params)`
  - `fetchDocumentCounts(baseUrl, urns)`
  - `fetchAggregateCounts(baseUrl, urns)`

## Brukseksempel

```ts
import {
  DEFAULT_BASE_URL,
  fetchConcordance,
  type ConcordanceParams,
} from './lib/dhlab-client';

const params: ConcordanceParams = {
  urns: ['URN:NBN:no-nb_digibok_2008051404065'],
  query: 'helvete',
  window: 25,
  limit: 100,
};

const rows = await fetchConcordance(DEFAULT_BASE_URL, params);
```

## Retningslinjer

1. Kopier `app/src/lib/dhlab-client.ts` inn i prosjektet eller pakk den som egen modul.
2. Importer funksjonene fra valgt plassering (for eksempel `./lib/dhlab-client`).
3. Oppdater dette dokumentet når nye endepunkt legges til.
