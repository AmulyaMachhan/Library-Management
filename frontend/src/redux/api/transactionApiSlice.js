import { apiSlice } from "./apiSlice";

const transactionApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    issueBook: builder.mutation({
      query: (issueData) => ({
        url: "/transactions/issue",
        method: "POST",
        body: issueData,
      }),
      invalidatesTags: ["Transaction"],
    }),
    returnBook: builder.mutation({
      query: (returnData) => ({
        url: "/transactions/return",
        method: "POST",
        body: returnData,
      }),
      invalidatesTags: ["Transaction"],
    }),
  }),
});

export const { useIssueBookMutation } = transactionApiSlice;
