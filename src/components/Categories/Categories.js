import { useEffect, useState } from 'react';
import classes from './Categories.module.scss';

import { useDispatch, useSelector } from 'react-redux';
import { setRecipes } from '@/store/recipes-slice';
import useHttp from '../../hooks/use-http';

import Filters from './Filters';
import MainCategories from './MainCategories';
import Recipes from '../Recipes/Recipes';
import Loader from '../UI/Loader';
import NoRecipes from '../Recipes/NoRecipes';

export default function Categories() {
  const [pageRecipes, setPageRecipes] = useState(null);
  const stateRecipes = useSelector((state) => state.recipes);
  const dispatch = useDispatch();
  const { isLoading, fetchData } = useHttp();

  console.log();
  const loadRecipes = async function () {
    const data = await fetchData(stateRecipes.userSearch);
    const fetchedRecipes = data.recipes;

    // Send all 20 recipes to state
    dispatch(setRecipes(fetchedRecipes));

    // Display 6 recipes
    setPageRecipes(fetchedRecipes.slice(0, 6));
  };

  useEffect(() => {
    const { userSearch, recipes } = stateRecipes;

    if (!userSearch || recipes.length > 0) {
      recipes.length > 0 && setPageRecipes(stateRecipes.recipes.slice(0, 6));
      return;
    }

    loadRecipes();
  }, [stateRecipes.userSearch]);

  return (
    <section className={classes.section}>
      <Filters />
      <div className={classes.wrapper}>
        <MainCategories />
        {/* <p>d</p> */}

        <div className={classes['recipes-box']}>
          {isLoading && <Loader />}
          {!isLoading && !pageRecipes && <NoRecipes />}
          {!isLoading && pageRecipes && <Recipes recipes={pageRecipes} />}
        </div>
      </div>
    </section>
  );
}
