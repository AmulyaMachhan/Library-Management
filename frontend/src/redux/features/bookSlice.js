import { createSlice } from "@reduxjs/toolkit";

const booksSlice = createSlice({
  name: "books",
  initialState: {
    booksList: [],
    status: "idle",
    error: null,
  },
  reducers: {
    setBooks(state, action) {
      state.booksList = action.payload;
    },
  },
});

export const { setBooks } = booksSlice.actions;
export default booksSlice.reducer;
