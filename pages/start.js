import React, { useState } from 'react';
import Header from '../components/header';
import Sidebar from '../components/sidebar';
import Buildings from '../components/buildings';
import { BuildingsProvider } from '../contexts/buildingsContext';
import styles from '../styles/start.module.css';

const StartPage = () => {
  const [activeComponent, setActiveComponent] = useState('stats');

  const renderComponent = () => {
    switch (activeComponent) {
      case 'buildings':
        return <Buildings />;
      case 'stats':
      default:
        return <div className={styles.statsContainer}>Stats content goes here</div>;
    }
  };

  return (
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
  );
};

export default StartPage;
