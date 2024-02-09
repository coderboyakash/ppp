import { createSlice } from "@reduxjs/toolkit";

const initialState: AppInitialState = {
  loading: false,
  message: "",
};

const AppSlice = createSlice({
  name: "app",
  initialState: initialState,
  reducers: {
    setLoading: (state, { payload }) => {
      state.loading = payload;
    },
  },
});

export const { setLoading } = AppSlice.actions;
export default AppSlice.reducer;
