import { ApiSlice } from "../ApiSlice.ts";

export const AuthApiSlice = ApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signin: builder.mutation({
      query: (body) => ({
        url: `auth/signin`,
        method: "POST",
        body,
        alert: true,
      }),
    }),
    verify: builder.mutation({
      query: (body) => ({
        url: `auth/verify-otp`,
        method: "POST",
        body,
        alert: true,
      }),
    }),
    resend: builder.mutation({
      query: (body) => ({
        url: `auth/resend-otp`,
        method: "POST",
        body,
        alert: true,
      }),
    }),
    getLoggedInUser: builder.mutation({
      query: ({ email }) => ({
        url: `user?email=${email}`,
        alert: false,
      }),
    }),
  }),
});

export const {
  useGetLoggedInUserMutation,
  useSigninMutation,
  useVerifyMutation,
  useResendMutation
} = AuthApiSlice;
