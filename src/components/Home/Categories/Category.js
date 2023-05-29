import Image from 'next/image';
import classes from './Category.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { setFilters } from '@/store/recipes-slice';
import { setNotification } from '@/store/user-slice';

function Category(props) {
  const { userFilter, userSearch } = useSelector((state) => state.recipes);
  const dispatch = useDispatch();
  const [filterActive, setFilterActive] = useState(false);

  const filterRecipesHandler = () => {
    !userSearch &&
      dispatch(
        setNotification(
          'In order to apply filters, please search for some recipes first.'
        )
      );
    userSearch &&
      dispatch(
        setFilters({ name: props.name.split(' ').join('-'), id: props.id })
      );
  };
  //

  useEffect(() => {
    const active = userFilter.filters.find(
      (filter) => filter.name === props.name.split(' ').join('-')
    );

    setFilterActive(active ? true : false);
  }, [userFilter.filters]);

  return (
    <div
      className={`${classes.category} ${filterActive ? classes.active : ''}`}
      onClick={filterRecipesHandler}
    >
      <Image
        className={classes.img}
        src={props.src.src}
        alt="category image"
        height={100}
        width={100}
      />
      <p>{props.name}</p>
    </div>
  );
}

export default React.memo(Category);
