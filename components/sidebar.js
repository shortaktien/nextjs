import React from 'react';

const Sidebar = ({ setActiveComponent }) => {
  return (
    <aside style={styles.sidebar}>
      <ul style={styles.menu}>
        <li style={styles.menuItem} onClick={() => setActiveComponent('stats')}>Stats</li>
        <li style={styles.menuItem} onClick={() => setActiveComponent('buildings')}>Buildings</li>
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
