import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const localStorageCartUpdater = (products) => {
	try {
		localStorage.setItem("BeatzzCart", JSON.stringify(products));
	} catch (err) {
		toast.error("Unable to Access the LocalStorage", {
			style: {
				borderRadius: "10px",
				background: "#333",
				color: "#fff",
				fontFamily: `"Inter",sans-serif`,
				letterSpacing: `0.03rem`,
				fontSize: `1.1rem`,
			},
		});
	}
};

const initialStateSetter = () => {
	try {
		const cartItems = JSON.parse(localStorage.getItem("BeatzzCart")) || [];
		return cartItems;
	} catch (err) {
		toast.error("Unable to Access the LocalStorage", {
			style: {
				borderRadius: "10px",
				background: "#333",
				color: "#fff",
				fontFamily: `"Inter",sans-serif`,
				letterSpacing: `0.03rem`,
				fontSize: `1.1rem`,
			},
		});
		return [];
	}
};
export const CartSlice = createSlice({
	name: "cartItem",
	initialState: {
		products: initialStateSetter(),
	},
	reducers: {
		addItem: (state, action) => {
			state.products.push(action.payload.Item);

			localStorageCartUpdater(state.products);
		},
		removeItem: (state, action) => {
			state.products = state.products.filter((product) => product._id !== action.payload.id);
			localStorageCartUpdater(state.products);
		},
		changeQuantity: (state, action) => {
			const targetProduct = state.products.find((product) => product._id === action.payload.id);
			targetProduct.cartQuantity += action.payload.sign;
			localStorageCartUpdater(state.products);
		},
		clearCart: (state) => {
			state.products = [];
			try {
				localStorage.removeItem("BeatzzCart");
			} catch (err) {
				if (import.meta.env.VITE_APP_ENV !== "production") {
					console.error("Unable to Access LocalStorage");
				}
			}
		},
	},
});

export const { addItem, removeItem, changeQuantity, clearCart } = CartSlice.actions;
export default CartSlice.reducer;
