import React, { useState } from 'react';
import Header from '../components/header';
import Sidebar from '../components/sidebar';
import Buildings from '../components/buildings';
import { BuildingsProvider } from '../contexts/buildingsContext';
import { ResourcesProvider, useResourcesContext } from '../components/useResources';
import styles from '../styles/start.module.css';

const StartPage = () => {
  const [activeComponent, setActiveComponent] = useState('stats');

  const renderComponent = () => {
    switch (activeComponent) {
      case 'buildings':
        return <Buildings />;
      case 'stats':
      default:
        return <Stats />;
    }
  };

  return (
    <ResourcesProvider>
      <BuildingsProvider>
        <div className={styles.pageContainer}>
          <Header />
          <div className={styles.mainContent}>
            <Sidebar setActiveComponent={setActiveComponent} />
            <div className={styles.contentContainer}>
              {renderComponent()}
            </div>
          </div>
        </div>
      </BuildingsProvider>
    </ResourcesProvider>
  );
};

const Stats = () => {
  const { getNetProductionRates } = useResourcesContext();
  const productionRates = getNetProductionRates();

  return (
    <div className={styles.statsContainer}>
      <h2>Current Production Rates</h2>
      <ul>
        {Object.entries(productionRates).map(([resource, rate]) => (
          <li key={resource}>
            {resource}: {Math.floor(rate * 3600)} per hour
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StartPage;
