import { Clock, Fire, Heart, ShoppingCart, User } from '@phosphor-icons/react';
import classes from './RecipeCard.module.scss';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { addRecipe, removeRecipe } from '@/store/user-slice';
export default function RecipeCard({
  id,
  img,
  name,
  servings,
  time,
  kcal,
  category,
}) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const userSlice = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const addBookmarkHandler = async () => {
    const recipeObj = {
      id,
      name,
      img,
      servings,
      kcal,
      time,
    };


    if (isBookmarked) {
      dispatch(removeRecipe({type: 'bookmarks', id: recipeObj.id}));

      setIsBookmarked(false);
      return;
    }


    dispatch(addRecipe({type: 'bookmarks', item: recipeObj}))
    setIsBookmarked(true);
  };
  
  const stopPropagation = (e) => e.preventDefault();

  useEffect(() => {
    const bookmarked = userSlice.bookmarks.find(bookmark => bookmark.id === id);
    if(!bookmarked) return;

    setIsBookmarked(true);
  }, [])

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
          <p>
            {' '}
            {category.length <= 11
              ? category
              : `${category.slice(0, 11)}...`}{' '}
          </p>
          <div
            className={classes['details--additional']}
            onClick={stopPropagation}
          >
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
