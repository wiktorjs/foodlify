import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    userSearch: '',
    recipes: [],
    recipesCount: 0,
    pages: {}
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
        }
    }
});


export const {setRecipes, setUserSearch, updateRecipes} = recipesSlice.actions;
export default recipesSlice.reducer