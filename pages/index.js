import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      router.push('/start');
    } else {
      router.push('/login');
    }
  }, [router]);

  return <div>Loading...</div>;
}
