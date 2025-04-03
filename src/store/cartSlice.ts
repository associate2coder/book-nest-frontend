import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Book } from '../shared/types/Book';
import { add, get, remove } from '../services/cartService';
import { CartResponse } from '../shared/types/CartResponse';

export interface CartState extends CartResponse {
  loaded: boolean;
  error: string;
  confirmation: Book | null;
}

const initialState: CartState = {
  id: 0,
  userId: 0,
  books: [],
  loaded: false,
  error: '',
  confirmation: null,
};

export const initCart = createAsyncThunk<CartResponse>(
  'cart/fetch',
  get,
);

export const addCart = createAsyncThunk<void, Book>(
  'cart/add',
  add,
)

export const removeCart = createAsyncThunk<void, Book>(
  'cart/remove',
  remove,
)

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setConfirmation: (state, action: PayloadAction<Book | null>) => {
      state.confirmation = action.payload;
    },
    clearCart: state => {
      state.books = [];
    }
  },
  extraReducers: builder => {
    // INIT CART ITEMS
    builder.addCase(initCart.pending, state => {
      state.loaded = false;
      state.error = '';
    });
    builder.addCase(
      initCart.fulfilled,
      (state, action: PayloadAction<CartResponse>) => {
        state.loaded = true;
        state.id = action.payload.id;
        state.books = action.payload.books;
        state.userId = action.payload.userId;
      },
    );
    builder.addCase(initCart.rejected, (state, action) => {
      state.loaded = true;
      state.error = action.error.message || 'Something went wrong!';
    });
    // ADD TO CART
    builder.addCase(
      addCart.pending,
      (state, action) => {
        state.books.push(action.meta.arg);
      },
    );
    builder.addCase(addCart.rejected, (state, action) => {
      state.error = action.error.message || 'Something went wrong!';
    });
    // DELETE FROM CART
    builder.addCase(
      removeCart.pending,
      (state, action) => {
        const deletable = action.meta.arg;
        const index = state.books.findIndex(item => item.id === deletable.id);

        state.books.splice(index, 1);
      },
    );
    builder.addCase(removeCart.rejected, (state, action) => {
      state.error = action.error.message || 'Something went wrong!';
    });
  },
});

export const { setConfirmation, clearCart } = cartSlice.actions;
