import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Book } from '../shared/types/Book';
import { getBooks } from '../services/bookService';

export interface BookState {
  items: Book[];
  loaded: boolean;
  error: string;
}

const initialState: BookState = {
  items: [],
  loaded: false,
  error: '',
};

export const initProducts = createAsyncThunk<Book[]>(
  'books/fetch',
  getBooks,
);

export const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(initProducts.pending, state => {
      state.loaded = false;
      state.error = '';
    });
    builder.addCase(
      initProducts.fulfilled,
      (state, action: PayloadAction<Book[]>) => {
        state.loaded = true;
        state.items = action.payload;
      },
    );
    builder.addCase(initProducts.rejected, (state, action) => {
      state.loaded = true;
      state.error = action.error.message || 'Something went wrong!';
    });
  },
});
