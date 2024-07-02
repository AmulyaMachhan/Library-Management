import { USERS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => ({
        url: `${USERS_URL}/allusers`,
      }),
    }),
  }),
});

export const { useGetAllUsersQuery } = userApiSlice;
