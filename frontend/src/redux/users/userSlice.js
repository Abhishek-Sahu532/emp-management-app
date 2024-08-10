import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	currentUser: {},
	error: null,
	loading: false,
	success: false,
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		signInStart: (state) => {
			state.loading = true;
		},
		signInSuccess: (state, action) => {
			state.currentUser = action.payload;
			state.success = true;
			state.loading = false;
			state.error = null;
		},
		signInFailure: (state, action) => {
			state.error = action.payload;
			state.success = false;
			state.loading = false;
		},

		currentUserStart: (state) => {
			state.loading = true;
		},
		currentUserSuccess: (state, action) => {
			state.currentUser = action.payload;
			state.success = true;
			state.loading = false;
			state.error = null;
		},
		currentUserFailure: (state, action) => {
			state.error = action.payload;
			state.success = false;
			state.loading = false;
		},
		signOutFailure: (state, action) => {
			state.error = action.payload;
			state.success = true;
			state.loading = false;
		},
		sigOutSuccess: (state) => {
			state.currentUser = {};
			state.success = false;
			state.loading = false;
		},
		signUpUser: (state) => {
			state.loading = true;
		},
		signUpUserFailure: (state, action) => {
			state.error = action.payload;
			state.success = false;
			state.loading = false;
		},
		signUpUserSuccess: (state) => {
			state.loading = false;
			state.error = null;
		},
		updateUserStart: (state) => {
			state.loading = true;
		},
		updateUserFailure: (state, action) => {
			state.error = action.payload;
			state.success = false;
			state.loading = false;
		},
		updateUserSuccess: (state, action) => {
			state.currentUser = action.payload;
			state.success = true;
			state.loading = false;
			state.error = null;
		},
		getAllUsersStart: (state) => {
			state.loading = true;
		},
		getAllUsersFailure: (state, action) => {
			state.error = action.payload;
			state.success = false;
			state.loading = false;
		},
		getAllUsersSuccess: (state, action) => {
			state.currentUser = action.payload;
			state.success = true;
			state.loading = false;
			state.error = null;
		},
	},
});

export const {
	signInStart,
	signInSuccess,
	signInFailure,
	sigOutSuccess,
	signUpUser,
	signUpUserFailure,
	signUpUserSuccess,
	currentUserStart,
	currentUserSuccess,
	currentUserFailure,
	updateUser,
	updateUserFailure,
	updateUserSuccess,
	getAllUsersStart,
	getAllUsersFailure,
	getAllUsersSuccess,
} = userSlice.actions;

export default userSlice.reducer;
