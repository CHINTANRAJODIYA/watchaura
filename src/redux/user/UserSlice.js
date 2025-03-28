import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    SignUpStart: (state) => {
      state.loading = true;
    },
    SignUpSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
    },
    SignUpFail: (state) => {
      state.loading = false;
    },
    SignInStart: (state) => {
      state.loading = true;
    },
    SignInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
    },
    SignInFail: (state) => {
      state.loading = false;
    },
    SignOutSuccess: (state) => {
      state.loading = false;
      state.currentUser = null;
    },
  },
});

export const {
  SignUpStart,
  SignUpSuccess,
  SignUpFail,
  SignInStart,
  SignInSuccess,
  SignInFail,
  SignOutSuccess,
} = userSlice.actions;
export default userSlice.reducer;
