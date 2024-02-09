import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../index.ts";
import { AuthInitialState } from "../types";

const initialState: AuthInitialState = {
  user: null,
  token: null,
  isLoggedIn: false,
};

const AuthSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setAuth: (state, { payload }) => {
      const { user, isLoggedIn } = payload
      state.user = user;
      state.isLoggedIn = isLoggedIn
    },
    setToken: (state, { payload }) => {
      state.token = payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { logout, setAuth, setToken } = AuthSlice.actions;
export default AuthSlice.reducer;
export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectCurrentToken = (state: RootState) => state.auth.token;
export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
