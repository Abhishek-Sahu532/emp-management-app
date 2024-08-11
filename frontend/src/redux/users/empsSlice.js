import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  emps: {},
  error: null,
  loading: false,
  success: false,
};

const empsSlice = createSlice({
  name: "emps",
  initialState,
  reducers: {
    getAllUsersStart: (state) => {
      state.loading = true;
    },
    getAllUsersFailure: (state, action) => {
      state.error = action.payload;
      state.success = false;
      state.loading = false;
    },
    getAllUsersSuccess: (state, action) => {
      state.emps = action.payload;
      state.success = true;
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
      state.emps = action.payload;
      state.success = true;
      state.loading = false;
      state.error = null;
    },

    deleteEmpStart: (state) => {
      state.loading = true;
    },
    deleteEmpFailure: (state, action) => {
      state.error = action.payload;
      state.success = false;
      state.loading = false;
    },
    deleteEmpSuccess: (state, action) => {
      state.emps = action.payload;
      state.success = true;
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  getAllUsersStart,
  getAllUsersFailure,
  getAllUsersSuccess,
  deleteEmpStart,
  deleteEmpFailure,
  deleteEmpSuccess,
  updateUserStart,
  updateUserFailure,
  updateUserSuccess,
} = empsSlice.actions;

export default empsSlice.reducer;
