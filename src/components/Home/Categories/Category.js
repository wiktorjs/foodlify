import Image from 'next/image';
import classes from './Category.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import {setFilters } from '@/store/recipes-slice';

function Category(props) {
  const [filterActive, setFilterActive] = useState(false);
  const stateRecipes = useSelector((state) => state.recipes);
  const dispatch = useDispatch();

  const filterRecipesHandler = () => setFilterActive((prevState) => !prevState);

  useEffect(() => {
    if (!filterActive) {
      dispatch(setFilters({ type: 'REMOVE', id: props.id }));
      return;
    }
    
    const filter = { name: props.name.split(' ').join('-'), id: props.id };
    
    // const results = stateRecipes.recipes.filter((recipe) =>
    // recipe.recipe.healthLabels.find((label) => label === details.name)
    // );
    
    dispatch(setFilters({ type: 'ADD', filter }));
  }, [filterActive]);

  

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
