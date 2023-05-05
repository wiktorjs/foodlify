import Recipe from '@/components/Recipe/Recipe';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function RecipePage() {
  const [recipe, setRecipe] = useState(undefined);
  const recipes = useSelector((state) => state.recipes.recipes);
  const router = useRouter();
  const { recipeId } = router.query;

  useEffect(() => {
    const displayedRecipe = recipes.find((recipe) => recipe.id === recipeId);

    if (!displayedRecipe) {
      router.push('/');
      return;
    }

    setRecipe(displayedRecipe);
  }, []);

  return <>{recipe && <Recipe recipeDetails={recipe} />}</>;
}
