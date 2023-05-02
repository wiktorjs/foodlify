import Ingredient from '../UI/Ingredient';
import MainNavigation from '../UI/MainNavigation/MainNavigation';
import classes from './Recipe.module.scss';
export default function Recipe({ recipeDetails }) {
  const { recipe } = recipeDetails;
  // Genitive check
  const recipeAuthor = `${recipe.source}'${
    recipe.source.charAt(recipe.source.length - 1) === 's' ? '' : 's'
  }`;
  console.log(recipe)
  return (
    <>
      <MainNavigation />
      <header className={classes.header}>
        <h1>
          <span>{recipeAuthor}</span>
          <br />
          {recipe.label}
        </h1>
        <img src={recipe.image} className={classes.img} />
      </header>

      <main className={classes.main}>

        <div className={classes.details}>
            <h2>Ingredients</h2>
            <hr />
            <ul>{recipe.ingredients.map((ingredient, i) => <Ingredient key={i} id={i} details={ingredient} />)}</ul> 
            <a className={classes.link} href={recipe.url} target='_blank'>Full recipe can be found here.</a> 
        </div>

        <div className={classes.details}>
            <h2> Additional details </h2>
            <hr />
            <p>Cusine: {recipe.cuisineType[0][0].toUpperCase() + recipe.cuisineType[0].slice(1)}</p>
        </div>

      </main>
    </>
  );
}
