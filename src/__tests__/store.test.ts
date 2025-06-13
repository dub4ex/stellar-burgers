import store, { rootReducer } from '../services/store';

describe('Проверка работы store', () => {
  test('тест инициализации root reducer', () => {
    const initialState = rootReducer(undefined, { type: 'TEST_ACTION' });

    expect(initialState).toHaveProperty('burgerConstructor');
    expect(initialState).toHaveProperty('feed');
    expect(initialState).toHaveProperty('ingredients');
    expect(initialState).toHaveProperty('getorder');
    expect(initialState).toHaveProperty('ordersList');
    expect(initialState).toHaveProperty('user');
    expect(initialState).toEqual(store.getState());
  });
});
