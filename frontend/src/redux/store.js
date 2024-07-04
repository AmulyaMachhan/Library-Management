import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { apiSlice } from "./api/apiSlice";
import usersReducer from "./features/userSlice";
import booksReducer from "./features/bookSlice";
import transactionsReducer from "./features/transactionSlice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    users: usersReducer,
    books: booksReducer,
    transactions: transactionsReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),

  devTools: true,
});

setupListeners(store.dispatch);

export default store;
