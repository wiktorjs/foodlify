import { Clock, Fire, Heart, ShoppingCart, User } from '@phosphor-icons/react';
import classes from './RecipeCard.module.scss';
import { useState } from 'react';
import Link from 'next/link';
export default function RecipeCard({ id, img, name, servings, time, kcal, category }) {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const addBookmarkHandler = () => setIsBookmarked((prevState) => !prevState);

  return (
    <Link href={`/recipes/${id}`} className={classes.wrapper}>
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
          <p> {category.length <= 11 ? category : `${category.slice(0, 11)}...`} </p>
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
    </Link>
  );
}
