import React, { useState } from 'react';
import Web3 from 'web3';
import { useRouter } from 'next/router';

const LoginPage = () => {
  const [address, setAddress] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    if (!address) {
      alert('Please connect to MetaMask');
      return;
    }

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ address })
      });

      if (response.ok) {
        const data = await response.json();
        console.log('User data:', data);
        router.push('/start');
      } else {
        console.error('Error response:', await response.json());
      }
    } catch (error) {
      console.error('Error connecting to MetaMask:', error);
    }
  };

  const connectMetamask = async () => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      try {
        await window.ethereum.enable();
        const accounts = await web3.eth.getAccounts();
        setAddress(accounts[0]);
        console.log('Connected to MetaMask:', accounts[0]);
      } catch (error) {
        console.error('User denied account access', error);
      }
    } else {
      console.error('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <button onClick={connectMetamask}>Connect MetaMask</button>
      {address && (
        <div>
          <p>Connected to {address}</p>
          <button onClick={handleLogin}>Login</button>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
