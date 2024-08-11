import { configureStore } from '@reduxjs/toolkit';
import userReducer from './users/userSlice';
import empsReducer from './users/empsSlice';

//use redux persist for store all state in local storage.
export const store = configureStore({
	reducer: {
		user: userReducer,
		emps : empsReducer

	},
});
