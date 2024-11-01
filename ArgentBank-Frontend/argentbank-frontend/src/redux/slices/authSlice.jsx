import { createSlice } from '@reduxjs/toolkit';

const initialToken = localStorage.getItem('token') || null;

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: !!initialToken,
    token: initialToken,
  },
  reducers: {
    login(state, action) {
      const token = action.payload.token;
      state.isLoggedIn = true;
      state.token = token;
      if (token) localStorage.setItem('token', token);
    },
    logout(state) {
      state.isLoggedIn = false;
      state.token = null;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder.addDefaultCase((state) => {
      const token = localStorage.getItem('token');
      if (token && !state.isLoggedIn) {
        state.isLoggedIn = true;
        state.token = token;
      }
    });
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
