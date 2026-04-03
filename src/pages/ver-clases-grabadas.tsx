import React, { useMemo } from "react";
import Layout from "@theme/Layout";
import useBaseUrl from "@docusaurus/useBaseUrl";
import Link from "@docusaurus/Link";
import { useHistory, useLocation } from "@docusaurus/router";
import styles from "./ver-clases-grabadas.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import {
  CLASES,
  TUTORIALES,
  OCULTOS,
  buildEmbedUrl,
  buildOpenUrl,
  buildDownloadUrl,
} from "../../data/videos";

export default function VerClasesGrabadas() {
  const location = useLocation();
  const history = useHistory();

  const { title, embedUrl, openUrl, downloadUrl, section } = useMemo(() => {
    const params = new URLSearchParams(location.search);
    const sec = params.get("sec"); // "clases" | "tutoriales"
    const t = params.get("t"); // Title

    let list = CLASES;
    let normalizedSection = "clases";

    if (sec === "tutoriales") {
      list = TUTORIALES;
      normalizedSection = "tutoriales";
    } else if (sec === "ocultos") {
      list = OCULTOS;
      normalizedSection = "ocultos";
    }

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
      <main className={styles.container}>
        <div className={styles.section}>
          <div className={styles.headerRow}>
            <a
              className={styles.backLink}
              href="#"
              onClick={(e) => {
                e.preventDefault(); 
                history.goBack();  
              }}
            >
              <FontAwesomeIcon icon={faArrowLeft} /> Volver
            </a>

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
