import { Bookmarks, ShoppingCart, User } from '@phosphor-icons/react';
import classes from './MainNavigation.module.scss';

import ThemeSwitch from './ThemeSwitch';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '@/store/user-slice';
import { useRouter } from 'next/router';

export default function MainNavigation({ page }) {
  const userSlice = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();

  const logOutHandler = () => {
    dispatch(logOut());
    router.push('/');
  };

  return (
    <nav
      className={`${classes.navigation} ${page === 'auth' ? classes.auth : ''}`}
    >
      <Link className={classes.logo} href="/">
        Foodlify
      </Link>

      <ul>
        {userSlice.isLoggedIn ? (
          <>
            <p className={classes.welcome}>
              Welcome back, <span>{userSlice.user}</span>
            </p>
            <li>
              <p className={classes.link} onClick={logOutHandler}>
                Log out
              </p>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href="/auth?type=sign-in" className={classes.link}>
                Sign In
              </Link>
            </li>
            <li>
              <Link href="/auth?type=sign-up" className={classes.link}>
                Sign Up
              </Link>
            </li>
          </>
        )}

        <li>
          <a href="#" className={classes['icon-box']}>
            <ThemeSwitch />
          </a>
        </li>

        <li>
          <a href="#" className={classes['icon-box']}>
            <ShoppingCart className={classes.icon} weight="bold" />
          {userSlice.isLoggedIn && <span className={classes.count}>{userSlice.cart?.length}</span>}
          </a>
        </li>

        {/* <li>
          <a href="#" className={classes['icon-box']}>
            <User className={classes.icon} weight="bold" />
          </a>
        </li> */}

        <li>
          <a href="#" className={classes['icon-box']}>
            <Bookmarks className={classes.icon} weight="bold" />
           {userSlice.isLoggedIn && <span className={classes.count}>{userSlice.bookmarks?.length}</span>}
          </a>
        </li>
      </ul>
    </nav>
  );
}
