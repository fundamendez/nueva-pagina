import type { ReactNode } from "react";
import Layout from "@theme/Layout";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { usePluginData } from "@docusaurus/useGlobalData";

import styles from "./material.module.css";
import PageHero from "../components/PageHero";

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

function FileTable({ files, dir }: { files: MaterialFile[]; dir: string }) {
  const baseUrl = useBaseUrl(`/material/${dir}/`);

  if (files.length === 0) {
    return <p className={styles.emptyMessage}>No hay material disponible.</p>;
  }

  return (
    <div className="row">
      {files.map((file) => (
        <div key={file.name} className="col col--6 margin-bottom--md">
          <a
            href={`${baseUrl}${file.name}`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.resourceCard}
          >
            <div className={styles.resourceTitle}>
              {formatFileName(file.name)}
            </div>

            <div className={styles.resourceIcon}>
              ↗
            </div>
          </a>
        </div>
      ))}
    </div>
  );
}

export default function BibliografiaPage(): ReactNode {
  const categories = usePluginData("plugin-material-files") as MaterialCategory[];

  const apuntesViejos = categories.find((c) => c.name === "apuntesViejos") ?? { 
    name: "apuntesViejos", 
    dir: "apuntesViejos", 
    files: [] 
  };

  const imgSrc = useBaseUrl("/img/abuelo-anecdota.jpg");

  return (
    <Layout title="Bibliografía Complementaria" description="Apuntes viejos y material extra">
      <main>
        <PageHero
          title="Bibliografía Complementaria"
          subtitle="Material histórico, apuntes de cuatrimestres anteriores y lectura adicional."
          imageSrc={imgSrc}
          imageAlt="Simpsons meme"
        />
        <div className="container margin-vert--lg">
          <div className="row">
            <div className="col col--10 col--offset-1">
              <FileTable files={apuntesViejos.files} dir={apuntesViejos.dir} />
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}