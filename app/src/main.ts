import './style.css';
import { CORPUS } from './data/corpus';
import {
  DEFAULT_BASE_URL,
  fetchCollocations,
  fetchConcordance,
  fetchFrequencies,
  type FrequencyRow,
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
      <button class="tab-button" type="button" data-tab-target="frequencies">Opptelling</button>
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
          <input name="query" type="text" placeholder="" required />
        </label>
        <div class="form-grid">
          <label>
            <span>Vindusstørrelse</span>
            <input name="window" type="number" min="1" max="25" value="25" />
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
    <section class="panel tab-panel" data-tab="frequencies" role="tabpanel">
      <header>
        <div>
          <p class="eyebrow">Opptelling</p>
          <h2>Tell ord i utvalgte bibler</h2>
        </div>
      </header>
      <form id="freq-form" class="stack" autocomplete="off">
        <label>
          <span>Ord/uttrykk (kommaseparert)</span>
          <textarea name="words" rows="3" placeholder="helvete, evighet, etterliv" required></textarea>
        </label>
        <div class="form-grid">
          <label>
            <span>Cutoff (minimum antall)</span>
            <input name="cutoff" type="number" min="0" value="0" />
          </label>
        </div>
        <div class="mode-switch">
          <label>
            <input type="radio" name="freq-mode" value="freq" checked />
            Absolutt
          </label>
          <label>
            <input type="radio" name="freq-mode" value="relfreq" />
            Relativ
          </label>
        </div>
        <button type="submit">Tell ord</button>
      </form>
      <div class="result-actions">
        <button type="button" id="download-freq" disabled>Last ned CSV</button>
  </div>
      <div id="freq-results" class="results tall"></div>
    </section>

  </main>
`;

const urnList = app.querySelector<HTMLDivElement>('#urn-list');
const urnCount = app.querySelector<HTMLOutputElement>('#urn-count');
const urnSearch = app.querySelector<HTMLInputElement>('#urn-search');
const concResults = app.querySelector<HTMLDivElement>('#conc-results');
const collResults = app.querySelector<HTMLDivElement>('#coll-results');
const freqResults = app.querySelector<HTMLDivElement>('#freq-results');
const concForm = app.querySelector<HTMLFormElement>('#conc-form');
const collForm = app.querySelector<HTMLFormElement>('#coll-form');
const freqForm = app.querySelector<HTMLFormElement>('#freq-form');
const downloadConcButton = app.querySelector<HTMLButtonElement>('#download-conc');
const downloadCollButton = app.querySelector<HTMLButtonElement>('#download-coll');
const downloadFreqButton = app.querySelector<HTMLButtonElement>('#download-freq');
const tabButtons = Array.from(
  app.querySelectorAll<HTMLButtonElement>('[data-tab-target]'),
);
const tabPanels = Array.from(app.querySelectorAll<HTMLElement>('[data-tab]'));

if (
  !urnList ||
  !urnCount ||
  !concResults ||
  !collResults ||
  !freqResults ||
  !concForm ||
  !collForm ||
  !freqForm ||
  !urnSearch ||
  !downloadConcButton ||
  !downloadCollButton ||
  !downloadFreqButton ||
  tabButtons.length === 0 ||
  tabPanels.length === 0
) {
  throw new Error('UI-elementer mangler i DOM-en');
}

const urnCountField = urnCount;
const concResultsBox = concResults;
const collResultsBox = collResults;
const freqResultsBox = freqResults;
const concFormEl = concForm;
const collFormEl = collForm;
const freqFormEl = freqForm;
const urnSearchField = urnSearch;
const downloadConcBtn = downloadConcButton;
const downloadCollBtn = downloadCollButton;
const downloadFreqBtn = downloadFreqButton;
const urnListContainer = urnList;
type CorpusEntry = (typeof CORPUS)[number];
type FrequencyMatrixRow = {
  urn: string;
  tittel: string;
  år: number | string | '';
  målform: string | '';
  values: Record<string, { freq: number; relfreq: number }>;
};

const selectedUrns = new Set<string>(CORPUS.map((entry) => entry.urn));
const tabs = tabButtons;
const panels = tabPanels;
const corpusById = new Map<string, CorpusEntry>();

function normaliseId(value: string | number | null | undefined): string {
  if (value === null || value === undefined) {
    return '';
  }
  const raw = String(value).trim();
  return raw.replace(/\.0+$/, '');
}

function registerCorpusKey(value: string | number | null | undefined, normalise = true, entry: CorpusEntry) {
  if (value === null || value === undefined) {
    return;
  }
  const key = normalise ? normaliseId(value) : String(value).trim();
  if (!key) {
    return;
  }
  corpusById.set(key, entry);
}

CORPUS.forEach((entry) => {
  registerCorpusKey(entry.urn, false, entry);
  registerCorpusKey(entry.dhlabid, true, entry);
});

renderUrnList();
updateSelectedCount();
activateTab('concordance');

let concTableColumns: string[] = [];
let concRows: Array<Record<string, unknown>> = [];
let collTableColumns: string[] = [];
let collRows: Array<Record<string, unknown>> = [];
let freqTableColumns: string[] = [];
let freqRows: Array<Record<string, unknown>> = [];
let freqMatrix: FrequencyMatrixRow[] = [];
let freqWords: string[] = [];
let freqDisplayMode: 'freq' | 'relfreq' = 'freq';
let freqSortColumn: string | null = null;
let freqSortDirection: 'asc' | 'desc' = 'asc';

const freqModeInputs = Array.from(
  freqFormEl.querySelectorAll<HTMLInputElement>('input[name="freq-mode"]'),
);
if (freqModeInputs.length) {
  freqDisplayMode =
    freqModeInputs.find((input) => input.checked)?.value === 'relfreq' ? 'relfreq' : 'freq';
  freqModeInputs.forEach((input) => {
    input.addEventListener('change', () => {
      const mode = input.value === 'relfreq' ? 'relfreq' : 'freq';
      if (mode !== freqDisplayMode) {
        freqDisplayMode = mode;
        renderFrequencyTable();
      }
    });
  });
}

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
      window: parseInt(windowInput.value, 10) || 25,
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

freqFormEl.addEventListener('submit', async (event) => {
  event.preventDefault();
  const wordsInput = freqFormEl.querySelector<HTMLTextAreaElement>('textarea[name="words"]');
  const cutoffInput = freqFormEl.querySelector<HTMLInputElement>('input[name="cutoff"]');

  if (!wordsInput || !cutoffInput) {
    return;
  }

  const words = wordsInput.value
    .split(/[,\n]/)
    .map((w) => w.trim())
    .filter(Boolean);

  if (!words.length) {
    renderMessage(freqResultsBox, 'Skriv inn minst ett ord eller uttrykk.', 'error');
    return;
  }

  const urns = getSelectedUrns();
  if (!urns.length) {
    renderMessage(freqResultsBox, 'Velg minst én bibel i korpus-fanen.', 'error');
    return;
  }

  renderMessage(freqResultsBox, 'Henter opptelling …', 'info');
  updateFreqDataset([], []);

  try {
    const rows = await fetchFrequencies(DEFAULT_BASE_URL, {
      urns,
      words,
      cutoff: parseInt(cutoffInput.value, 10) || 0,
    });

    if (!rows.length) {
      renderMessage(freqResultsBox, 'Ingen treff for disse ordene.', 'info');
      updateFreqDataset([], []);
      return;
    }

    buildFrequencyMatrix(rows);
    renderFrequencyTable();
  } catch (error) {
    renderMessage(freqResultsBox, (error as Error).message, 'error');
    updateFreqDataset([], []);
  }
});

downloadFreqBtn.addEventListener('click', () => {
  exportCsv(freqRows, freqTableColumns, 'opptelling.csv');
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
    th.dataset.column = column;
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

function updateFreqDataset(rows: Array<Record<string, unknown>>, columns: string[]) {
  freqRows = rows;
  freqTableColumns = columns;
  downloadFreqBtn.disabled = rows.length === 0;
}

function buildFrequencyMatrix(rows: FrequencyRow[]) {
  const wordsSet = new Set<string>();
  const grouped = new Map<string, FrequencyMatrixRow>();

  rows.forEach((row) => {
    wordsSet.add(row.word);
    const normalized = normaliseId(row.urn);
    const meta = corpusById.get(normalized);
    const key = meta?.urn ?? normalized;
    let bucket = grouped.get(key);
    if (!bucket) {
      bucket = {
        urn: key,
        tittel: meta?.title ?? key,
        år: meta?.year ?? '',
        målform: meta?.langs ?? '',
        values: {},
      };
      grouped.set(key, bucket);
    }
    bucket.values[row.word] = { freq: row.freq, relfreq: row.relfreq };
  });

  freqWords = Array.from(wordsSet).sort((a, b) => a.localeCompare(b, 'nb'));
  freqMatrix = Array.from(grouped.values()).sort((a, b) =>
    String(a.tittel).localeCompare(String(b.tittel), 'nb'),
  );
}

function renderFrequencyTable() {
  if (!freqMatrix.length) {
    renderMessage(freqResultsBox, 'Ingen data å vise.', 'info');
    updateFreqDataset([], []);
    return;
  }

  const metaColumns = ['år', 'målform', 'tittel', 'nb'];
  const columns = freqWords.concat(metaColumns);
  const tableRows = freqMatrix.map((entry) => {
    const row: Record<string, unknown> = {};
    freqWords.forEach((word) => {
      const value = entry.values[word];
      row[word] = value ? (freqDisplayMode === 'relfreq' ? value.relfreq : value.freq) : 0;
    });
    row.år = entry.år ?? '';
    row.målform = entry.målform ?? '';
    row.tittel = entry.tittel ?? '';
    row.nb = entry.urn
      ? `<a href="https://www.nb.no/items/${encodeURIComponent(entry.urn)}" target="_blank" rel="noopener noreferrer">NB</a>`
      : '';
    return row;
  });

  const sortedRows = sortFrequencyRows(tableRows);
  const renderedColumns = renderTable(
    freqResultsBox,
    sortedRows,
    columns,
    new Set(['nb']),
  );
  updateFreqDataset(sortedRows, renderedColumns);
  attachFrequencySortHandlers(columns);
}

function sortFrequencyRows(rows: Array<Record<string, unknown>>) {
  if (!freqSortColumn) {
    return rows;
  }
  const dir = freqSortDirection === 'asc' ? 1 : -1;
  const isNumeric = freqWords.includes(freqSortColumn);
  return [...rows].sort((a, b) => {
    const aVal = a[freqSortColumn];
    const bVal = b[freqSortColumn];
    let result: number;
    if (isNumeric) {
      result = (Number(aVal) || 0) - (Number(bVal) || 0);
    } else {
      result = String(aVal ?? '').localeCompare(String(bVal ?? ''), 'nb', { numeric: true });
    }
    return result * dir;
  });
}

function attachFrequencySortHandlers(columns: string[]) {
  const table = freqResultsBox.querySelector('table');
  if (!table) {
    return;
  }
  const headers = table.querySelectorAll<HTMLTableCellElement>('th');
  headers.forEach((th) => {
    const column = th.dataset.column;
    th.classList.remove('sortable');
    th.removeAttribute('aria-sort');
    th.onclick = null;
    if (!column || column === 'nb') {
      return;
    }
    th.classList.add('sortable');
    if (column === freqSortColumn) {
      th.setAttribute('aria-sort', freqSortDirection === 'asc' ? 'ascending' : 'descending');
    }
    th.onclick = () => handleFrequencyHeaderClick(column);
  });
}

function handleFrequencyHeaderClick(column: string) {
  if (column === 'nb') {
    return;
  }
  if (freqSortColumn === column) {
    freqSortDirection = freqSortDirection === 'asc' ? 'desc' : 'asc';
  } else {
    freqSortColumn = column;
    freqSortDirection = 'asc';
  }
  renderFrequencyTable();
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