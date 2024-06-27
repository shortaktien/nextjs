import React, { createContext, useContext, useEffect, useState } from 'react';
import { useResourcesContext } from '../components/useResources';
import lumberjackImage from '../public/assets/lumberjackImage.webp';
import stonemasonImage from '../public/assets/stonemasonImage.webp';

const BuildingsContext = createContext();

const initialBuildings = [
  {
    id: 1,
    name: 'Lumberjack',
    image: '/assets/lumberjackImage.webp',
    baseCost: { wood: 50, population: 1 },
    baseProduction: { wood: 33 / 3600 },
    baseBuildTime: 5,
    currentLevel: 0,
    description: 'A sturdy structure where wood is harvested, vital for building and maintaining your realm.'
  },
  {
    id: 2,
    name: 'Stonemason',
    image: '/assets/stonemasonImage.webp',
    baseCost: { wood: 50, population: 1 },
    baseProduction: { stone: 29 / 3600 },
    baseBuildTime: 6,
    currentLevel: 0,
    description: 'A workshop where skilled craftsmen shape stone, crucial for constructing resilient buildings.'
  },
];

export const BuildingsProvider = ({ children }) => {
  const [buildings, setBuildings] = useState(initialBuildings);
  const { resources, updateProductionRate, spendResources } = useResourcesContext();

  useEffect(() => {
    const fetchBuildings = async () => {
      const userId = localStorage.getItem('userId');
      const response = await fetch('/api/getBuildingLevels', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId })
      });

      if (response.ok) {
        const data = await response.json();
        const updatedBuildings = initialBuildings.map(building => {
          const buildingData = data.buildings.find(b => b.building_id === building.id);
          if (buildingData) {
            return {
              ...building,
              currentLevel: buildingData.level
            };
          }
          return building;
        });

        setBuildings(updatedBuildings);
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

    if (spendResources(cost)) {
      levelUpBuilding(id);

      await fetch('/api/saveBuildingLevel', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId: localStorage.getItem('userId'), buildingId: id, newLevel: building.currentLevel + 1 })
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
