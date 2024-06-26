import React, { createContext, useContext, useEffect, useState } from 'react';
import { useResourcesContext } from '../components/useResources';
import lumberjackImage from '../public/assets/lamberjackImage.webp';
import stonemasonImage from '../public/assets/stonemasonImage.webp';

const BuildingsContext = createContext();

const initialBuildings = [
  {
    id: 1,
    name: 'Lumberjack',
    image: lumberjackImage,
    baseCost: { wood: 50, population: 1 },
    baseProduction: { wood: 33 / 3600 },
    baseBuildTime: 5,
    currentLevel: 0,
    description: 'A sturdy structure where wood is harvested, vital for building and maintaining your realm.'
  },
  {
    id: 2,
    name: 'Stonemason',
    image: stonemasonImage,
    baseCost: { wood: 50, population: 1 },
    baseProduction: { stone: 29 / 3600 },
    baseBuildTime: 6,
    currentLevel: 0,
    description: 'A workshop where skilled craftsmen shape stone, crucial for constructing resilient buildings.'
  },
];

export const BuildingsProvider = ({ children }) => {
  const [buildings, setBuildings] = useState(initialBuildings);
  const { resources, updateProductionRate } = useResourcesContext();

  useEffect(() => {
    // Fetch building data for the user from the API
    const fetchBuildings = async () => {
      const response = await fetch('/api/getBuildingLevels', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId: 1 }) // Replace with actual userId
      });

      if (response.ok) {
        const data = await response.json();
        setBuildings(data.buildings);
      }
    };

    fetchBuildings();
  }, []);

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

  const handleBuild = async (id) => {
    const building = buildings.find(b => b.id === id);
    const cost = {
      wood: Math.floor(40 * Math.pow(1.5, building.currentLevel + 1)),
      population: Math.floor(1 * Math.pow(1.5, building.currentLevel + 1))
    };

    if (resources.spendResources(cost)) {
      levelUpBuilding(id);

      // Save the new level to the database
      await fetch('/api/saveBuildingLevel', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId: 1, buildingId: id, newLevel: building.currentLevel + 1 }) // Replace with actual userId
      });
    } else {
      alert('Not enough resources');
    }
  };

  return (
    <BuildingsContext.Provider value={{ buildings, handleBuild }}>
      {children}
    </BuildingsContext.Provider>
  );
};

export const useBuildings = () => useContext(BuildingsContext);
