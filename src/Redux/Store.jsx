import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Slices/UserSlice";
import cartReducer from "./Slices/CartSlice";

const store = configureStore({
	reducer: {
		user: userReducer,
		cart: cartReducer,
	},
});

export default store;
