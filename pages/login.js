import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function LoginPage() {
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const connectMetaMask = async () => {
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
          setAddress(accounts[0]);
        } catch (error) {
          console.error('Error connecting MetaMask:', error);
          setError('Error connecting MetaMask');
        }
      } else {
        console.error('MetaMask not found');
        setError('MetaMask not found');
      }
    };

    connectMetaMask();
  }, []);

  const handleRegister = async () => {
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: address }),
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

  const handleLogin = async () => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: address }),
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
      console.error('Error logging in:', error);
      setError('Error logging in');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
      <h1>Login/Register</h1>
      <button onClick={handleRegister} style={{ padding: '10px 20px', fontSize: '16px', marginBottom: '10px' }}>
        Register
      </button>
      <button onClick={handleLogin} style={{ padding: '10px 20px', fontSize: '16px' }}>
        Login
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
