import { useRouter } from 'next/router';
import { useLocalStorage } from 'react-use';
import { useEffect, useState } from 'react';

export default function StartPage() {
  const [account, setAccount] = useLocalStorage('account', null);
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (!account) {
      router.push('/login');
    }
  }, [account, router]);

  if (!isMounted) {
    return null; // oder ein Loading Spinner
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
      <h1>Welcome to the Start Page</h1>
      {account && <p>Connected as: {account}</p>}
    </div>
  );
}
