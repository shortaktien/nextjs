// components/useResources.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const ResourcesContext = createContext();

export const ResourcesProvider = ({ children }) => {
  const [resources, setResources] = useState({
    water: 250,
    food: 250,
    wood: 300,
    stone: 100,
    knowledge: 0,
    population: 15,
    coal: 0,
    gold: 0,
    military: 0,
  });

  const [productionRates, setProductionRates] = useState({
    water: 40 / 3600,
    food: 35 / 3600,
    wood: 33 /3600,
    stone: 29 /3600,
    knowledge: 1 / 3600, 
    population: 1 /3600,
    coal: 15 / 3600,
    gold: 0.01 / 3600
  });

  useEffect(() => {
    const loadResources = async () => {
      try {
        const response = await fetch(`/api/loadResources?userId=${1}`); // Replace with actual user ID
        if (response.ok) {
          const data = await response.json();
          setResources(data.resources);
          setProductionRates(data.productionRates);
        }
      } catch (error) {
        console.error('Error loading resources:', error);
      }
    };
    loadResources();
  }, []);

  useEffect(() => {
    const saveResources = async () => {
      try {
        await fetch('/api/saveResources', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId: 1, resources, productionRates }), // Replace with actual user ID
        });
      } catch (error) {
        console.error('Error saving resources:', error);
      }
    };
    saveResources();
  }, [resources, productionRates]);

  const updateResource = (resource, amount) => {
    setResources((prevResources) => ({
      ...prevResources,
      [resource]: amount,
    }));
  };

  return (
    <ResourcesContext.Provider value={{ resources, productionRates, updateResource }}>
      {children}
    </ResourcesContext.Provider>
  );
};

export const useResourcesContext = () => useContext(ResourcesContext);
