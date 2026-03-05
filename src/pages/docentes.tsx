import React, { type ReactNode } from 'react';
import Layout from '@theme/Layout';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './docentes.module.css';

const BASE_IMG_PATH = '/img/docentes';

interface DocenteProps {
  name: string;
  id: string;
  ext1?: string; // Usar solo si la foto tiene extension distinta a 'jpg'
  ext2?: string; // Usar solo si la foto tiene extension distinta a 'jpg'
}

const docentesList: DocenteProps[] = [
  { name: 'Agus B.', id: 'agusB' },
  { name: 'Agus F.', id: 'agusF' },
  {name: 'Agus J.', id: 'agusJ' },
  { name: 'Agus S.', id: 'agusS' },
  { name: 'Ani', id: 'ani', ext1: 'jpeg' },
  { name: 'Bauti', id: 'bauti' },
  { name: 'Berni', id: 'berni' },
  { name: 'Caro', id: 'caro'},
  { name: 'Danny', id: 'danny' },
  {name: 'Feli', id: 'feli'},
  { name: 'Juampi', id: 'juampi' },
  { name: 'Mariano', id: 'mariano', ext1: 'jpeg', ext2: 'jpeg' },
  { name: 'Mar', id: 'mar', ext1: 'jpeg', ext2: 'jpeg' },
  { name: 'Martu', id: 'martu' },
  { name: 'May', id: 'may', ext1: 'jpeg' },
  { name: 'Solci', id: 'sol' },
  { name: 'Tomi', id: 'tomi'},
  { name: 'Tute', id: 'tute', ext1: 'jpeg', ext2: 'jpeg' },
  { name: 'Yoel', id: 'yoel', ext1: 'jpeg', ext2: 'jpeg' },
];


function DocenteCard({ name, id, ext1 = 'jpg', ext2 = 'jpg' }: DocenteProps) {
  const photo = `${BASE_IMG_PATH}/${id}1.${ext1}`;
  const photoHover = `${BASE_IMG_PATH}/${id}2.${ext2}`;

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
          {docentesList.map((props) => (
            <DocenteCard key={props.id} {...props} />
          ))}
        </section>

      </main>
    </Layout>
  );
}