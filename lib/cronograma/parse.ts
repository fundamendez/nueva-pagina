// --- Config & types (used by parse) ---

export const DEFAULT_YEAR = new Date().getFullYear();

export const CSV_HEADER_KEYS = {
  semana: "semana",
  teorica_fecha: "teorica_fecha",
  teorica_temas: "teorica_temas",
  teorica_modalidad: "teorica_modalidad",
  teorica_badge: "teorica_badge",
  practica_fecha: "practica_fecha",
  practica_temas: "practica_temas",
  practica_modalidad: "practica_modalidad",
  practica_badge: "practica_badge",
} as const;

export type CsvRow = Record<string, string>;

/** Parsed cell data (no HTML yet). */
export interface ParsedCell {
  date: Date | null;
  modality: string;
  topicLines: string[];
  badgeLabels: string[];
}

/** One row of the schedule with parsed theory and practice cells. */
export interface ParsedScheduleRow {
  weekLabel: string;
  theory: ParsedCell;
  practice: ParsedCell;
}

// --- CSV parsing ---

function parseCsvLine(line: string): string[] {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i += 1) {
    const char = line[i];
    if (char === '"') {
      const next = line[i + 1];
      if (inQuotes && next === '"') {
        current += '"';
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }
    if (char === "," && !inQuotes) {
      result.push(current);
      current = "";
      continue;
    }
    current += char;
  }
  result.push(current);
  return result.map((v) => v.trim());
}

function splitCsvRecords(content: string): string[] {
  const lines = content.split(/\r?\n/);
  const records: string[] = [];
  let current = "";
  let inQuotes = false;
  for (const line of lines) {
    if (current.length > 0) current += "\n";
    current += line;
    for (let i = 0; i < line.length; i += 1) {
      const char = line[i];
      if (char === '"') {
        const next = line[i + 1];
        if (inQuotes && next === '"') {
          i += 1;
          continue;
        }
        inQuotes = !inQuotes;
      }
    }
    if (!inQuotes && current.trim().length > 0) {
      records.push(current);
      current = "";
      inQuotes = false;
    }
  }
  if (current.trim().length > 0) records.push(current);
  return records;
}

function normalizeHeader(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

export function parseCsv(content: string): CsvRow[] {
  const records = splitCsvRecords(content);
  if (records.length === 0) return [];
  const rawHeaders = parseCsvLine(records[0]);
  const headers = rawHeaders
    .map((raw) => ({ raw: raw.trim(), key: normalizeHeader(raw.trim()) }))
    .filter((h) => h.key.length > 0);
  return records.slice(1).map((record) => {
    const values = parseCsvLine(record);
    const row: CsvRow = {};
    headers.forEach((h, i) => {
      row[h.key] = values[i] ?? "";
    });
    return row;
  });
}

function getCell(row: CsvRow, key: string): string {
  return row[key] ?? "";
}

// --- Date parsing ---

function parseDateFromText(value: string, defaultYear: number): Date | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  const match = trimmed.match(/(\d{1,2})\/(\d{1,2})(?:\/(\d{2,4}))?/);
  if (!match) return null;
  const day = Number(match[1]);
  const month = Number(match[2]);
  const yearRaw = match[3];
  const year =
    yearRaw && yearRaw.length === 2
      ? 2000 + Number(yearRaw)
      : Number(yearRaw) || defaultYear;
  const date = new Date(year, month - 1, day);
  date.setHours(0, 0, 0, 0);
  return date;
}

// --- Topics & badges (parsing only) ---

function parseTopicLines(cellContent: string): string[] {
  return cellContent
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
}

function parseBadgeCell(cellContent: string): string[] {
  return cellContent
    .split(",")
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}

/** Serializable cell for plugin (date as DD/MM string). */
export interface CronogramaCellData {
  date: string | null;
  modality: string;
  topicLines: string[];
  badgeLabels: string[];
}

/** Serializable row for plugin. */
export interface CronogramaRowData {
  weekLabel: string;
  theory: CronogramaCellData;
  practice: CronogramaCellData;
}

/** Data returned to the cronograma plugin (JSON-serializable). */
export interface CronogramaPluginData {
  rows: CronogramaRowData[];
}

function formatShortDate(date: Date): string {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${day}/${month}`;
}

/** Reads CSV content and returns data ready for the Docusaurus plugin (serializable). */
export function getCronogramaDataForPlugin(
  content: string,
  defaultYear: number
): Omit<CronogramaPluginData, "rows"> & {
  rows: Array<{
    weekLabel: string;
    theory: CronogramaCellData;
    practice: CronogramaCellData;
  }>;
} {
  const rows = parseCsvToSchedule(content, defaultYear);
  const allDates: Date[] = [];
  for (const row of rows) {
    if (row.theory.date) allDates.push(row.theory.date);
    if (row.practice.date) allDates.push(row.practice.date);
  }
  allDates.sort((a, b) => a.getTime() - b.getTime());
  const serializableRows = rows.map((r) => ({
    weekLabel: r.weekLabel,
    theory: {
      date: r.theory.date ? formatShortDate(r.theory.date) : null,
      modality: r.theory.modality,
      topicLines: r.theory.topicLines,
      badgeLabels: r.theory.badgeLabels,
    },
    practice: {
      date: r.practice.date ? formatShortDate(r.practice.date) : null,
      modality: r.practice.modality,
      topicLines: r.practice.topicLines,
      badgeLabels: r.practice.badgeLabels,
    },
  }));
  return {
    rows: serializableRows
  };
}

// --- Convert CSV rows to parsed schedule rows ---

export function parseCsvToSchedule(
  content: string,
  defaultYear: number
): ParsedScheduleRow[] {
  const rows = parseCsv(content);
  const K = CSV_HEADER_KEYS;
  return rows.map((row) => {
    const theory: ParsedCell = {
      date: parseDateFromText(getCell(row, K.teorica_fecha), defaultYear),
      modality: getCell(row, K.teorica_modalidad),
      topicLines: parseTopicLines(getCell(row, K.teorica_temas)),
      badgeLabels: parseBadgeCell(getCell(row, K.teorica_badge)),
    };
    const practice: ParsedCell = {
      date: parseDateFromText(getCell(row, K.practica_fecha), defaultYear),
      modality: getCell(row, K.practica_modalidad),
      topicLines: parseTopicLines(getCell(row, K.practica_temas)),
      badgeLabels: parseBadgeCell(getCell(row, K.practica_badge)),
    };
    return {
      weekLabel: getCell(row, K.semana),
      theory,
      practice,
    };
  });
}
