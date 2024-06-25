import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function StartPage() {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    setIsMounted(true);
    const fetchUsername = async () => {
      const storedUsername = localStorage.getItem('username');
      if (storedUsername) {
        setUsername(storedUsername);
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
    </div>
  );
}
