import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getGenres } from '../services/categoryService';
import { Category, CategoryResponse } from '../shared/types/Category';

export interface GenreState {
  items: Category[];
  loaded: boolean;
  error: string;
}

const initialState: GenreState = {
  items: [],
  loaded: false,
  error: '',
};

export const initGenres = createAsyncThunk<CategoryResponse>(
  'genres/fetch',
  getGenres,
);

export const genreSlice = createSlice({
  name: 'genres',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(initGenres.pending, state => {
      state.loaded = false;
      state.error = '';
    });
    builder.addCase(
      initGenres.fulfilled,
      (state, action: PayloadAction<CategoryResponse>) => {
        state.loaded = true;
        state.items = action.payload.content;
      },
    );
    builder.addCase(initGenres.rejected, (state, action) => {
      state.loaded = true;
      state.error = action.error.message || 'Something went wrong!';
    });
  },
});
