import React from 'react';
import Image from 'next/image';
import { useBuildings } from '../contexts/buildingsContext';
import styles from '../styles/buildings.module.css';

const Buildings = () => {
  const { buildings, selectedBuilding, selectBuilding, buildBuilding } = useBuildings();

  if (selectedBuilding) {
    return (
      <div className={styles.container}>
        <div className={styles.imageContainer}>
          <Image 
            src={selectedBuilding.image} 
            alt={selectedBuilding.name} 
            className={styles.buildingImage} 
            width={500} // Beispielsweise
            height={300} // Beispielsweise
          />
        </div>
        <div className={styles.infoContainer}>
          <h2>{selectedBuilding.name}</h2>
          <p>{selectedBuilding.description}</p>
          <button className={styles.button} onClick={() => selectBuilding(null)}>Back</button>
          <button className={styles.button} onClick={() => buildBuilding(selectedBuilding.id)}>Build</button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.buildingsOverview}>
      <div className={styles.mainImageContainer}>
        <Image 
          src="/assets/buildingsMainPage.webp" 
          alt="Main Buildings" 
          className={styles.buildingImage} 
          width={800} // Beispielsweise
          height={450} // Beispielsweise
        />
      </div>
      <div className={styles.buildingsList}>
        {buildings.map(building => (
          <div key={building.id} className={styles.buildingThumbnail} onClick={() => selectBuilding(building)}>
            <Image 
              src={building.image} 
              alt={building.name} 
              className={styles.thumbnailImage} 
              width={150} // Beispielsweise
              height={150} // Beispielsweise
            />
            <div className={styles.thumbnailOverlay}>
              <p>{building.name}</p>
              <p>Level: {building.currentLevel}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Buildings;
