import type { ReactNode } from "react";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { usePluginData } from "@docusaurus/useGlobalData";
import Link from "@docusaurus/Link";

import styles from "./material.module.css";
import PageHero from "../components/PageHero";

import { CLASES, type VideoItem } from "../../data/videos";

interface MaterialFile {
  name: string;
  extension: string;
}

interface MaterialCategory {
  name: string;
  dir: string;
  files: MaterialFile[];
}

function formatFileName(name: string): string {
  const withoutExt = name.replace(/\.[^.]+$/, "");
  const withoutPrefix = withoutExt.replace(/^\d+_/, "");
  const spaced = withoutPrefix
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2")
    .replace(/([a-zA-Z])(\d)/g, "$1 $2")
    .replace(/(\d)([a-zA-Z])/g, "$1 $2");
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

function formatCategoryName(name: string): string {
  const spaced = name
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2");
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

function FileTable({ files, dir }: { files: MaterialFile[]; dir: string }) {
  const baseUrl = useBaseUrl(`/material/${dir}/`);

  if (files.length === 0) {
    return <p className={styles.emptyMessage} style={{ textAlign: "center", fontStyle: "italic", opacity: 0.7 }}>No hay material disponible.</p>;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {files.map((file) => (
        <a
          key={file.name}
          href={`${baseUrl}${file.name}`}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.resourceCardCompact}
        >
          <div className={styles.resourceTitleCompact}>
            {formatFileName(file.name)}
          </div>
          <div className={styles.resourceIconCompact}>
            <span>&#x2193;&#xFE0E;</span>
          </div>
        </a>
      ))}
    </div>
  );
}

function VideoList({ items, section }: { items: VideoItem[]; section: "clases" | "tutoriales" }) {
  const baseUrl = useBaseUrl("/ver-clases-grabadas");

  if (items.length === 0) {
    return <p className={styles.emptyMessage} style={{ textAlign: "center", fontStyle: "italic", opacity: 0.7 }}>No hay videos aún.</p>;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {items.map((v) => {
        const href = `${baseUrl}?sec=${section}&t=${encodeURIComponent(v.title)}`;
        return (
          <Link key={v.title} to={href} className={styles.resourceCardCompact}>
            <div className={styles.resourceTitleCompact}>
              {v.title}
            </div>
            <div className={styles.resourceIconCompact}>
              <span>&#x25B6;&#xFE0E;</span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default function ClasesPage(): ReactNode {
  const categories = usePluginData(
    "plugin-material-files",
  ) as MaterialCategory[];

  const getCategory = (categoryName: string, dir: string) => {
    return categories.find((c) => c.name === categoryName) ?? { name: categoryName, dir, files: [] };
  };

  const teorica = getCategory("teórica", "teórica");
  const practica = getCategory("práctica", "práctica");

  const imgSrc = useBaseUrl("/img/homero-clase.jpg");
  
  return (
    <Layout
      title="Clases"
    >
      <main>
        <PageHero
          title="Clases"
          subtitle="Acá vas a encontrar el material visto en las clases y clases grabadas."
          imageSrc={imgSrc}
          imageAlt="Simpsons meme"
        />
        <div className="container margin-vert--xl">
          <div className="row">
            
            <div className="col col--4">
              <Heading as="h2" style={{ textAlign: "center", marginBottom: "1.5rem" }}>
                {formatCategoryName(teorica.name)}
              </Heading>
              <FileTable files={teorica.files} dir={teorica.dir} />
            </div>

            <div className="col col--4">
              <Heading as="h2" style={{ textAlign: "center", marginBottom: "1.5rem" }}>
                {formatCategoryName(practica.name)}
              </Heading>
              <FileTable files={practica.files} dir={practica.dir} />
            </div>

            <div className="col col--4">
              <Heading as="h2" style={{ textAlign: "center", marginBottom: "1.5rem" }}>
                Clases Grabadas
              </Heading>
              <VideoList items={CLASES} section="clases" />
            </div>

          </div>
        </div>
      </main>
    </Layout>
  );
}