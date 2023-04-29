import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    userSearch: '',
    recipes: [],
    pages: {}
}

export const recipesSlice = createSlice({
    name: 'recipes',
    initialState,
    reducers: {
        setRecipes: (state, action) => {
            state.recipes = action.payload
        },

        setUserSearch: (state, action) => {
            state.userSearch = action.payload;
            // | Reset loaded recipes
            state.recipes = [];
        }
    }
});


export const {setRecipes, setUserSearch} = recipesSlice.actions;
export default recipesSlice.reducer