import Link from 'next/link';
import classes from './Overlay.module.scss';
import { Clock, Fire, Heart, ShoppingCart, User } from '@phosphor-icons/react';
import { useRef, useState } from 'react';
export default function OverlayCard({ type }) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const bookmarkRef = useRef();
  const cartRef = useRef();

  const stopPropagation = (e) => e.preventDefault();

  const recipeHandler = (type) => {
    type === 'bookmark' && setIsBookmarked((prev) => !prev);
    type === 'cart' && setIsInCart((prev) => !prev);
  };

  return (
    <Link href={`/recipes/${type.id}`} className={classes.card} key={type.id}>
      <img src={type.img} className={classes.img} />

      <div className={classes.details}>
        <h3>{type.name}</h3>

        <div className={classes.general}>
          <span>
            <User weight="regular" className={classes.icon} />
            {type.servings}
          </span>

          <span>
            <Fire weight="regular" className={classes.icon} />
            {Math.ceil(type.kcal)} kcal
          </span>

          <span>
          <Clock weight="regular" className={classes.icon} />
          {type.time} min</span>
        </div>

        <div className={classes.actions} onClick={stopPropagation}>
          <Heart
            onClick={recipeHandler.bind(null, 'bookmark')}
            className={classes.icon}
            weight={isBookmarked ? 'fill' : 'bold'}
            fill={isBookmarked ? '#00c86b' : ''}
          />
          <ShoppingCart
            onClick={recipeHandler.bind(null, 'cart')}
            className={classes.icon}
            weight="bold"
            fill={isInCart ? '#00c86b' : ''}
          />
        </div>
      </div>
    </Link>
  );
}
