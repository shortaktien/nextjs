import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Header from '../components/header'; // Korrekt importieren
import Sidebar from '../components/sidebar';
import { useResourcesContext } from '../components/useResources';

const StartPage = () => {
  const router = useRouter();
  const { resources } = useResourcesContext();
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsername = async () => {
      const userId = router.query.userId;
      if (userId) {
        try {
          const response = await fetch(`/api/loadData?userId=${userId}`);
          if (response.ok) {
            const data = await response.json();
            setUsername(data.username);
          } else {
            const errorText = await response.text();
            setError(errorText);
          }
        } catch (error) {
          setError('Error fetching username');
        }
      } else {
        router.push('/login');
      }
    };
    fetchUsername();
  }, [router.query.userId, router]);

  return (
    <div>
      <Header />
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <div style={{ flex: 1, backgroundColor: '#28a745', padding: '10px' }}>
          <h1>Welcome to the Start Page</h1>
          {username && <p>Username: {username}</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default StartPage;
