import { useCallback, useEffect, useState } from 'react';
import classes from './Categories.module.scss';

import { useDispatch, useSelector } from 'react-redux';
import { setRecipes, updateRecipes } from '@/store/recipes-slice';
import useHttp from '../../../hooks/use-http';

import Filters from './Filters';
import MainCategories from './MainCategories';
import Recipes from '../Recipes/Recipes';
import Loader from '../../UI/Loader';
import NoRecipes from '../Recipes/NoRecipes';
import Searchbar from './Searchbar';
import Pagination from '../../UI/Pagination';
import { RECIPES_PER_PAGE } from '@/store/config';
import { setNotification } from '@/store/user-slice';

export default function Categories() {
  const [pageRecipes, setPageRecipes] = useState({ recipes: null, page: 1 });
  const stateRecipes = useSelector((state) => state.recipes);
  const [pageRequest, setPageRequest] = useState({ nextPage: false });
  const dispatch = useDispatch();

  const { isLoading, fetchData, error } = useHttp();

  const loadRecipes = async function (nextPage = false, navigatedPage) {
    // | New search logic
    if (!nextPage) {
      //
      setPageRequest({ nextPage: false });

      const data = await fetchData({
        query: stateRecipes.userSearch,
        type: 'search',
      });
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

    // | Case when the last fetched recipes are being displayed
    const { page, recipes } = navigatedPage;
    // When the request to fetch another recipes was too quick, rember to which page user wanted to navigate
    setPageRequest({ nextPage: true, page });

    // Get next recipes from the API
    const nextPageUrl = stateRecipes.pages.next.href;
    const data = await fetchData(null, nextPageUrl);
    const fetchedRecipes = data?.recipes;
    if (!fetchedRecipes) return;

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

  const displayPage = function (page = 1, autoRequest = false) {
    if(error && !autoRequest) return;

    const { userFilter } = stateRecipes;
    // Conditionally define page recipes positions in the array, depending on which page the user is currently at
    const firstRecipe = page === 1 ? 0 : RECIPES_PER_PAGE * (page - 1);
    const lastRecipe = RECIPES_PER_PAGE * page;

    // Extract this recipes from state
    const recipes = userFilter.active
      ? userFilter.recipes.slice(firstRecipe, lastRecipe)
      : stateRecipes.recipes.slice(firstRecipe, lastRecipe);
    //

    if (!userFilter.active && recipes.length < 6 && page !== 1) {
      loadRecipes(true, { recipes, page });
      return;
    }
    // Display them on a page
    setPageRecipes({ recipes, page });
  };

  useEffect(() => {
    // If there is no user search return (to not create infinite loop). If there are recipes that have been already loaded display them and return.  The second check is only to not send additional request upon file save and can be deleted in production mode.
    if (!stateRecipes.userSearch || stateRecipes.recipes.length > 0) {
      stateRecipes.recipes.length > 0 && displayPage(pageRecipes.page);
      return;
    }

    // Come back to the first page
    loadRecipes();
    displayPage();
  }, [stateRecipes.userSearch]);

  useEffect(() => {
    //  If the user filter is active, display 6 recipes that suit the filter
    //  If the filter is deactivated show all loaded recipes
    setPageRecipes({
      page: 1,
      recipes: stateRecipes.userFilter.active
        ? stateRecipes.userFilter.recipes.slice(0, RECIPES_PER_PAGE)
        : stateRecipes.recipes.slice(0, RECIPES_PER_PAGE),
    });
  }, [stateRecipes.userFilter]);

  const tooMuchRequestsHandler = useCallback(() => {
    // If the request was to display another recipes with the same search, navigate user to this page after the time between requests has passed.
    if (pageRequest.nextPage) displayPage(pageRequest.page, true);
    // If the request was a new search, simply load the recipes after countdown ends.
    else loadRecipes();
  }, [pageRequest]);

  return (
    <section className={classes.section} id="recipes">
      <Filters />
      <MainCategories />

      <Searchbar />

      <div className={classes['recipes-box']}>
      
        {isLoading && !error && <Loader />}
        {!isLoading && (error || stateRecipes.recipes.length === 0) && (
          <NoRecipes error={error} retryRequest={tooMuchRequestsHandler} />
        )}
        {!isLoading &&
          !error &&
          stateRecipes.userFilter.active &&
          stateRecipes.userFilter.recipes.length === 0 &&
          stateRecipes.recipes.length !== 0 && (
            <NoRecipes
              message={
                'No recipes with set criteria found. Try applying other filters!'
              }
            />
          )}
        {!isLoading && !error && stateRecipes.recipes.length !== 0 && (
          <Recipes recipes={pageRecipes.recipes} />
        )}
      </div>

      {!isLoading && pageRecipes?.recipes && (
        <Pagination
          currentPage={pageRecipes.page}
          totalPages={Math.ceil(
            !stateRecipes.userFilter.active
              ? stateRecipes.recipesCount / RECIPES_PER_PAGE
              : stateRecipes.userFilter.recipes.length / RECIPES_PER_PAGE
          )}
          onChange={displayPage}
        />
      )}
    </section>
  );
}
