import Papa from "papaparse";
import { parse, format } from "date-fns";

// --- Config & types ---

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

function normalizeHeader(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

export function parseCsv(content: string): CsvRow[] {
  const result = Papa.parse<CsvRow>(content, {
    header: true,
    skipEmptyLines: true,
    transformHeader: normalizeHeader,
  });
  return result.data;
}

function getCell(row: CsvRow, key: string): string {
  return row[key] ?? "";
}

// --- Date parsing ---

function parseDateFromText(value: string, defaultYear: number): Date | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  const date = parse(trimmed, "d/M", new Date(defaultYear, 0, 1));
  return isNaN(date.getTime()) ? null : date;
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
  return format(date, "dd/MM");
}

/** Reads CSV content and returns data ready for the Docusaurus plugin (serializable). */
export function getCronogramaDataForPlugin(
  content: string,
  defaultYear: number
): CronogramaPluginData {
  const rows = parseCsvToSchedule(content, defaultYear);
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
