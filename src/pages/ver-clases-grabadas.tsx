import React, { useMemo } from "react";
import Layout from "@theme/Layout";
import useBaseUrl from "@docusaurus/useBaseUrl";
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
  const { title, embedUrl, openUrl, downloadUrl } = useMemo(() => {
    const params = new URLSearchParams(location.search);
    const sec = params.get("sec"); // "clases" | "tutoriales".
    const t = params.get("t");     // Title.
    const list = sec === "tutoriales" ? TUTORIALES : CLASES;
    const item = t ? list.find((v) => v.title === t) : undefined;
    if (!item) {
      return {
        title: "Video",
        embedUrl: "",
        openUrl: null as string | null,
        downloadUrl: null as string | null,
      };
    }

    return {
      title: item.title,
      embedUrl: buildEmbedUrl(item),
      openUrl: buildOpenUrl(item),
      downloadUrl: buildDownloadUrl(item),
    };
  }, [location.search]);

  return (
    <Layout title={title}>
      <main
        className={styles.container}
        style={{
          backgroundImage: `url(${useBaseUrl("/img/fondo-clases-grabadas.jpg")})`,
        }}
      >
        <div className={styles.overlay}>
          <h1 className={styles.title}>{title}</h1>
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

            {downloadUrl ? (
              <a
                className={styles.downloadButton}
                href={downloadUrl}
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
