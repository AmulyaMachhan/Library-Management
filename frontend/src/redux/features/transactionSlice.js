import { createSlice } from "@reduxjs/toolkit";

const transactionsSlice = createSlice({
  name: "transactions",
  initialState: {
    transactionsList: [],
    status: "idle",
    error: null,
  },
  reducers: {
    setTransactions(state, action) {
      state.transactionsList = action.payload;
    },
  },
});

export const { setTransactions } = transactionsSlice.actions;
export default transactionsSlice.reducer;
