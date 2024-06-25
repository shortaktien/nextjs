import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function StartPage() {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    setIsMounted(true);
    const fetchUsername = async () => {
      const userId = localStorage.getItem('userId');
      if (userId) {
        try {
          const response = await fetch(`/api/getUsername?userId=${userId}`);
          if (response.ok) {
            const data = await response.json();
            setUsername(data.username);
          } else {
            const data = await response.json();
            setError(data.error);
          }
        } catch (error) {
          console.error('Error fetching username:', error);
          setError('Error fetching username');
        }
      } else {
        router.push('/login');
      }
    };
    fetchUsername();
  }, [router]);

  if (!isMounted) {
    return null; // oder ein Loading Spinner
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
      <h1>Welcome to the Start Page</h1>
      {username && <p>Username: {username}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
