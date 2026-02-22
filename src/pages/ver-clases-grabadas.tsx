import React, { useMemo } from "react";
import Layout from "@theme/Layout";
import useBaseUrl from "@docusaurus/useBaseUrl";
import Link from "@docusaurus/Link";
import { useLocation } from "@docusaurus/router";
import styles from "./ver-clases-grabadas.module.css";

import {
  CLASES,
  TUTORIALES,
  buildEmbedUrl,
  buildOpenUrl,
  buildDownloadUrl,
} from "../data/videos";

export default function VerClasesGrabadas() {
  const location = useLocation();

  const { title, embedUrl, openUrl, downloadUrl, section } = useMemo(() => {
    const params = new URLSearchParams(location.search);
    const sec = params.get("sec"); // "clases" | "tutoriales"
    const t = params.get("t");     // Title

    const normalizedSection = sec === "tutoriales" ? "tutoriales" : "clases";
    const list = normalizedSection === "tutoriales" ? TUTORIALES : CLASES;

    const item = t ? list.find((v) => v.title === t) : undefined;

    if (!item) {
      return {
        title: "Video",
        embedUrl: "",
        openUrl: null as string | null,
        downloadUrl: null as string | null,
        section: normalizedSection as "clases" | "tutoriales",
      };
    }

    return {
      title: item.title,
      embedUrl: buildEmbedUrl(item),
      openUrl: buildOpenUrl(item),
      downloadUrl: buildDownloadUrl(item),
      section: normalizedSection as "clases" | "tutoriales",
    };
  }, [location.search]);

  const canShowDownload = section === "tutoriales" && !!downloadUrl;

  return (
    <Layout title={title}>
      <main
        className={styles.container}
        style={{
          backgroundImage: `url(${useBaseUrl("/img/fondo-clases-grabadas.jpg")})`,
        }}
      >
        <div className={styles.overlay}>
          <div className={styles.headerRow}>
            <Link className={styles.backLink} to={useBaseUrl("/clases-grabadas")}>
              ← Volver
            </Link>

            <h1 className={styles.title}>{title}</h1>

            <div className={styles.headerSpacer} />
          </div>

          <div className={styles.videoWrapper}>
            {embedUrl ? (
              <iframe
                src={embedUrl}
                title={title}
                allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <p className={styles.errorText}>
                No se encontró el video (probá volver y entrar de nuevo).
              </p>
            )}
          </div>

          <div className={styles.actions}>
            {openUrl ? (
              <a
                className={styles.primaryButton}
                href={openUrl}
                target="_blank"
                rel="noreferrer"
              >
                Ver en plataforma original
              </a>
            ) : null}

            {canShowDownload ? (
              <a
                className={styles.downloadButton}
                href={downloadUrl!}
                target="_blank"
                rel="noreferrer"
              >
                Descargar
              </a>
            ) : null}
          </div>
        </div>
      </main>
    </Layout>
  );
}
