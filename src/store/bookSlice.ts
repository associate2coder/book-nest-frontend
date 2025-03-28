import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Book, BookResponse } from '../shared/types/Book';
import { getAllBooks } from '../services/bookService';

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

export const initBooks = createAsyncThunk<BookResponse>(
  'books/fetch',
  getAllBooks,
);

export const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(initBooks.pending, state => {
      state.loaded = false;
      state.error = '';
    });
    builder.addCase(
      initBooks.fulfilled,
      (state, action: PayloadAction<BookResponse>) => {
        state.loaded = true;
        state.items = action.payload.content;
      },
    );
    builder.addCase(initBooks.rejected, (state, action) => {
      state.loaded = true;
      state.error = action.error.message || 'Something went wrong!';
    });
  },
});
