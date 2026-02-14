import React from "react";
import Layout from "@theme/Layout";
import useBaseUrl from "@docusaurus/useBaseUrl";
import Link from "@docusaurus/Link";
import styles from "./clases-grabadas.module.css";
import { CLASES, TUTORIALES, buildOpenUrl, buildDownloadUrl } from "../data/videos";

export default function ClasesGrabadas() {
  const clases = CLASES;
  const tutoriales = TUTORIALES;

  const bg = `url(${useBaseUrl("/img/fondo-clases-grabadas.jpg")})`;

  const renderGrid = (
    items: VideoItem[],
    section: "clases" | "tutoriales",
    showOpen: boolean
  ) => (
    <div className={styles.grid}>
      {items.map((v) => {
        const openUrl = buildOpenUrl(v);
        const downloadUrl = buildDownloadUrl(v);
        const detailHref = useBaseUrl(
          `/ver-clases-grabadas?sec=${section}&t=${encodeURIComponent(v.title)}`
        );

        return (
          <section key={`${section}-${v.title}`} className={styles.card}>
            <h2 className={styles.cardTitle}>{v.title}</h2>
            <div className={styles.actions}>
              <Link className={styles.primaryButton} to={detailHref}>
                Ver
              </Link>

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

              {showOpen ? (
                <a
                  className={styles.secondaryButton}
                  href={openUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Ver en plataforma original
                </a>
              ) : null}
            </div>
          </section>
        );
      })}
    </div>
  );

  return (
    <Layout title="Clases Grabadas">
      <main className={styles.container} style={{ backgroundImage: bg }}>
        <div className={styles.overlay}>
          <h1 className={styles.title}>Clases Grabadas</h1>
          {renderGrid(clases, "clases", true)}
        </div>

        <div className={styles.sectionSpacer} />

        <div className={styles.overlay}>
          <h1 className={styles.title}>Tutoriales</h1>
          {renderGrid(tutoriales, "tutoriales", true)}
        </div>
      </main>
    </Layout>
  );
}
