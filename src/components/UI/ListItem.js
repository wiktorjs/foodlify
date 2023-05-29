import { CheckSquare, Square } from '@phosphor-icons/react';
import classes from './ListItem.module.scss';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilters } from '@/store/recipes-slice';
import { setNotification } from '@/store/user-slice';

export default function ListItem(props) {
  let filterName, filterActive;
  const [checked, setIsChecked] = useState(false);

  const { userFilter, userSearch } = useSelector((state) => state.recipes);
  const dispatch = useDispatch();

  if (props.type === 'FILTER') {
    filterName = props.children.split(' ').join('-');
    filterActive = userFilter.filters.find(
      (filter) => filter.name === filterName
    );
  }

  const checkedInputHandler = () => {
    if (props.type === 'INGREDIENT') setIsChecked((prevState) => !prevState);

    if (props.type !== 'FILTER') return;

    !userSearch &&
      dispatch(
        setNotification(
          'In order to apply filters, please search for some recipes first.'
        )
      );
    userSearch && dispatch(setFilters({ name: filterName, id: props.id }));
  };

  return (
    <li id="checklist" className={classes.item}>
      <div className={classes.checkbox}>
        <input
          className={classes.input}
          type="checkbox"
          id={props.id}
          onChange={checkedInputHandler}
        />

        {checked || filterActive ? (
          <CheckSquare weight="duotone" fill="#00c86b" />
        ) : (
          <Square weight="regular" />
        )}
      </div>

      <label
        className={`${classes.label} ${
          checked && props.type === 'INGREDIENT' ? classes.checked : ''
        }`}
        htmlFor={props.id}
      >
        {props.children}
      </label>
    </li>
  );
}
