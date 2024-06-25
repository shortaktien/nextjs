import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleLogin = async () => {
    try {
      const response = await fetch('/api/saveData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('userId', data.userId);
        router.push('/start');
      } else {
        const data = await response.json();
        setError(data.error);
      }
    } catch (error) {
      console.error('Error saving username:', error);
      setError('Error saving username');
    }
  };

  if (!isMounted) {
    return null; // oder ein Loading Spinner
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
      <h1>Login</h1>
      <input
        type="text"
        placeholder="Enter your username"
        value={username}
        onChange={handleUsernameChange}
        style={{ padding: '10px', marginBottom: '10px', fontSize: '16px' }}
      />
      <button onClick={handleLogin} style={{ padding: '10px 20px', fontSize: '16px' }}>
        Login
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
