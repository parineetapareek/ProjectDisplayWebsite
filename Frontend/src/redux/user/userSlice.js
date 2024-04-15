import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signupStart: (state) => {
      state.loading = true;
    },

    signupSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },

    signupFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { signupStart, signupSuccess, signupFailure } = userSlice.actions;

export default userSlice.reducer;
