import type { ReactNode } from "react";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";
import useBaseUrl from "@docusaurus/useBaseUrl";

import styles from "./encuestas.module.css";
import PageHero from "../components/PageHero";

const encuestas: {
  year: number;
  quarters: { label: string; url: string }[];
}[] = [
  {
    year: 2025,
    quarters: [
      {
        label: "1er Cuatrimestre",
        url: "/encuestas/encuesta_2025_1C.html",
      },
      {
        label: "2do Cuatrimestre",
        url: "/encuestas/encuesta_2025_2C.html",
      },
    ],
  },
  {
    year: 2024,
    quarters: [
      {
        label: "1er Cuatrimestre",
        url: "/encuestas/encuesta_2024_1C.html",
      },
      {
        label: "2do Cuatrimestre",
        url: "/encuestas/encuesta_2024_2C.html",
      },
    ],
  },
];

export default function Encuestas(): ReactNode {
  const imgSrc = useBaseUrl("/img/tabla.jpg");

  return (
    <Layout
      title="Encuesta de fin de curso"
      description="Encuestas de fin de curso - Fundamentos de Programación - FIUBA - Curso Mendez"
    >
      <main>
        <PageHero
          title="Encuestas"
          subtitle="Tu opinión nos ayuda a mejorar el curso. ¡Gracias por completarla!"
          imageSrc={imgSrc}
          imageAlt="Simpsons meme"
        />
        <div className="container margin-vert--lg">
          <div className={styles.yearsGrid}>
            {encuestas.map(({ year, quarters }) => (
              <section key={year} className={styles.yearCard}>
                <Heading as="h2">{year}</Heading>
                <ul className={styles.quarterList}>
                  {quarters.map(({ label, url }) => (
                    <li key={label}>
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.quarterLink}
                      >
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>
      </main>
    </Layout>
  );
}
