import {
  Bookmarks,
  MoonStars,
  ShoppingCart,
  Sun,
  User,
} from '@phosphor-icons/react';
import classes from './MainNavigation.module.scss';

import ThemeSwitch from './ThemeSwitch';

export default function MainNavigation() {
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
          <a href="#" className={classes['icon-box']}>
            <ThemeSwitch />
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
