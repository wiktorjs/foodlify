import { useDispatch, useSelector } from 'react-redux';
import classes from './Footer.module.scss';
import Link from 'next/link';
import { logOut } from '@/store/user-slice';

export default function Footer() {
  const { isLoggedIn } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const logOutHandler = () => {
    dispatch(logOut())
    sessionStorage.removeItem('user');
  };

  return (
    <footer className={classes.footer}>
      <p className={classes.logo}>Foodlify</p>
      <ul>
        <li>
          <Link href="/" className={classes.link}>
            Home
          </Link>
        </li>
        {!isLoggedIn ? (
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
        ) :  <li>
              <p className={classes.link} onClick={logOutHandler}>
                Log out
              </p>
            </li>}
      </ul>
      <p className={classes.copyright}>
        Copyright &copy; {new Date().getFullYear()} by Wiktor Sienkiewicz.
      </p>
    </footer>
  );
}
