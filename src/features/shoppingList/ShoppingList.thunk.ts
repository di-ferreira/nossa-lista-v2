import { SHOPPING_LIST_KEY } from '@/utils/consts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const NewList = createAsyncThunk(
  'shoppingList/New',
  async (list: ShoppingListsProps, thunkAPI) => {
    try {
      let shoppinglistState: ShoppingListsProps[] = [];
      let storedlists: ShoppingListsProps = list;
      let errorList: string = '';

      AsyncStorage.getItem(SHOPPING_LIST_KEY).then((data) => {
        if (data) {
          const storedLists = JSON.parse(data);
          shoppinglistState = storedLists;
        }
      });

      let id = shoppinglistState.length + 1;

      shoppinglistState.map((item) => {
        if (item.name === storedlists.name) {
          errorList = 'error: Já existe uma lista com esse nome.';
        }
        if (item.id === id) {
          let newId = item.id + 1;
          id = newId;
          storedlists = { ...storedlists, id: newId };
        }
      });

      storedlists.name === ''
        ? (errorList = 'error: Por favor insira um nome para a lista.')
        : '';

      if (errorList !== '') {
        return thunkAPI.rejectWithValue(errorList);
      } else {
        await AsyncStorage.setItem(
          SHOPPING_LIST_KEY,
          JSON.stringify([...shoppinglistState, storedlists])
        );
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

      AsyncStorage.getItem(SHOPPING_LIST_KEY).then((data) => {
        if (data) {
          shoppinglistState = JSON.parse(data);
        }
      });

      let editedLists: ShoppingListsProps[] = shoppinglistState.map(
        (editedList: ShoppingListsProps) => {
          if (editedList.id === list.id) {
            editedList = list;
          }
          return editedList;
        }
      );

      await AsyncStorage.setItem(
        SHOPPING_LIST_KEY,
        JSON.stringify(editedLists)
      );

      return { lists: editedLists, current: list };
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
      AsyncStorage.getItem(SHOPPING_LIST_KEY).then((data) => {
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
  async (id: number, thunkAPI) => {
    try {
      let shoppinglistByIDState: ShoppingListsProps = {
        id: 0,
        name: '',
        items: [],
        total: 0,
      };

      AsyncStorage.getItem(SHOPPING_LIST_KEY).then((data) => {
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
  async (id: number, thunkAPI) => {
    try {
      let shoppinglistState: ShoppingListsProps[] = [];
      let newLists: ShoppingListsProps[] = [];

      AsyncStorage.getItem(SHOPPING_LIST_KEY).then((data) => {
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

