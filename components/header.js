import React from 'react';
import { useResourcesContext } from './useResources';

import foodImage from '../public/assets/foodImage.webp';
import populationImage from '../public/assets/populationImage.webp';
import stoneImage from '../public/assets/stoneImage.webp';
import waterImage from '../public/assets/waterImage.webp';
import woodImage from '../public/assets/woodImage.webp';
import knowledgeImage from '../public/assets/knowledgeImage.webp';
import coalImage from '../public/assets/coalRessourceImage.webp';
import goldImage from '../public/assets/goldRessourceImage.webp';
import militaryImage from '../public/assets/militaryRessourceImage.webp';

const Header = () => {
  const { resources, capacityRates } = useResourcesContext();

  const resourcesData = [
    { name: 'Water', value: Math.floor(resources.water), capacity: capacityRates.water, image: waterImage },
    { name: 'Food', value: Math.floor(resources.food), capacity: capacityRates.food, image: foodImage },
    { name: 'Wood', value: Math.floor(resources.wood), capacity: capacityRates.wood, image: woodImage },
    { name: 'Stone', value: Math.floor(resources.stone), capacity: capacityRates.stone, image: stoneImage },
    { name: 'Coal', value: Math.floor(resources.coal), capacity: capacityRates.coal, image: coalImage },
    { name: 'Gold', value: Math.floor(resources.gold), capacity: capacityRates.gold, image: goldImage },
    { name: 'Knowledge', value: Math.floor(resources.knowledge), capacity: capacityRates.knowledge, image: knowledgeImage },
    { name: 'Population', value: Math.floor(resources.population), capacity: capacityRates.population, image: populationImage },
    { name: 'Military', value: Math.floor(resources.military), capacity: capacityRates.maxMilitaryCapacity, image: militaryImage }
  ];

  return (
    <header style={{ display: 'flex', justifyContent: 'space-around', padding: '10px', backgroundColor: '#f5f5f5' }}>
      {resourcesData.map((resource, index) => (
        <div key={index} style={{ margin: '0 10px' }}>
          <img src={resource.image} alt={resource.name} style={{ width: '30px', height: '30px' }} />
          <strong>{resource.name}:</strong> {resource.value}/{resource.capacity}
        </div>
      ))}
    </header>
  );
};

export default Header;
