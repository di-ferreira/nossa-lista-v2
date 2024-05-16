import { configureStore } from '@reduxjs/toolkit';
import { shoppingListReducer } from './features/shoppingList/ShoppingList.slice';

export const store = configureStore({
  reducer: {
    shoppingList: shoppingListReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

