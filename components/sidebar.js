import React from 'react';
import { useRouter } from 'next/router';

const Sidebar = () => {
  const router = useRouter();

  const handleNavigation = (path) => {
    router.push(path);
  };

  return (
    <aside style={{ width: '200px', backgroundColor: '#007bff', height: '100vh', padding: '10px' }}>
      <ul>
        <li onClick={() => handleNavigation('/path1')}>Option 1</li>
        <li onClick={() => handleNavigation('/path2')}>Option 2</li>
        <li onClick={() => handleNavigation('/path3')}>Option 3</li>
      </ul>
    </aside>
  );
};

export default Sidebar;
