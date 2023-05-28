import { Clock, Fire, Heart, ShoppingCart, User } from '@phosphor-icons/react';
import classes from './RecipeCard.module.scss';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { changeUserData, setNotification } from '@/store/user-slice';
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
  const [state, setState] = useState({
    isBookmarked: false,
    isInCart: false,
  });

  const userSlice = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { updateUser } = useUser();

  const stopPropagation = (e) => e.preventDefault();

  const recipeHandler = async (actionType) => {
    if (!userSlice.isLoggedIn) {
      !userSlice.notification &&
        dispatch(
          setNotification(
            'Please log in to add recipes to bookmarks or shopping list.'
          )
        );
      return;
    }
    const storedUser = JSON.parse(sessionStorage.getItem('user'));
    const { bookmarks, cart, uID } = userSlice;
    let newCart, newBookmarks;

    const clickedRecipe = {
      id,
      name,
      img,
      servings,
      kcal,
      time,
    };

    if (actionType === 'bookmark') {
      // If the recipe wasn't bookmarked, create an array containing recipes from userSlice and clicked recipe, else filter it out
      newBookmarks = !state.isBookmarked
        ? [...bookmarks, clickedRecipe]
        : bookmarks.filter((recipe) => recipe.id !== clickedRecipe.id);

      // Update user with new bookmarks
      updateUser({ newBookmarks, cart, uID });

      // Update state with new bookmarks
      dispatch(changeUserData({ type: 'bookmarks', bookmarks: newBookmarks }));

      sessionStorage.setItem('user', JSON.stringify({...storedUser, bookmarks: newBookmarks}));
    }

    // Same logic as for bookmarks
    if (actionType === 'cart') {
      newCart = !state.isInCart
        ? [...cart, clickedRecipe]
        : cart.filter((recipe) => recipe.id !== clickedRecipe.id);

      updateUser({ bookmarks, newCart, uID });
      dispatch(changeUserData({ type: 'cart', cart: newCart }));

      sessionStorage.setItem('user', JSON.stringify({...storedUser, cart: newCart}));
    }
  };

  useEffect(() => {
    // Upon bookmarks or cart change (incl. log in), determine wether the recipe was added or removed
    const bookmarked = userSlice.bookmarks.find((recipe) => recipe.id === id);
    const inCart = userSlice.cart.find((recipe) => recipe.id === id);

    // Set it state to correct value to display suitable icons
    setState({
      isBookmarked: bookmarked ? true : false,
      isInCart: inCart ? true : false,
    });
  }, [userSlice.bookmarks, userSlice.cart, id]);

  return (
    <Link
      href={`/recipes/${id}`}
      className={`${classes[`wrapper-${type}`]} ${
        userSlice.darkTheme ? classes.dark : ''
      }`}
    >
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

          <div onClick={stopPropagation}>
            <Heart
              onClick={recipeHandler.bind(null, 'bookmark')}
              className={classes['icon--action']}
              weight={state.isBookmarked ? 'fill' : 'regular'}
              fill={
                state.isBookmarked
                  ? '#00c86b'
                  : `${userSlice.darkTheme ? '#fdfdfd' : '#0d0d0d'}`
              }
            />
            <ShoppingCart
              onClick={recipeHandler.bind(null, 'cart')}
              className={classes['icon--action']}
              weight="regular"
              fill={
                state.isInCart
                  ? '#00c86b'
                  : `${userSlice.darkTheme ? '#fdfdfd' : '#0d0d0d'}`
              }
            />
          </div>
        </div>
      </div>
    </Link>
  );
}
