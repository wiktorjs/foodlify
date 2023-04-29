import RecipeCard from './RecipeCard';

export default function Recipes({ recipes }) {
  return (
    <>
      {recipes?.map((recipeDetails) => {
        const { recipe } = recipeDetails;
        return (
          <RecipeCard
            key={Math.trunc(Math.random() * 10000)}
            img={recipe.images.SMALL.url}
            name={recipe.label}
            servings={recipe.yield}
            time={recipe.totalTime}
            kcal={recipe.calories}
          />
        );
      })}
    </>
  );
}
