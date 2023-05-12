import { configureStore } from "@reduxjs/toolkit";
import recipesReducer from "./recipes-slice";
import userReducer from "./user-slice";

export const store = configureStore({
    reducer: {
        recipes: recipesReducer,
        user: userReducer,
    }
})