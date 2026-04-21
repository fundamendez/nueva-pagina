import type { ReactNode } from "react";
import Layout from "@theme/Layout";
import useBaseUrl from "@docusaurus/useBaseUrl";
import Link from "@docusaurus/Link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

import styles from "./material.module.css";
import PageHero from "../components/PageHero";

import { TUTORIALES, type VideoItem } from "../../data/videos";

function VideoList({ items, section }: { items: VideoItem[]; section: "clases" | "tutoriales" }) {
  const baseUrl = useBaseUrl("/ver-clases-grabadas");

  if (items.length === 0) {
    return <p className={styles.emptyMessage}>No hay videos aún.</p>;
  }

  return (
    <div className="row">
      {items.map((v) => {
        const href = `${baseUrl}?sec=${section}&t=${encodeURIComponent(v.title)}`;
        return (
          <div key={v.title} className="col col--6 margin-bottom--md">
            <Link to={href} className={styles.resourceCard}>
              <div className={styles.resourceTitle}>
                {v.title}
              </div>
              <div className={styles.resourceIcon}>
                <FontAwesomeIcon icon={faPlay} />
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
}

export default function TutorialesPage(): ReactNode {
  const imgSrc = useBaseUrl("/img/ralph-gato.jpg");

  return (
    <Layout title="Tutoriales" description="Tutoriales de Fundamentos de Programación">
      <main>
        <PageHero
          title="Tutoriales"
          subtitle="Videos para aprender a usar las herramientas de la cursada."
          imageSrc={imgSrc}
          imageAlt="Simpsons meme"
        />
        <div className="container margin-vert--lg">
          <div className="row">
            <div className="col col--10 col--offset-1">
              <VideoList items={TUTORIALES} section="tutoriales" />
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}