import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useLocalStorage } from 'react-use';

export default function HomePage() {
  const router = useRouter();
  const [account, setAccount] = useLocalStorage('account', null);

  useEffect(() => {
    if (account) {
      router.push('/start');
    } else {
      router.push('/login');
    }
  }, [account, router]);

  return <div>Loading...</div>;
}
