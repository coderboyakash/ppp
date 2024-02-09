import { FetchBaseQueryMeta } from "@reduxjs/toolkit/query/react";

interface User {
  _id: string;
  name: string;
  email: string;
  roles: string[];
  createdAt: string;
  updatedAt: string;
}
interface AuthInitialState {
  user: User | null;
  token: string | null;
  isLoggedIn: boolean;
}

interface AppInitialState {
  loading: boolean;
  message: string;
}

export interface DataResponse {
  status: boolean;
  message: string;
  data: any;
}
