import Image from 'next/image';
import classes from './Category.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { setFilteredRecipes } from '@/store/recipes-slice';

export default function Category(props) {
  const [filterActive, setFilterActive] = useState(false);
  const stateRecipes = useSelector((state) => state.recipes);
  const dispatch = useDispatch();

  const filterRecipesHandler = () => {
    setFilterActive(prevState => !prevState)
    // props.onClick();
  };

  useEffect(() => {

    if(!filterActive) {
      dispatch(setFilteredRecipes({type: 'RESET'}));
      return
    };

    const filter = props.name.split(' ').join('-');
    const results = stateRecipes.recipes.filter((recipe) =>
      recipe.recipe.healthLabels.find((label) => label === filter)
    );

    const filterObj = {
      active: true,
      details: { filter, results },
    }

    dispatch(setFilteredRecipes({type: 'FILTER', filter: filterObj})); 

  }, [filterActive])

  return (
    <div className={`${classes.category} ${filterActive ? classes.active : ''}`} onClick={filterRecipesHandler}>
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
