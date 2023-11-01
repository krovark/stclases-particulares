import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false
  },
  reducers: {
    logIn: (state) => {
      state.isLoggedIn = true;
    },
    logOut: (state) => {
      state.isLoggedIn = false;
    }
  }
});

export const { logIn, logOut } = authSlice.actions;
export const selectLoggedIn = (state) => state.auth.isLoggedIn;
export default authSlice.reducer;