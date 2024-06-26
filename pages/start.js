import React, { useState } from 'react';
import Header from '../components/header';
import Sidebar from '../components/sidebar';
import Buildings from '../components/buildings';
import { BuildingsProvider } from '../contexts/buildingsContext';
import { ResourcesProvider, useResourcesContext } from '../components/useResources';
import styles from '../styles/start.module.css';

const ProductionRates = () => {
  const { productionRates } = useResourcesContext();

  return (
    <div className={styles.productionRatesContainer}>
      {Object.entries(productionRates).map(([resource, rate]) => (
        <div key={resource} className={styles.productionRate}>
          {resource}: {rate.toFixed(5)}/s
        </div>
      ))}
    </div>
  );
};

const StartPage = () => {
  const [activeComponent, setActiveComponent] = useState('stats');

  const renderComponent = () => {
    switch (activeComponent) {
      case 'buildings':
        return <Buildings />;
      case 'stats':
      default:
        return (
          <div className={styles.statsContainer}>
            <ProductionRates />
          </div>
        );
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

export default StartPage;
