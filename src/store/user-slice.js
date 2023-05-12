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
  },
});

export const { logIn, logOut } = userSlice.actions;
export default userSlice.reducer;
