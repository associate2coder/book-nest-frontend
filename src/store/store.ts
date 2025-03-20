import { combineSlices, compose, configureStore } from '@reduxjs/toolkit';
import { genreSlice } from './genreSlice';
import { favSlice } from './favSlice';
import { cartSlice } from './cartSlice';

export const rootReducer = combineSlices(
  favSlice,
  genreSlice,
  cartSlice,
);

export const store = configureStore({
  reducer: rootReducer,
  enhancers: (getDefaultEnhancers) =>
    getDefaultEnhancers().concat(compose),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
