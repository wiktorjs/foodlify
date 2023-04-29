import { MagnifyingGlass, X } from '@phosphor-icons/react';
import classes from './Searchbar.module.scss';
export default function Searchbar() {
  return (
    // prettier-ignore
    <form className={classes.form}>
        
        <MagnifyingGlass className={classes.icon} weight="bold" />
        
        <input className={classes.input} placeholder="Start searching"  type="text" />
        
        <button className={classes.reset} type='reset'> <X className={`${classes.icon}`} weight="bold" /> </button>
    
    </form>
  );
}
