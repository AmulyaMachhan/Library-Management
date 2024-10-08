import { TRANSACTIONS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

const transactionApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    issueBook: builder.mutation({
      query: (issueData) => ({
        url: `${TRANSACTIONS_URL}/issue`,
        method: "POST",
        body: issueData,
      }),
      invalidatesTags: ["Transaction"],
    }),

    returnBook: builder.mutation({
      query: (returnData) => ({
        url: `${TRANSACTIONS_URL}/return`,
        method: "POST",
        body: returnData,
      }),
      invalidatesTags: ["Transaction"],
    }),

    getTransactionByBook: builder.query({
      query: (bookName) => `${TRANSACTIONS_URL}/book?bookName=${bookName}`,
      providesTags: ["Transaction"],
    }),

    getTotalRentByBook: builder.query({
      query: (bookName) => `${TRANSACTIONS_URL}/book/rent?bookName=${bookName}`,
      providesTags: ["Transaction"],
    }),

    getBooksByUser: builder.query({
      query: ({ userId }) => `${TRANSACTIONS_URL}/user/${userId}`,
    }),

    getTransactionsByDateRange: builder.query({
      query: ({ start, end }) => ({
        url: `${TRANSACTIONS_URL}/date?start=${start}&end=${end}`,
      }),
      providesTags: ["Transaction"],
    }),

    getAllTransactions: builder.query({
      query: () => `${TRANSACTIONS_URL}/alltransactions`,
      providesTags: ["Transaction"],
    }),

    getUsersWithIssuedBook: builder.query({
      query: ({ bookName }) =>
        `${TRANSACTIONS_URL}/users/book?bookName=${bookName}`,
    }),
  }),
});

export const {
  useIssueBookMutation,
  useReturnBookMutation,
  useGetTransactionByBookQuery,
  useLazyGetTransactionByBookQuery,
  useGetTotalRentByBookQuery,
  useGetBooksByUserQuery,
  useGetTransactionsByDateRangeQuery,
  useGetAllTransactionsQuery,
  useGetUsersWithIssuedBookQuery,
} = transactionApiSlice;
