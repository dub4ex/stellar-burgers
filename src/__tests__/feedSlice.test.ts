import { getErrorMessage } from '../utils/functions';
import feedReducer, { getFeed } from '../services/slices/apiSlices/feedSlice';
import { TOrder } from '@utils-types';
import { configureStore } from '@reduxjs/toolkit';
import { getFeedsApi } from '@api';

jest.mock('@api', () => ({
  getFeedsApi: jest.fn()
}));

describe('тесты слайса feed', () => {
  const initialState = {
    loading: false,
    error: null,
    orders: [],
    total: null,
    totalToday: null
  };
  const testOrders: Array<TOrder> = [
    {
      _id: '6845d2d8c2f30c001cb2adae',
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa094a',
        '643d69a5c3f7b9001cfa0942',
        '643d69a5c3f7b9001cfa093d'
      ],
      status: 'done',
      name: 'Астероидный флюоресцентный spicy бургер',
      createdAt: '2025-06-08T18:13:44.383Z',
      updatedAt: '2025-06-08T18:13:45.145Z',
      number: 80573
    },
    {
      _id: '6845d1e2c2f30c001cb2ada5',
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa0943',
        '643d69a5c3f7b9001cfa0943',
        '643d69a5c3f7b9001cfa093f',
        '643d69a5c3f7b9001cfa093d'
      ],
      status: 'done',
      name: 'Space флюоресцентный бессмертный бургер',
      createdAt: '2025-06-08T18:09:38.087Z',
      updatedAt: '2025-06-08T18:09:38.879Z',
      number: 80569
    }
  ];
  const testData = {
    success: true,
    orders: testOrders,
    total: 100000,
    totalToday: 10
  };

  describe('тесты асинхронных экшенов getFeed', () => {
    test('обработка pending', () => {
      const action = {
        type: getFeed.pending.type
      };
      const newState = feedReducer(initialState, action);

      expect(newState.loading).toBeTruthy();
      expect(newState.error).toBeNull();
      expect(newState.orders).toHaveLength(0);
      expect(newState.total).toBeNull();
      expect(newState.totalToday).toBeNull();
    });

    test('тест ошибки rejected', () => {
      const errorMessage = 'тестовая ошибка';
      const action = {
        type: getFeed.rejected.type,
        error: { message: errorMessage }
      };
      const newState = feedReducer(initialState, action);

      expect(newState.loading).toBeFalsy();
      expect(newState.error).toBe(getErrorMessage(errorMessage));
    });

    test('тест успешного запроса fulfilled', async () => {
      (getFeedsApi as jest.Mock).mockResolvedValue(testData);
      const store = configureStore({
        reducer: { feed: feedReducer }
      });
      await store.dispatch(getFeed());
      const newState = store.getState().feed;

      expect(newState.loading).toBeFalsy();
      expect(newState.orders).toEqual(testOrders);
      expect(newState.total).toBe(100000);
      expect(newState.totalToday).toBe(10);
    });
  });
});

/*
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
*/
