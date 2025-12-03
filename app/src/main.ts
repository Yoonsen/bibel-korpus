import './style.css';
import { CORPUS } from './data/corpus';
import {
  DEFAULT_BASE_URL,
  fetchCollocations,
  fetchConcordance,
} from './api';

const app = document.querySelector<HTMLDivElement>('#app');

if (!app) {
  throw new Error('Fant ikke rot-elementet med id #app');
}

app.innerHTML = `
  <header class="hero">
    <div class="hero-copy">
      <p class="eyebrow">Bibel-korpus</p>
      <h1>Konkordanser & kollokasjoner</h1>
      <p>
        Velg hvilke utgaver som skal inngå i subkorpuset, og hent konkordanser
        eller kollokasjoner direkte fra NB sitt DH-lab API.
      </p>
    </div>
  </header>

  <main class="workspace">
    <div class="tabs" role="tablist">
      <button class="tab-button" type="button" data-tab-target="corpus">Korpus</button>
      <button class="tab-button" type="button" data-tab-target="concordance">Konkordanser</button>
      <button class="tab-button" type="button" data-tab-target="collocations">Kollokasjoner</button>
    </div>

    <section class="panel tab-panel" data-tab="corpus" role="tabpanel">
      <header>
        <div>
          <p class="eyebrow">Subkorpus</p>
          <h2>Velg bibelutgaver</h2>
        </div>
        <output id="urn-count">0 valgt</output>
      </header>
      <div class="subkorpus-controls">
        <div class="actions">
          <button type="button" data-action="select-all">Velg alle</button>
          <button type="button" data-action="clear-all">Fjern alle</button>
        </div>
        <label class="search-label" for="urn-search">
          <span>Søk etter metadata</span>
          <input id="urn-search" type="search" placeholder="Filtrer på tittel/forfatter/år/målform" />
        </label>
      </div>
      <div id="urn-list" class="urn-list" role="list"></div>
    </section>

    <section class="panel tab-panel" data-tab="concordance" role="tabpanel">
      <header>
        <div>
          <p class="eyebrow">Konkordanser</p>
          <h2>Søk etter uttrykk</h2>
        </div>
      </header>
      <form id="conc-form" class="stack" autocomplete="off">
        <label>
          <span>Søkestreng (SQLite FTS5)</span>
          <input name="query" type="text" placeholder="f.eks. «Gud NEAR/5 kjærlighet»" required />
        </label>
        <div class="form-grid">
          <label>
            <span>Vindusstørrelse</span>
            <input name="window" type="number" min="1" max="25" value="10" />
          </label>
          <label>
            <span>Maks linjer per dokument</span>
            <input name="limit" type="number" min="1" max="1000" value="100" />
          </label>
        </div>
        <button type="submit">Hent konkordanser</button>
      </form>
      <div class="result-actions">
        <button type="button" id="download-conc" disabled>Last ned CSV</button>
      </div>
      <div id="conc-results" class="results tall"></div>
    </section>

    <section class="panel tab-panel" data-tab="collocations" role="tabpanel">
      <header>
        <div>
          <p class="eyebrow">Kollokasjoner</p>
          <h2>Finn medkontekst</h2>
        </div>
      </header>
      <form id="coll-form" class="stack" autocomplete="off">
        <label>
          <span>Basiskord</span>
          <input name="word" type="text" value="arbeid" required />
        </label>
        <div class="form-grid">
          <label>
            <span>Ord før</span>
            <input name="before" type="number" min="0" max="25" value="5" />
          </label>
          <label>
            <span>Ord etter</span>
            <input name="after" type="number" min="0" max="25" value="5" />
          </label>
          <label>
            <span>Utvalg (samplesize)</span>
            <input name="samplesize" type="number" min="1" value="200000" />
          </label>
        </div>
        <button type="submit">Hent kollokasjoner</button>
      </form>
      <div class="result-actions">
        <button type="button" id="download-coll" disabled>Last ned CSV</button>
      </div>
      <div id="coll-results" class="results"></div>
    </section>
  </main>
`;

const urnList = app.querySelector<HTMLDivElement>('#urn-list');
const urnCount = app.querySelector<HTMLOutputElement>('#urn-count');
const urnSearch = app.querySelector<HTMLInputElement>('#urn-search');
const concResults = app.querySelector<HTMLDivElement>('#conc-results');
const collResults = app.querySelector<HTMLDivElement>('#coll-results');
const concForm = app.querySelector<HTMLFormElement>('#conc-form');
const collForm = app.querySelector<HTMLFormElement>('#coll-form');
const downloadConcButton = app.querySelector<HTMLButtonElement>('#download-conc');
const downloadCollButton = app.querySelector<HTMLButtonElement>('#download-coll');
const tabButtons = Array.from(
  app.querySelectorAll<HTMLButtonElement>('[data-tab-target]'),
);
const tabPanels = Array.from(app.querySelectorAll<HTMLElement>('[data-tab]'));

if (
  !urnList ||
  !urnCount ||
  !concResults ||
  !collResults ||
  !concForm ||
  !collForm ||
  !urnSearch ||
  !downloadConcButton ||
  !downloadCollButton ||
  tabButtons.length === 0 ||
  tabPanels.length === 0
) {
  throw new Error('UI-elementer mangler i DOM-en');
}

const urnCountField = urnCount;
const concResultsBox = concResults;
const collResultsBox = collResults;
const concFormEl = concForm;
const collFormEl = collForm;
const urnSearchField = urnSearch;
const downloadConcBtn = downloadConcButton;
const downloadCollBtn = downloadCollButton;
const urnListContainer = urnList;
const selectedUrns = new Set<string>(CORPUS.map((entry) => entry.urn));
const tabs = tabButtons;
const panels = tabPanels;

renderUrnList();
updateSelectedCount();
activateTab('concordance');

let concTableColumns: string[] = [];
let concRows: Array<Record<string, unknown>> = [];
let collTableColumns: string[] = [];
let collRows: Array<Record<string, unknown>> = [];

app
  .querySelector<HTMLButtonElement>('[data-action="select-all"]')
  ?.addEventListener('click', () => {
    selectAllUrns();
  });

app
  .querySelector<HTMLButtonElement>('[data-action="clear-all"]')
  ?.addEventListener('click', () => {
    clearAllUrns();
  });

urnSearchField.addEventListener('input', () => {
  renderUrnList(urnSearchField.value);
});

tabs.forEach((button) => {
  button.addEventListener('click', () => {
    const target = button.dataset.tabTarget;
    if (target) {
      activateTab(target);
    }
  });
});

concFormEl.addEventListener('submit', async (event) => {
  event.preventDefault();
  const queryInput = concFormEl.querySelector<HTMLInputElement>('input[name="query"]');
  const windowInput = concFormEl.querySelector<HTMLInputElement>('input[name="window"]');
  const limitInput = concFormEl.querySelector<HTMLInputElement>('input[name="limit"]');

  if (!queryInput || !windowInput || !limitInput) {
    return;
  }

  const query = queryInput.value.trim();
  if (!query) {
    renderMessage(concResultsBox, 'Du må skrive inn en søkestreng.', 'error');
    return;
  }

  renderMessage(concResultsBox, 'Henter konkordanser …', 'info');
  updateConcDataset([], []);

  try {
    const rows = await fetchConcordance(DEFAULT_BASE_URL, {
      urns: getSelectedUrns(),
      query,
      window: parseInt(windowInput.value, 10) || 10,
      limit: parseInt(limitInput.value, 10) || 100,
    });

    if (!rows.length) {
      renderMessage(concResultsBox, 'Ingen treff for søket.', 'info');
      updateConcDataset([], []);
      return;
    }

    const enrichedRows = rows.map((row) => ({
      ...row,
      kilde: row.urn
        ? `<a href="https://www.nb.no/items/${encodeURIComponent(String(row.urn))}" target="_blank" rel="noopener noreferrer">Til NB</a>`
        : '',
    }));

    const columns = renderTable(
      concResultsBox,
      enrichedRows,
      ['docid', 'kilde', 'conc'],
      new Set(['kilde', 'conc']),
    );
    updateConcDataset(enrichedRows, columns);
  } catch (error) {
    renderMessage(concResultsBox, (error as Error).message, 'error');
    updateConcDataset([], []);
  }
});

collFormEl.addEventListener('submit', async (event) => {
  event.preventDefault();
  const wordInput = collFormEl.querySelector<HTMLInputElement>('input[name="word"]');
  const beforeInput = collFormEl.querySelector<HTMLInputElement>('input[name="before"]');
  const afterInput = collFormEl.querySelector<HTMLInputElement>('input[name="after"]');
  const sampleInput = collFormEl.querySelector<HTMLInputElement>('input[name="samplesize"]');

  if (!wordInput || !beforeInput || !afterInput || !sampleInput) {
    return;
  }

  const word = wordInput.value.trim();
  if (!word) {
    renderMessage(collResultsBox, 'Skriv inn et basiskord.', 'error');
    return;
  }

  renderMessage(collResultsBox, 'Henter kollokasjoner …', 'info');
  updateCollDataset([], []);

  try {
    const rows = await fetchCollocations(DEFAULT_BASE_URL, {
      urns: getSelectedUrns(),
      word,
      before: parseInt(beforeInput.value, 10) || 5,
      after: parseInt(afterInput.value, 10) || 5,
      samplesize: parseInt(sampleInput.value, 10) || 200000,
    });

    if (!rows.length) {
      renderMessage(collResultsBox, 'Ingen kollokasjoner returnert.', 'info');
      updateCollDataset([], []);
      return;
    }

    const columns = renderTable(collResultsBox, rows, ['word', 'count', 'avgDistance']);
    updateCollDataset(rows, columns);
  } catch (error) {
    renderMessage(collResultsBox, (error as Error).message, 'error');
    updateCollDataset([], []);
  }
});

downloadConcBtn.addEventListener('click', () => {
  exportCsv(concRows, concTableColumns, 'konkordanser.csv');
});

downloadCollBtn.addEventListener('click', () => {
  exportCsv(collRows, collTableColumns, 'kollokasjoner.csv');
});

function renderUrnList(filterValue = '') {
  if (!urnListContainer) {
    return;
  }

  const term = filterValue.toLowerCase().trim();
  const fragment = document.createDocumentFragment();

  CORPUS.forEach((entry) => {
    const searchable = [
      entry.title,
      entry.authors,
      entry.publisher,
      entry.langs,
      entry.year ? String(entry.year) : '',
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();

    if (term && !searchable.includes(term)) {
      return;
    }

    const label = document.createElement('label');
    label.className = 'urn-card';
    label.setAttribute('role', 'listitem');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.value = entry.urn;
    checkbox.checked = selectedUrns.has(entry.urn);
    checkbox.addEventListener('change', () => {
      if (checkbox.checked) {
        selectedUrns.add(entry.urn);
      } else {
        selectedUrns.delete(entry.urn);
      }
      updateSelectedCount();
    });

    const details = document.createElement('div');
    details.className = 'urn-info';

    const title = document.createElement('p');
    title.className = 'urn-title';
    title.textContent = entry.year ? `${entry.title} (${entry.year})` : entry.title;

    const metaParts = [
      entry.authors,
      entry.publisher,
      entry.langs ? `Målform: ${entry.langs}` : undefined,
    ].filter(Boolean);

    const meta = document.createElement('p');
    meta.className = 'urn-meta';
    meta.textContent = metaParts.join(' • ');

    details.append(title);
    if (metaParts.length) {
      details.append(meta);
    }

    label.append(checkbox, details);
    fragment.append(label);
  });

  if (!fragment.hasChildNodes()) {
    const empty = document.createElement('p');
    empty.className = 'message info';
    empty.textContent = term
      ? `Ingen treff for «${filterValue.trim()}».`
      : 'Ingen elementer i korpuset.';
    urnListContainer.replaceChildren(empty);
  } else {
    urnListContainer.replaceChildren(fragment);
  }
}

function selectAllUrns() {
  selectedUrns.clear();
  CORPUS.forEach((entry) => selectedUrns.add(entry.urn));
  renderUrnList(urnSearchField.value);
  updateSelectedCount();
}

function clearAllUrns() {
  selectedUrns.clear();
  renderUrnList(urnSearchField.value);
  updateSelectedCount();
}

function updateSelectedCount() {
  const selected = selectedUrns.size;
  const total = CORPUS.length;
  urnCountField.value =
    selected === 0
      ? '0 valgt'
      : selected === total
        ? `Alle (${total})`
        : `${selected} valgt`;
}

function getSelectedUrns(): string[] {
  return Array.from(selectedUrns);
}

function renderMessage(
  container: HTMLElement,
  message: string,
  variant: 'info' | 'error',
) {
  container.innerHTML = `<p class="message ${variant}">${message}</p>`;
}

function renderTable(
  container: HTMLElement,
  rows: Array<Record<string, unknown>>,
  preferredColumns?: string[],
  htmlColumns: Set<string> = new Set(),
): string[] {
  const columns =
    preferredColumns?.length && preferredColumns?.some((col) => col in rows[0])
      ? preferredColumns
      : Object.keys(rows[0]);

  const table = document.createElement('table');
  const thead = document.createElement('thead');
  const headerRow = document.createElement('tr');

  columns.forEach((column) => {
    const th = document.createElement('th');
    th.textContent = column;
    headerRow.appendChild(th);
  });

  thead.appendChild(headerRow);
  table.appendChild(thead);

  const tbody = document.createElement('tbody');
  rows.forEach((row) => {
    const tr = document.createElement('tr');
    columns.forEach((column) => {
      const td = document.createElement('td');
      const value = row[column];
      if (value == null) {
        td.textContent = '';
      } else if (htmlColumns.has(column) && typeof value === 'string') {
        td.innerHTML = value;
      } else if (typeof value === 'number') {
        td.textContent = Number.isFinite(value)
          ? value.toLocaleString('nb-NO', { maximumFractionDigits: 3 })
          : '';
      } else {
        td.textContent = String(value);
      }
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });

  table.appendChild(tbody);
  container.innerHTML = '';
  container.appendChild(table);
  return columns;
}

function updateConcDataset(rows: Array<Record<string, unknown>>, columns: string[]) {
  concRows = rows;
  concTableColumns = columns;
  downloadConcBtn.disabled = rows.length === 0;
}

function updateCollDataset(rows: Array<Record<string, unknown>>, columns: string[]) {
  collRows = rows;
  collTableColumns = columns;
  downloadCollBtn.disabled = rows.length === 0;
}

function exportCsv(
  rows: Array<Record<string, unknown>>,
  columns: string[],
  filename: string,
) {
  if (!rows.length) {
    return;
  }

  const header = columns.length ? columns : Object.keys(rows[0]);
  const lines = [header.join(',')];

  rows.forEach((row) => {
    const line = header
      .map((column) => formatCsvCell(row[column]))
      .join(',');
    lines.push(line);
  });

  const blob = new Blob([lines.join('\n')], {
    type: 'text/csv;charset=utf-8;',
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function formatCsvCell(value: unknown): string {
  const raw =
    typeof value === 'string'
      ? value.replace(/<[^>]*>/g, '')
      : value == null
        ? ''
        : String(value);
  const needsQuoting = /[",\n]/.test(raw);
  const escaped = raw.replace(/"/g, '""');
  return needsQuoting ? `"${escaped}"` : escaped;
}

function activateTab(target: string) {
  tabs.forEach((button) => {
    button.classList.toggle('is-active', button.dataset.tabTarget === target);
  });

  panels.forEach((panel) => {
    panel.classList.toggle('is-active', panel.dataset.tab === target);
  });
}
