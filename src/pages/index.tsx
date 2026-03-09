import type { ReactNode } from "react";
import clsx from "clsx";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faSchool,
  faScroll,
  faComments,
  faFlask,
  faPaperPlane,
  faChartBar,
  faInbox,
  faClock,
} from "@fortawesome/free-solid-svg-icons";

import styles from "./index.module.css";
import React from "react";

const primaryCards = [
  {
    icon: faClock,
    title: "Horario",
    description: "Martes y Jueves de 18 a 21hs",
  },
  {
    icon: faSchool,
    title: "Aulas",
    description: "Martes: Aula 414 · Jueves: Aula 203",
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
      <Link to="#" className={styles.slackBannerLink}>
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
