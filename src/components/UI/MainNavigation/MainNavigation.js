import {
  Bookmarks,
  MoonStars,
  ShoppingCart,
  Sun,
  User,
} from '@phosphor-icons/react';
import classes from './MainNavigation.module.scss';

import ThemeSwitch from './ThemeSwitch';
import Link from 'next/link';

export default function MainNavigation() {
  return (
    <nav className={classes.navigation}>
      <Link className={classes.logo} href='/' >Foodlify</Link>

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
