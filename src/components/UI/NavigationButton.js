
import classes from './NavigationButton.module.scss';

export default function NavigationButton({active, mobile, onClick}) {

  return (
    <button
      className={`${classes.button} ${ active ? classes.active: ''} ${mobile ? classes.mobile : ''}`}
      aria-label="Main Menu"
      aria-controls="mobile-navigation"
      aria-expanded={active}
      onClick={onClick}
    >
      <span className={`${classes.top}  ${ active ? classes.active: ''}`}></span>
      <span className={`${classes.mid}  ${ active ? classes.active: ''}`}></span>
      <span className={`${classes.bottom}  ${ active ? classes.active: ''}`}></span>
    </button>
  );
}
