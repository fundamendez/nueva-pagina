import type { ReactNode } from "react";
import clsx from "clsx";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";

import styles from "./index.module.css";

const courseCards = [
  {
    emoji: "\u{1F3EB}",
    title: "Horarios y Aulas",
    description: "Martes y Jueves de 18 a 21hs — Aulas a confirmar",
  },
  {
    emoji: "\u{1F4DC}",
    title: "Régimen de Cursada",
    description: "Reglas y condiciones de aprobación",
    link: "/regimen-de-cursada",
  },
  {
    emoji: "\u{1F4CA}",
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
  emoji,
  title,
  description,
  link,
}: {
  emoji: string;
  title: string;
  description: string;
  link?: string;
}) {
  const content = (
    <div className={clsx(styles.card, link && styles.cardLink)}>
      <div className={styles.cardIcon}>{emoji}</div>
      <Heading as="h3" className={styles.cardTitle}>
        {title}
      </Heading>
      <p className={styles.cardDescription}>{description}</p>
      {link && <span className={styles.cardAction}>Ver m&aacute;s &rarr;</span>}
    </div>
  );

  return (
    <div className={clsx("col col--6", styles.cardCol)}>
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
            <span className={styles.slackBannerEmoji}>{"\u{1F4AC}"}</span>
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
        <div className="row">
          {courseCards.map((card) => (
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
