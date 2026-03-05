import React from "react";
import Layout from "@theme/Layout";
import useBaseUrl from "@docusaurus/useBaseUrl";
import Link from "@docusaurus/Link";
import styles from "./clases-grabadas.module.css";
import PageHero from "../components/PageHero";
import {
  CLASES,
  TUTORIALES,
  buildOpenUrl,
  buildDownloadUrl,
  type VideoItem,
} from "../data/videos";

export default function ClasesGrabadas() {
  const clases = CLASES;
  const tutoriales = TUTORIALES;

  const imgSrc = useBaseUrl("/img/abuelo-anecdota.jpg");

  const renderList = (
    items: VideoItem[],
    section: "clases" | "tutoriales",
    showDownload: boolean,
    showOpen: boolean,
  ) => (
    <div className={styles.list}>
      {items.map((v) => {
        const openUrl = buildOpenUrl(v);
        const downloadUrl = buildDownloadUrl(v);
        const detailHref = useBaseUrl(
          `/ver-clases-grabadas?sec=${section}&t=${encodeURIComponent(v.title)}`,
        );

        return (
          <section key={`${section}-${v.title}`} className={styles.row}>
            <div className={styles.rowTitle}>{v.title}</div>

            <div className={styles.rowActions}>
              <Link className={styles.primaryButton} to={detailHref}>
                Ver
              </Link>

              {showDownload && downloadUrl ? (
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
      <main className={styles.container}>
        <PageHero
          title="Clases Grabadas"
          subtitle="Accedé a todas las clases y tutoriales grabados del curso. Repasá lo que necesites, cuando quieras."
          imageSrc={imgSrc}
          imageAlt="Simpsons meme"
        />

        <div className={styles.content}>
          <div className={styles.section}>
            <h1 className={styles.title}>Clases Grabadas</h1>
            {renderList(clases, "clases", false, true)}
          </div>

          <div className={styles.sectionSpacer} />

          <div className={styles.section}>
            <h1 className={styles.title}>Tutoriales</h1>
            {renderList(tutoriales, "tutoriales", true, true)}
          </div>
        </div>
      </main>
    </Layout>
  );
}
