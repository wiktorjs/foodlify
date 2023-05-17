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

    changeUserData: (state, action) => {
      const {type, bookmarks, cart} = action.payload
      if(type === 'bookmarks') state.bookmarks = bookmarks;
      if(type === 'cart') state.cart = cart;
    }

  },
});

export const { logIn, logOut, changeUserData } = userSlice.actions;
export default userSlice.reducer;
