import { useState } from 'react';
import classes from './Filters.module.scss';
import NavigationButton from '../../UI/NavigationButton';
import { CATEGORIES } from '@/store/categories';
import ListItem from '@/components/UI/ListItem';
import { useDispatch } from 'react-redux';
import { setFilters } from '@/store/recipes-slice';
export default function Filters() {
  const remainingCategores = CATEGORIES.slice(6);
  const [isActive, setIsActive] = useState(false);
  const dispatch = useDispatch();

  const openButtonHandler = () => {
    setIsActive((prevState) => !prevState);
  };


  const resetFiltersHandler = () => dispatch(setFilters({type: 'RESET'}));

  return (
    <>
      <div className={classes.wrapper}>
        <div className={classes.menu} onClick={openButtonHandler}>
          <NavigationButton active={isActive} />
          <p>Filters</p>
        </div>

        <div
          className={`${classes['filters-wrapper']} ${
            isActive ? classes.active : ''
          }`}
        >
          <hr className={classes.hr} />
          <ul className={classes.filters}>
            {remainingCategores.map((category, i) => (
              <ListItem key={i+6} id={i+6} type='FILTER'>{category}</ListItem>
            ))}
            <li onClick={resetFiltersHandler}>Clear all filters</li>
          </ul>
        </div>
      </div>
    </>
  );
}
