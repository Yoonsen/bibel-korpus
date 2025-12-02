const DEFAULT_API_BASE_URL = 'https://api.nb.no/dhlab';

export const DEFAULT_BASE_URL = DEFAULT_API_BASE_URL;

export type ConcordanceParams = {
  urns: string[];
  query: string;
  window: number;
  limit: number;
};

export type ConcordanceRow = {
  docid?: number | string | null;
  urn?: string | null;
  conc?: string | null;
  [key: string]: unknown;
};

export type CollocationParams = {
  urns: string[];
  word: string;
  before: number;
  after: number;
  samplesize: number;
};

export type CollocationRow = {
  word: string;
  count: number;
  distance: number | null;
  bayesianDistance: number | null;
};

type ColumnarPayload = Record<string, unknown>;

type CollocationPayload = {
  counts?: Record<string, number>;
  dist?: Record<string, number>;
  bdist?: Record<string, number>;
};

export async function fetchConcordance(
  baseUrl: string,
  params: ConcordanceParams,
): Promise<ConcordanceRow[]> {
  const body = {
    urns: params.urns.length ? params.urns : null,
    query: params.query,
    window: clamp(params.window, 1, 25),
    limit: clamp(params.limit, 1, 1000),
  };

  const data = await postJSON<unknown>(baseUrl, '/conc', body);
  return normalizeRows(data);
}

export async function fetchCollocations(
  baseUrl: string,
  params: CollocationParams,
): Promise<CollocationRow[]> {
  const body = {
    urn: params.urns.length ? params.urns : null,
    word: params.word,
    before: Math.max(0, params.before),
    after: Math.max(0, params.after),
    samplesize: Math.max(1, params.samplesize),
  };

  const payload = await postJSON<unknown>(baseUrl, '/urncolldist_urn', body);
  const collocation = normalizeCollocation(payload);
  return collocation.sort((a, b) => b.count - a.count);
}

async function postJSON<T>(
  baseUrl: string,
  path: string,
  payload: unknown,
): Promise<T> {
  const normalized = `${baseUrl.replace(/\/$/, '')}${path}`;
  const response = await fetch(normalized, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(
      `API-kall feilet (${response.status} ${response.statusText}): ${text}`,
    );
  }

  const result = await response.json();
  return (typeof result === 'string' ? JSON.parse(result) : result) as T;
}

function normalizeRows(data: unknown): ConcordanceRow[] {
  if (Array.isArray(data)) {
    return data as ConcordanceRow[];
  }

  if (isColumnarPayload(data)) {
    return columnsToRows(data);
  }

  return [];
}

function normalizeCollocation(data: unknown): CollocationRow[] {
  if (!isCollocationPayload(data)) {
    return [];
  }

  const words = new Set<string>();
  [data.counts, data.dist, data.bdist]
    .filter(Boolean)
    .forEach((collection) => {
      Object.keys(collection as Record<string, unknown>).forEach((word) =>
        words.add(word),
      );
    });

  return Array.from(words).map((word) => ({
    word,
    count: Number(data.counts?.[word] ?? 0),
    distance: toNumberOrNull(data.dist?.[word]),
    bayesianDistance: toNumberOrNull(data.bdist?.[word]),
  }));
}

function columnsToRows(payload: ColumnarPayload): ConcordanceRow[] {
  const indices = new Set<string>();

  Object.values(payload).forEach((column) => {
    if (Array.isArray(column)) {
      column.forEach((_, idx) => indices.add(String(idx)));
    } else if (column && typeof column === 'object') {
      Object.keys(column).forEach((key) => indices.add(key));
    }
  });

  const orderedIndices = Array.from(indices).sort(
    (a, b) => Number(a) - Number(b),
  );

  return orderedIndices.map((index) => {
    const row: ConcordanceRow = {};
    for (const [columnName, columnValues] of Object.entries(payload)) {
      row[columnName] = extractColumnValue(columnValues, index);
    }
    return row;
  });
}

function extractColumnValue(
  source: unknown,
  index: string,
): string | number | null | undefined {
  if (Array.isArray(source)) {
    const numericIndex = Number(index);
    if (!Number.isNaN(numericIndex)) {
      return source[numericIndex] as string | number | null | undefined;
    }
    return null;
  }

  if (source && typeof source === 'object') {
    return (source as Record<string, unknown>)[index] as
      | string
      | number
      | null
      | undefined;
  }

  return source as string | number | null | undefined;
}

function isColumnarPayload(value: unknown): value is ColumnarPayload {
  return Boolean(value) && typeof value === 'object';
}

function isCollocationPayload(value: unknown): value is CollocationPayload {
  if (!value || typeof value !== 'object') {
    return false;
  }
  const payload = value as CollocationPayload;
  const hasCounts =
    payload.counts !== undefined && payload.counts !== null && typeof payload.counts === 'object';
  const hasDist =
    payload.dist !== undefined && payload.dist !== null && typeof payload.dist === 'object';
  const hasBayes =
    payload.bdist !== undefined && payload.bdist !== null && typeof payload.bdist === 'object';
  return hasCounts || hasDist || hasBayes;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

function toNumberOrNull(value: unknown): number | null {
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

