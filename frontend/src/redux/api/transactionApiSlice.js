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
  }),
});

export const { useIssueBookMutation, useReturnBookMutation } =
  transactionApiSlice;
