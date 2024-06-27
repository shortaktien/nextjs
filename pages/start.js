import React, { useState, useEffect } from 'react';
import Header from '../components/header';
import Sidebar from '../components/sidebar';
import Buildings from '../components/buildings';
import AdminPanel from '../components/AdminPanel';
import { BuildingsProvider } from '../contexts/buildingsContext';
import { ResourcesProvider } from '../components/useResources';
import styles from '../styles/start.module.css';

const StartPage = () => {
  const [activeComponent, setActiveComponent] = useState('stats');

  useEffect(() => {
    const userAddress = localStorage.getItem('userAddress');
    if (userAddress) {
      console.log(`Login as: ${userAddress}`);
    }
  }, []);

  const renderComponent = () => {
    switch (activeComponent) {
      case 'buildings':
        return <Buildings />;
      case 'admin':
        return <AdminPanel />;
      case 'stats':
      default:
        return <div className={styles.statsContainer}>Stats content goes here</div>;
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
