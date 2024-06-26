import React from 'react';
import { useResourcesContext } from '../components/useResources';
import Image from 'next/image';
import styles from '../styles/header.module.css';
import waterImage from '../public/assets/waterImage.webp';
import foodImage from '../public/assets/foodImage.webp';
import woodImage from '../public/assets/woodImage.webp';
import stoneImage from '../public/assets/stoneImage.webp';
import knowledgeImage from '../public/assets/knowledgeImage.webp';
import populationImage from '../public/assets/populationImage.webp';
import coalImage from '../public/assets/coalRessourceImage.webp';
import goldImage from '../public/assets/goldRessourceImage.webp';
import militaryImage from '../public/assets/militaryImage.webp';

const resourceImages = {
  water: waterImage,
  food: foodImage,
  wood: woodImage,
  stone: stoneImage,
  knowledge: knowledgeImage,
  population: populationImage,
  coal: coalImage,
  gold: goldImage,
  military: militaryImage,
};

const Header = () => {
  const { resources } = useResourcesContext();

  return (
    <header className={styles.header}>
      <div className={styles.resourcesContainer}>
        {Object.entries(resources).map(([resource, amount]) => (
          <div key={resource} className={styles.resource}>
            <Image src={resourceImages[resource]} alt={resource} className={styles.resourceImage} width={24} height={24} />
            <span className={styles.resourceName}></span> {Math.floor(amount)}
          </div>
        ))}
      </div>
    </header>
  );
};

export default Header;
