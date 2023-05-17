import { useSelector } from 'react-redux';
import classes from './Overlay.module.scss';
import RecipeCard from './RecipeCard';

export default function OverlayWrapper({ type, active }) {
  const userSlice = useSelector((state) => state.user);

  return (
    <div
      className={`${classes['overlay-wrapper']} ${
        active ? classes.active : ''
      }`}
    >
      <h2>Your {type}</h2>

      <div className={classes.recipes}>
        {type === 'bookmarks' &&
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
          ))}

        {type === 'cart' &&
          userSlice.cart.map((cart) =>  <RecipeCard
              key={cart.id}
              id={cart.id}
              img={cart.img}
              name={cart.name}
              servings={cart.servings}
              time={cart.time}
              kcal={cart.kcal}
              type="secondary"
            />)}
      </div>
    </div>
  );
}
