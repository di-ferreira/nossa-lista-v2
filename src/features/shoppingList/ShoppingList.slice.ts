import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  DeleteList,
  EditList,
  GetListByID,
  GetLists,
  NewList,
} from './ShoppingList.thunk';

interface IShoppingList {
  ListShopping: ShoppingListsProps[];
  CurrentList: ShoppingListsProps;
  isLoading: boolean;
  errorMessage: string;
}

const initialState: IShoppingList = {
  ListShopping: [],
  CurrentList: {
    id: 0,
    name: '',
    total: 0,
    items: [],
  },
  isLoading: false,
  errorMessage: '',
};

export const ShoppingListSlice = createSlice({
  name: 'ShoppingList',
  initialState,
  reducers: {
    setListShopping: (state, action) => {
      state.ListShopping = action.payload;
    },
    setCurrentList: (state, action) => {
      state.CurrentList = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(NewList.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = '';
      })
      .addCase(
        NewList.fulfilled,
        (state, action: PayloadAction<ShoppingListsProps | undefined>) => {
          if (action.payload) {
            state.ListShopping = [...state.ListShopping, action.payload];
            state.CurrentList = action.payload;
          }
          state.isLoading = false;
          state.errorMessage = '';
        }
      )
      .addCase(NewList.rejected, (state, action: PayloadAction<any>) => {
        state.errorMessage = action.payload;
        state.isLoading = false;
      });

    builder
      .addCase(EditList.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = '';
      })
      .addCase(
        EditList.fulfilled,
        (
          state,
          action: PayloadAction<
            | { lists: ShoppingListsProps[]; current: ShoppingListsProps }
            | undefined
          >
        ) => {
          if (action.payload) {
            state.ListShopping = action.payload.lists;
            state.CurrentList = action.payload.current;
          }
          state.isLoading = false;
          state.errorMessage = '';
        }
      )
      .addCase(EditList.rejected, (state, action: PayloadAction<any>) => {
        state.errorMessage = action.payload;
        state.isLoading = false;
      });

    builder
      .addCase(GetLists.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = '';
      })
      .addCase(
        GetLists.fulfilled,
        (state, action: PayloadAction<ShoppingListsProps[] | undefined>) => {
          if (action.payload) {
            state.ListShopping = action.payload;
          }
          state.isLoading = false;
          state.errorMessage = '';
        }
      )
      .addCase(GetLists.rejected, (state, action: PayloadAction<any>) => {
        state.errorMessage = action.payload;
        state.isLoading = false;
      });

    builder
      .addCase(GetListByID.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = '';
      })
      .addCase(
        GetListByID.fulfilled,
        (state, action: PayloadAction<ShoppingListsProps | undefined>) => {
          if (action.payload) {
            state.CurrentList = action.payload;
          }
          state.isLoading = false;
          state.errorMessage = '';
        }
      )
      .addCase(GetListByID.rejected, (state, action: PayloadAction<any>) => {
        state.errorMessage = action.payload;
        state.isLoading = false;
      });

    builder
      .addCase(DeleteList.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = '';
      })
      .addCase(
        DeleteList.fulfilled,
        (state, action: PayloadAction<ShoppingListsProps[] | undefined>) => {
          if (action.payload) {
            state.ListShopping = action.payload;
          }
          state.isLoading = false;
          state.errorMessage = '';
        }
      )
      .addCase(DeleteList.rejected, (state, action: PayloadAction<any>) => {
        state.errorMessage = action.payload;
        state.isLoading = false;
      });
  },
});

