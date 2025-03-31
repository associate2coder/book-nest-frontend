import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Book } from '../shared/types/Book';
import { getDonated, getTaken } from '../services/bookService';
import { User } from '../shared/types/User';
import { getUser } from '../services/userService';

export interface BookState {
  user: User | null;
  donated: Book[];
  taken: Book[];
  loaded: boolean;
  error: string;
}

const initialState: BookState = {
  user: null,
  donated: [],
  taken: [],
  loaded: false,
  error: '',
};

export const fetchUser = createAsyncThunk<User>(
  'profile/fetchUser',
  getUser,
);

export const initDonated = createAsyncThunk<Book[]>(
  'profile/fetchDonated',
  getDonated,
);

export const initTaken = createAsyncThunk<Book[]>(
  'profile/fetchTaken',
  getTaken,
);

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchUser.pending, state => {
      state.loaded = false;
      state.error = '';
    });
    builder.addCase(
      fetchUser.fulfilled,
      (state, action: PayloadAction<User>) => {
        state.loaded = true;
        state.user = action.payload;
      },
    );
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.loaded = true;
      state.error = action.error.message || 'Something went wrong!';
      state.user = null;
    });
    builder.addCase(initDonated.pending, state => {
      state.error = '';
    });
    builder.addCase(
      initDonated.fulfilled,
      (state, action: PayloadAction<Book[]>) => {
        state.donated = action.payload;
      },
    );
    builder.addCase(initDonated.rejected, (state, action) => {
      state.error = action.error.message || 'Something went wrong!';
    });
    builder.addCase(initTaken.pending, state => {
      state.error = '';
    });
    builder.addCase(
      initTaken.fulfilled,
      (state, action: PayloadAction<Book[]>) => {
        state.taken = action.payload;
      },
    );
    builder.addCase(initTaken.rejected, (state, action) => {
      state.error = action.error.message || 'Something went wrong!';
    });
  },
});

export const { setUser } = profileSlice.actions;
