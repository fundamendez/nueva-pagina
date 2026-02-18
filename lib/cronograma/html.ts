// --- Types ---

type ModalityVariant = "presencial" | "virtual" | "sin_definir";

type BadgeVariant = "info" | "warning" | "danger" | "primary" | "primary-outline";

// --- Constants (badge variants & keywords) ---

const BADGE_VARIANT_INFO: BadgeVariant = "info";
const BADGE_VARIANT_WARNING: BadgeVariant = "warning";
const BADGE_VARIANT_DANGER: BadgeVariant = "danger";
const BADGE_VARIANT_PRIMARY: BadgeVariant = "primary";
const BADGE_VARIANT_PRIMARY_OUTLINE: BadgeVariant = "primary-outline";

const KEYWORDS_PRACTICA_EN_CLASE = ["repaso", "ejercicios", "laboratorio"];

const KEYWORD_PARCIAL = "parcial";
const KEYWORD_RECUPERATORIO = "recuperatorio";
const KEYWORD_FINAL = "final";
const KEYWORD_REENTREGA = "reentrega";
const KEYWORD_ENTREGA = "entrega";

const REGEX_PRESENTACION_TP = /^tp[0-9]+$/;

const MODALITY_PRESENCIAL: ModalityVariant = "presencial";
const MODALITY_VIRTUAL: ModalityVariant = "virtual";
const MODALITY_SIN_DEFINIR: ModalityVariant = "sin_definir";

const KEYWORD_MODALITY_PRESENCIAL = "presencial";
const KEYWORD_MODALITY_VIRTUAL = "virtual";

// --- Helpers ---

export function getModalityVariant(modality: string): ModalityVariant {
  const normalized = modality.trim().toLowerCase();
  const isPresencial = normalized.includes(KEYWORD_MODALITY_PRESENCIAL);
  const isVirtual = normalized.includes(KEYWORD_MODALITY_VIRTUAL);
  if (isPresencial) return MODALITY_PRESENCIAL;
  if (isVirtual) return MODALITY_VIRTUAL;
  return MODALITY_SIN_DEFINIR;
}

function normalizeLabel(label: string): string {
  return label
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export function getBadgeVariant(label: string): BadgeVariant {
  const normalized = normalizeLabel(label);
  const isPracticaEnClase = KEYWORDS_PRACTICA_EN_CLASE.some((kw) =>
    normalized.includes(kw)
  );
  if (isPracticaEnClase) return BADGE_VARIANT_INFO;
  if (normalized.includes(KEYWORD_PARCIAL) || normalized.includes(KEYWORD_RECUPERATORIO)) return BADGE_VARIANT_WARNING;
  if (normalized.includes(KEYWORD_FINAL)) return BADGE_VARIANT_DANGER;
  if (normalized.includes(KEYWORD_ENTREGA) || normalized.includes(KEYWORD_REENTREGA)) return BADGE_VARIANT_PRIMARY;
  if (REGEX_PRESENTACION_TP.test(normalized)) return BADGE_VARIANT_PRIMARY_OUTLINE;
  return BADGE_VARIANT_INFO;
}
