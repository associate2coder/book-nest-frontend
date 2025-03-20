import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Book } from '../shared/types/Book';
import { add, get, remove } from '../services/favouriteService';

export interface FavState {
  items: Book[];
  loaded: boolean;
  error: string;
}

const initialState: FavState = {
  items: [],
  loaded: false,
  error: '',
};

export const initFavs = createAsyncThunk<Book[]>(
  'fav/fetch',
  get,
);

export const addFav = createAsyncThunk<void, Book>(
  'fav/add',
  add,
)

export const removeFav = createAsyncThunk<void, Book>(
  'fav/remove',
  remove,
)

export const favSlice = createSlice({
  name: 'fav',
  initialState,
  reducers: {},
  extraReducers: builder => {
    // INIT FAVOURITES
    builder.addCase(initFavs.pending, state => {
      state.loaded = false;
      state.error = '';
    });
    builder.addCase(
      initFavs.fulfilled,
      (state, action: PayloadAction<Book[]>) => {
        state.loaded = true;
        state.items = action.payload;
      },
    );
    builder.addCase(initFavs.rejected, (state, action) => {
      state.loaded = true;
      state.error = action.error.message || 'Something went wrong!';
    });
    // ADD TO FAVOURITES
    builder.addCase(
      addFav.pending,
      (state, action) => {
        state.items.push(action.meta.arg);
      },
    );
    builder.addCase(addFav.rejected, (state, action) => {
      state.error = action.error.message || 'Something went wrong!';
    });
    // DELETE FROM FAVOURITES
    builder.addCase(
      removeFav.pending,
      (state, action) => {
        const deletable = action.meta.arg;
        const index = state.items.findIndex(item => item.id === deletable.id);

        state.items.splice(index, 1);
      },
    );
    builder.addCase(removeFav.rejected, (state, action) => {
      state.error = action.error.message || 'Something went wrong!';
    });
  },
});
