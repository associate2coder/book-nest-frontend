import { combineSlices, compose, configureStore } from '@reduxjs/toolkit';
import { genreSlice as filtersSlice } from './filtersSlice';
import { favSlice } from './favSlice';
import { cartSlice } from './cartSlice';
import { bookSlice } from './bookSlice';

export const rootReducer = combineSlices(
  favSlice,
  filtersSlice,
  cartSlice,
  bookSlice,
);

export const store = configureStore({
  reducer: rootReducer,
  enhancers: (getDefaultEnhancers) =>
    getDefaultEnhancers().concat(compose),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
