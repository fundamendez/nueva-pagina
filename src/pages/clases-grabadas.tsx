import React from "react";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";
import useBaseUrl from "@docusaurus/useBaseUrl";
import Link from "@docusaurus/Link";
import styles from "./clases-grabadas.module.css";
import PageHero from "../components/PageHero";
import { CLASES, TUTORIALES, type VideoItem } from "../../data/videos";

function VideoList({
  items,
  section,
}: {
  items: VideoItem[];
  section: "clases" | "tutoriales";
}) {
  const baseUrl = useBaseUrl("/ver-clases-grabadas");

  if (items.length === 0) {
    return <p className={styles.emptyMessage}>No hay videos disponibles.</p>;
  }

  return (
    <ul className={styles.videoList}>
      {items.map((v) => {
        const href = `${baseUrl}?sec=${section}&t=${encodeURIComponent(v.title)}`;
        return (
          <li key={v.title}>
            <Link to={href} className={styles.videoLink}>
              {v.title}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export default function ClasesGrabadas() {
  const imgSrc = useBaseUrl("/img/abuelo-anecdota.jpg");

  return (
    <Layout title="Clases Grabadas">
      <main>
        <PageHero
          title="Clases Grabadas"
          subtitle="Accedé a todas las clases y tutoriales grabados del curso. Repasá lo que necesites, cuando quieras."
          imageSrc={imgSrc}
          imageAlt="Simpsons meme"
        />
        <div className="container margin-vert--lg">
          <div className={styles.categoriesGrid}>
            <section className={styles.categoryCard}>
              <Heading as="h2">Clases Grabadas</Heading>
              <VideoList items={CLASES} section="clases" />
            </section>
            <section className={styles.categoryCard}>
              <Heading as="h2">Tutoriales</Heading>
              <VideoList items={TUTORIALES} section="tutoriales" />
            </section>
          </div>
        </div>
      </main>
    </Layout>
  );
}
