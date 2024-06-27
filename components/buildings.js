// components/buildings.js
import React, { useState } from 'react';
import { useBuildings } from '../contexts/buildingsContext';
import BuildingDetails from './buildingDetails';
import styles from '../styles/buildings.module.css';

const Buildings = () => {
  const { buildings } = useBuildings();
  const [selectedBuilding, setSelectedBuilding] = useState(null);

  const handleBack = () => {
    setSelectedBuilding(null);
  };


  

  return (
    <div className={styles.container}>
      {selectedBuilding ? (
        <BuildingDetails building={selectedBuilding} onBack={handleBack} />
      ) : (
        buildings.map(building => (
          <button 
            key={building.id} 
            className={styles.buildingButton} 
            onClick={() => {
                console.log('Selected Building:', building); // Debug-Ausgabe
                setSelectedBuilding(building);
  }}
>
  <img src={building.image} alt={building.name} className={styles.buildingThumbnail} />
  <span>{building.name}</span>
</button>

        ))
      )}
    </div>
  );
};

export default Buildings;
