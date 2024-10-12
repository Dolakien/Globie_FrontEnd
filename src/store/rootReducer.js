import { combineReducers } from "@reduxjs/toolkit";

import cartReducer from "./cartSlice";

export const rootReducer = combineReducers({
  cart: cartReducer,
});
