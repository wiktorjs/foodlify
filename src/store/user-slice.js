import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: '',
  isLoggedIn: false,
  bookmarks: [],
  cart: [],
  darkTheme: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logIn: (state, action) => {

      return {...action.payload, isLoggedIn: action.payload.user.length > 0, darkTheme: state.darkTheme }
     
    },

    logOut: (state) => {
      return {...initialState, darkTheme: state.darkTheme};
    },

    changeUserData: (state, action) => {
      const {type, bookmarks, cart} = action.payload
      if(type === 'bookmarks') state.bookmarks = bookmarks;
      if(type === 'cart') state.cart = cart;
    },

    setDarkTheme: (state, action) => {
      state.darkTheme = action.payload;
    }

  },
});

export const { logIn, logOut, changeUserData, setDarkTheme } = userSlice.actions;
export default userSlice.reducer;
