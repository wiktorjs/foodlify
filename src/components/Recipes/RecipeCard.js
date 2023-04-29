import { Clock, Fire, Heart, ShoppingCart, User } from '@phosphor-icons/react';
import classes from './RecipeCard.module.scss';
import { useState } from 'react';
export default function RecipeCard({ img, name, servings, time, kcal }) {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const addBookmarkHandler = () => setIsBookmarked((prevState) => !prevState);

  return (
    <div className={classes.wrapper}>
      <img src={img} alt={name} className={classes.img} />
      
      <div className={classes.content}>
        <div className={classes.details}>
          <p>{name.length <= 20 ? name : `${name.slice(0, 17)}...`}</p>

          <div className={classes['details--additional']}>
            <User className={classes.icon} weight="bold" />{' '}
            <span>{servings}</span>
          </div>
        </div>

        <div className={classes.details}>
          <div className={classes['details--additional']}>
            <Fire className={classes.icon} weight="regular" />

            <span>{Math.trunc(kcal)} kcal</span>
          </div>

          <div className={classes['details--additional']}>
            <Clock className={classes.icon} weight="regular" />
            <span>{time} min</span>
          </div>
        </div>

        <div className={classes['action-box']}>
          <p> MAIN CATEGORY </p>
          <div className={classes['details--additional']}>
            <Heart
              onClick={addBookmarkHandler}
              className={classes['icon--action']}
              weight={isBookmarked ? 'fill' : 'bold'}
              fill={isBookmarked ? '#00c86b' : ''}
            />
            <ShoppingCart className={classes['icon--action']} weight="bold" />
          </div>
        </div>
      </div>
    </div>
  );
}
