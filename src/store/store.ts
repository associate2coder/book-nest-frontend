import { combineSlices, configureStore } from '@reduxjs/toolkit';
// import { bookSlice } from './bookSlice';
import { cartSlice } from './cartSlice';
import { favSlice } from './favSlice';
import { genreSlice } from './genreSlice';

export const rootReducer = combineSlices(
  // bookSlice,
  cartSlice,
  favSlice,
  genreSlice,
);

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
