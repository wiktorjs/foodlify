import { BowlFood, ForkKnife, Shrimp, Warning } from '@phosphor-icons/react';
import classes from './NoRecipes.module.scss';

export default function NoRecipes({error}) {

  return (
    <div className={`${classes.wrapper} ${error ? classes.error : ''}`}>
      <h2 className={classes.logo}>Foodlify</h2>

      <div className={classes.content}>
        {error && (
          <Warning
            className={classes.icon}
            weight="duotone"
          />
        )}

        <p className={classes.text}>
          {error && <span>Error: </span>}
          {error
            ? error
            : 'Start searching to discover amazing recipes!'}
        </p>
      </div>

      <div className={classes.icons}>
        {!error && (
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
