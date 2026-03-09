import React, { type ReactNode } from "react";
import Layout from "@theme/Layout";
import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from "./docentes.module.css";
import PageHero from "../components/PageHero";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSlack } from "@fortawesome/free-brands-svg-icons";

const BASE_IMG_PATH = "/img/docentes";

interface DocenteProps {
  name: string;
  id: string;
  ext1?: string; // Usar solo si la foto tiene extension distinta a 'jpg'
  ext2?: string; // Usar solo si la foto tiene extension distinta a 'jpg'
  slackCode?: string;
}

const docentesList: DocenteProps[] = [
  { name: "Agus B.", id: "agusB", slackCode: "D06L48CPD8E" },
  { name: "Agus F.", id: "agusF", slackCode: "D06LAT5KY3C" },
  { name: "Agus J.", id: "agusJ", slackCode: "D09FW4UDCKE" },
  { name: "Agus S.", id: "agusS", slackCode: "D0AKX47ELSV" },
  { name: "Ani", id: "ani", ext1: "jpeg", slackCode: "D09GPGNQUKF" },
  { name: "Bauti", id: "bauti", slackCode: "D06TS2F21P1" },
  { name: "Berni", id: "berni", slackCode: "D06LDB9N77W" },
  { name: "Caro", id: "caro", slackCode: "D0AKX4FTK09" },
  { name: "Danny", id: "danny", slackCode: "D07J4FT25QC" },
  { name: "Feli", id: "feli", slackCode: "" },
  { name: "Juampi", id: "juampi", slackCode: "D07EZEPTPMW" },
  {
    name: "Mariano",
    id: "mariano",
    ext1: "jpeg",
    ext2: "jpeg",
    slackCode: "D06LDER208L",
  },
  {
    name: "Mar",
    id: "mar",
    ext1: "jpeg",
    ext2: "jpeg",
    slackCode: "D0AK2PBKDCP",
  },
  { name: "Martu", id: "martu", slackCode: "D0AKJ75EYCS" },
  { name: "May", id: "may", ext1: "jpeg", slackCode: "D07G4BTEWTA" },
  { name: "Solci", id: "sol", slackCode: "D0AD6ULTL5V" },
  { name: "Tomi", id: "tomi", slackCode: "D06LPH2Q1PT" },
  {
    name: "Tute",
    id: "tute",
    ext1: "jpeg",
    ext2: "jpeg",
    slackCode: "D06MQE3AD9B",
  },
  {
    name: "Yoel",
    id: "yoel",
    ext1: "jpeg",
    ext2: "jpeg",
    slackCode: "D06MT8M6Y2X",
  },
];

function DocenteCard({
  name,
  id,
  ext1 = "jpg",
  ext2 = "jpg",
  slackCode,
}: DocenteProps) {
  const photo = `${BASE_IMG_PATH}/${id}1.${ext1}`;
  const photoHover = `${BASE_IMG_PATH}/${id}2.${ext2}`;

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={useBaseUrl(photo)} alt={name} className={styles.imgNormal} />
        <img
          src={useBaseUrl(photoHover)}
          alt={`${name} divertido`}
          className={styles.imgHover}
        />
      </div>
      <div className={styles.nameRow}>
        <h3 className={styles.name}>{name}</h3>
        {slackCode && (
          <a
            href={`https://fundamendez.slack.com/archives/${slackCode}`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.slackLink}
            title={`Mensaje a ${name} en Slack`}
          >
            <FontAwesomeIcon icon={faSlack} />
          </a>
        )}
      </div>
    </div>
  );
}

export default function Docentes(): ReactNode {
  const imgSrc = useBaseUrl("/img/homero-bar.jpg");
  return (
    <Layout
      title="Docentes"
      description="Conocé al equipo docente de FundaMendez"
    >
      <main>
        <PageHero
          title="Nosotros"
          subtitle="Conocé al equipo docente de FundaMendez"
          imageSrc={imgSrc}
          imageAlt="Simpsons meme"
        />

        <section className={styles.gridContainer}>
          {docentesList.map((props) => (
            <DocenteCard key={props.id} {...props} />
          ))}
        </section>
      </main>
    </Layout>
  );
}
