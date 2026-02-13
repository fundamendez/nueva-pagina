import React from "react";
import Layout from "@theme/Layout";
import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from "./clases-grabadas.module.css";

type VideoItem = {
  title: string;
  embedUrl: string;
};

export default function ClasesGrabadas() {
  const videos: VideoItem[] = [
    {
      title: "Clase del 19-08-2025",
      embedUrl: "https://drive.google.com/file/d/1M7jPCvLj-j7ynN2vYHU5LmthMdw6c2ic/preview",
    },
    {
      title: "Clase del 16-09-2025",
      embedUrl: "https://drive.google.com/file/d/1EJU-UcQREmv-HyGWeBpbdfgjrIGNGGq0/preview",
    },
    {
      title: "Clase del 18-09-2025",
      embedUrl: "https://drive.google.com/file/d/1ibLVwRDZcEqjM0DnQkRSCBgeXKfcdmTC/preview",
    },
    {
      title: "Clase del 23-09-2025",
      embedUrl: "https://drive.google.com/file/d/1LpU1R6wovti8FA-KJllH8ohS9Fv4RUdv/preview",
    },
    {
      title: "Clase del 25-09-2025",
      embedUrl: "https://drive.google.com/file/d/1m94fsBYrmrPZ1AvAihv4JjGIZzYg70dU/preview",
    },
    {
      title: "Clase del 21-10-2025",
      embedUrl: "https://drive.google.com/file/d/1p4UhHTl3_2LW1GnxjuWXwfZcl0DthWIi/preview",
    },
    {
      title: "Clase del 28-10-2025",
      embedUrl: "https://drive.google.com/file/d/1pxjVM9WLMiFSZFzUaCEdYhnVK-cgudD_/preview",
    },
    {
      title: "Clase del 30-10-2025",
      embedUrl: "https://drive.google.com/file/d/1bafpuTdeq8Gy3gA1xEhhscBK7-OuQebk/preview",
    },
    {
      title: "Clase del 13-11-2025",
      embedUrl: "https://drive.google.com/file/d/1pYwSiUBkghe663zWs3yICeKXjcAFHgTg/preview",
    },
    {
      title: "Clase del 18-11-2025",
      embedUrl: "https://drive.google.com/file/d/1sVBTC5ri7XlA1OLzXYbJcgXJG5ZQo2pS/preview",
    },
    {
      title: "Clase del 20-11-2025",
      embedUrl: "https://drive.google.com/file/d/1iDLUHFbgk1Vx9GprA1Qpr5LgZhLBhoDj/preview",
    },
    {
      title: "Clase del 25-11-2025",
      embedUrl:
        "https://drive.google.com/file/d/1xFGKC5-rTcHKl44BattLFYxBAjKe8xfG/preview",
    },
  ];

  const tutoriales: VideoItem[] = [
    {
      title: "Instalación de Virtual Machine - Versión nueva",
      embedUrl:
        "https://drive.google.com/file/d/1ndhlBqWaWp8iBexmX_ASnW80i4hNzvlf/preview",
    },
    {
      title: "Instalación de Virtual Machine - Versión antigua",
      embedUrl:
        "https://www.youtube.com/embed/oUR75_o6eXw",
    },
    {
      title: "Primeros pasos en Linux",
      embedUrl:
        "https://www.youtube.com/embed/dPs_cimCYmQ",
    },
  ];

  return (
    <Layout title="Clases Grabadas">
      <main
        className={styles.container}
        style={{
          backgroundImage: `url(${useBaseUrl("/img/fondo-clases-grabadas.jpg")})`,
        }}
      >
        <div className={styles.overlay}>
          <h1 className={styles.title}>Clases Grabadas</h1>
        
          <div className={styles.grid}>
            {videos.map((video) => (
              <section key={video.title} className={styles.card}>
                <h2 className={styles.cardTitle}>{video.title}</h2>
                <div className={styles.videoWrapper}>
                  <iframe
                    src={video.embedUrl}
                    title={video.title}
                    allow="autoplay"
                    allowFullScreen
                  />
                </div>
              </section>
            ))}
          </div>
        </div>
        
        <div className={styles.sectionSpacer}></div>

        <div className={styles.overlay}>
          <h1 className={styles.title}>Tutoriales</h1>
        
          <div className={styles.grid}>
            {tutoriales.map((video) => (
              <section key={video.title} className={styles.card}>
                <h2 className={styles.cardTitle}>{video.title}</h2>
                <div className={styles.videoWrapper}>
                  <iframe
                    src={video.embedUrl}
                    title={video.title}
                    allow="autoplay"
                    allowFullScreen
                  />
                </div>
              </section>
            ))}
          </div>
        </div>
      </main>
    </Layout>
  );
}
