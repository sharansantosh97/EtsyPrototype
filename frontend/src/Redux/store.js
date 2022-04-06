import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "../Redux/Reducers/user";

const store = configureStore({
    reducer: {
      user: userReducer,
    },
  });


export default store;