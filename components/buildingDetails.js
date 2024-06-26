import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useBuildings } from '../contexts/buildingsContext';
import { useResourcesContext } from '../components/useResources';
import styles from '../styles/buildingDetails.module.css';

const BuildingDetails = ({ building, onBack }) => {
  const { buildings, handleBuild } = useBuildings();
  const { resources } = useResourcesContext();
  const [currentBuilding, setCurrentBuilding] = useState(building);

  useEffect(() => {
    const updatedBuilding = buildings.find(b => b.id === building.id);
    setCurrentBuilding(updatedBuilding);
  }, [buildings, building.id]);

  if (!currentBuilding) return null;

  const nextLevel = currentBuilding.currentLevel + 1;
  const nextCost = {
    wood: Math.floor(40 * Math.pow(1.5, nextLevel)),
    population: Math.floor(1 * Math.pow(1.5, nextLevel))
  };

  const canBuild = Object.entries(nextCost).every(([resource, amount]) => resources[resource] >= amount);

  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <Image src={currentBuilding.image} alt={currentBuilding.name} layout="responsive" width={200} height={200} />
      </div>
      <div className={styles.infoContainer}>
        <h2>{currentBuilding.name} (Level {currentBuilding.currentLevel})</h2>
        <p>{currentBuilding.description}</p>
        <div className={styles.cost}>
          <h3>Next Level Cost:</h3>
          <ul>
            {Object.entries(nextCost).map(([resource, amount]) => (
              <li key={resource} style={{ color: resources[resource] >= amount ? 'green' : 'red' }}>
                {resource}: {amount}
              </li>
            ))}
          </ul>
        </div>
        <button className={styles.button} onClick={onBack}>Back</button>
        <button className={styles.button} onClick={() => handleBuild(currentBuilding.id)} disabled={!canBuild}>Build</button>
      </div>
    </div>
  );
};

export default BuildingDetails;
