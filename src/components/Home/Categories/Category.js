import Image from 'next/image';
import classes from './Category.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { setFilters } from '@/store/recipes-slice';

function Category(props) {
  const { userFilter } = useSelector((state) => state.recipes);
  const dispatch = useDispatch();

  const filterName = props.name.split(' ').join('-');
  const filterActive = userFilter.filters.find(
    (filter) => filter.name === filterName
  );

  const filterRecipesHandler = () =>
    dispatch(setFilters({ name: filterName, id: props.id }));
  //
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
