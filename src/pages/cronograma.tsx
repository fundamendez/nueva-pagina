import type { ReactNode } from "react";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { usePluginData } from "@docusaurus/useGlobalData";
import PageHero from "../components/PageHero";

interface BadgeItem {
  label: string;
  variant: string;
}

interface CronogramaCell {
  date: string | null;
  modality: string;
  modalityVariant: string;
  topicLines: string[];
  badgeItems: BadgeItem[];
}

interface CronogramaRow {
  weekLabel: string;
  theory: CronogramaCell;
  practice: CronogramaCell;
}

interface CronogramaData {
  rows: CronogramaRow[];
  startDate: string | null;
  endDate: string | null;
}

function CellContent({ cell }: { cell: CronogramaCell }): ReactNode {
  if (cell.badgeItems.length === 0 && cell.topicLines.length === 0) {
    return <span></span>;
  }
  return (
    <div className="cronograma-cell">
      <div className="cronograma-cell-top">
        <strong>{cell.date}</strong>
        {cell.modality.trim() ? (
          <span
            className={`cronograma-badge cronograma-badge--${cell.modalityVariant}`}
          >
            {cell.modality}
          </span>
        ) : null}
      </div>
      <div className="cronograma-cell-middle">
        {cell.topicLines.length > 0
          ? cell.topicLines.map((line, i) => (
              <span key={i}>
                {line}
                {i < cell.topicLines.length - 1 ? <br /> : null}
              </span>
            ))
          : null}
      </div>
      <div className="cronograma-cell-bottom">
        {cell.badgeItems.map((item, i) => (
          <span
            key={i}
            className={`cronograma-badge cronograma-badge--${item.variant}`}
          >
            {item.label}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function CronogramaPage(): ReactNode {
  const data = usePluginData("plugin-cronograma") as CronogramaData | undefined;

  if (!data) {
    return (
      <Layout title="Cronograma" description="Cronograma de cursada">
        <main className="container margin-vert--lg">
          <Heading as="h1">Cronograma</Heading>
          <p>No hay datos de cronograma disponibles.</p>
        </main>
      </Layout>
    );
  }

  const { rows } = data;
  const imgSrc = useBaseUrl("/img/homer-panic.jpg");

  const today = new Date(); 
  const currentYear = today.getFullYear();

  const parseDate = (dateStr: string | null): Date | null => {
    if (!dateStr) return null;
    const parts = dateStr.split("/");
    if (parts.length !== 2) return null;
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    return new Date(currentYear, month, day);
  };

  let currentWeekIndex = 0;
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const theoryDate = parseDate(row.theory.date);
    if (!theoryDate) continue;

    if (today >= theoryDate) {
      currentWeekIndex = i;
    } else {
      break;
    }
  }

  return (
    <Layout
      title="Cronograma"
      description="Cronograma de cursada de Fundamentos de Programación - FIUBA - Curso Mendez"
    >
      <main>
        <PageHero
          title="Cronograma"
          subtitle="Fechas, temas y modalidades de cada clase del cuatrimestre."
          imageSrc={imgSrc}
          imageAlt="Simpsons meme"
        />

        <div className="container margin-vert--lg">
          <div className="cronograma-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Semana</th>
                  <th>Teórica</th>
                  <th>Práctica</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr 
                    key={i} 
                    className={i === currentWeekIndex ? "current-week-row" : undefined}
                  >
                    <td>{row.weekLabel}</td>
                    <td>
                      <CellContent cell={row.theory} />
                    </td>
                    <td>
                      <CellContent cell={row.practice} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </Layout>
  );
}
