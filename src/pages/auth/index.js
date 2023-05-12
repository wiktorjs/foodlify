import Auth from '@/components/Auth/Auth';
import MainNavigation from '@/components/UI/MainNavigation/MainNavigation';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function AuthPage() {
  const router = useRouter();
  const query = router.query;

  useEffect(() => {
    if (router.asPath === '/auth') {
      router.replace('/auth?type=sign-in');
    }
  }, []);

  return (
    <>
      <MainNavigation page="auth" />
      <Auth query={query} />
    </>
  );
}
