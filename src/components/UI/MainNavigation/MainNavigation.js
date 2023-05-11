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

export default function MainNavigation({page}) {
  return (
    <nav className={`${classes.navigation} ${page === 'auth' ? classes.auth : ''}`}>
      <Link className={classes.logo} href='/' >Foodlify</Link>

      <ul>
        <li>
          <Link href='/auth?type=sign-in' className={classes.link}>
            Sign In
          </Link>
        </li>

        <li>
          <Link href='/auth?type=sign-up' className={classes.link}>
            Sign Up
          </Link>
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
