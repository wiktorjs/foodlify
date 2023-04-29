import { BowlFood, ForkKnife, Shrimp } from '@phosphor-icons/react';
import classes from './NoRecipes.module.scss';

export default function NoRecipes() {
  return (
    <div className={classes.wrapper}>
      <h2 className={classes.logo}>Foodlify</h2>

      <div className={classes.content}>
        <p className={classes.text}>Start searching to discover amazing recipes!</p>
      </div>

      <div className={classes.icons}>
        <ForkKnife className={classes.icon} weight="light" />
        <BowlFood className={classes.icon} weight="light" />
        <Shrimp className={classes.icon} weight="light" />
      </div>
    </div>
  );
}
