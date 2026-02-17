import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const CSV_PATH = path.join(ROOT, "data", "cronograma.csv");
const OUTPUT_PATH = path.join(ROOT, "src", "pages", "cronograma.md");
const DEFAULT_YEAR = new Date().getFullYear();

function readFileOrThrow(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`Missing file: ${filePath}`);
  }
  return fs.readFileSync(filePath, "utf-8");
}

function parseCsvLine(line) {
  const result = [];
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
  return result.map((value) => value.trim());
}

function splitCsvRecords(content) {
  const lines = content.split(/\r?\n/);
  const records = [];
  let current = "";
  let inQuotes = false;

  const toggleQuotes = (line) => {
    let inside = inQuotes;
    for (let i = 0; i < line.length; i += 1) {
      const char = line[i];
      if (char === '"') {
        const next = line[i + 1];
        if (inside && next === '"') {
          i += 1;
          continue;
        }
        inside = !inside;
      }
    }
    inQuotes = inside;
  };

  lines.forEach((line) => {
    if (current.length > 0) {
      current += "\n";
    }
    current += line;
    toggleQuotes(line);
    if (!inQuotes && current.trim().length > 0) {
      records.push(current);
      current = "";
    }
  });

  if (current.trim().length > 0) {
    records.push(current);
  }

  return records;
}

function normalizeHeader(value) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

function parseCsv(content) {
  const records = splitCsvRecords(content);
  if (records.length === 0) {
    return [];
  }
  const rawHeaders = parseCsvLine(records[0]);
  const headers = rawHeaders
    .map((header) => ({
      raw: header.trim(),
      key: normalizeHeader(header.trim()),
    }))
    .filter((header) => header.key.length > 0);

  return records.slice(1).map((record) => {
    const values = parseCsvLine(record);
    const row = {};
    headers.forEach((header, index) => {
      row[header.key] = values[index] ?? "";
    });
    return row;
  });
}

function formatShortDate(date) {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${day}/${month}`;
}

function parseDateFromText(value) {
  const trimmed = value.trim();
  if (!trimmed) {
    return null;
  }
  const match = trimmed.match(/(\d{1,2})\/(\d{1,2})(?:\/(\d{2,4}))?/);
  if (!match) {
    return null;
  }
  const day = Number(match[1]);
  const month = Number(match[2]);
  const yearRaw = match[3];
  const year =
    yearRaw && yearRaw.length === 2 ? 2000 + Number(yearRaw) : Number(yearRaw) || DEFAULT_YEAR;
  const date = new Date(year, month - 1, day);
  date.setHours(0, 0, 0, 0);
  return date;
}

function parseDateRange(value) {
  const parts = value.split(/\s+y\s+/i).map((item) => item.trim());
  if (parts.length === 0) {
    return [null, null];
  }
  const first = parseDateFromText(parts[0]);
  const second = parts.length > 1 ? parseDateFromText(parts[1]) : null;
  return [first, second];
}

function splitLines(value) {
  return value
    .split(/\r?\n/)
    .map((item) => item.trim())
    .filter((item) => item.length > 0);
}

function escapePipes(value) {
  return value.replace(/\|/g, "\\|");
}

function buildBadge(label, variant) {
  return `<span class="cronograma-badge cronograma-badge--${variant}">${label}</span>`;
}

function getModalityVariant(modality) {
  if (!modality || !modality.trim()) return "modality";
  const m = modality.trim().toLowerCase();
  const hasPresencial = m.includes("presencial");
  const hasVirtual = m.includes("virtual");
  if (hasPresencial && !hasVirtual) return "presencial";
  if (hasVirtual && !hasPresencial) return "virtual";
  return "modality";
}

function buildCellContent({ date, modality, topics, badges }) {
  if (!date) {
    return "<span class=\"cronograma-empty\">Sin clase</span>";
  }

  const topParts = [];
  topParts.push(`<strong>${formatShortDate(date)}</strong>`);
  if (modality) {
    topParts.push(buildBadge(escapePipes(modality), getModalityVariant(modality)));
  }
  const topHtml = `<div class="cronograma-cell-top">${topParts.join(" ")}</div>`;

  let middleHtml;
  if (topics.length > 0) {
    const topicLines = topics.map((topic) => `- ${escapePipes(topic)}`).join("<br/>");
    middleHtml = `<div class="cronograma-cell-middle">${topicLines}</div>`;
  } else {
    middleHtml = '<div class="cronograma-cell-middle"></div>';
  }

  const bottomHtml = badges.length > 0
    ? `<div class="cronograma-cell-bottom">${badges.join(" ")}</div>`
    : '<div class="cronograma-cell-bottom"></div>';

  return `<div class="cronograma-cell">${topHtml}${middleHtml}${bottomHtml}</div>`;
}

function buildMarkdownTable(rows) {
  const lines = [
    "<div class=\"cronograma-wrapper\">",
    "",
    "| Semana | Teorica | Practica |",
    "| --- | --- | --- |",
  ];

  rows.forEach((row) => {
    lines.push(
      `| ${row.week} | ${row.theory} | ${row.practice} |`
    );
  });

  lines.push("", "</div>");
  return lines.join("\n");
}

function getField(row, key) {
  return row[key] ?? "";
}

function extractBadges(text) {
  const badges = [];
  const lower = text.toLowerCase();
  const tpMatch = lower.match(/tp\s*([0-9]+)/);
  const tpNumber = tpMatch ? tpMatch[1] : "";

  if (lower.includes("laboratorio")) {
    badges.push(buildBadge("Laboratorio", "info"));
  }
  if (lower.includes("parcial") && !lower.includes("repaso parcial")) {
    badges.push(buildBadge("Parcial", "warning"));
  }
  if (lower.includes("recuperatorio")) {
    badges.push(buildBadge("Recuperatorio", "warning"));
  }
  if (lower.includes("final")) {
    badges.push(buildBadge("Final", "danger"));
  }
  if (lower.includes("reentrega")) {
    badges.push(
      buildBadge(`Reentrega TP${tpNumber}`, "primary")
    );
  } else if (lower.includes("entrega")) {
    badges.push(
      buildBadge(`Entrega TP${tpNumber}`, "primary")
    );
  } else if (lower.includes("presentacion") || tpNumber) {
    /* Solo "tp0", "tp1", etc. (sin entrega/reentrega) = presentación del TP */
    badges.push(
      buildBadge(`Presentación TP${tpNumber}`, "primary-outline")
    );
  }

  return badges;
}

function parseTopics(text) {
  const lines = splitLines(text);
  const topics = [];
  lines.forEach((line) => {
    const cleaned = line.replace(/^[-•]\s*/, "").trim();
    if (!cleaned) {
      return;
    }
    const lower = cleaned.toLowerCase();
    if (
      lower === "laboratorio" ||
      lower === "parcial" ||
      lower === "recuperatorio" ||
      lower === "final"
    ) {
      return;
    }
    topics.push(cleaned);
  });
  return topics;
}

function main() {
  const csvRows = parseCsv(readFileOrThrow(CSV_PATH));
  const dates = [];
  const rows = csvRows.map((row) => {
    const weekValue = getField(row, "semana");
    const weekDisplay = weekValue ? weekValue : "";

    const fechaRaw = getField(row, "fecha");
    const [theoryDate, practiceDate] = parseDateRange(fechaRaw);
    if (theoryDate) {
      dates.push(theoryDate);
    }
    if (practiceDate) {
      dates.push(practiceDate);
    }

    const theoryText = getField(row, "teorica");
    const practiceText = getField(row, "practica");
    const modality = getField(row, "modalidad");
    const tpsText = getField(row, "tps_tentativo");

    const theoryBadges = [
      ...extractBadges(theoryText),
    ];
    const practiceBadges = [
      ...extractBadges(practiceText),
      ...extractBadges(tpsText),
    ];

    const theoryContent = buildCellContent({
      date: theoryDate,
      modality,
      topics: parseTopics(theoryText),
      badges: theoryBadges,
    });
    const practiceContent = buildCellContent({
      date: practiceDate,
      modality,
      topics: parseTopics(practiceText),
      badges: practiceBadges,
    });

    return {
      week: weekDisplay,
      theory: theoryContent,
      practice: practiceContent,
    };
  });

  const sortedDates = dates.sort((a, b) => a.getTime() - b.getTime());
  const startDate = sortedDates[0];
  const endDate = sortedDates[sortedDates.length - 1];

  const frontmatter = [
    "---",
    "title: Cronograma",
    "description: Cronograma de cursada",
    "---",
    "",
    "# Cronograma",
    "",
    startDate && endDate
      ? `Fechas: ${formatShortDate(startDate)} a ${formatShortDate(endDate)}.`
      : "Fechas: a definir.",
    "",
  ].join("\n");

  const table = buildMarkdownTable(rows);
  const output = `${frontmatter}${table}\n`;
  fs.writeFileSync(OUTPUT_PATH, output, "utf-8");
  console.log(`Generated ${OUTPUT_PATH}`);
}

try {
  main();
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
