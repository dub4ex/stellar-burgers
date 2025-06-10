import { getOrderByNumberApi } from '@api';
import orderReducer, {
  getOrderByNumber
} from '../services/slices/apiSlices/orderSlice';
import { getErrorMessage } from '../utils/functions';
import { configureStore } from '@reduxjs/toolkit';

jest.mock('@api', () => ({
  getOrderByNumberApi: jest.fn()
}));

describe('тесты слайса order', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const initialState = {
    loading: false,
    error: null,
    order: null
  };
  const order = {
    _id: '6846db72c2f30c001cb2b19b',
    ingredients: [
      '643d69a5c3f7b9001cfa093d',
      '643d69a5c3f7b9001cfa093e',
      '643d69a5c3f7b9001cfa093e',
      '643d69a5c3f7b9001cfa093e',
      '643d69a5c3f7b9001cfa093d'
    ],
    owner: '6842b1f1c2f30c001cb2a51e',
    status: 'done',
    name: 'Флюоресцентный люминесцентный бургер',
    createdAt: '2025-06-09T13:02:42.457Z',
    updatedAt: '2025-06-09T13:02:43.184Z',
    number: 1337,
    __v: 0
  };
  const number = 1337;
  const testResponse = {
    orders: [order]
  };

  describe('тесты асинхронных экшенов getOrderByNumber', () => {
    test('обработка pending', () => {
      const action = {
        type: getOrderByNumber.pending.type
      };
      const newState = orderReducer(initialState, action);

      expect(newState.loading).toBeTruthy();
      expect(newState.error).toBeNull();
      expect(newState.order).toBeNull();
    });

    test('тест ошибки rejected', () => {
      const errorMessage = 'тестовая ошибка';
      const action = {
        type: getOrderByNumber.rejected.type,
        error: { message: errorMessage }
      };
      const newState = orderReducer(initialState, action);

      expect(newState.loading).toBeFalsy();
      expect(newState.error).toBe(getErrorMessage(errorMessage));
    });

    test('тест успешного запроса fulfilled', async () => {
      (getOrderByNumberApi as jest.Mock).mockResolvedValue(testResponse);
      const store = configureStore({
        reducer: { order: orderReducer }
      });
      await store.dispatch(getOrderByNumber(number));
      const newState = store.getState().order;

      expect(newState.loading).toBeFalsy();
      expect(newState.order).toEqual(order);
    });
  });
});

/* type TOrderResponse = TServerResponse<{
  orders: TOrder[];
}>; */

/*
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
*/

