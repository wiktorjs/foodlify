import classes from "./MainNavigation.module.scss";

export default function MainNavigation() {
  return (
    <nav className={classes.navigation}>
      <p className={classes.logo}>Foodlify</p>

      {/* prettier-ignore */}
        <ul>
            <li><a href="#">Sign In</a></li>
            <li><a href="#">Sign Up</a></li>
            <li><a href="#">Theme</a></li>
            <li><a href="#">Cart</a></li>
            <li><a href="#">Acc</a></li>
            <li><a href="#">Bookmarks</a></li>
        </ul>

    </nav>
  );
}
