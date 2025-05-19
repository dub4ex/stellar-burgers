import { getIngredientsApi, orderBurgerApi } from '@api';
import {
  createAsyncThunk,
  createSlice,
  nanoid,
  PayloadAction
} from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';

type TConstructorState = {
  constructorItems: {
    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
  };
};

const initialState: TConstructorState = {
  constructorItems: {
    bun: null,
    ingredients: []
  }
};

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
    }
  },
  selectors: {
    getConstructorItems: (state) => state.constructorItems
  }
});

export const { addItem, deleteItem, moveItemUp, moveItemDown } =
  constructorSlice.actions;
export const { getConstructorItems } = constructorSlice.selectors;
