import { useSelector } from 'react-redux';
import classes from './OverlayWrapper.module.scss';
import RecipeCard from './RecipeCard';
import { X } from '@phosphor-icons/react';

export default function OverlayWrapper({ type, active, onClick }) {
  const userSlice = useSelector((state) => state.user);

  return (
    <div
      className={`overlay ${classes['overlay-wrapper']} ${
        active ? classes.active : ''
      }`}
    >
      <X className={classes.close} weight="bold" onClick={onClick} />
      <h2>Your {type === 'bookmarks' ? type : 'shopping list'}</h2>

      <div className={classes.recipes}>
      
        {type === 'bookmarks' &&
          (userSlice.bookmarks.length !== 0 ? (
            userSlice.bookmarks.map((bookmark) => (
              <RecipeCard
                key={bookmark.id}
                id={bookmark.id}
                img={bookmark.img}
                name={bookmark.name}
                servings={bookmark.servings}
                time={bookmark.time}
                kcal={bookmark.kcal}
                type="secondary"
              />
            ))
          ) : (
            <p>No bookmarks found.</p>
          ))}
          
        {type === 'cart' &&
          (userSlice.cart.length !== 0 ? (
            userSlice.cart.map((cart) => (
              <RecipeCard
                key={cart.id}
                id={cart.id}
                img={cart.img}
                name={cart.name}
                servings={cart.servings}
                time={cart.time}
                kcal={cart.kcal}
                type="secondary"
              />
            ))
          ) : (
            <p>No recipes in shopping list found.</p>
          ))}
      </div>
    </div>
  );
}
