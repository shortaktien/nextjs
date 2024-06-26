import React, { useState } from 'react';
import { useBuildings } from '../contexts/buildingsContext';
import BuildingDetails from './buildingDetails';
import buildingsMainImage from '../public/assets/buildingsMainPage.webp';
import styles from '../styles/buildings.module.css';

const Buildings = () => {
  const { buildings } = useBuildings();
  const [selectedBuilding, setSelectedBuilding] = useState(null);

  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        {selectedBuilding ? (
          <BuildingDetails building={selectedBuilding} onBack={() => setSelectedBuilding(null)} />
        ) : (
          <img src={buildingsMainImage.src} alt="Buildings Main" className={styles.mainImage} />
        )}
      </div>
      {!selectedBuilding && (
        <div className={styles.buildingList}>
          {buildings.map(building => (
            <button
              key={building.id}
              className={styles.buildingItem}
              onClick={() => setSelectedBuilding(building)}
            >
              <img 
                src={building.image?.src || building.image} 
                alt={building.name} 
                className={styles.buildingThumbnail} 
              />
              <span>{building.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Buildings;
