import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleMetaMaskLogin = async () => {
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
        router.push(`/start?userId=${data.userId}`);
      } else {
        const errorText = await response.text();
        setError(errorText);
        console.error('Error response:', errorText);
      }
    } catch (error) {
      console.error('Error saving username:', error);
      setError('Error saving username');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
      <h1>Login</h1>
      <input
        type="text"
        placeholder="Enter your username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ padding: '10px', marginBottom: '10px', fontSize: '16px' }}
      />
      <button onClick={handleMetaMaskLogin} style={{ padding: '10px 20px', fontSize: '16px' }}>
        Login
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
