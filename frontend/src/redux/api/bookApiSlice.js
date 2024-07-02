import { BOOKS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

const bookApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllBooks: builder.query({
      query: () => ({
        url: `${BOOKS_URL}/allbooks`,
      }),
    }),

    getBooksByName: builder.query({
      query: (searchTerm) => ({
        url: `${BOOKS_URL}/search/name?query=${searchTerm}`,
      }),
    }),

    getBooksByRentRange: builder.query({
      query: ({ min, max }) => `${BOOKS_URL}/rent?min=${min}&max=${max}`,
    }),
  }),
});

export const { useGetAllBooksQuery, useGetBooksByNameQuery } = bookApiSlice;
