import Recipe from '@/components/Recipe/Recipe';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

export default function RecipePage() {
  const recipes = useSelector(state => state.recipes.recipes);
  const router = useRouter();
  const {recipeId} = router.query
  const displayedRecipe = recipes.find(recipe => recipe.id === recipeId);

  return <Recipe recipeDetails={displayedRecipe} />;
}
