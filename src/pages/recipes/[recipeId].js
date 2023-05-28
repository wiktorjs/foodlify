import NoRecipes from '@/components/Home/Recipes/NoRecipes';
import Recipe from '@/components/Recipe/Recipe';
import Footer from '@/components/UI/Footer';
import Loader from '@/components/UI/Loader';
import MainNavigation from '@/components/UI/MainNavigation/MainNavigation';
import useAutoLogin from '@/hooks/use-auto-login';
import useHttp from '@/hooks/use-http';
import Head from 'next/head';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function RecipePage({ id }) {
  const [recipe, setRecipe] = useState(undefined);
  const recipesSlice = useSelector((state) => state.recipes.recipes);
  const {darkTheme} = useSelector(state => state.user);

  useAutoLogin();
  const { isLoading, fetchData, error } = useHttp();

  const fetchRecipe = useCallback(async () => {
    const data = await fetchData({ query: id, type: 'recipe' });
    setRecipe(data);
  }, []);

  useEffect(() => {
    const displayedRecipe = recipesSlice.find((recipe) => recipe.id === id);

    if (!displayedRecipe) {
      fetchRecipe();
      return;
    }

    setRecipe(displayedRecipe);
  }, [id, recipesSlice, fetchRecipe]);

  return (
    <>
     <Head>
        <title>Foodlify</title>
        <meta name="description" content="Discover an exquisite world of flavors at Foodlify! Explore our vast collection of mouthwatering recipes from around the globe. Whether you're a seasoned chef or a passionate foodie, our site is your ultimate culinary companion. Join the gastronomic journey at Foodlify and elevate your cooking to new heights!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MainNavigation />
      {recipe && <Recipe recipeDetails={recipe} />}
      {!recipe && (
        <main className={`centered-content ${darkTheme ? 'dark' : ''}`}>
          {!error && isLoading && <Loader type="centered" />}
          {error && !isLoading && <NoRecipes error={error} retryRequest={fetchRecipe} />}
        </main>
      )}
      <Footer />
    </>
  );
}

export function getServerSideProps({ query }) {
  const id = query.recipeId;

  return {
    props: {
      id,
    },
  };
}
