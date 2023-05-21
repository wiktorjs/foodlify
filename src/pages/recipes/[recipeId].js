import NoRecipes from '@/components/Home/Recipes/NoRecipes';
import Recipe from '@/components/Recipe/Recipe';
import Loader from '@/components/UI/Loader';
import MainNavigation from '@/components/UI/MainNavigation/MainNavigation';
import useHttp from '@/hooks/use-http';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function RecipePage({ id }) {
  const [recipe, setRecipe] = useState(undefined);
  const recipesSlice = useSelector((state) => state.recipes.recipes);

  const { isLoading, fetchData, error } = useHttp();

  const fetchRecipe = async () => {
    const data = await fetchData({ query: id, type: 'recipe' });
    setRecipe(data);
  };

  useEffect(() => {
    const displayedRecipe = recipesSlice.find((recipe) => recipe.id === id);

    if (!displayedRecipe) {
      fetchRecipe();
      return;
    }

    setRecipe(displayedRecipe);
  }, []);

  return (
    <>
      <MainNavigation />
      {recipe && <Recipe recipeDetails={recipe} />}
      {!recipe && (
        <main className="centered-content">
          {!error && isLoading && <Loader type="centered" />}
          {error && !isLoading && <NoRecipes error={error} retryRequest={fetchRecipe} />}
        </main>
      )}
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
