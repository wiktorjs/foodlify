import RecipeCard from '../../UI/RecipeCard';

export default function Recipes({ recipes }) {
  console.log(recipes)
  return (
    <>
      {recipes?.map((recipeDetails) => {
        const { recipe, id } = recipeDetails;
        return (
          <RecipeCard
            key={id}
            id={id}
            img={recipe.images.SMALL.url}
            name={recipe.label}
            servings={recipe.yield}
            time={recipe.totalTime}
            kcal={recipe.calories}
            category={recipe.dishType[0]?.toUpperCase()}
            type='main'
          />
        );
      })}
    </>
  );
}
