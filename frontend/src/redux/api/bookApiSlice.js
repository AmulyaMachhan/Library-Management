import { BOOKS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

const bookApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllBooks: builder.query({
      query: () => ({
        url: `${BOOKS_URL}/allbooks`,
      }),
    }),
  }),
});

export const { useGetAllBooksQuery } = bookApiSlice;
