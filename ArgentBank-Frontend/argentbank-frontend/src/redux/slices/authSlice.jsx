import { createSlice } from '@reduxjs/toolkit';

const initialToken = localStorage.getItem('token');
const initialUserName = localStorage.getItem('userName');

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: !!initialToken,
    userName: initialUserName || '',
    token: initialToken,
  },
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      state.userName = action.payload.userName;
      state.token = action.payload.token;
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('userName', action.payload.userName);
    },
    logout(state) {
      state.isLoggedIn = false;
      state.userName = '';
      state.token = null;
      localStorage.removeItem('token');
      localStorage.removeItem('userName');
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
