import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: '',
  isLoggedIn: false,
  bookmarks: [],
  cart: [],
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logIn: (state, action) => {

      return {...action.payload, isLoggedIn: action.payload.user.length > 0 }
     
    },

    logOut: () => {
      return initialState;
    },

    addRecipe: (state, action) => {
      const {type, item} = action.payload
      if(type === 'bookmarks') state.bookmarks.push(item);
      if(type === 'cart') state.cart.push(item);
    },

    removeRecipe: (state, action) => {
      const {type, id} = action.payload
      if(type === 'bookmarks') state.bookmarks = state.bookmarks.filter(recipe => recipe.id !== id);
      if(type === 'cart') state.cart = state.cart.filter(recipe => recipe.id !== id);
    }
  },
});

export const { logIn, logOut, addRecipe, removeRecipe } = userSlice.actions;
export default userSlice.reducer;
