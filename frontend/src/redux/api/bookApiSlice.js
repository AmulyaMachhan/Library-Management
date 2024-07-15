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

    getBooksByRent: builder.query({
      query: ({ min, max }) => `${BOOKS_URL}/search/rent?min=${min}&max=${max}`,
    }),

    globalBookSearch: builder.query({
      query: ({ searchCategory, searchTerm, minRent, maxRent }) =>
        `${BOOKS_URL}/search/global?category=${searchCategory}&name=${searchTerm}&min=${minRent}&max=${maxRent}`,
    }),

    getCategories: builder.query({
      query: () => `${BOOKS_URL}/categories`,
    }),
  }),
});

export const {
  useGetAllBooksQuery,
  useGetBooksByNameQuery,
  useGetBooksByRentQuery,
  useGlobalBookSearchQuery,
  useGetCategoriesQuery,
} = bookApiSlice;
