import { useSelector } from 'react-redux';
import classes from './OverlayWrapper.module.scss';
import Link from 'next/link';

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
        {userSlice.bookmarks.map((bookmark) => (
          <Link href={`/recipes/${bookmark.id}`} className={classes.card} key={bookmark.id}>
            <img src={bookmark.img} className={classes.img} />

            <div className={classes.details}>
              <h3>{bookmark.name}</h3>

              <div className={classes.general}>
                <p>{bookmark.servings}</p>
                <p>{Math.ceil(bookmark.kcal)} kcal</p>
                <p>{bookmark.time} min</p>
              </div>

              <div className={classes.actions}>
                <p>add to cart</p>
                <p>bookmark</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
