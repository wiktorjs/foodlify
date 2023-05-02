import RecipeCard from './RecipeCard';

export default function Recipes({ recipes }) {

  return (
    <>
      {recipes?.map((recipeDetails) => {
        const { recipe } = recipeDetails;
        return (
          <RecipeCard
            key={Math.random().toString().slice(2, 10)}
            img={recipe.images.SMALL.url}
            name={recipe.label}
            servings={recipe.yield}
            time={recipe.totalTime}
            kcal={recipe.calories}
            category={recipe.dishType[0]?.toUpperCase()}
          />
        );
      })}
    </>
  );
}
