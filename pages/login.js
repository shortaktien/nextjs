import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function LoginPage() {
  const [error, setError] = useState('');
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleMetaMaskLogin = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const address = accounts[0];
        console.log('Connected address:', address);

        const response = await fetch('/api/saveData', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username: address }),
        });

        if (response.ok) {
          const data = await response.json();
          router.push(`/start?userId=${data.userId}`); // Weiterleiten zur Startseite mit Benutzer-ID als Query-Parameter
        } else {
          const errorText = await response.text();
          console.error('Error response:', errorText);
          setError(errorText); // Fehler anzeigen
        }
      } catch (error) {
        console.error('Error connecting to MetaMask:', error);
        setError('Error connecting to MetaMask');
      }
    } else {
      setError('MetaMask is not installed');
    }
  };

  if (!isMounted) {
    return null; // oder ein Loading Spinner
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
      <h1>Login with MetaMask</h1>
      <button onClick={handleMetaMaskLogin} style={{ padding: '10px 20px', fontSize: '16px' }}>
        Login with MetaMask
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
