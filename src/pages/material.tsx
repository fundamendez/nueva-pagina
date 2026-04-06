import type { ReactNode } from "react";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { usePluginData } from "@docusaurus/useGlobalData";
import Link from "@docusaurus/Link";

import styles from "./material.module.css";
import PageHero from "../components/PageHero";

import { CLASES, TUTORIALES, type VideoItem } from "../../data/videos";

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
    return <p className={styles.emptyMessage}>No hay material disponible.</p>;
  }

  return (
    <ul className={styles.fileList}>
      {files.map((file) => (
        <li key={file.name}>
          <a
            href={`${baseUrl}${file.name}`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.fileLink}
          >
            {formatFileName(file.name)}
          </a>
        </li>
      ))}
    </ul>
  );
}

function VideoList({
  items,
  section,
}: {
  items: VideoItem[];
  section: "clases" | "tutoriales";
}) {
  const baseUrl = useBaseUrl("/ver-clases-grabadas");

  if (items.length === 0) {
    return <p className={styles.emptyMessage}>No hay videos aún.</p>;
  }

  return (
    <ul className={styles.fileList}>
      {items.map((v) => {
        const href = `${baseUrl}?sec=${section}&t=${encodeURIComponent(v.title)}`;
        return (
          <li key={v.title}>
            <Link to={href} className={styles.fileLink}>
              {v.title}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export default function MaterialPage(): ReactNode {
  const categories = usePluginData(
    "plugin-material-files",
  ) as MaterialCategory[];

  const getCategory = (categoryName: string, dir: string) => {
    return categories.find((c) => c.name === categoryName) ?? { name: categoryName, dir, files: [] };
  };

  const teorica = getCategory("teórica", "teórica");
  const practica = getCategory("práctica", "práctica");
  const apuntesViejos = getCategory("apuntesViejos", "apuntesViejos");

  const imgSrc = useBaseUrl("/img/ralph-gato.jpg");
  
  return (
    <Layout
      title="Material"
      description="Material de cursada de Fundamentos de Programación - FIUBA - Curso Mendez"
    >
      <main>
        <PageHero
          title="Material"
          subtitle="Acá vas a encontrar todo el material complementario, clases grabadas y tutoriales de la cursada."
          imageSrc={imgSrc}
          imageAlt="Simpsons meme"
        />
        <div className="container margin-vert--lg">
          <div className={styles.categoriesGrid}>
            
            <section className={styles.categoryCard}>
              <Heading as="h2">{formatCategoryName(teorica.name)}</Heading>
              <FileTable files={teorica.files} dir={teorica.dir} />
            </section>

            <section className={styles.categoryCard}>
              <Heading as="h2">{formatCategoryName(practica.name)}</Heading>
              <FileTable files={practica.files} dir={practica.dir} />
            </section>

            <section className={styles.categoryCard}>
              <Heading as="h2">Clases Grabadas</Heading>
              <VideoList items={CLASES} section="clases" />
            </section>

            <section className={styles.categoryCard}>
              <Heading as="h2">Apuntes Viejos</Heading>
              <FileTable files={apuntesViejos.files} dir={apuntesViejos.dir} />
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