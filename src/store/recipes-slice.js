import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userSearch: '',
  recipes: [],
  recipesCount: 0,
  pages: {},

  userFilter: {
    filters: [],
    recipes: [],
  },
};

export const recipesSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    setRecipes: (state, action) => {
      state.recipes = [...action.payload.recipes];
      state.recipesCount = action.payload.recipesCount;
      state.pages = action.payload.pages;
    },

    setUserSearch: (state, action) => {
      state.userSearch = action.payload;
      //  Reset loaded recipes
      state.recipes = [];
    },

    updateRecipes: (state, action) => {
      state.recipes = [...state.recipes, ...action.payload.recipes];
      state.pages = action.payload.pages;
    },

    setFilters: (state, action) => {
      const { type } = action.payload;

      if(type === 'RESET') {
        state.userFilter = initialState.userFilter;
        return;
      }

      const newFilter = action.payload;
      const filterExists = state.userFilter.filters.find(filter => filter.id === newFilter.id);

      if(filterExists)  state.userFilter.filters = state.userFilter.filters.filter(
        (filter) => filter !== filterExists
      )
      if(!filterExists) state.userFilter.filters.push(newFilter);

      // Go through every fetched recipe
      state.userFilter.recipes = state.recipes.filter((recipe) =>
        // Check if iterated recipe contains all remaining filters
        state.userFilter.filters.every((filter) =>
          recipe.recipe.healthLabels.includes(filter.name)
        )
      );

      state.userFilter.active = state.userFilter.filters.length > 0
    },
  },
});

export const {
  setRecipes,
  setUserSearch,
  updateRecipes,
  setFilters,
} = recipesSlice.actions;
export default recipesSlice.reducer;

/*
    Example:
    filters: ['Low-Fat', 'Egg-Free']
    recipe healthLabels: ['Low-Fat', 'Pork-Free'],

    recipe.recipe.healthLabels.includes('Low-Fat') // true
    .every() method continues to run, checking another filter

    recipe.recipe.healthLabels.includes('Egg-Free') // false
    .every() method stops and returns false. Then the top function looks like this: state.recipes.filter(recipe =false). Due to this, this recipe is filtered out.
*/
