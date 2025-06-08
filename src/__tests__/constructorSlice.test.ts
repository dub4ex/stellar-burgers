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

    test('успешный запрос fulfilled', async () => {
      //можно поменять тест rejected как тут
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

    test('ошибка rejected', () => {
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

/* type TConstructorState = {
  constructorItems: {
    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  loading: boolean;
  error: string | null;
  order: TOrder | null;
};

const initialState: TConstructorState = {
  constructorItems: {
    bun: null,
    ingredients: []
  },
  loading: false,
  error: null,
  order: null
}; */

/*{
    "success": true,
    "data": [
        {
            "_id": "643d69a5c3f7b9001cfa093c",
            "name": "Краторная булка N-200i",
            "type": "bun",
            "proteins": 80,
            "fat": 24,
            "carbohydrates": 53,
            "calories": 420,
            "price": 1255,
            "image": "https://code.s3.yandex.net/react/code/bun-02.png",
            "image_mobile": "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
            "image_large": "https://code.s3.yandex.net/react/code/bun-02-large.png",
            "__v": 0
        },
        {
            "_id": "643d69a5c3f7b9001cfa0941",
            "name": "Биокотлета из марсианской Магнолии",
            "type": "main",
            "proteins": 420,
            "fat": 142,
            "carbohydrates": 242,
            "calories": 4242,
            "price": 424,
            "image": "https://code.s3.yandex.net/react/code/meat-01.png",
            "image_mobile": "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
            "image_large": "https://code.s3.yandex.net/react/code/meat-01-large.png",
            "__v": 0
        },
        {
            "_id": "643d69a5c3f7b9001cfa093e",
            "name": "Филе Люминесцентного тетраодонтимформа",
            "type": "main",
            "proteins": 44,
            "fat": 26,
            "carbohydrates": 85,
            "calories": 643,
            "price": 988,
            "image": "https://code.s3.yandex.net/react/code/meat-03.png",
            "image_mobile": "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
            "image_large": "https://code.s3.yandex.net/react/code/meat-03-large.png",
            "__v": 0
        },
        {
            "_id": "643d69a5c3f7b9001cfa0942",
            "name": "Соус Spicy-X",
            "type": "sauce",
            "proteins": 30,
            "fat": 20,
            "carbohydrates": 40,
            "calories": 30,
            "price": 90,
            "image": "https://code.s3.yandex.net/react/code/sauce-02.png",
            "image_mobile": "https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
            "image_large": "https://code.s3.yandex.net/react/code/sauce-02-large.png",
            "__v": 0
        },
        {
            "_id": "643d69a5c3f7b9001cfa0943",
            "name": "Соус фирменный Space Sauce",
            "type": "sauce",
            "proteins": 50,
            "fat": 22,
            "carbohydrates": 11,
            "calories": 14,
            "price": 80,
            "image": "https://code.s3.yandex.net/react/code/sauce-04.png",
            "image_mobile": "https://code.s3.yandex.net/react/code/sauce-04-mobile.png",
            "image_large": "https://code.s3.yandex.net/react/code/sauce-04-large.png",
            "__v": 0
        },
        {
            "_id": "643d69a5c3f7b9001cfa093f",
            "name": "Мясо бессмертных моллюсков Protostomia",
            "type": "main",
            "proteins": 433,
            "fat": 244,
            "carbohydrates": 33,
            "calories": 420,
            "price": 1337,
            "image": "https://code.s3.yandex.net/react/code/meat-02.png",
            "image_mobile": "https://code.s3.yandex.net/react/code/meat-02-mobile.png",
            "image_large": "https://code.s3.yandex.net/react/code/meat-02-large.png",
            "__v": 0
        },
        {
            "_id": "643d69a5c3f7b9001cfa0940",
            "name": "Говяжий метеорит (отбивная)",
            "type": "main",
            "proteins": 800,
            "fat": 800,
            "carbohydrates": 300,
            "calories": 2674,
            "price": 3000,
            "image": "https://code.s3.yandex.net/react/code/meat-04.png",
            "image_mobile": "https://code.s3.yandex.net/react/code/meat-04-mobile.png",
            "image_large": "https://code.s3.yandex.net/react/code/meat-04-large.png",
            "__v": 0
        },
        {
            "_id": "643d69a5c3f7b9001cfa093d",
            "name": "Флюоресцентная булка R2-D3",
            "type": "bun",
            "proteins": 44,
            "fat": 26,
            "carbohydrates": 85,
            "calories": 643,
            "price": 988,
            "image": "https://code.s3.yandex.net/react/code/bun-01.png",
            "image_mobile": "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
            "image_large": "https://code.s3.yandex.net/react/code/bun-01-large.png",
            "__v": 0
        },
        {
            "_id": "643d69a5c3f7b9001cfa0944",
            "name": "Соус традиционный галактический",
            "type": "sauce",
            "proteins": 42,
            "fat": 24,
            "carbohydrates": 42,
            "calories": 99,
            "price": 15,
            "image": "https://code.s3.yandex.net/react/code/sauce-03.png",
            "image_mobile": "https://code.s3.yandex.net/react/code/sauce-03-mobile.png",
            "image_large": "https://code.s3.yandex.net/react/code/sauce-03-large.png",
            "__v": 0
        },
        {
            "_id": "643d69a5c3f7b9001cfa0945",
            "name": "Соус с шипами Антарианского плоскоходца",
            "type": "sauce",
            "proteins": 101,
            "fat": 99,
            "carbohydrates": 100,
            "calories": 100,
            "price": 88,
            "image": "https://code.s3.yandex.net/react/code/sauce-01.png",
            "image_mobile": "https://code.s3.yandex.net/react/code/sauce-01-mobile.png",
            "image_large": "https://code.s3.yandex.net/react/code/sauce-01-large.png",
            "__v": 0
        },
        {
            "_id": "643d69a5c3f7b9001cfa0946",
            "name": "Хрустящие минеральные кольца",
            "type": "main",
            "proteins": 808,
            "fat": 689,
            "carbohydrates": 609,
            "calories": 986,
            "price": 300,
            "image": "https://code.s3.yandex.net/react/code/mineral_rings.png",
            "image_mobile": "https://code.s3.yandex.net/react/code/mineral_rings-mobile.png",
            "image_large": "https://code.s3.yandex.net/react/code/mineral_rings-large.png",
            "__v": 0
        },
        {
            "_id": "643d69a5c3f7b9001cfa0947",
            "name": "Плоды Фалленианского дерева",
            "type": "main",
            "proteins": 20,
            "fat": 5,
            "carbohydrates": 55,
            "calories": 77,
            "price": 874,
            "image": "https://code.s3.yandex.net/react/code/sp_1.png",
            "image_mobile": "https://code.s3.yandex.net/react/code/sp_1-mobile.png",
            "image_large": "https://code.s3.yandex.net/react/code/sp_1-large.png",
            "__v": 0
        },
        {
            "_id": "643d69a5c3f7b9001cfa0948",
            "name": "Кристаллы марсианских альфа-сахаридов",
            "type": "main",
            "proteins": 234,
            "fat": 432,
            "carbohydrates": 111,
            "calories": 189,
            "price": 762,
            "image": "https://code.s3.yandex.net/react/code/core.png",
            "image_mobile": "https://code.s3.yandex.net/react/code/core-mobile.png",
            "image_large": "https://code.s3.yandex.net/react/code/core-large.png",
            "__v": 0
        },
        {
            "_id": "643d69a5c3f7b9001cfa0949",
            "name": "Мини-салат Экзо-Плантаго",
            "type": "main",
            "proteins": 1,
            "fat": 2,
            "carbohydrates": 3,
            "calories": 6,
            "price": 4400,
            "image": "https://code.s3.yandex.net/react/code/salad.png",
            "image_mobile": "https://code.s3.yandex.net/react/code/salad-mobile.png",
            "image_large": "https://code.s3.yandex.net/react/code/salad-large.png",
            "__v": 0
        },
        {
            "_id": "643d69a5c3f7b9001cfa094a",
            "name": "Сыр с астероидной плесенью",
            "type": "main",
            "proteins": 84,
            "fat": 48,
            "carbohydrates": 420,
            "calories": 3377,
            "price": 4142,
            "image": "https://code.s3.yandex.net/react/code/cheese.png",
            "image_mobile": "https://code.s3.yandex.net/react/code/cheese-mobile.png",
            "image_large": "https://code.s3.yandex.net/react/code/cheese-large.png",
            "__v": 0
        }
    ]
}*/

/*
{
    "success": true,
    "name": "Краторный био-марсианский бургер",
    "order": {
        "ingredients": [
            {
                "_id": "643d69a5c3f7b9001cfa093c",
                "name": "Краторная булка N-200i",
                "type": "bun",
                "proteins": 80,
                "fat": 24,
                "carbohydrates": 53,
                "calories": 420,
                "price": 1255,
                "image": "https://code.s3.yandex.net/react/code/bun-02.png",
                "image_mobile": "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
                "image_large": "https://code.s3.yandex.net/react/code/bun-02-large.png",
                "__v": 0
            },
            {
                "_id": "643d69a5c3f7b9001cfa0941",
                "name": "Биокотлета из марсианской Магнолии",
                "type": "main",
                "proteins": 420,
                "fat": 142,
                "carbohydrates": 242,
                "calories": 4242,
                "price": 424,
                "image": "https://code.s3.yandex.net/react/code/meat-01.png",
                "image_mobile": "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
                "image_large": "https://code.s3.yandex.net/react/code/meat-01-large.png",
                "__v": 0
            },
            {
                "_id": "643d69a5c3f7b9001cfa093c",
                "name": "Краторная булка N-200i",
                "type": "bun",
                "proteins": 80,
                "fat": 24,
                "carbohydrates": 53,
                "calories": 420,
                "price": 1255,
                "image": "https://code.s3.yandex.net/react/code/bun-02.png",
                "image_mobile": "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
                "image_large": "https://code.s3.yandex.net/react/code/bun-02-large.png",
                "__v": 0
            }
        ],
        "_id": "6844620ec2f30c001cb2a9e9",
        "owner": {
            "name": "qqqq",
            "email": "wardfnbvcsdxcgbvfcdx@qwererweg.rre",
            "createdAt": "2025-05-25T19:10:51.533Z",
            "updatedAt": "2025-05-29T08:51:38.357Z"
        },
        "status": "done",
        "name": "Краторный био-марсианский бургер",
        "createdAt": "2025-06-07T16:00:14.326Z",
        "updatedAt": "2025-06-07T16:00:15.120Z",
        "number": 80483,
        "price": 2934
    }
}
*/

/*
import reducer, { initialState } from './reducer'
import * as t from './actionTypes'

describe('news reducer', () => { //  describe - группировка для наших тестов новостного редьюсера
  
  it('NEWS_GET_REQUEST', () => { // it - блок, конкретного unit-теста 
    const action = {
      type: t.NEWS_GET_REQUEST,
    }

    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      isLoading: true,
    })
  })

})
*/
