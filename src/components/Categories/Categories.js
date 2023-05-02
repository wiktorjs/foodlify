import { useEffect, useState } from 'react';
import classes from './Categories.module.scss';

import { useDispatch, useSelector } from 'react-redux';
import { setRecipes, updateRecipes } from '@/store/recipes-slice';
import useHttp from '../../hooks/use-http';

import Filters from './Filters';
import MainCategories from './MainCategories';
import Recipes from '../Recipes/Recipes';
import Loader from '../UI/Loader';
import NoRecipes from '../Recipes/NoRecipes';
import Searchbar from './Searchbar';
import Pagination from '../UI/Pagination';
import { RECIPES_PER_PAGE } from '@/store/config';

export default function Categories() {
  const [isMobile, setIsMobile] = useState(false);
  const [pageRecipes, setPageRecipes] = useState({ recipes: null, page: 1 });
  const stateRecipes = useSelector((state) => state.recipes);
  const dispatch = useDispatch();

  const { isLoading, fetchData, error } = useHttp();

  const loadRecipes = async function (nextPage = false, currentPage) {
    // | New search logic
    if (!nextPage) {
      const data = await fetchData(stateRecipes.userSearch);
      if (!data) return;

      const fetchedRecipes = data.recipes;

      // Send all 20 recipes to state
      dispatch(setRecipes(data));

      // Display 6 recipes
      setPageRecipes({
        recipes: fetchedRecipes.slice(0, RECIPES_PER_PAGE),
        page: 1,
      });

      return;
    }

    // | Case when fetched recipes are coming to an end logic
    const { page, recipes } = currentPage;

    // Get next recipes from the API
    const nextPageUrl = stateRecipes.pages.next.href;
    const data = await fetchData(undefined, nextPageUrl);
    const fetchedRecipes = data.recipes;

    // Update recipes state with new recipes and link to the next page
    dispatch(updateRecipes(data));

    // Determine how many recipies from the recently fetched data should get added to a page. Ex. if there are already 2 recipes visible then, if there should be 6 recipes per page, we need to add 4 of them.
    const leftRecipes =
      RECIPES_PER_PAGE - (stateRecipes.recipes.length % RECIPES_PER_PAGE);
    // Extract those recipes. If a page would've been empty, display 6 recipes from the newly fetched data
    const recipesToAdd = fetchedRecipes.slice(
      0,
      recipes.length === 0 ? RECIPES_PER_PAGE : leftRecipes
    );

    setPageRecipes({ page, recipes: [...recipes, ...recipesToAdd] });
  };
  const displayPage = function (page = 1) {
    // Conditionally define page recipes positions in the array, depending on which page the user is currently at
    const firstRecipe = page === 1 ? 0 : RECIPES_PER_PAGE * (page - 1);
    const lastRecipe = RECIPES_PER_PAGE * page;

    // Extract this recipes from state
    const recipes = stateRecipes.recipes.slice(firstRecipe, lastRecipe);

    if (recipes.length < 6 && page !== 1) {
      loadRecipes(true, { recipes, page });
      return;
    }

    // Display them on a page
    setPageRecipes({ recipes, page });
  };

  useEffect(() => {
    const { userSearch, recipes } = stateRecipes;

    // If there is no user search return (to not create infinite loop). If there are recipes that have been already loaded display them and return.
    if (!userSearch || recipes.length > 0) {
      recipes.length > 0 && displayPage(pageRecipes.page);
      return;
    }

    // Come back to the first page
    loadRecipes();
    displayPage();
  }, [stateRecipes.userSearch]);

  useEffect(() => {
    setIsMobile(window.matchMedia('(max-width: 900px)').matches);
  }, []);

  return (
    <section className={classes.section}>
      <Filters />
      {/* <div className={classes.wrapper}> */}
        <MainCategories />

        <Searchbar />

        <div className={classes['recipes-box']}>
          {!isLoading && (error || stateRecipes.recipes.length === 0) && (
            <NoRecipes message={error} />
          )}
          {isLoading && !error && <Loader />}
          {!isLoading && !error && <Recipes recipes={pageRecipes.recipes} />}
        </div>

        {!isLoading && pageRecipes?.recipes && (
          <Pagination
            currentPage={pageRecipes.page}
            totalPages={Math.ceil(stateRecipes.recipesCount / 6)}
            onChange={displayPage}
          />
        )}
      {/* </div> */}
    </section>
  );
}
