
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './features/counterSlice';
import productsReducer from './features/productsSlice';
import asyncTaskReducer from './features/asyncTaskSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    products: productsReducer,
    asyncTask: asyncTaskReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
