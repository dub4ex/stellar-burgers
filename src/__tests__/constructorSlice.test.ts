import { configureStore } from '@reduxjs/toolkit';
import constructorReducer, {
  addItem,
  deleteItem,
  deleteOrder,
  moveItemDown,
  moveItemUp,
  orderBurger
} from '../services/slices/apiSlices/constructorSlice';
import { orderBurgerApi } from '../utils/burger-api';
import { getErrorMessage } from '../utils/functions';

describe('тест слайса конструктора', () => {
  const testId1 = 'U4f7G9kL2pQx8Z';
  const testId2 = 'aB3dE6hJ9kLmN0';
  const testId3 = 'mJk9Qw7zX2L8pQ';
  const testBun1 = {
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
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
  };

  const testBun2 = {
    _id: '643d69a5c3f7b9001cfa093d',
    name: 'Флюоресцентная булка R2-D3',
    type: 'bun',
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: 'https://code.s3.yandex.net/react/code/bun-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png'
  };

  const testIngredientMain1 = {
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
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
  };

  const testIngredientMain2 = {
    _id: '643d69a5c3f7b9001cfa093e',
    name: 'Филе Люминесцентного тетраодонтимформа',
    type: 'main',
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: 'https://code.s3.yandex.net/react/code/meat-03.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png'
  };

  const testIngredientSauce = {
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
    image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png'
  };

  const testOrder = {
    ingredients: [testBun1._id, testIngredientMain1._id, testBun1._id],
    _id: '6844620ec2f30c001cb2a9e9',
    owner: {
      name: 'testuser',
      email: 'testuser@testmail.com',
      createdAt: '2025-05-25T19:10:51.533Z',
      updatedAt: '2025-05-29T08:51:38.357Z'
    },
    status: 'done',
    name: 'Какой-то бургер',
    createdAt: '2025-06-07T16:00:14.326Z',
    updatedAt: '2025-06-07T16:00:15.120Z',
    number: 69420,
    price: 9999
  };
  const initStateWithItems = {
    constructorItems: {
      bun: { ...testBun1, id: testId1 },
      ingredients: [{ ...testIngredientMain2, id: testId2 }]
    },
    loading: false,
    error: null,
    order: null
  };

  describe('тесты синхронных экшенов', () => {
    const initialConstructorState = {
      constructorItems: {
        bun: null,
        ingredients: []
      },
      loading: false,
      error: null,
      order: null
    };

    const initStateWithBun = {
      constructorItems: {
        bun: { ...testBun1, id: testId1 },
        ingredients: []
      },
      loading: false,
      error: null,
      order: null
    };

    const initStateWithIngredients = {
      constructorItems: {
        bun: null,
        ingredients: [
          { ...testIngredientMain1, id: testId1 },
          { ...testIngredientMain2, id: testId2 }
        ]
      },
      loading: false,
      error: null,
      order: null
    };

    const initStateWithOrder = {
      constructorItems: {
        bun: null,
        ingredients: []
      },
      loading: false,
      error: null,
      order: testOrder
    };

    describe('тесты экшена добавление предмета в конструктор', () => {
      test('Добавление булки в конструктор', () => {
        const newState = constructorReducer(
          initialConstructorState,
          addItem(testBun1)
        );
        const { constructorItems } = newState;

        expect(constructorItems).toEqual({
          bun: expect.objectContaining({
            id: expect.any(String),
            ...testBun1
          }),
          ingredients: []
        });
        expect(constructorItems.bun).toBeDefined();
        expect(constructorItems.bun).not.toBeNull();
      });

      test('Замена булки в конструкторе', () => {
        const newState = constructorReducer(
          initStateWithBun,
          addItem(testBun2)
        );
        const { constructorItems } = newState;

        expect(constructorItems).toEqual({
          bun: expect.objectContaining({
            id: expect.any(String),
            ...testBun2
          }),
          ingredients: []
        });
        expect(constructorItems.bun).toBeDefined();
        expect(constructorItems.bun).not.toBeNull();
      });

      test('Добавление ингредиента в  пустой конструктор', () => {
        const newState = constructorReducer(
          initialConstructorState,
          addItem(testIngredientMain1)
        );
        const { constructorItems } = newState;

        expect(constructorItems).toEqual({
          bun: null,
          ingredients: expect.arrayContaining([
            { ...testIngredientMain1, id: expect.any(String) }
          ])
        });
        expect(constructorItems.ingredients).toHaveLength(1);
      });

      test('Добавление ингредиента в существующий список', () => {
        const newState = constructorReducer(
          initStateWithIngredients,
          addItem(testIngredientSauce)
        );
        const { constructorItems } = newState;

        expect(constructorItems).toEqual({
          bun: null,
          ingredients: expect.arrayContaining([
            { ...testIngredientMain1, id: expect.any(String) },
            { ...testIngredientMain2, id: expect.any(String) },
            { ...testIngredientSauce, id: expect.any(String) }
          ])
        });
        expect(constructorItems.ingredients).toHaveLength(3);
      });
    });

    describe('тесты удаления предмета из конструктора', () => {
      test('тест удаления существующего предмета из конструктора', () => {
        const newState = constructorReducer(
          initStateWithIngredients,
          deleteItem({ ...testIngredientMain1, id: testId1 })
        );
        const { constructorItems } = newState;

        expect(constructorItems).toEqual({
          bun: null,
          ingredients: [{ ...testIngredientMain2, id: testId2 }]
        });
        expect(constructorItems.ingredients).toHaveLength(1);
      });

      test('тест удаления несуществующего предмета из конструктора', () => {
        const newState = constructorReducer(
          initStateWithIngredients,
          deleteItem({ ...testIngredientSauce, id: testId3 })
        );
        const { constructorItems } = newState;

        expect(constructorItems).toEqual(
          initStateWithIngredients.constructorItems
        );
        expect(constructorItems.ingredients).toHaveLength(2);
      });
    });

    describe('Тесты перемещения ингредиентов', () => {
      describe('тесты перемещения ингредиента вверх', () => {
        test('тест перемещения первого ингредниента вверх', () => {
          const newState = constructorReducer(
            initStateWithIngredients,
            moveItemUp({ ...testIngredientMain1, id: testId1 })
          );
          const { constructorItems } = newState;

          expect(constructorItems).toEqual(
            initStateWithIngredients.constructorItems
          );
          expect(constructorItems.ingredients).toHaveLength(2);
        });

        test('тест перемещения !!!не первого ингредниента вверх', () => {
          const newState = constructorReducer(
            initStateWithIngredients,
            moveItemUp({ ...testIngredientMain2, id: testId2 })
          );
          const { constructorItems } = newState;
          expect(constructorItems).toEqual({
            bun: null,
            ingredients: [
              { ...testIngredientMain2, id: testId2 },
              { ...testIngredientMain1, id: testId1 }
            ]
          });

          expect(constructorItems.ingredients).toHaveLength(2);
        });

        test('тест перемещения несуществующего ингредиента вверх', () => {
          const newState = constructorReducer(
            initStateWithIngredients,
            moveItemUp({ ...testIngredientSauce, id: testId3 })
          );
          const { constructorItems } = newState;

          expect(constructorItems).toEqual(
            initStateWithIngredients.constructorItems
          );
          expect(constructorItems.ingredients).toHaveLength(2);
        });
      });

      describe('тесты перемещения игредиентов вниз', () => {
        test('тест перемещения последнего ингредниента вниз', () => {
          const newState = constructorReducer(
            initStateWithIngredients,
            moveItemDown({ ...testIngredientMain2, id: testId2 })
          );
          const { constructorItems } = newState;

          expect(constructorItems).toEqual(
            initStateWithIngredients.constructorItems
          );
          expect(constructorItems.ingredients).toHaveLength(2);
        });

        test('тест перемещения !!! не последнего ингредниента вниз', () => {
          const newState = constructorReducer(
            initStateWithIngredients,
            moveItemDown({ ...testIngredientMain1, id: testId1 })
          );
          const { constructorItems } = newState;

          expect(constructorItems).toEqual({
            bun: null,
            ingredients: [
              { ...testIngredientMain2, id: testId2 },
              { ...testIngredientMain1, id: testId1 }
            ]
          });
          expect(constructorItems.ingredients).toHaveLength(2);
        });

        test('тест перемещения несуществующего ингредиента вниз', () => {
          const newState = constructorReducer(
            initStateWithIngredients,
            moveItemDown({ ...testIngredientSauce, id: testId3 })
          );
          const { constructorItems } = newState;

          expect(constructorItems).toEqual(
            initStateWithIngredients.constructorItems
          );
          expect(constructorItems.ingredients).toHaveLength(2);
        });
      });

      test('удаление заказа', () => {
        const newState = constructorReducer(initStateWithOrder, deleteOrder());
        const { order } = newState;

        expect(order).toEqual(initialConstructorState.order);
        expect(order).toBeNull();
      });
    });
  });

  describe('тесты асинхронных экшенов orderBurger', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    test('тест успешного запроса fulfilled', async () => {
      (orderBurgerApi as jest.Mock) = jest.fn().mockResolvedValue({
        success: true,
        order: testOrder
      });
      const store = configureStore({
        reducer: { constructorBurger: constructorReducer }
      });
      const data = [testBun1._id, testIngredientMain1._id, testBun1._id];

      await store.dispatch(orderBurger(data));

      const state = store.getState().constructorBurger;

      expect(state.loading).toBe(false);
      expect(state.order).toEqual(testOrder);
      expect(state.constructorItems).toEqual({
        bun: null,
        ingredients: []
      });
    });

    test('обработка pending', () => {
      const action = {
        type: orderBurger.pending.type
      };
      const newState = constructorReducer(initStateWithItems, action);

      expect(newState.loading).toBe(true);
      expect(newState.error).toBeNull();
      expect(newState.order).toBeNull();
    });

    test('тест ошибки rejected', () => {
      const errorMessage = 'тестовая ошибка';
      const action = {
        type: orderBurger.rejected.type,
        error: { message: errorMessage }
      };
      const newState = constructorReducer(initStateWithItems, action);

      expect(newState.loading).toBeFalsy();
      expect(newState.error).toBe(getErrorMessage(errorMessage));
    });
  });
});
