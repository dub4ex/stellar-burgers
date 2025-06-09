import { getFeedsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getErrorMessage } from '../../../utils/functions';

type TFeedState = {
  loading: boolean;
  error: string | null;
  orders: TOrder[];
  total: number | null;
  totalToday: number | null;
};

const initialState: TFeedState = {
  loading: false,
  error: null,
  orders: [],
  total: null,
  totalToday: null
};

export const getFeed = createAsyncThunk('feed/getAll', getFeedsApi);

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  selectors: {
    getFeedSelector: (state) => state
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeed.pending, (state) => {
        state.loading = true;
        state.error = null;
        //добавил очистку стейта при пендинге, чтобы был виден лоадер при перезагрузке фида
        state.orders = [];
        state.total = null;
        state.totalToday = null;
      })
      .addCase(getFeed.rejected, (state, action) => {
        state.loading = false;
        state.error = getErrorMessage(action.error.message);
      })
      .addCase(getFeed.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      });
  }
});

export const { getFeedSelector } = feedSlice.selectors;
const feedReducer = feedSlice.reducer;
export default feedReducer;
