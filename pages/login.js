import React, { useState } from 'react';
import { useRouter } from 'next/router';

const LoginPage = () => {
  const [address, setAddress] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    if (!address) {
      alert('Please enter your address');
      return;
    }

    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ address }),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('userId', data.userId);
      localStorage.setItem('userAddress', address); // Speichere die Benutzeradresse
      router.push('/start');
    } else {
      const error = await response.json();
      alert(error.message);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <input
        type="text"
        placeholder="Enter your address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginPage;
