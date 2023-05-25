import Head from 'next/head';

import classes from '../styles/Home.module.scss';
import Header from '@/components/Home/Header/Header';
import MainNavigation from '@/components/UI/MainNavigation/MainNavigation';
import Categories from '@/components/Home/Categories/Categories';

import { useSelector } from 'react-redux';
import Footer from '@/components/UI/Footer';
import useAutoLogin from '@/hooks/use-auto-login';

export default function Home() {
  const { darkTheme } = useSelector((state) => state.user);
  useAutoLogin();
  
  return (
    <>
      <Head>
        <title>Foodlify</title>
        <meta
          name="description"
          content="Discover an exquisite world of flavors at Foodlify! Explore our vast collection of mouthwatering recipes from around the globe. Whether you're a seasoned chef or a passionate foodie, our site is your ultimate culinary companion. Join the gastronomic journey at Foodlify and elevate your cooking to new heights!"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MainNavigation page="home" />
      <Header />

      <main className={`${classes.main} ${darkTheme ? 'dark' : ''}`}>
        <Categories />
      </main>

      <Footer />
    </>
  );
}
