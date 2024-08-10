import { configureStore } from '@reduxjs/toolkit';
import userReducer from './users/userSlice';

//use redux persist for store all state in local storage.
export const store = configureStore({
	reducer: {
		user: userReducer,
	},
});
