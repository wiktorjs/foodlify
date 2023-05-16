import { useSelector } from 'react-redux';
import classes from './Overlay.module.scss';
import Link from 'next/link';
import OverlayCard from './OverlayCard';

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
        {type === 'bookmarks' && userSlice.bookmarks.map((bookmark) => (
          <OverlayCard type={bookmark} />
        ))}

        {type === 'cart' && userSlice.cart.map((cart) => (
          <OverlayCard type={cart} />
        ))}
      </div>
    </div>
  );
}
