import { BowlFood, ForkKnife, Shrimp, Warning } from '@phosphor-icons/react';
import classes from './NoRecipes.module.scss';
import { useSelector } from 'react-redux';

export default function NoRecipes() {
  const { userSearch, recipes } = useSelector((state) => state.recipes);

  const noRecipes = userSearch && recipes?.length === 0;

  return (
    <div className={`${classes.wrapper} ${noRecipes ? classes.error : ''}`}>
      <h2 className={classes.logo}>Foodlify</h2>

      <div className={classes.content}>
        {noRecipes && (
          <Warning
            className={classes.icon}
            weight="duotone"
          />
        )}

        <p className={classes.text}>
          {noRecipes && <span>Error: </span>}
          {noRecipes
            ? 'No recipes found. Try searching for something else!'
            : 'Start searching to discover amazing recipes!'}
        </p>
      </div>

      <div className={classes.icons}>
        {!noRecipes && (
          <>
            <ForkKnife className={classes.icon} weight="light" />
            <BowlFood className={classes.icon} weight="light" />
            <Shrimp className={classes.icon} weight="light" />
          </>
        )}
      </div>
    </div>
  );
}
