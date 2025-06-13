import { getErrorMessage } from '../utils/functions';
import ingredientsReducer, {
  getIngredients
} from '../services/slices/apiSlices/ingredientsSlice';
import { configureStore } from '@reduxjs/toolkit';
import { getIngredientsApi } from '@api';

jest.mock('@api', () => ({
  getIngredientsApi: jest.fn()
}));

describe('тесты слайса ingredients', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  const initialState = {
    ingredients: [],
    loading: false,
    error: null
  };

  const testIngredients = [
    {
      _id: '643d69a5c3f7b9001cfa093c',
      name: 'Краторная булка N-200i',
      type: 'bun',
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: 'https://code.s3.yandex.net/react/code/bun-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
      __v: 0
    },
    {
      _id: '643d69a5c3f7b9001cfa0941',
      name: 'Биокотлета из марсианской Магнолии',
      type: 'main',
      proteins: 420,
      fat: 142,
      carbohydrates: 242,
      calories: 4242,
      price: 424,
      image: 'https://code.s3.yandex.net/react/code/meat-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
      __v: 0
    },
    {
      _id: '643d69a5c3f7b9001cfa0942',
      name: 'Соус Spicy-X',
      type: 'sauce',
      proteins: 30,
      fat: 20,
      carbohydrates: 40,
      calories: 30,
      price: 90,
      image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
      __v: 0
    }
  ];

  describe('тесты асинхронных экшенов getIngredients', () => {
    test('обработка pending', () => {
      const action = {
        type: getIngredients.pending.type
      };
      const newState = ingredientsReducer(initialState, action);

      expect(newState.loading).toBeTruthy();
      expect(newState.error).toBeNull();
      expect(newState.ingredients).toHaveLength(0);
    });

    test('тест ошибки rejected', () => {
      const errorMessage = 'тестовая ошибка';
      const action = {
        type: getIngredients.rejected.type,
        error: { message: errorMessage }
      };
      const newState = ingredientsReducer(initialState, action);

      expect(newState.loading).toBeFalsy();
      expect(newState.error).toBe(getErrorMessage(errorMessage));
    });

    test('тест успешного запроса fulfilled', async () => {
      (getIngredientsApi as jest.Mock).mockResolvedValue(testIngredients);
      const store = configureStore({
        reducer: { ingredients: ingredientsReducer }
      });
      await store.dispatch(getIngredients());
      const newState = store.getState().ingredients;

      expect(newState.loading).toBeFalsy();
      expect(newState.ingredients).toEqual(testIngredients);
    });
  });
});
