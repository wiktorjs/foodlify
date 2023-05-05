import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    userSearch: '',
    recipes: [],
    recipesCount: 0,
    pages: {},

    userFilter: {
        active: false,
        details: {
            filter: '',
            results: [],
        }
    }
}

export const recipesSlice = createSlice({
    name: 'recipes',
    initialState,
    reducers: {
        setRecipes: (state, action) => {
            state.recipes = [...action.payload.recipes]
            state.recipesCount = action.payload.recipesCount
            state.pages = action.payload.pages
        },

        setUserSearch: (state, action) => {
            state.userSearch = action.payload;
            // | Reset loaded recipes
            state.recipes = [];
        },

        updateRecipes: (state, action) => {
            state.recipes = [...state.recipes, ...action.payload.recipes];
            state.pages = action.payload.pages
        },

        setFilteredRecipes: (state, action) => {
            if(action.payload.type === 'RESET') state.userFilter = initialState.userFilter;
            if(action.payload.type === 'FILTER') state.userFilter = action.payload.filter;
        }
    }
});


export const {setRecipes, setUserSearch, updateRecipes, setFilteredRecipes} = recipesSlice.actions;
export default recipesSlice.reducer