import { createReducer } from "@reduxjs/toolkit";
const initialState = {
  cart:{}
};

export const cartReducer = createReducer(initialState, {
   CART_LOADING: (state) => {
    state.loading = true;
  },
  CART_SUCCESS: (state, action) => {
    state.loading = false;
    state.cart = action.payload;
  },
  CART_ERROR: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  }
});