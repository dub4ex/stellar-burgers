import { getErrorMessage } from '../utils/functions';
import userReducer, {
  authChecked,
  clearError,
  getUser,
  loginUser,
  logoutUser,
  registerUser,
  updateUser,
  userLogout
} from '../services/slices/apiSlices/userSlice';
import { configureStore } from '@reduxjs/toolkit';
import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  updateUserApi
} from '@api';
import { deleteCookie, setCookie } from '../utils/cookie';

jest.mock('@api', () => ({
  loginUserApi: jest.fn(),
  registerUserApi: jest.fn(),
  getUserApi: jest.fn(),
  logoutApi: jest.fn(),
  updateUserApi: jest.fn()
}));
jest.mock('../utils/cookie', () => ({
  setCookie: jest.fn(),
  deleteCookie: jest.fn()
}));

describe('тесты слайса user', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const initialState = {
    isAuthChecked: false,
    isAuthenticated: false,
    data: null,
    loginUserError: null,
    loginUserRequest: false
  };

  const testUserName = 'ExampleName';
  const testEmail = 'example@mail.ru';
  const testPassword = 'qwerty12345678';

  const testUser = {
    email: testEmail,
    name: testUserName
  };

  const testUserData = {
    refreshToken: 'testRefreshToken',
    accessToken: 'testAccessToken',
    user: testUser
  };

  describe('тесты асинхронных экшенов loginUser', () => {
    test('обработка pending', () => {
      const action = {
        type: loginUser.pending.type
      };
      const newState = userReducer(initialState, action);

      expect(newState.loginUserRequest).toBeTruthy();
      expect(newState.loginUserError).toBeNull();
      expect(newState.data).toBeNull();
    });

    test('тест ошибки rejected', () => {
      const errorMessage = 'тестовая ошибка';
      const action = {
        type: loginUser.rejected.type,
        error: { message: errorMessage }
      };
      const newState = userReducer(initialState, action);
      expect(newState.loginUserRequest).toBeFalsy();
      expect(newState.loginUserError).toBe(getErrorMessage(errorMessage));
      expect(newState.isAuthChecked).toBeTruthy();
    });

    test('тест успешного запроса fulfilled', async () => {
      (loginUserApi as jest.Mock).mockResolvedValue(testUserData);
      (setCookie as jest.Mock).mockImplementation(() => {});

      const store = configureStore({
        reducer: { userData: userReducer }
      });
      await store.dispatch(
        loginUser({ email: testEmail, password: testPassword })
      );

      const newState = store.getState().userData;

      expect(newState.data).toEqual(testUser);
      expect(newState.loginUserRequest).toBeFalsy();
      expect(newState.isAuthenticated).toBeTruthy();
      expect(newState.isAuthChecked).toBeTruthy();
    });
  });

  describe('тесты асинхронных экшенов registerUser', () => {
    test('обработка pending', () => {
      const action = {
        type: registerUser.pending.type
      };
      const newState = userReducer(initialState, action);

      expect(newState.isAuthenticated).toBeFalsy();
      expect(newState.loginUserError).toBeNull();
      expect(newState.loginUserRequest).toBeTruthy();
      expect(newState.data).toBeNull();
    });

    test('тест ошибки rejected', () => {
      const errorMessage = 'тестовая ошибка';
      const action = {
        type: registerUser.rejected.type,
        error: { message: errorMessage }
      };
      const newState = userReducer(initialState, action);

      expect(newState.loginUserError).toBe(getErrorMessage(errorMessage));
      expect(newState.isAuthChecked).toBeTruthy();
      expect(newState.loginUserRequest).toBeFalsy();
    });

    test('тест успешного запроса fulfilled', async () => {
      (registerUserApi as jest.Mock).mockResolvedValue(testUserData);
      (setCookie as jest.Mock).mockImplementation(() => {});

      const store = configureStore({
        reducer: { userData: userReducer }
      });
      await store.dispatch(
        registerUser({
          email: testEmail,
          name: testUserName,
          password: testPassword
        })
      );

      const newState = store.getState().userData;

      expect(newState.isAuthChecked).toBeTruthy();
      expect(newState.isAuthenticated).toBeTruthy();
      expect(newState.loginUserRequest).toBeFalsy();
      expect(newState.data).toEqual(testUser);
    });
  });

  describe('тесты асинхронных экшенов getUser', () => {
    test('обработка pending', () => {
      const action = {
        type: getUser.pending.type
      };
      const newState = userReducer(initialState, action);

      expect(newState.loginUserError).toBeNull();
      expect(newState.loginUserRequest).toBeTruthy();
    });

    test('тест ошибки rejected', () => {
      const errorMessage = 'тестовая ошибка';
      const action = {
        type: getUser.rejected.type,
        error: { message: errorMessage }
      };
      const newState = userReducer(initialState, action);

      expect(newState.isAuthenticated).toBeFalsy();
      expect(newState.loginUserError).toBe(getErrorMessage(errorMessage));
      expect(newState.loginUserRequest).toBeFalsy();
    });

    test('тест успешного запроса fulfilled', async () => {
      (getUserApi as jest.Mock).mockResolvedValue(testUserData);
      (setCookie as jest.Mock).mockImplementation(() => {});

      const store = configureStore({
        reducer: { userData: userReducer }
      });
      await store.dispatch(getUser());
      const newState = store.getState().userData;

      expect(newState.isAuthenticated).toBeTruthy();
      expect(newState.data).toEqual(testUser);
      expect(newState.loginUserRequest).toBeFalsy();
    });
  });

  describe('тесты асинхронных экшенов logoutUser', () => {
    test('обработка pending', () => {
      const action = {
        type: logoutUser.pending.type
      };
      const newState = userReducer(initialState, action);

      expect(newState.loginUserRequest).toBeTruthy();
      expect(newState.loginUserError).toBeNull();
    });

    test('тест ошибки rejected', () => {
      const errorMessage = 'тестовая ошибка';
      const action = {
        type: logoutUser.rejected.type,
        error: { message: errorMessage }
      };
      const newState = userReducer(initialState, action);

      expect(newState.loginUserRequest).toBeFalsy();
      expect(newState.loginUserError).toBe(getErrorMessage(errorMessage));
    });

    test('тест успешного запроса fulfilled', async () => {
      (logoutApi as jest.Mock).mockResolvedValue(testUserData);
      (deleteCookie as jest.Mock).mockImplementation(() => {});

      const store = configureStore({
        reducer: { userData: userReducer }
      });
      await store.dispatch(logoutUser());
      const newState = store.getState().userData;

      expect(newState.loginUserRequest).toBeFalsy();
      expect(newState.isAuthChecked).toBeTruthy();
      expect(newState.isAuthenticated).toBeFalsy();
    });
  });

  describe('тесты асинхронных экшенов updateUser', () => {
    test('обработка pending', () => {
      const action = {
        type: updateUser.pending.type
      };
      const newState = userReducer(initialState, action);

      expect(newState.loginUserError).toBeNull();
      expect(newState.loginUserRequest).toBeTruthy();
    });

    test('тест ошибки rejected', () => {
      const errorMessage = 'тестовая ошибка';
      const action = {
        type: updateUser.rejected.type,
        error: { message: errorMessage }
      };
      const newState = userReducer(initialState, action);

      expect(newState.loginUserError).toBe(getErrorMessage(errorMessage));
      expect(newState.loginUserRequest).toBeFalsy();
      expect(newState.isAuthChecked).toBeTruthy();
    });

    test('тест успешного запроса fulfilled', async () => {
      (updateUserApi as jest.Mock).mockResolvedValue(testUserData);

      const store = configureStore({
        reducer: { userData: userReducer }
      });
      await store.dispatch(updateUser(testUser));
      const newState = store.getState().userData;

      expect(newState.loginUserRequest).toBeFalsy();
      expect(newState.data).toEqual(testUser);
      expect(newState.isAuthChecked).toBeTruthy();
      expect(newState.isAuthenticated).toBeTruthy();
    });
  });

  describe('тесты синхронных экшенов', () => {
    test('Очистка данных юзера', () => {
      const newState = userReducer(initialState, userLogout());
      const { data } = newState;

      expect(data).toBeNull();
    });
    test('Очистка текста ошибки', () => {
      const newState = userReducer(initialState, clearError());
      const { loginUserError } = newState;

      expect(loginUserError).toBeNull();
    });
    test('Установка аутентификации', () => {
      const newState = userReducer(initialState, authChecked());
      const { isAuthChecked } = newState;

      expect(isAuthChecked).toBeTruthy();
    });
  });
});

/*
type TUserState = {
  isAuthChecked: boolean;
  isAuthenticated: boolean;
  data: TUser | null;
  loginUserError: string | null;
  loginUserRequest: boolean;
};

const initialState: TUserState = {
  isAuthChecked: false,
  isAuthenticated: false,
  data: null,
  loginUserError: null,
  loginUserRequest: false
};
*/

/*
type TAuthResponse = TServerResponse<{
  refreshToken: string;
  accessToken: string;
  user: TUser;
}>;
*/
