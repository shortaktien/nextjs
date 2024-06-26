import React, { createContext, useContext, useState } from 'react';
import lamberjackImage from '../public/assets/lamberjackImage.webp'; 
import stonemasonImage from '../public/assets/stonemasonImage.webp';
import { useResourcesContext } from '../components/useResources';

const BuildingsContext = createContext();

const initialBuildings = [
  {
    id: 1,
    name: 'Lumberjack',
    image: lamberjackImage,
    baseCost: { wood: 50, population: 1 },
    baseProduction: { wood: 33 / 3600 },
    baseBuildTime: 5,
    currentLevel: 0,
    description: 'A sturdy structure where wood is harvested, vital for building and maintaining your realm. The legendary lumberjack Tharok, wielding twin battle axes, achieved great feats in the dense forests of Ealdoria.'
  },
  {
    id: 2,
    name: 'Stonemason',
    image: stonemasonImage,
    baseCost: { wood: 50, population: 1 },
    baseProduction: { stone: 29 / 3600 },
    baseBuildTime: 6,
    currentLevel: 0,
    description: 'A workshop where skilled craftsmen shape stone, crucial for constructing resilient buildings. Ealdorias unique Eldarite stones, imbued with the hidden power of the Threads of Continuity, provide unmatched strength and durability to your structures.'
  },
];

export const BuildingsProvider = ({ children }) => {
  const [buildings, setBuildings] = useState(initialBuildings);
  const { spendResources, updateProductionRate } = useResourcesContext();

  const levelUpBuilding = (id) => {
    setBuildings(prevBuildings =>
      prevBuildings.map(building => {
        if (building.id === id) {
          const newLevel = building.currentLevel + 1;
          const newProduction = Math.floor(33 * newLevel * Math.pow(1.1, newLevel));
          updateProductionRate(building.name.toLowerCase(), newProduction / 3600);
          return { ...building, currentLevel: newLevel };
        }
        return building;
      })
    );
  };

  const handleBuild = (id) => {
    const building = buildings.find(b => b.id === id);
    const cost = {
      wood: Math.floor(40 * Math.pow(1.5, building.currentLevel + 1)),
      population: Math.floor(1 * Math.pow(1.5, building.currentLevel + 1))
    };

    if (spendResources(cost)) {
      levelUpBuilding(id);
    } else {
      alert('Not enough resources');
    }
  };

  return (
    <BuildingsContext.Provider value={{ buildings, levelUpBuilding, handleBuild }}>
      {children}
    </BuildingsContext.Provider>
  );
};

export const useBuildings = () => {
  return useContext(BuildingsContext);
};
