import { useEffect, useState } from 'react';
import classes from './Categories.module.scss';

import { useDispatch, useSelector } from 'react-redux';
import { setRecipes } from '@/store/recipesSlice';
import useHttp from '../../hooks/use-http';

import Filters from './Filters';
import MainCategories from './MainCategories';
import Recipes from '../Recipes/Recipes';
import Loader from '../UI/Loader';
import NoRecipes from '../Recipes/NoRecipes';

export default function Categories({ credentials }) {
  const [pageRecipes, setPageRecipes] = useState(null);
  const stateRecipes = useSelector((state) => state.recipes);
  const dispatch = useDispatch();

  const loadRecipes = async function () {
    const data = await useHttp(credentials);
    const fetchedRecipes = data.recipes;

    // Send all 20 recipes to state
    dispatch(setRecipes(fetchedRecipes));

    // Display 6 recipes
    setPageRecipes(fetchedRecipes.slice(0, 6));
  };

  useEffect(() => {
    if (stateRecipes.recipes.length > 0) return; // Prevents sending API requests with each file save
    // loadRecipes();
  }, [stateRecipes]);

  return (
    <section className={classes.section}>
      <Filters />
      <div className={classes.wrapper}>
        <MainCategories />

        <div className={classes['recipes-box']}>
        
          {!pageRecipes && <NoRecipes />}
          {pageRecipes && <Recipes recipes={pageRecipes} />}

        </div>
      </div>
    </section>
  );
}
