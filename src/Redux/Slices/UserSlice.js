import { createSlice } from "@reduxjs/toolkit";

export const UserSlice = createSlice({
	name: "userInfo",
	initialState: {
		name: null,
		email: null,
		id: null,
	},
	reducers: {
		updateUserInfo: (state, action) => {
			state.name = action.payload.name;
			state.email = action.payload.email;
			state.id = action.payload._id;
		},
		deleteUserInfo: (state) => {
			state.name = null;
			state.email = null;
			state.id = null;
		},
	},
});

export const { updateUserInfo, deleteUserInfo } = UserSlice.actions;
export default UserSlice.reducer;
