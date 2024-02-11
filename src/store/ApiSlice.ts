import {
  BaseQueryApi,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { createStandaloneToast, UseToastOptions } from "@chakra-ui/react";
import { apiBaseUrl, errors } from "../utils/constants.ts";
import { DataResponse } from "./types";

const { toast } = createStandaloneToast();

const baseQuery = fetchBaseQuery({
  baseUrl: apiBaseUrl,
  credentials: "include",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('token');
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    headers.set("Accept", "application/json");
    headers.set("Content-Type", "application/json");
    return headers;
  },
});

const baseQueryWrapper = async (
  args: { url: string; alert?: boolean, body?: any, method?: string },
  api: BaseQueryApi,
  extraOptions: Parameters<typeof baseQuery>[2],
) => {
  const result = await baseQuery(args, api, extraOptions);
  const data = result.data as DataResponse;
  if (result.error && typeof result.error.status === "string") {
    showToast({
      title: result.error.status,
      description: errors[result.error.status],
      status: "error",
    });
  } else if (result.error) {
    showToast({
      title: "Error",
      description: `Request failed with the code of ${result.error.status}`,
      status: "error",
    });
  }
  if (args?.alert === true) {
    showToast({
      description: data.message,
      title: data.status ? "Success" : "Error",
      status: data.status ? "success" : "error",
    });
  }
  return result;
};

export const ApiSlice = createApi({
  baseQuery: baseQueryWrapper,
  refetchOnMountOrArgChange: true,
  endpoints: () => ({}),
});

const showToast = (options: UseToastOptions) => {
  toast({
    duration: 2000,
    isClosable: true,
    position: "top-right",
    ...options,
  });
};
