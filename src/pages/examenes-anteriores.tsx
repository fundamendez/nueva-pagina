import type { ReactNode } from "react";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { usePluginData } from "@docusaurus/useGlobalData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDownLong } from "@fortawesome/free-solid-svg-icons";

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

function FileList({ files, dir }: { files: MaterialFile[]; dir: string }) {
  const baseUrl = useBaseUrl(`/material/${dir}/`);

  if (files.length === 0) {
    return (
      <p
        className={styles.emptyMessage}
        style={{ textAlign: "center", fontStyle: "italic", opacity: 0.7 }}
      >
        No hay exámenes disponibles todavía.
      </p>
    );
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
            <FontAwesomeIcon icon={faArrowDownLong} />
          </div>
        </a>
      ))}
    </div>
  );
}

export default function ExamenesAnterioresPage(): ReactNode {
  const categories = usePluginData("plugin-material-files") as MaterialCategory[];

  const getCategory = (categoryName: string, dir: string) => {
    return categories.find((c) => c.name === categoryName) ?? { name: categoryName, dir, files: [] };
  };

  const parciales = getCategory("parciales", "4_parciales");
  const finales = getCategory("finales", "5_finales");

  const imgSrc = useBaseUrl("/img/examenes-meme.jpg");

  return (
    <Layout title="Exámenes anteriores" description="Parciales y finales de cuatrimestres anteriores">
      <main>
        <PageHero
          title="Exámenes anteriores"
          subtitle="Parciales y finales de cuatrimestres anteriores para practicar."
          imageSrc={imgSrc}
          imageAlt="Simpsons meme"
        />
        <div className="container margin-vert--xl">
          <div className="row">

            <div className="col col--6">
              <Heading as="h2" style={{ textAlign: "center", marginBottom: "1.5rem" }}>
                Parciales
              </Heading>
              <FileList files={parciales.files} dir={parciales.dir} />
            </div>

            <div className="col col--6">
              <Heading as="h2" style={{ textAlign: "center", marginBottom: "1.5rem" }}>
                Finales
              </Heading>
              <FileList files={finales.files} dir={finales.dir} />
            </div>

          </div>
        </div>
      </main>
    </Layout>
  );
}
