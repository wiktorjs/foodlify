import { Clock, Heart, ShoppingCart } from '@phosphor-icons/react';
import classes from './RecipeCard.module.scss';
import { useState } from 'react';
export default function RecipeCard() {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const addBookmarkHandler = () => setIsBookmarked((prevState) => !prevState);

  return (
    <div className={classes.wrapper}>
      <div className={classes.img}></div>

      <div className={classes.content}>
        <p className={classes.details}>
          Name <span className={classes.servings}>Servings</span>
        </p>

        <p className={`${classes.details} ${classes['details--additional']}`}>
          Difficulty
          <span className={classes.time}>
            <Clock className={`${classes.icon} ${classes['icon--time']}`} weight="regular" /> 60min
          </span>
          <span>Kcals</span>
        </p>

        <div className={classes['action-box']}>
          <p className={classes.category}> MAIN CATEGORY </p>
          <Heart
            onClick={addBookmarkHandler}
            className={classes.icon}
            weight={isBookmarked ? 'fill' : 'regular'}
            fill={isBookmarked ? '#00c86b' : ''}
          />
          <ShoppingCart className={classes.icon} weight="bold" />
        </div>
      </div>
    </div>
  );
}
