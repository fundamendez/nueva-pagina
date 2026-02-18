import type { ReactNode } from "react";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";
import { usePluginData } from "@docusaurus/useGlobalData";

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
          <span className={`cronograma-badge cronograma-badge--${cell.modalityVariant}`}>
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

  return (
    <Layout
      title="Cronograma"
      description="Cronograma de cursada de Fundamentos de Programación - FIUBA - Curso Mendez"
    >
      <main className="container margin-vert--lg">
        <Heading as="h1">Cronograma</Heading>

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
                <tr key={i}>
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
      </main>
    </Layout>
  );
}

