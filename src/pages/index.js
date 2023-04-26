import Head from 'next/head';

import classes from '../styles/Home.module.scss';
import Header from '@/components/Header/Header';
import MainNavigation from '@/components/MainNavigation/MainNavigation';
import Categories from '@/components/Categories/Categories';

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainNavigation />
      <Header />
      <main className={classes.main}>
        <Categories />
      </main>
    </>
  );
}
