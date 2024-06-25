import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function StartPage() {
  const router = useRouter();
  const { userId } = router.query;
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsername = async () => {
      if (userId) {
        try {
          const response = await fetch(`/api/loadData?userId=${userId}`);
          if (response.ok) {
            const data = await response.json();
            setUsername(data.username);
          } else {
            const errorText = await response.text();
            console.error('Error response:', errorText);
            setError(errorText);
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
  }, [userId, router]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
      <h1>Welcome to the Start Page</h1>
      {username && <p>Username: {username}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
