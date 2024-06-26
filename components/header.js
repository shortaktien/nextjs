import React from 'react';

const Header = () => {
  return (
    <header style={styles.header}>
      <h1>Header</h1>
    </header>
  );
};

const styles = {
  header: {
    width: '100%',
    height: '80px',
    backgroundColor: 'red',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    fontSize: '24px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
};

export default Header;
