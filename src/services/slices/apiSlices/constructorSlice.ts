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
          //console.log('BUN');
          state.constructorItems.bun = action.payload;
        } else {
          //console.log('INGREDIENT');
          state.constructorItems.ingredients.push(action.payload);
        }
      },
      prepare: (item: TIngredient) => {
        const id = nanoid();
        return { payload: { ...item, id } };
      }
    }
  },
  selectors: {
    getConstructorItems: (state) => state.constructorItems
  }
});

export const { addItem } = constructorSlice.actions;
export const { getConstructorItems } = constructorSlice.selectors;
