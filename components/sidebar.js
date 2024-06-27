import React, { useEffect, useState } from 'react';
import { useResourcesContext } from '../components/useResources';

const Sidebar = ({ setActiveComponent }) => {
  const { resources } = useResourcesContext();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userAddress = localStorage.getItem('userAddress');
      if (userAddress && userAddress.toLowerCase() === '0x7b41dc0b6fdc7d8418ad0aacfcb08ceaa30ff7ba') {
        setIsAdmin(true);
      }
    }
  }, []);

  const saveGame = async () => {
    await fetch('/api/saveGame', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId: localStorage.getItem('userId'),
        resources
      })
    });
  };

  return (
    <aside style={styles.sidebar}>
      <ul style={styles.menu}>
        <li style={styles.menuItem} onClick={() => setActiveComponent('stats')}>Stats</li>
        <li style={styles.menuItem} onClick={() => setActiveComponent('buildings')}>Buildings</li>
        <button onClick={saveGame}>Save Game</button>
        {isAdmin && <button onClick={() => setActiveComponent('admin')}>Admin</button>}
      </ul>
    </aside>
  );
};

const styles = {
  sidebar: {
    width: '200px',
    height: 'calc(100vh - 80px)', // Full height minus the header height
    backgroundColor: 'blue',
    padding: '10px',
    boxShadow: '2px 0 8px rgba(0, 0, 0, 0.1)',
  },
  menu: {
    listStyleType: 'none',
    padding: 0,
  },
  menuItem: {
    padding: '10px',
    color: 'white',
    cursor: 'pointer',
  },
};

export default Sidebar;
