import { MagnifyingGlass, X } from '@phosphor-icons/react';
import classes from './Searchbar.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useRef } from 'react';
import { setUserSearch } from '@/store/recipes-slice';

export default function Searchbar() {
  const userInput = useRef();
  const stateRecipes = useSelector(state => state.recipes);
  const dispatch = useDispatch();

  const userSearchHandler = (e) => {
    e.preventDefault();
    const searchTerm = (userInput.current.value.trim()).toLowerCase();
    
    userInput.current.value = "";
    userInput.current.blur();
    
    // If the search term is empty or it's the search that user has already entered as a latest query, return
    if (searchTerm.length <= 0 || stateRecipes.userSearch === searchTerm) return;
    
    dispatch(setUserSearch(searchTerm));

  }
  return (
    // prettier-ignore
    <form onSubmit={userSearchHandler} className={classes.form}>
        
        <MagnifyingGlass className={classes.icon} weight="bold" />
        
        <input className={classes.input} placeholder="Start searching"  type="text" ref={userInput}/>
        
        <button className={classes.reset} type='reset'> <X className={`${classes.icon}`} weight="bold" /> </button>
    
    </form>
  );
}
