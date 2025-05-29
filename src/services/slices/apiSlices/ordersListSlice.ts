import { getOrdersApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getErrorMessage } from '../../../utils/functions';

type TOrdersListState = {
  loading: boolean;
  error: string | null;
  orders: Array<TOrder>;
};

const initialState: TOrdersListState = {
  loading: false,
  error: null,
  orders: []
};

export const getOrdersList = createAsyncThunk('orders/getAll', async () =>
  getOrdersApi()
);

export const ordersListSlice = createSlice({
  name: 'ordersList',
  initialState,
  reducers: {},
  selectors: {
    getOrders: (state) => state.orders,
    orderListSelector: (state) => state
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrdersList.pending, (state) => {
        state.loading = true;
        //сбрасываю предыдущие значения
        state.orders = [];
        state.error = null;
      })
      .addCase(getOrdersList.rejected, (state, action) => {
        state.loading = false;
        state.error = getErrorMessage(action.error.message);
      })
      .addCase(getOrdersList.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
        state.error = null;
      });
  }
});

export const { getOrders, orderListSelector } = ordersListSlice.selectors;
