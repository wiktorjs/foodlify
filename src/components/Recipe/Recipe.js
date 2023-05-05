import MainNavigation from '../UI/MainNavigation/MainNavigation';
import classes from './Recipe.module.scss';
import Ingredients from './Details';
import { Heart, ShoppingCart } from '@phosphor-icons/react';
import { useState } from 'react';

export default function Recipe({ recipeDetails }) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const addBookmarkHandler = () => setIsBookmarked(prevState => !prevState);

  const { recipe } = recipeDetails;
  // Genitive check
  const recipeAuthor = `${recipe.source}'${
    recipe.source.charAt(recipe.source.length - 1) === 's' ? '' : 's'
  }`;

  const cusineTypes = recipe.cuisineType.map(
    (type) => type[0].toUpperCase() + type.slice(1)
  );

  const macros = [
    recipe.totalNutrients.CHOCDF,
    recipe.totalNutrients.FAT,
    recipe.totalNutrients.PROCNT,
  ];

  const additionalDetails = {
    defaultIngredients: recipe.ingredients,
    url: recipe.url,
    defaultServings: recipe.yield,
    time: recipe.totalTime,
    defaultKcal: recipe.calories,
    defaultMacros: macros,
    cusineTypes,
    categories: recipe.healthLabels.slice(0, 10),
  };

  return (
    <>
      <MainNavigation />
      <header className={classes.header}>
        <div className={classes['header-content']}>
          <h1>
            <span>{recipeAuthor}</span>
            <br />
            {recipe.label}
          </h1>
          <div className={classes['icon-box']}>
            <div className={classes.icon} onClick={addBookmarkHandler}>
              <Heart weight={!isBookmarked ? 'bold' : 'fill'} fill={!isBookmarked ? '' : '#00c86b'} />
            </div>

            <div className={classes.icon}>
              <ShoppingCart weight="bold" />
            </div>
          </div>
        </div>

        <img src={recipe.image} className={classes.img} />
      </header>

      <main className={classes.main}>
        <Ingredients details={additionalDetails} />
      </main>
    </>
  );
}
