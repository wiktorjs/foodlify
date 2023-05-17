import { Clock, Fire, Heart, ShoppingCart, User } from '@phosphor-icons/react';
import classes from './RecipeCard.module.scss';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { addRecipe, removeRecipe } from '@/store/user-slice';
import useUser from '@/hooks/use-user';

export default function RecipeCard({
  id,
  img,
  name,
  servings,
  time,
  kcal,
  category,
  type,
}) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const bookmarkRef = useRef();
  const cartRef = useRef();

  const userSlice = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { updateUser } = useUser();

  const stopPropagation = (e) => e.preventDefault();

  const recipeHandler = async (type) => {
    if (!userSlice.isLoggedIn) return;

    const recipeObj = {
      id,
      name,
      img,
      servings,
      kcal,
      time,
    };

    if (type === 'bookmark') {
      if (isBookmarked) {
        dispatch(removeRecipe({ type: 'bookmarks', id: recipeObj.id }));
        setIsBookmarked(false);
        return;
      }

      dispatch(addRecipe({ type: 'bookmarks', item: recipeObj }));
      setIsBookmarked(true);
    }

    if (type === 'cart') {
      if (isInCart) {
        dispatch(removeRecipe({ type: 'cart', id: recipeObj.id }));
        setIsInCart(false);
        return;
      }

      dispatch(addRecipe({ type: 'cart', item: recipeObj }));
      setIsInCart(true);
    }
  };

  // | Update user bookmarks or cart in database
  useEffect(() => {
    // ? Prevents running this useEffect for every RecipeCard that is visibile thus limiting the amount of requests sent.
    if (bookmarkRef.current === isBookmarked && cartRef.current === isInCart)
      return;

    const { bookmarks, cart, uID } = userSlice;
    updateUser({ bookmarks, cart, uID });

    bookmarkRef.current = isBookmarked;
    cartRef.current = isInCart;
  }, [isBookmarked, isInCart]);

  // | Mark recipes as bookmarked or in cart when the user logs in
  useEffect(() => {
    const bookmarked = userSlice.bookmarks.find((recipe) => recipe.id === id);
    const inCart = userSlice.cart.find((recipe) => recipe.id === id);

    if (bookmarked) setIsBookmarked(true);
    if (inCart) setIsInCart(true);
  }, [userSlice.bookmarks, userSlice.cart]);

  return (
    <Link href={`/recipes/${id}`} className={classes[`wrapper-${type}`]}>
      <img src={img} alt={name} className={classes.img} />

      <div className={classes.details}>
        {type !== 'main' && (
          <p>{name.length <= 20 ? name : `${name.slice(0, 17)}...`}</p>
        )}
        
        {type === 'main' && (
          <div className={classes.general}>
            <p>{name.length <= 20 ? name : `${name.slice(0, 17)}...`}</p>

            <span>
              <User className={classes.icon} weight="regular" />
              {servings}
            </span>
          </div>
        )}

        <div className={classes.general}>
          {type !== 'main' && (
            <span>
              <User className={classes.icon} weight="regular" />
              {servings}
            </span>
          )}

          <span>
            <Fire className={classes.icon} weight="regular" />
            {Math.trunc(kcal)} kcal
          </span>

          <span>
            <Clock className={classes.icon} weight="regular" />
            {time} min
          </span>
        </div>

        <div className={classes.actions}>
          {type === 'main' && (
            <p>
              {category.length <= 11 ? category : `${category.slice(0, 11)}...`}
            </p>
          )}

          <div
          
            onClick={stopPropagation}
          >
            <Heart
              onClick={recipeHandler.bind(null, 'bookmark')}
              className={classes['icon--action']}
              weight={isBookmarked ? 'fill' : 'bold'}
              fill={isBookmarked ? '#00c86b' : ''}
            />
            <ShoppingCart
              onClick={recipeHandler.bind(null, 'cart')}
              className={classes['icon--action']}
              weight="bold"
              fill={isInCart ? '#00c86b' : ''}
            />
          </div>
        </div>
      </div>
    </Link>
  );
}
