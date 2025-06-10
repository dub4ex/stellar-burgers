import { getOrdersApi } from '@api';
import ordersListReducer, {
  getOrdersList
} from '../services/slices/apiSlices/ordersListSlice';
import { getErrorMessage } from '../utils/functions';
import { configureStore } from '@reduxjs/toolkit';

jest.mock('@api', () => ({
  getOrdersApi: jest.fn()
}));

describe('тесты слайса ordersList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const initialState = {
    loading: false,
    error: null,
    orders: []
  };
  const testOrderList = [
    {
      _id: '68381e51c2f30c001cb284c7',
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa093d'
      ],
      status: 'done',
      name: 'Флюоресцентный люминесцентный бургер',
      createdAt: '2025-05-29T08:44:01.615Z',
      updatedAt: '2025-05-29T08:44:02.351Z',
      number: 79395
    },
    {
      _id: '68382b7cc2f30c001cb284ed',
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa093f',
        '643d69a5c3f7b9001cfa0940',
        '643d69a5c3f7b9001cfa0946',
        '643d69a5c3f7b9001cfa0947',
        '643d69a5c3f7b9001cfa0948',
        '643d69a5c3f7b9001cfa0949',
        '643d69a5c3f7b9001cfa094a',
        '643d69a5c3f7b9001cfa0942',
        '643d69a5c3f7b9001cfa0943',
        '643d69a5c3f7b9001cfa0944',
        '643d69a5c3f7b9001cfa0945',
        '643d69a5c3f7b9001cfa093d'
      ],
      status: 'done',
      name: 'Флюоресцентный антарианский space астероидный фалленианский люминесцентный бессмертный минеральный альфа-сахаридный экзо-плантаго традиционный-галактический spicy био-марсианский метеоритный бургер',
      createdAt: '2025-05-29T09:40:12.333Z',
      updatedAt: '2025-05-29T09:40:13.134Z',
      number: 79401
    },
    {
      _id: '68445f6ec2f30c001cb2a9e2',
      ingredients: [
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa0942',
        '643d69a5c3f7b9001cfa093c'
      ],
      status: 'done',
      name: 'Краторный био-марсианский spicy люминесцентный бургер',
      createdAt: '2025-06-07T15:49:02.325Z',
      updatedAt: '2025-06-07T15:49:03.220Z',
      number: 80481
    },
    {
      _id: '68445f9bc2f30c001cb2a9e3',
      ingredients: [
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa093c'
      ],
      status: 'done',
      name: 'Краторный био-марсианский бургер',
      createdAt: '2025-06-07T15:49:47.575Z',
      updatedAt: '2025-06-07T15:49:48.350Z',
      number: 80482
    },
    {
      _id: '6844620ec2f30c001cb2a9e9',
      ingredients: [
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa093c'
      ],
      status: 'done',
      name: 'Краторный био-марсианский бургер',
      createdAt: '2025-06-07T16:00:14.326Z',
      updatedAt: '2025-06-07T16:00:15.120Z',
      number: 80483
    }
  ];

  describe('тесты асинхронных экшенов getOrdersList', () => {
    test('обработка pending', () => {
      const action = {
        type: getOrdersList.pending.type
      };
      const newState = ordersListReducer(initialState, action);

      expect(newState.loading).toBeTruthy();
      expect(newState.error).toBeNull();
      expect(newState.orders).toHaveLength(0);
    });

    test('тест ошибки rejected', () => {
      const errorMessage = 'тестовая ошибка';
      const action = {
        type: getOrdersList.rejected.type,
        error: { message: errorMessage }
      };
      const newState = ordersListReducer(initialState, action);

      expect(newState.loading).toBeFalsy();
      expect(newState.error).toBe(getErrorMessage(errorMessage));
    });

    test('тест успешного запроса fulfilled', async () => {
      (getOrdersApi as jest.Mock).mockResolvedValue(testOrderList);
      const store = configureStore({
        reducer: { list: ordersListReducer }
      });
      await store.dispatch(getOrdersList());
      const newState = store.getState().list;

      expect(newState.loading).toBeFalsy();
      expect(newState.orders).toEqual(testOrderList);
      expect(newState.error).toBeNull();
    });
  });
});

/*
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
*/
