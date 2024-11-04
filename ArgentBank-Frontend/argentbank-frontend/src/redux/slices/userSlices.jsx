import { createSlice } from '@reduxjs/toolkit';

const token = localStorage.getItem('token');

const initialState = {
  token: token || null,
  isAuthenticated: !!token, 
  username: '',
  firstName: '',
  lastName: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setToken: (state, action) => {
      if (action.payload) {
        state.token = action.payload;
        state.isAuthenticated = true;
        localStorage.setItem('token', action.payload); 
      }
    },
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setUserProfile: (state, action) => {
      const { username, firstName, lastName } = action.payload;
      state.username = username;
      state.firstName = firstName;
      state.lastName = lastName;
    },
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      state.username = '';
      state.firstName = '';
      state.lastName = '';
      localStorage.removeItem('token'); 
    },
  },
});

export const { setToken, setUsername, setUserProfile, logout } = userSlice.actions;
export default userSlice.reducer;
