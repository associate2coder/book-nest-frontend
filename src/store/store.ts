import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { bookSlice } from './bookSlice';

export const rootReducer = combineSlices(
  bookSlice
);

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
