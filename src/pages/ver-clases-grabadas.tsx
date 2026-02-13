import React from "react";
import Layout from "@theme/Layout";
import useBaseUrl from "@docusaurus/useBaseUrl";
import Link from "@docusaurus/Link";
import { useLocation } from "@docusaurus/router";
import styles from "./ver-clases-grabadas.module.css";

type LocationState = {
  title?: string;
  embedUrl?: string;
  openUrl?: string;
  downloadUrl?: string | null;
};

export default function ClaseGrabadaVer() {
  const location = useLocation();
  const state = (location.state || {}) as LocationState;

  const title = state.title ?? "Video";
  const embedUrl = state.embedUrl ?? "";
  const openUrl = state.openUrl ?? null;
  const downloadUrl = state.downloadUrl ?? null;

  return (
    <Layout title={title}>
      <main
        className={styles.container}
        style={{
          backgroundImage: `url(${useBaseUrl("/img/fondo-clases-grabadas.jpg")})`,
        }}
      >
        <div className={styles.overlay}>
          <div className={styles.topRow}>
            <Link className={styles.backLink} to={useBaseUrl("/clases-grabadas")}>
              ← Volver
            </Link>
          </div>

          <h1 className={styles.title}>{title}</h1>

          <div className={styles.videoWrapper}>
            {embedUrl ? (
              <iframe src={embedUrl} title={title} allow="autoplay" allowFullScreen />
            ) : (
              <p className={styles.errorText}>
                No se encontró el video (probá volver y entrar de nuevo).
              </p>
            )}
          </div>

          <div className={styles.actions}>
            {openUrl ? (
              <a className={styles.secondaryButton} href={openUrl} target="_blank" rel="noreferrer">
                Abrir
              </a>
            ) : null}

            {downloadUrl ? (
              <a className={styles.secondaryButton} href={downloadUrl} target="_blank" rel="noreferrer">
                Descargar
              </a>
            ) : null}
          </div>
        </div>
      </main>
    </Layout>
  );
}
