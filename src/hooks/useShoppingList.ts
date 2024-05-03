import { storageService } from '@/services/storageServices';
import { create } from 'zustand';

const SHOPPING_LIST_KEY = '@ShoppingListKey';

interface iShoppingListContext {
  getShoppingLists: ShoppingListsProps[];
  ShoppingListError: string;
  saveShopping: (shopping: ShoppingListsProps) => void;
  updateShopping: (shopping: ShoppingListsProps) => ShoppingListsProps | void;
  deleteShopping: (shoppingId: number) => void;
}

const getShoppingLists = () => {
  let shoppingLists: ShoppingListsProps[] = [];

  if (storageService) {
    storageService
      .getItem<ShoppingListsProps[]>(SHOPPING_LIST_KEY)
      .then((list) => {
        shoppingLists = list;
      });
  }

  return shoppingLists;
};

const isValid = (name: string) => {
  let validName: boolean = true;
  let lists: ShoppingListsProps[] = getShoppingLists();

  lists.map((list) => {
    if (list.name.toLocaleLowerCase() === name.toLocaleLowerCase()) {
      validName = false;
    }
  });

  return validName;
};

const createNewList = (shopping: ShoppingListsProps): { isError: string } => {
  let isError = '';
  //- cria uma nova lista
  if (isValid(shopping.name)) {
    //- gera um novo ID
    let lists: ShoppingListsProps[] = getShoppingLists();

    let id = lists.length + 1;

    lists.map((item) => {
      if (item.id === id) {
        let newId = item.id + 1;

        id = newId;
      }
    });

    shopping.id = id;

    lists.push(shopping);

    storageService.setItem(SHOPPING_LIST_KEY, JSON.stringify(lists));
  } else if (shopping.name && !isValid(shopping.name)) {
    isError = 'Já existe uma lista com esse nome.';
  } else {
    isError = 'Por favor insira um nome para a lista.';
  }

  return { isError };
};

const deleteList = (shoppingId: number) => {
  const shoppingLists = getShoppingLists();
  const newList = shoppingLists.filter((item) => item.id !== shoppingId);
  storageService.setItem(SHOPPING_LIST_KEY, JSON.stringify(newList));
};

const updateShopping = (shopping: ShoppingListsProps) => {
  const shoppingLists = getShoppingLists();
  const newList = shoppingLists.filter((item) => item.id !== shopping.id);
  newList.push(shopping);
  storageService.setItem(SHOPPING_LIST_KEY, JSON.stringify(newList));
};

const useShoppingList = create<iShoppingListContext>((set) => ({
  getShoppingLists: getShoppingLists(),
  ShoppingListError: '',
  saveShopping: (shopping) => {
    const { isError } = createNewList(shopping);
    set(() => ({
      ShoppingListError: isError,
      getShoppingLists: getShoppingLists(),
    }));
  },
  updateShopping: (shopping) => {
    updateShopping(shopping);
    set(() => ({
      getShoppingLists: getShoppingLists(),
    }));
  },
  deleteShopping: (shoppingId) => {
    deleteList(shoppingId);
    set(() => ({
      getShoppingLists: getShoppingLists(),
    }));
  },
}));

export default useShoppingList;

