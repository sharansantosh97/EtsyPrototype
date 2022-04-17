import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "../Redux/Reducers/user";
import { productReducer } from "../Redux/Reducers/products";

const store = configureStore({
    reducer: {
      user: userReducer,
      products: productReducer
    },
  });


export default store;