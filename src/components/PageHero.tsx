import React from "react";
import styles from "./PageHero.module.css";

interface PageHeroProps {
  title: string;
  subtitle: string;
  imageSrc: string;
  imageAlt?: string;
}

export default function PageHero({
  title,
  subtitle,
  imageSrc,
  imageAlt = "Hero image",
}: PageHeroProps) {
  return (
    <div className={styles.hero}>
      <div className={styles.text}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.subtitle}>{subtitle}</p>
      </div>
      <img src={imageSrc} alt={imageAlt} className={styles.image} />
    </div>
  );
}
