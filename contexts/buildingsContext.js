import React, { createContext, useContext, useState } from 'react';
import lamberjackImage from '../public/assets/lamberjackImage.webp'; 
import stonemasonImage from '../public/assets/stonemasonImage.webp';

const BuildingsContext = createContext();

const initialBuildings = [
  {
    id: 1,
    name: 'Lumberjack',
    image: lamberjackImage,
    baseCost: { wood: 50, population: 1 },
    baseProduction: { wood: 33 / 3600 }, // pro Sekunde
    baseBuildTime: 5,
    currentLevel: 0,
    description: 'A sturdy structure where wood is harvested, vital for building and maintaining your realm. The legendary lumberjack Tharok, wielding twin battle axes, achieved great feats in the dense forests of Ealdoria.'
  },
  {
    id: 2,
    name: 'Stonemason',
    image: stonemasonImage,
    baseCost: { wood: 50, population: 1 },
    baseProduction: { stone: 29 / 3600 }, // pro Sekunde
    baseBuildTime: 6,
    currentLevel: 0,
    description: 'A workshop where skilled craftsmen shape stone, crucial for constructing resilient buildings. Ealdorias unique Eldarite stones, imbued with the hidden power of the Threads of Continuity, provide unmatched strength and durability to your structures.'
  },
];

export const BuildingsProvider = ({ children }) => {
  const [buildings, setBuildings] = useState(initialBuildings);

  const levelUpBuilding = (id) => {
    setBuildings(prevBuildings =>
      prevBuildings.map(building =>
        building.id === id
          ? { ...building, currentLevel: building.currentLevel + 1 }
          : building
      )
    );
  };

  return (
    <BuildingsContext.Provider value={{ buildings, levelUpBuilding }}>
      {children}
    </BuildingsContext.Provider>
  );
};

export const useBuildings = () => {
  return useContext(BuildingsContext);
};
