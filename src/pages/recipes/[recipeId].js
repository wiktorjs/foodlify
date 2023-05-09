import NoRecipes from '@/components/Home/Recipes/NoRecipes';
import Recipe from '@/components/Recipe/Recipe';
import Loader from '@/components/UI/Loader';
import useHttp from '@/hooks/use-http';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function RecipePage({ id }) {
  const [recipe, setRecipe] = useState(undefined);
  const recipes = useSelector((state) => state.recipes.recipes);

  const { isLoading, fetchData, error } = useHttp();

  const fetchRecipe = async () => {
    const data = await fetchData({ query: id, type: 'recipe' });
    setRecipe(data);
  };

  useEffect(() => {
    const displayedRecipe = recipes.find((recipe) => recipe.id === id);

    if (!displayedRecipe) {
      fetchRecipe();
      return;
    }

    setRecipe(displayedRecipe);
  }, [id]); 

  return (
    <>
      {!error && isLoading && <Loader />}
      {!error && !isLoading && recipe && <Recipe recipeDetails={recipe} />}
      {!isLoading && error && <NoRecipes error={error} />}
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
