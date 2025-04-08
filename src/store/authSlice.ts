import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { authService } from '../features/auth/authService';

const initialState = false;

export const checkAuth = createAsyncThunk<boolean>(
  'auth/validate',
  authService.validate,
);


export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (_, action: PayloadAction<boolean>) => action.payload,
  },
  extraReducers: builder => {
    builder.addCase(
      checkAuth.fulfilled,
      (_, action: PayloadAction<boolean>) => action.payload,
    );
    builder.addCase(checkAuth.rejected, () => false,
    );
  },
});

export const { setAuth } = authSlice.actions;
