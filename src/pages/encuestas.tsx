import React, { useState, type ReactNode } from "react";
import Layout from "@theme/Layout";
import useBaseUrl from "@docusaurus/useBaseUrl";
import "../css/pages.css";
import PageHero from "../components/PageHero";

type Encuestas = {
  [year: number]: {
    [quarter: string]: string;
  };
};

const EncuestasAccordion = () => {
  const [openYear, setOpenYear] = useState<string | null>(null);

  const encuestas: Encuestas = {
    2025: {
      "1er Cuatrimestre": "/nueva-pagina/encuestas/encuesta_2025_1C.html",
      "2do Cuatrimestre": "/nueva-pagina/encuestas/encuesta_2025_2C.html",
    },
    2024: {
      "1er Cuatrimestre": "/nueva-pagina/encuestas/encuesta_2024_1C.html",
      "2do Cuatrimestre": "/nueva-pagina/encuestas/encuesta_2024_2C.html",
    },
  };

  return (
    <div>
      {Object.entries(encuestas)
        .sort(([a], [b]) => Number(b) - Number(a))
        .map(([year, quarters]) => (
          <div key={year} className="accordion-item">
            <button
              onClick={() => setOpenYear(openYear === year ? null : year)}
              className="accordion-button"
            >
              {year}
            </button>
            {openYear === year && (
              <div className="accordion-content">
                {Object.entries(quarters).map(([quarter, url]) => (
                  <div key={quarter} className="accordion-section">
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="accordion-section-title"
                    >
                      {quarter}
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
    </div>
  );
};

export default function Encuestas(): ReactNode {
  const imgSrc = useBaseUrl("/img/tabla.jpg");

  return (
    <Layout
      title="Encuesta de fin de curso"
      description="Encuestas de fin de curso - Fundamentos de Programación - FIUBA - Curso Mendez"
    >
      <main>
        <PageHero
          title="Encuesta de fin de curso"
          subtitle="Tu opinión nos ayuda a mejorar el curso. ¡Gracias por completarla!"
          imageSrc={imgSrc}
          imageAlt="Simpsons meme"
        />
        <div className="container margin-vert--lg">
          <div className="page-wrapper">
            <EncuestasAccordion />
          </div>
        </div>
      </main>
    </Layout>
  );
}
