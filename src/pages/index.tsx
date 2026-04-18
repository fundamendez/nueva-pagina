import type { ReactNode } from "react";
import clsx from "clsx";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { usePluginData } from "@docusaurus/useGlobalData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faSchool,
  faScroll,
  faComments,
  faFlask,
  faChartBar,
  faInbox,
  faClock,
  faCalendarDay,
} from "@fortawesome/free-solid-svg-icons";

import styles from "./index.module.css";
import React from "react";

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

const primaryCards = [
  {
    icon: faClock,
    title: "Horario",
    description: "Martes y Jueves de 18 a 21hs",
  },
  {
    icon: faSchool,
    title: "Aulas",
    description: "Martes: Aula 414 · Jueves: Aula 313",
  },
  {
    icon: faScroll,
    title: "Régimen de Cursada",
    description: "Reglas y condiciones de aprobación",
    link: "/regimen-de-cursada",
  },
];

const additionalLinks = [
  {
    icon: faInbox,
    title: "AlgoTron",
    description: "Entregas de trabajos prácticos",
    link: "https://algotron.com.ar/",
  },
  {
    icon: faFlask,
    title: "RPL",
    description: "Ejercicios y práctica interactiva",
    link: "https://www.myrpl.ar/",
  },
  {
    icon: faChartBar,
    title: "Encuestas",
    description: "Encuestas de fin de curso",
    link: "/encuestas",
  },
];

function HomepageHero() {
  const { siteConfig } = useDocusaurusContext();
  const donaUrl = useBaseUrl("/img/dona.png");
  return (
    <header className={styles.hero}>
      <div className={clsx("container", styles.heroContent)}>
        <Heading as="h1" className={styles.heroTitle}>
          {siteConfig.title}
        </Heading>
        <p className={styles.heroSubtitle}>{siteConfig.tagline}</p>
        <img
          src={donaUrl}
          alt="Dona de FundaMendez"
          className={styles.heroLogo}
        />
      </div>
    </header>
  );
}

function CourseCard({
  icon,
  title,
  description,
  link,
  highlighted,
  colClass,
}: {
  icon: IconDefinition;
  title: string;
  description: string;
  link?: string;
  highlighted?: boolean;
  colClass?: string;
}) {
  const content = (
    <div
      className={clsx(
        styles.card,
        link && styles.cardLink,
        highlighted && styles.cardHighlighted,
      )}
    >
      <div className={styles.cardIcon}>
        <FontAwesomeIcon icon={icon} />
      </div>
      <Heading as="h3" className={styles.cardTitle}>
        {title}
      </Heading>
      <p className={styles.cardDescription}>{description}</p>
      {link && <span className={styles.cardAction}>Ver m&aacute;s &rarr;</span>}
    </div>
  );

  return (
    <div className={clsx(colClass ?? "col col--4", styles.cardCol)}>
      {link ? (
        <Link to={link} className={styles.cardLinkWrapper}>
          {content}
        </Link>
      ) : (
        content
      )}
    </div>
  );
}

function SlackBanner() {
  return (
    <section className={styles.slackBanner}>
      <Link
        to="https://fundamendez.slack.com/"
        className={styles.slackBannerLink}
      >
        <div className="container">
          <div className={styles.slackBannerContent}>
            <span className={styles.slackBannerEmoji}>
              <FontAwesomeIcon icon={faComments} />
            </span>
            <div>
              <Heading as="h3" className={styles.slackBannerTitle}>
                Unite al Slack del curso
              </Heading>
              <p className={styles.slackBannerDescription}>
                Consultá dudas, enterate de novedades y contactá a tus
                correctores
              </p>
            </div>
            <span className={styles.slackBannerArrow}>&rarr;</span>
          </div>
        </div>
      </Link>
    </section>
  );
}

function CurrentWeekWidget() {

  const data = usePluginData("plugin-cronograma") as CronogramaData | undefined;

  if (!data || !data.rows || data.rows.length === 0) {
  }

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

  let currentWeekRow = data.rows[0]; 
  
  for (let i = 0; i < data.rows.length; i++) {
    const row = data.rows[i];
    const theoryDate = parseDate(row.theory.date);
    
    if (!theoryDate) continue;

    const weekStart = new Date(theoryDate);
    weekStart.setDate(weekStart.getDate() - 1);

    if (today >= weekStart) {
      currentWeekRow = row;
    } else {
      break;
    }
  }

  return (
    <div className={clsx("container", styles.widgetSection)}>
      <Heading as="h2" className={styles.sectionTitle} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
        <FontAwesomeIcon icon={faCalendarDay} style={{ color: "var(--simpsons-blue)" }} />
        Semana Actual: {currentWeekRow.weekLabel}
      </Heading>
      
      <div className="row" style={{ justifyContent: "center" }}>
        
        <div className="col col--5 margin-bottom--md">
          <div className={clsx(styles.card, styles.cardHighlighted)} style={{ height: "100%", borderColor: "var(--simpsons-blue)" }}>
            <Heading as="h3" className={styles.cardTitle} style={{ borderBottom: "2px solid #eee", paddingBottom: "10px", marginBottom: "15px" }}>
              Teórica {currentWeekRow.theory.date ? `(${currentWeekRow.theory.date})` : ""}
            </Heading>
            
            <div style={{ textAlign: "left", flex: 1 }}>
              {currentWeekRow.theory.topicLines.length > 0 ? (
                <ul style={{ paddingLeft: "20px", marginBottom: "15px" }}>
                  {currentWeekRow.theory.topicLines.map((line, i) => (
                    <li key={i}>{line.replace(/^- /, '')}</li>
                  ))}
                </ul>
              ) : (
                <p style={{ fontStyle: "italic", color: "#888" }}>Sin temas especificados.</p>
              )}
            </div>

            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginTop: "auto" }}>
              {currentWeekRow.theory.modality && (
                <span className={`cronograma-badge cronograma-badge--${currentWeekRow.theory.modalityVariant || 'info'}`}>
                  {currentWeekRow.theory.modality}
                </span>
              )}
              {currentWeekRow.theory.badgeItems.map((badge, idx) => (
                <span key={idx} className={`cronograma-badge cronograma-badge--${badge.variant}`}>
                  {badge.label}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="col col--5 margin-bottom--md">
          <div className={clsx(styles.card, styles.cardHighlighted)} style={{ height: "100%", borderColor: "var(--simpsons-yellow)" }}>
            <Heading as="h3" className={styles.cardTitle} style={{ borderBottom: "2px solid #eee", paddingBottom: "10px", marginBottom: "15px" }}>
              Práctica {currentWeekRow.practice.date ? `(${currentWeekRow.practice.date})` : ""}
            </Heading>
            
            <div style={{ textAlign: "left", flex: 1 }}>
              {currentWeekRow.practice.topicLines.length > 0 ? (
                <ul style={{ paddingLeft: "20px", marginBottom: "15px" }}>
                  {currentWeekRow.practice.topicLines.map((line, i) => (
                    <li key={i}>{line.replace(/^- /, '')}</li>
                  ))}
                </ul>
              ) : (
                <p style={{ fontStyle: "italic", color: "#888" }}>Sin temas especificados.</p>
              )}
            </div>

            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginTop: "auto" }}>
              {currentWeekRow.practice.modality && (
                <span className={`cronograma-badge cronograma-badge--${currentWeekRow.practice.modalityVariant || 'info'}`}>
                  {currentWeekRow.practice.modality}
                </span>
              )}
              {currentWeekRow.practice.badgeItems.map((badge, idx) => (
                <span key={idx} className={`cronograma-badge cronograma-badge--${badge.variant}`}>
                  {badge.label}
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

function CourseInfoSection() {
  return (
    <section className={styles.cardsSection}>
      <div className="container">
        <div className={clsx("row", styles.primaryRow)}>
          {primaryCards.map((card) => (
            <CourseCard key={card.title} {...card} highlighted />
          ))}
        </div>
      </div>
      
      <CurrentWeekWidget />

      <div className={clsx("container", styles.additionalSection)}>
        <Heading as="h2" className={styles.sectionTitle}>
          Accesos adicionales
        </Heading>
        <div className="row">
          {additionalLinks.map((card) => (
            <CourseCard key={card.title} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description="Fundamentos de Programación - FIUBA - Curso Mendez"
    >
      <HomepageHero />
      <main>
        <SlackBanner />
        <CourseInfoSection />
      </main>
    </Layout>
  );
}