import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getGenres } from '../services/categoryService';
import { Category, CategoryResponse } from '../shared/types/Category';
import { filters } from '../modules/BooksPage/config/filters';

export interface FilterStateType {
  id: string,
  title: string,
  values: Category[],
}

export interface FilterState {
  filters: {
    genres: FilterStateType,
    format: FilterStateType,
    condition: FilterStateType,
  };
  loaded: boolean;
  error: string;
}

const initialState: FilterState = {
  filters: {
    genres: {
      id: filters.genres.id,
      title: filters.genres.title,
      values: [],
    },
    format: {
      id: filters.format.id,
      title: filters.format.title,
      values: filters.format.values.map(filter => {
        return { id: filter, name: filter };
      })   
    },
    condition: {
      id: filters.condition.id,
      title: filters.condition.title,
      values: filters.condition.values.map(filter => {
        return { id: filter, name: filter };
      })   
    },
  },
  loaded: false,
  error: '',
};

export const initGenres = createAsyncThunk<CategoryResponse>(
  'filters/fetch',
  getGenres,
);

export const genreSlice = createSlice({
  name: 'filters',
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
        state.filters.genres.values = action.payload.content;
      },
    );
    builder.addCase(initGenres.rejected, (state, action) => {
      state.loaded = true;
      state.error = action.error.message || 'Something went wrong!';
    });
  },
});


