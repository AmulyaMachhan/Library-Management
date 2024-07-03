import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    usersList: [],
    status: "idle",
    error: null,
  },
  reducers: {
    setUsers(state, action) {
      state.usersList = action.payload;
    },
  },
});

export const { setUsers } = usersSlice.actions;
export default usersSlice.reducer;
