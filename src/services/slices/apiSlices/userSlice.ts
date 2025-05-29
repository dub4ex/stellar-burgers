import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TRegisterData,
  updateUserApi
} from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { deleteCookie, getCookie, setCookie } from '../../../utils/cookie';
import { getErrorMessage } from '../../../utils/functions';

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

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async ({ email, password }: Omit<TRegisterData, 'name'>) => {
    const data = await loginUserApi({ email, password });
    if (!data.success) {
      return data;
    }
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data;
  }
);

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (data: TRegisterData) => {
    //либо сразу сохранять в сторе данные и логиниться либо не сохранять и тогда будет редирект на логин с дополнительным шагом авторизации
    const userData = await registerUserApi(data);
    if (!userData.success) {
      return userData;
    }
    setCookie('accessToken', userData.accessToken);
    localStorage.setItem('refreshToken', userData.refreshToken);
    return userData;
  }
);

export const getUser = createAsyncThunk('user/getInfo', async () =>
  getUserApi()
);

export const checkUserAuth = createAsyncThunk(
  'user/checkUser',
  (_, { dispatch }) => {
    if (getCookie('accessToken')) {
      dispatch(getUser()).finally(() => {
        dispatch(authChecked());
      });
    } else {
      dispatch(authChecked());
    }
  }
);

export const logoutUser = createAsyncThunk(
  'user/logoutUser',
  (_, { dispatch }) => {
    logoutApi().then(() => {
      localStorage.clear(); // очищаем refreshToken
      deleteCookie('accessToken'); // очищаем accessToken
      dispatch(userLogout()); // удаляем пользователя из хранилища
    });
  }
);

export const updateUser = createAsyncThunk(
  'user/updateInfo',
  async ({ email, name }: Partial<TRegisterData>) => {
    const data = await updateUserApi({ email, name });
    return data;
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userLogout: (state) => {
      state.data = null;
    },
    //для очистки предыдущих ошибок перед монтированием новых компонентов, можно также развести все ошибки по разным именованиям, чтобы не пересекались
    clearError: (state) => {
      state.loginUserError = null;
    },
    authChecked: (state) => {
      state.isAuthChecked = true;
    }
  },
  selectors: {
    getUserData: (state) => state,
    authenticatedSelector: (state) => state.isAuthenticated,
    errorSelector: (state) => state.loginUserError,
    userSelector: (state) => state.data,
    isAuthCheckedSelector: (state) => state.isAuthChecked
  },
  extraReducers: (builder) => {
    builder
      //логин
      .addCase(loginUser.pending, (state) => {
        state.loginUserRequest = true;
        state.loginUserError = null;
        //не уверен но наверное лучше сбросить прошлое значение
        state.data = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginUserRequest = false;
        state.loginUserError = getErrorMessage(action.error.message);
        state.isAuthChecked = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.data = action.payload.user;
        state.loginUserRequest = false;
        state.isAuthenticated = true;
        state.isAuthChecked = true;
      })
      //регистрация
      .addCase(registerUser.pending, (state) => {
        state.isAuthenticated = false;
        state.loginUserError = null;
        state.loginUserRequest = true;
        state.data = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loginUserError = getErrorMessage(action.error.message);
        state.isAuthChecked = true;
        state.loginUserRequest = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.isAuthenticated = true;
        state.loginUserRequest = false;
        state.data = action.payload.user;
      })
      //беру начальную инфу о юзере
      .addCase(getUser.pending, (state) => {
        state.loginUserError = null;
        state.loginUserRequest = true;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.loginUserError = getErrorMessage(action.error.message);
        state.loginUserRequest = false;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.data = action.payload.user;
        state.loginUserRequest = false;
      })
      //выход из аккаунта
      .addCase(logoutUser.pending, (state) => {
        state.loginUserRequest = true;
        state.loginUserError = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loginUserRequest = false;
        state.loginUserError = getErrorMessage(action.error.message);
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loginUserRequest = false;
        state.isAuthChecked = true;
        state.isAuthenticated = false;
      })
      //редактирование профиля
      .addCase(updateUser.pending, (state) => {
        state.loginUserError = null;
        state.loginUserRequest = true;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loginUserError = getErrorMessage(action.error.message);
        state.loginUserRequest = false;
        state.isAuthChecked = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loginUserRequest = false;
        state.data = action.payload.user;
        state.isAuthChecked = true;
        state.isAuthenticated = true;
      });
  }
});

export const {
  getUserData,
  authenticatedSelector,
  errorSelector,
  userSelector,
  isAuthCheckedSelector
} = userSlice.selectors;
export const { userLogout, clearError, authChecked } = userSlice.actions;
