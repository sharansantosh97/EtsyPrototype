import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "../Redux/Reducers/user";
<<<<<<< HEAD
import { productReducer } from "../Redux/Reducers/products";
=======
>>>>>>> e2fbba79d93d02958bfa97fbc758e08bcd2bf100

const store = configureStore({
    reducer: {
      user: userReducer,
<<<<<<< HEAD
      products: productReducer
=======
>>>>>>> e2fbba79d93d02958bfa97fbc758e08bcd2bf100
    },
  });


export default store;