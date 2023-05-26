import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: '',
  isLoggedIn: false,
  bookmarks: [],
  cart: [],
  darkTheme: false,
  notification: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logIn: (state, action) => {

      return {...action.payload, isLoggedIn: action.payload.user.length > 0, darkTheme: state.darkTheme, notification: '' }
     
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
    },

    setNotification: (state, action) => {
      state.notification = action.payload;
    }
  },
});

export const { logIn, logOut, changeUserData, setDarkTheme, setNotification } = userSlice.actions;
export default userSlice.reducer;
