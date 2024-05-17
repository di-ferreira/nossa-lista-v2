import { ListItemProps } from '@/components/ListItem/types';
import { SHOPPING_LIST_KEY } from '@/utils/consts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncThunk } from '@reduxjs/toolkit';
import uuid from 'react-native-uuid';

type ReducerAccumulator = {
  total: number;
};

export const NewList = createAsyncThunk(
  'shoppingList/New',
  async (list: ShoppingListsProps, thunkAPI) => {
    try {
      let shoppinglistState: ShoppingListsProps[] = [];
      let storedlists: ShoppingListsProps = {
        ...list,
        id: uuid.v4().toString(),
        items: list.items.map((item) => {
          if (item.id.trim() === '') item.id = uuid.v4().toString();
          return item;
        }),
      };
      let errorList: string = '';

      await AsyncStorage.getItem(SHOPPING_LIST_KEY).then((data) => {
        if (data) {
          const storedLists = JSON.parse(data);
          shoppinglistState = storedLists;
        }
      });

      shoppinglistState.map((item) => {
        if (item.name === storedlists.name) {
          errorList = 'error: Já existe uma lista com esse nome.';
          return;
        }
      });

      if (storedlists.name === '')
        errorList = 'error: Por favor insira um nome para a lista.';

      if (errorList !== '') {
        return thunkAPI.rejectWithValue(errorList);
      } else {
        await AsyncStorage.setItem(
          SHOPPING_LIST_KEY,
          JSON.stringify([...shoppinglistState, storedlists])
        ).then(() => {});

        return storedlists;
      }
    } catch (error: unknown) {
      if (typeof error === 'string')
        return thunkAPI.rejectWithValue(`error: ${error}`);
      if (error instanceof Error)
        return thunkAPI.rejectWithValue(`error: ${error.message}`);
    }
  }
);

export const EditList = createAsyncThunk(
  'shoppingList/Edit',
  async (list: ShoppingListsProps, thunkAPI) => {
    try {
      let shoppinglistState: ShoppingListsProps[] = [];
      let totalPrice: number = list.items.reduce(
        (sum: ReducerAccumulator, listItems: ListItemProps) => {
          return { total: sum.total + listItems.total };
        },
        { total: 0 }
      ).total;
      let errorList: string = '';

      let listState: ShoppingListsProps = {
        ...list,
        items: list.items.map((item: ListItemProps) => {
          if (item.name.trim() === '') {
            errorList = `error: Por favor insira um nome para o item!`;
          }
          if (item.id.trim() === '') item.id = uuid.v4().toString();
          return item;
        }),
        total: totalPrice,
      };

      if (errorList !== '') {
        return thunkAPI.rejectWithValue(errorList);
      }

      await AsyncStorage.getItem(SHOPPING_LIST_KEY).then((data) => {
        if (data) {
          shoppinglistState = JSON.parse(data);
        }
      });

      let editedLists: ShoppingListsProps[] = shoppinglistState.map(
        (editedList: ShoppingListsProps) => {
          if (editedList.id === listState.id) {
            editedList = listState;
          }
          return editedList;
        }
      );

      await AsyncStorage.setItem(
        SHOPPING_LIST_KEY,
        JSON.stringify(editedLists)
      );

      return { lists: editedLists, current: listState };
    } catch (error: unknown) {
      if (typeof error === 'string')
        return thunkAPI.rejectWithValue(`error: ${error}`);
      if (error instanceof Error)
        return thunkAPI.rejectWithValue(`error: ${error.message}`);
    }
  }
);

export const GetLists = createAsyncThunk(
  'shoppingList/Get',
  async (_, thunkAPI) => {
    try {
      let shoppinglistState: ShoppingListsProps[] = [];
      await AsyncStorage.getItem(SHOPPING_LIST_KEY).then((data) => {
        if (data) {
          const storedLists = JSON.parse(data);
          shoppinglistState = storedLists;
        }
      });

      return shoppinglistState;
    } catch (error: unknown) {
      if (typeof error === 'string')
        return thunkAPI.rejectWithValue(`error: ${error}`);
      if (error instanceof Error)
        return thunkAPI.rejectWithValue(`error: ${error.message}`);
    }
  }
);

export const GetListByID = createAsyncThunk(
  'shoppingList/GetByID',
  async (id: string, thunkAPI) => {
    try {
      let shoppinglistByIDState: ShoppingListsProps = {
        id: '',
        name: '',
        items: [],
        total: 0,
      };

      await AsyncStorage.getItem(SHOPPING_LIST_KEY).then((data) => {
        if (data) {
          const storedLists: ShoppingListsProps[] = JSON.parse(data);
          storedLists.filter((list) => {
            if (list.id === id) {
              shoppinglistByIDState = list;
            }
          });
        }
      });

      return shoppinglistByIDState;
    } catch (error: unknown) {
      if (typeof error === 'string')
        return thunkAPI.rejectWithValue(`error: ${error}`);
      if (error instanceof Error)
        return thunkAPI.rejectWithValue(`error: ${error.message}`);
    }
  }
);

export const DeleteList = createAsyncThunk(
  'shoppingList/Delete',
  async (id: string, thunkAPI) => {
    try {
      let shoppinglistState: ShoppingListsProps[] = [];
      let newLists: ShoppingListsProps[] = [];

      await AsyncStorage.getItem(SHOPPING_LIST_KEY).then((data) => {
        if (data) {
          shoppinglistState = JSON.parse(data);
        }
      });

      newLists = shoppinglistState.filter((list) => list.id !== id);
      await AsyncStorage.setItem(SHOPPING_LIST_KEY, JSON.stringify(newLists));

      return newLists;
    } catch (error: unknown) {
      if (typeof error === 'string')
        return thunkAPI.rejectWithValue(`error: ${error}`);
      if (error instanceof Error)
        return thunkAPI.rejectWithValue(`error: ${error.message}`);
    }
  }
);

export const AddItem = createAsyncThunk(
  'shoppingList/AddItem',
  async (
    value: { list: ShoppingListsProps; item: ListItemProps },
    thunkAPI
  ) => {
    try {
      let shoppinglistState: ShoppingListsProps[] = [];
      let totalPrice = value.list.items.reduce((sum, listItems) => {
        return sum + listItems.totalItem;
      }, 0);
      totalPrice = totalPrice + value.item.price * value.item.quantity;

      let listState: ShoppingListsProps = {
        ...value.list,
        items: [
          ...value.list.items,
          {
            ...value.item,
            id: uuid.v4().toString(),
            total: value.item.price * value.item.quantity,
          },
        ],
        total: totalPrice,
      };

      await AsyncStorage.getItem(SHOPPING_LIST_KEY).then((data) => {
        if (data) {
          shoppinglistState = JSON.parse(data);
        }
      });

      let editedLists: ShoppingListsProps[] = shoppinglistState.map(
        (editedList: ShoppingListsProps) => {
          if (editedList.id === listState.id) {
            editedList = listState;
          }
          return editedList;
        }
      );

      await AsyncStorage.setItem(
        SHOPPING_LIST_KEY,
        JSON.stringify(editedLists)
      );

      return { lists: editedLists, current: listState };
    } catch (error: unknown) {
      if (typeof error === 'string')
        return thunkAPI.rejectWithValue(`error: ${error}`);
      if (error instanceof Error)
        return thunkAPI.rejectWithValue(`error: ${error.message}`);
    }
  }
);

