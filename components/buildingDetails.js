import React from 'react';
import Image from 'next/image';
import styles from '../styles/buildingDetails.module.css';

const BuildingDetails = ({ building, onBack }) => {
  if (!building) return null;

  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <Image src={building.image} alt={building.name} layout="responsive" width={200} height={200} />
      </div>
      <div className={styles.infoContainer}>
        <h2>{building.name}</h2>
        <p>{building.description}</p>
        <div className={styles.cost}>
          <h3>Cost:</h3>
          <ul>
            {Object.entries(building.baseCost).map(([resource, amount]) => (
              <li key={resource}>{resource}: {amount}</li>
            ))}
          </ul>
        </div>
        <button className={styles.button} onClick={onBack}>Back</button>
        <button className={styles.button}>Build</button>
      </div>
    </div>
  );
};

export default BuildingDetails;
