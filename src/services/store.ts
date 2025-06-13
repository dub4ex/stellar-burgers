import { combineSlices, configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { ingredientsSlice } from './slices/apiSlices/ingredientsSlice';
import { constructorSlice } from './slices/apiSlices/constructorSlice';
import { feedSlice } from './slices/apiSlices/feedSlice';
import { orderSlice } from './slices/apiSlices/orderSlice';
import { userSlice } from './slices/apiSlices/userSlice';
import { ordersListSlice } from './slices/apiSlices/ordersListSlice';

export const rootReducer = combineSlices(
  ingredientsSlice,
  constructorSlice,
  feedSlice,
  orderSlice,
  userSlice,
  ordersListSlice
);

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
