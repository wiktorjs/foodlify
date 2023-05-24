import { useSelector } from 'react-redux';
import classes from './Footer.module.scss';
import Link from 'next/link';

export default function Footer() {
  const { darkTheme } = useSelector((state) => state.user);

  return (
    <footer className={`${classes.footer} ${darkTheme ? 'dark' : ''}`}>
      <p className={classes.logo}>Foodlify</p>
      <ul>
        <li>
          <Link href="/" className={classes.link}>
            Home
          </Link>
        </li>
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
      </ul>
      <p className={classes.copyright}>Copyright &copy; {new Date().getFullYear()} by Wiktor Sienkiewicz. All rights reserved.</p>
    </footer>
  );
}
