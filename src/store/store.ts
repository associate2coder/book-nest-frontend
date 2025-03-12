import { combineSlices, configureStore } from '@reduxjs/toolkit';
// import { bookSlice } from './bookSlice';
import { cartSlice } from './cartSlice';
import { favSlice } from './favSlice';

export const rootReducer = combineSlices(
  // bookSlice,
  cartSlice,
  favSlice,
);

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
