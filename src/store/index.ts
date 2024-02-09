import { configureStore } from "@reduxjs/toolkit";
import { ApiSlice } from "./ApiSlice.ts";
import AuthReducer from "./Auth/AuthSlice.ts";
import AppReducer from "./App/AppSlice.ts";

export const index = configureStore({
  reducer: {
    [ApiSlice.reducerPath]: ApiSlice.reducer,
    app: AppReducer,
    auth: AuthReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(ApiSlice.middleware),
  devTools: true,
});

export type RootState = ReturnType<typeof index.getState>;

export type AppDispatch = typeof index.dispatch;
