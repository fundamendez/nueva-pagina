export type VideoSource = "drive" | "youtube";

export type VideoItem = {
  title: string;
  source: VideoSource;
  fileId?: string;     // Drive.
  youtubeId?: string;  // YouTube.
};

// This section is where the recorded classes are uploaded.
export const CLASES: VideoItem[] = [
  { title: "Clase del 19-08-2025", source: "drive", fileId: "1M7jPCvLj-j7ynN2vYHU5LmthMdw6c2ic" },
  { title: "Clase del 16-09-2025", source: "drive", fileId: "1EJU-UcQREmv-HyGWeBpbdfgjrIGNGGq0" },
  { title: "Clase del 18-09-2025", source: "drive", fileId: "1ibLVwRDZcEqjM0DnQkRSCBgeXKfcdmTC" },
  { title: "Clase del 23-09-2025", source: "drive", fileId: "1LpU1R6wovti8FA-KJllH8ohS9Fv4RUdv" },
  { title: "Clase del 25-09-2025", source: "drive", fileId: "1m94fsBYrmrPZ1AvAihv4JjGIZzYg70dU" },
  { title: "Clase del 21-10-2025", source: "drive", fileId: "1p4UhHTl3_2LW1GnxjuWXwfZcl0DthWIi" },
  { title: "Clase del 28-10-2025", source: "drive", fileId: "1pxjVM9WLMiFSZFzUaCEdYhnVK-cgudD_" },
  { title: "Clase del 30-10-2025", source: "drive", fileId: "1bafpuTdeq8Gy3gA1xEhhscBK7-OuQebk" },
  { title: "Clase del 13-11-2025", source: "drive", fileId: "1pYwSiUBkghe663zWs3yICeKXjcAFHgTg" },
  { title: "Clase del 18-11-2025", source: "drive", fileId: "1sVBTC5ri7XlA1OLzXYbJcgXJG5ZQo2pS" },
  { title: "Clase del 20-11-2025", source: "drive", fileId: "1iDLUHFbgk1Vx9GprA1Qpr5LgZhLBhoDj" },
  { title: "Clase del 25-11-2025", source: "drive", fileId: "1xFGKC5-rTcHKl44BattLFYxBAjKe8xfG" },
];

// This section is where the tutorials are uploaded.
export const TUTORIALES: VideoItem[] = [
  { title: "Instalación de Virtual Machine - Versión nueva", source: "drive", fileId: "1ndhlBqWaWp8iBexmX_ASnW80i4hNzvlf" },
  { title: "Instalación de Virtual Machine - Versión antigua", source: "youtube", youtubeId: "oUR75_o6eXw" },
  { title: "Primeros pasos en Linux", source: "youtube", youtubeId: "dPs_cimCYmQ" },
];

// Functions to build URLs for embedding, opening, and downloading videos.
export function buildEmbedUrl(v: VideoItem): string {
  if (v.source === "drive") return `https://drive.google.com/file/d/${v.fileId}/preview`;
  return `https://www.youtube.com/embed/${v.youtubeId}`;
}

export function buildOpenUrl(v: VideoItem): string {
  if (v.source === "drive") return `https://drive.google.com/file/d/${v.fileId}/view`;
  return `https://www.youtube.com/watch?v=${v.youtubeId}`;
}

export function buildDownloadUrl(v: VideoItem): string | null {
  if (v.source !== "drive") return null;
  return `https://drive.google.com/uc?export=download&id=${v.fileId}`;
}
