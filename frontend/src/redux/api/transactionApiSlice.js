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
  }),
});

export const { useIssueBookMutation } = transactionApiSlice;
