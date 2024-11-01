import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const updateUsername = createAsyncThunk(
  'user/updateUsername',
  async (newUsername, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const token = state.auth.token; 
      const response = await axios.put(
        'http://localhost:3001/api/v1/user/profile',
        { userName: newUsername },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data.body;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : "Network error");
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userData: { userName: localStorage.getItem('userName') || '' },
    status: 'idle',
    error: null,
  },
  reducers: {
    clearUsername(state) {
      state.userData.userName = '';
      localStorage.removeItem('userName');
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateUsername.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(updateUsername.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userData = action.payload;
        localStorage.setItem('userName', action.payload.userName);
      })
      .addCase(updateUsername.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || "Error updating username";
      });
  }
});

export const { clearUsername } = userSlice.actions;
export default userSlice.reducer;
