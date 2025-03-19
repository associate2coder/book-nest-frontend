/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { localStorageKeys } from '../config/constants';
import { Book } from '../shared/types/Book';

// fetch cart content from localStorage (if any)
const init = () => {
  const cartItems = localStorage.getItem(localStorageKeys.cart);

  return !cartItems ? [] : JSON.parse(cartItems);
};

const initialState: Book[] = init();

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Book>) => {
        state.push(action.payload);
    },
    deleteItem: (state, action: PayloadAction<Book>) => {
      const index = state.findIndex(
        item => item.id === action.payload.id,
      );

      state.splice(index, 1);
    },
    clearCart: () => [],
  },
});

export const { addItem, deleteItem, clearCart } = cartSlice.actions;
