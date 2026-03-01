import type { ReactNode } from "react";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { usePluginData } from "@docusaurus/useGlobalData";

import styles from "./material.module.css";

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
  // "1_IntroduccionAlCurso.pdf" -> "Introduccion Al Curso"

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

function FileTable({
  files,
  dir,
}: {
  files: MaterialFile[];
  dir: string;
}) {
  const baseUrl = useBaseUrl(`/material/${dir}/`);

  if (files.length === 0) {
    return <p className={styles.emptyMessage}>No hay archivos disponibles.</p>;
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

export default function MaterialPage(): ReactNode {
  const categories = usePluginData(
    "plugin-material-files",
  ) as MaterialCategory[];

  return (
    <Layout
      title="Material"
      description="Material de cursada de Fundamentos de Programación - FIUBA - Curso Mendez"
    >
      <main className="container margin-vert--lg">
        <Heading as="h1">Material</Heading>
        <p>Acá vas a encontrar el material complementario para la cursada.</p>

        <div className={styles.categoriesGrid}>
          {categories.map((category) => (
            <section key={category.name} className={styles.categoryCard}>
              <Heading as="h2">{formatCategoryName(category.name)}</Heading>
              <FileTable files={category.files} dir={category.dir} />
            </section>
          ))}
        </div>
      </main>
    </Layout>
  );
}
