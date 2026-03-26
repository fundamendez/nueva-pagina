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
  { name: "Agus B.", id: "agusB", slackCode: "U06LZLXPLLQ" },
  { name: "Agus F.", id: "agusF", slackCode: "U06LZL8G43A" },
  { name: "Agus J.", id: "agusJ", slackCode: "U09B6SG6A5A" },
  { name: "Agus S.", id: "agusS", slackCode: "U09AG00G8KV" },
  { name: "Ani", id: "ani", ext1: "jpeg", slackCode: "U08FSCC1DHQ" },
  { name: "Bauti", id: "bauti", slackCode: "U06P4J0UWH1" },
  { name: "Berni", id: "berni", slackCode: "U06LAPZE7GT" },
  { name: "Caro", id: "caro", slackCode: "U0AJYJZU10X" },
  { name: "Danny", id: "danny", slackCode: "U06QGSZQK8X" },
  { name: "Feli", id: "feli", slackCode: "U0AJYJYHTT9" },
  { name: "Juampi", id: "juampi", slackCode: "U06P4J00V0T" },
  {
    name: "Mar",
    id: "mar",
    ext1: "jpeg",
    ext2: "jpeg",
    slackCode: "U08FSCBH2F4",
  },
  { name: "Marcos", id: "marcos", slackCode: "U09BWBVHKUY" },
  {
    name: "Mariano",
    id: "mariano",
    ext1: "jpeg",
    ext2: "jpeg",
    slackCode: "U06LPLJ19S5",
  },
  { name: "Martu", id: "martu", slackCode: "U07EJQSN65R" },
  { name: "May", id: "may", ext1: "jpeg", slackCode: "U06P1Q1EE4D" },
  { name: "Solci", id: "sol", slackCode: "U07F7BEKCHW" },
  { name: "Tomi", id: "tomi", slackCode: "U06LZLXV132" },
  {
    name: "Tute",
    id: "tute",
    ext1: "jpeg",
    ext2: "jpeg",
    slackCode: "U06MLNCF99U",
  },
  {
    name: "Yoel",
    id: "yoel",
    ext1: "jpeg",
    ext2: "jpeg",
    slackCode: "U06MCQN0EAK",
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
            href={`https://slack.com/app_redirect?channel=${slackCode}`}
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
