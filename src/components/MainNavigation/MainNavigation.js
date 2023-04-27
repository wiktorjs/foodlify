import {
  Bookmarks,
  MoonStars,
  ShoppingCart,
  Sun,
  User,
} from '@phosphor-icons/react';
import classes from './MainNavigation.module.scss';
import { useState } from 'react';
import { CSSTransition } from 'react-transition-group';

export default function MainNavigation() {
  // todo use CSSTransition to animate theme icon

  const [isLightTheme, setIsLightTheme] = useState(true);
  
  const changeThemeHandler = (e) => {
    e.preventDefault();
    setIsLightTheme(prevState => !prevState);
  };

  return (
    <nav className={classes.navigation}>
      <p className={classes.logo}>Foodlify</p>

      <ul>
        <li>
          <a href="#" className={classes.link}>
            Sign In
          </a>
        </li>

        <li>
          <a href="#" className={classes.link}>
            Sign Up
          </a>
        </li>

        <li>
          <a
            href="#"
            onClick={changeThemeHandler}
            className={classes['icon-box']}
          >
            {isLightTheme ? (
              <Sun weight="bold" className={classes.icon} />
            ) : (
              <MoonStars weight="bold" className={classes.icon} />
            )}
          </a>
        </li>

        <li>
          <a href="#" className={classes['icon-box']}>
            <ShoppingCart className={classes.icon} weight="bold" />
          </a>
        </li>

        <li>
          <a href="#" className={classes['icon-box']}>
            <User className={classes.icon} weight="bold" />
          </a>
        </li>

        <li>
          <a href="#" className={classes['icon-box']}>
            <Bookmarks className={classes.icon} weight="bold" />
          </a>
        </li>
      </ul>
    </nav>
  );
}
