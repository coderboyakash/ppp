import { ApiSlice } from "../ApiSlice.ts";

export const AppApiSlice = ApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    users: builder.mutation({
      query: () => ({
        url: "users",
      }),
    }),
  }),
});

export const { useUsersMutation } = AppApiSlice;
