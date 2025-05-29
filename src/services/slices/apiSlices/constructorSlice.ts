import { orderBurgerApi } from '@api';
import {
  createAsyncThunk,
  createSlice,
  nanoid,
  PayloadAction
} from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';
import { getErrorMessage } from '../../../utils/functions';

type TConstructorState = {
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
};

export const orderBurger = createAsyncThunk(
  'order/post',
  async (data: string[]) => orderBurgerApi(data)
);

export const constructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addItem: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.constructorItems.bun = action.payload;
        } else {
          state.constructorItems.ingredients.push(action.payload);
        }
      },
      prepare: (item: TIngredient) => {
        const id = nanoid();
        return { payload: { ...item, id } };
      }
    },
    deleteItem: (state, action: PayloadAction<TConstructorIngredient>) => {
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (item) => item.id !== action.payload.id
        );
    },
    moveItemUp: (state, action: PayloadAction<TConstructorIngredient>) => {
      const id = action.payload.id;
      const ingredients = state.constructorItems.ingredients;
      const index = ingredients.findIndex((item) => item.id === id);
      if (index > 0) {
        [ingredients[index - 1], ingredients[index]] = [
          ingredients[index],
          ingredients[index - 1]
        ];
      }
    },
    moveItemDown: (state, action: PayloadAction<TConstructorIngredient>) => {
      const id = action.payload.id;
      const ingredients = state.constructorItems.ingredients;
      const index = ingredients.findIndex((item) => item.id === id);
      if (index >= 0 && index < state.constructorItems.ingredients.length - 1) {
        [ingredients[index], ingredients[index + 1]] = [
          ingredients[index + 1],
          ingredients[index]
        ];
      }
    },
    deleteOrder: (state) => {
      state.order = null;
    }
  },
  selectors: {
    getConstructorItems: (state) => state.constructorItems,
    getLoadingSelector: (state) => state.loading,
    getOrderSelector: (state) => state.order
  },
  extraReducers: (builder) => {
    builder
      .addCase(orderBurger.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.order = null;
      })
      .addCase(orderBurger.rejected, (state, action) => {
        state.loading = false;
        state.error = getErrorMessage(action.error.message);
      })
      .addCase(orderBurger.fulfilled, (state, action) => {
        state.loading = false;
        //добавляем в стейт новый заказ
        state.order = action.payload.order;
        //удаляем ингредиенты в конструкторе
        state.constructorItems = {
          bun: null,
          ingredients: []
        };
      });
  }
});

export const { addItem, deleteItem, moveItemUp, moveItemDown, deleteOrder } =
  constructorSlice.actions;
export const { getConstructorItems, getLoadingSelector, getOrderSelector } =
  constructorSlice.selectors;
