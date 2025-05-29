import { getOrderByNumberApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getErrorMessage } from '../../../utils/functions';

type TOrderState = {
  loading: boolean;
  error: string | null;
  order: TOrder | null;
};

const initialState: TOrderState = {
  loading: false,
  error: null,
  order: null
};
export const getOrderByNumber = createAsyncThunk(
  'order/getOne',
  async (number: number) => getOrderByNumberApi(number)
);

export const orderSlice = createSlice({
  name: 'getorder',
  initialState,
  reducers: {},
  selectors: {
    getOrderByNumberSelector: (state) => state.order
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrderByNumber.pending, (state) => {
        state.loading = true;
        state.error = null;
        //сделал очистку стейта при пендинге чтобы при открытии нового заказа на долю секунды не был виден старый заказ
        state.order = null;
      })
      .addCase(getOrderByNumber.rejected, (state, action) => {
        state.loading = false;
        state.error = getErrorMessage(action.error.message);
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload.orders[0];
      });
  }
});

export const { getOrderByNumberSelector } = orderSlice.selectors;
