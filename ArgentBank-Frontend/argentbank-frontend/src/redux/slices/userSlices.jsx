import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    username: null,
    email: null,
    isAuthenticated: false,
    profile: { accounts: [], firstName: '', lastName: '', userName: '' }, // Structure par défaut
  },
  reducers: {
    setUserProfile(state, action) {
      state.profile = action.payload;
      state.isAuthenticated = true;
    },
    logout(state) {
      state.username = null;
      state.email = null;
      state.isAuthenticated = false;
      state.profile = { accounts: [], firstName: '', lastName: '', userName: '' };
    },
  },
});

export const { setUserProfile, logout } = userSlice.actions;
export default userSlice.reducer;
