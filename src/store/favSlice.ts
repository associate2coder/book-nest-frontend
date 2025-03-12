import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { localStorageKeys } from '../config/constants';
import { Book } from '../shared/types/Book';

// fetch favourites from localStorage (if any)
const init: () => Book[] = () => {
  const favItems = localStorage.getItem(localStorageKeys.favourites);

  return !favItems ? [] : JSON.parse(favItems);
};

const initialState: Book[] = init();

export const favSlice = createSlice({
  name: 'fav',
  initialState,
  reducers: {
    toggle: (state, action: PayloadAction<Book>) => {
      const index = state.indexOf(action.payload);

      if (index === -1) {
        state.push(action.payload);
      } else {
        state.splice(index, 1);
      }
    },
    set: (state, action: PayloadAction<Book[]>) => {
      state.splice(0, state.length, ...action.payload);
    },
  },
});

export const { toggle, set } = favSlice.actions;
