import Auth from '@/components/Auth/Auth';
import Footer from '@/components/UI/Footer';
import MainNavigation from '@/components/UI/MainNavigation/MainNavigation';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function AuthPage() {
  const router = useRouter();
  const query = router.query;

  useEffect(() => {
    if (router.asPath === '/auth') {
      router.replace('/auth?type=sign-in');
    }
  }, [router]);

  return (
    <>
     <Head>
        <title>Foodlify</title>
        <meta name="description" content="Discover an exquisite world of flavors at Foodlify! Explore our vast collection of mouthwatering recipes from around the globe. Whether you're a seasoned chef or a passionate foodie, our site is your ultimate culinary companion. Join the gastronomic journey at Foodlify and elevate your cooking to new heights!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MainNavigation page="auth" />
      <Auth query={query} />
      <Footer />

    </>
  );
}
