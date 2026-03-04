import React, { type ReactNode } from 'react';
import Layout from '@theme/Layout';
import styles from './docentes.module.css';
import useBaseUrl from '@docusaurus/useBaseUrl';

interface DocenteProps {
  name: string;
  photo: string;
  photoHover: string;
}

const docentesList: DocenteProps[] = [
  {
    name: 'Agus B.',
    photo: '/img/docentes/agusB1.jpg', 
    photoHover: '/img/docentes/agusB2.jpg',
  },
  {
    name: 'Agus F.',
    photo: '/img/docentes/agusF1.jpg',
    photoHover: '/img/docentes/agusF2.jpg',
  },
  {
    name: 'Agus S.',
    photo: '/img/docentes/agusS1.jpg',
    photoHover: '/img/docentes/agusS2.jpg',
  },
  {
    name: 'Ani',
    photo: '/img/docentes/ani1.jpeg',
    photoHover: '/img/docentes/ani2.jpg',
  },
  {
    name: 'Bauti',
    photo: '/img/docentes/bauti1.jpg',
    photoHover: '/img/docentes/bauti2.jpg',
  },
  {
    name: 'Berni',
    photo: '/img/docentes/berni1.jpg',
    photoHover: '/img/docentes/berni2.jpg',
  },
  {
    name: 'Danny',
    photo: '/img/docentes/danny1.jpg',
    photoHover: '/img/docentes/danny2.jpg',
  },
  {
    name: 'Juampi',
    photo: '/img/docentes/juampi1.jpg',
    photoHover: '/img/docentes/juampi2.jpg',
  },
  {
    name: 'Mariano',
    photo: '/img/docentes/mariano1.jpeg',
    photoHover: '/img/docentes/mariano2.jpeg',
  },
  {
    name: 'Mar',
    photo: '/img/docentes/mar1.jpeg',
    photoHover: '/img/docentes/mar2.jpeg',
  },
  {
    name: 'Martu',
    photo: '/img/docentes/martu1.jpg',
    photoHover: '/img/docentes/martu2.jpg',
  },
  {
    name: 'May',
    photo: '/img/docentes/may1.jpeg',
    photoHover: '/img/docentes/may2.jpg',
  },
  {
    name: 'Solci',
    photo: '/img/docentes/sol1.jpg',
    photoHover: '/img/docentes/sol2.jpg',
  },
  {
    name: 'Tomi',
    photo: '/img/docentes/tomi1.jpg',
    photoHover: '/img/docentes/tomi2.jpg',
  },
  {
    name: 'Tute',
    photo: '/img/docentes/tute1.jpeg',
    photoHover: '/img/docentes/tute2.jpeg',
  },
  {
    name: 'Yoel',
    photo: '/img/docentes/yoel1.jpeg',
    photoHover: '/img/docentes/yoel2.jpeg',
  },
];

function DocenteCard({ name, photo, photoHover }: DocenteProps) {
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={useBaseUrl(photo)} alt={name} className={styles.imgNormal} />
        <img src={useBaseUrl(photoHover)} alt={`${name} divertido`} className={styles.imgHover} />
      </div>
      <h3 className={styles.name}>{name}</h3>
    </div>
  );
}

export default function Docentes(): ReactNode {
  return (
    <Layout 
      title="Docentes" 
      description="Conocé al equipo docente de FundaMendez">
      <main className="container margin-vert--lg">
        <h1 className="text--center margin-bottom--xl">Nuestro Equipo Docente</h1>
        
        <section className={styles.gridContainer}>
          {docentesList.map((props, idx) => (
            <DocenteCard key={idx} {...props} />
          ))}
        </section>

      </main>
    </Layout>
  );
}