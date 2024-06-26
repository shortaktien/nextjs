import React, { useState } from 'react';
import Web3 from 'web3';
import { useRouter } from 'next/router';

const LoginPage = () => {
  const [address, setAddress] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    if (!window.ethereum) {
      alert('Please install Metamask!');
      return;
    }

    const web3 = new Web3(window.ethereum);
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const userAddress = accounts[0];
      setAddress(userAddress);
      console.log('Connected to', userAddress);

      // Register or login the user
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ address: userAddress })
      });

      if (!response.ok) {
        const error = await response.json();
        console.error('Error response:', error);
        return;
      }

      const data = await response.json();
      console.log('Login/Register success:', data);
      router.push('/start');
    } catch (error) {
      console.error('Error connecting to Metamask:', error);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <button onClick={handleLogin}>Login with Metamask</button>
      {address && <p>Connected address: {address}</p>}
    </div>
  );
};

export default LoginPage;
