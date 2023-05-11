import Form from '@/components/Auth/Form';
import MainNavigation from '@/components/UI/MainNavigation/MainNavigation';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function AuthPage() {
    const router = useRouter();
    const query = router.query;
    
    useEffect(() => {
        if (router.pathname === '/auth') {
            router.replace('/auth?type=sign-in');
          }
    }, [])
  return (
    <>
      <MainNavigation page='auth' />
      <Form query={query}  />
    </>
  );
}
