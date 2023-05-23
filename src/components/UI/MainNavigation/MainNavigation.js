import { Bookmarks, ShoppingCart, User } from '@phosphor-icons/react';
import classes from './MainNavigation.module.scss';

import ThemeSwitch from './ThemeSwitch';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '@/store/user-slice';
import { useRouter } from 'next/router';
import OverlayWrapper from '../OverlayWrapper';
import { useState } from 'react';
import NavigationButton from '../NavigationButton';

export default function MainNavigation({ page, type, darkThemeActive }) {
  const [mobileNavIsActive, setMobileNavIsActive] = useState(false);
  const [overlay, setOverlay] = useState({
    type: null,
    isActive: false,
  });

  const userSlice = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();

  const logOutHandler = () => dispatch(logOut());

  const overlayHandler = (e) => {
    const action = e.target.closest('div').id;

    setOverlay((prevState) => ({
      type: action,
      isActive:
        action !== prevState.type && prevState.isActive
          ? prevState.isActive
          : !prevState.isActive,
    }));
  };

  const closeOverlayHandler = () =>
    setOverlay((prevState) => ({ ...prevState, isActive: false }));

  const mobileNavigationHandler = () =>
    setMobileNavIsActive((prevState) => !prevState);

  return (
    <>
      <NavigationButton
        mobile={true}
        active={mobileNavIsActive}
        onClick={mobileNavigationHandler}
        type={type}
      />
      <nav
        className={`${classes.navigation} ${
          page === 'auth' ? classes.auth : ''
        } ${mobileNavIsActive ? classes['mobile--active'] : ''} ${
          overlay.isActive ? classes['overlay--active'] : ''
        }
        ${userSlice.darkTheme ? 'dark' : ''}`}
      >
        <Link className={classes.logo} href="/">
          Foodlify
        </Link>

        <ul>
          {userSlice.isLoggedIn && (
            <p className={classes.welcome}>
              Welcome back, <span>{userSlice.user}</span>
            </p>
          )}
          
          <li>
            <Link href="/" className={classes.link}>
              Home
            </Link>
          </li>

          {userSlice.isLoggedIn ? (
            <li>
              <p className={classes.link} onClick={logOutHandler}>
                Log out
              </p>
            </li>
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
              <ThemeSwitch setDarkTheme={darkThemeActive} />
            </a>
          </li>

          <li>
            <div
              id="cart"
              className={classes['icon-box']}
              onClick={overlayHandler}
            >
              <ShoppingCart className={classes.icon} weight="bold" />
              {userSlice.isLoggedIn && (
                <span className={classes.count}>{userSlice.cart?.length}</span>
              )}
            </div>
          </li>

          <li>
            <div
              id="bookmarks"
              className={classes['icon-box']}
              onClick={overlayHandler}
            >
              <Bookmarks className={classes.icon} weight="bold" />
              {userSlice.isLoggedIn && (
                <span className={classes.count}>
                  {userSlice.bookmarks?.length}
                </span>
              )}
            </div>
          </li>
        </ul>
      </nav>

      <OverlayWrapper
        type={overlay.type}
        active={overlay.isActive}
        onClick={closeOverlayHandler}
      />
    </>
  );
}
