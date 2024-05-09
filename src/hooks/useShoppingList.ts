// import { storageService } from '@/services/storageServices';
// import { SHOPPING_LIST_KEY } from '@/utils/consts';
// import { create } from 'zustand';

// interface iShoppingListContext {
//   getShoppingLists: () => ShoppingListsProps[];
//   ShoppingListError: string;
//   saveShopping: (shopping: ShoppingListsProps) => void;
//   updateShopping: (shopping: ShoppingListsProps) => ShoppingListsProps | void;
//   deleteShopping: (shoppingId: number) => void;
// }

// const getShoppingLists = (): ShoppingListsProps[] => {
//   let shoppingLists: ShoppingListsProps[] = [];

//   if (storageService) {
//     storageService
//       .getItem<ShoppingListsProps[]>(SHOPPING_LIST_KEY)
//       .then((list) => {
//         shoppingLists = list;
//       });
//   }
//   console.warn('lista', shoppingLists);
//   return shoppingLists;
// };

// const isValid = (name: string) => {
//   let validName: boolean = true;
//   let lists: ShoppingListsProps[] = getShoppingLists();

//   lists.map((list) => {
//     if (list.name.toLocaleLowerCase() === name.toLocaleLowerCase()) {
//       validName = false;
//     }
//   });

//   return name.trim() !== '' ? validName : !validName;
// };

// const createNewList = (shopping: ShoppingListsProps): { isError: string } => {
//   let isError = '';
//   //- cria uma nova lista
//   if (isValid(shopping.name)) {
//     //- gera um novo ID
//     let lists: ShoppingListsProps[] = getShoppingLists();
//     console.warn('Listas->', lists);

//     let id = lists.length + 1;

//     lists.map((item) => {
//       if (item.id === id) {
//         let newId = item.id + 1;

//         id = newId;
//       }
//     });

//     shopping.id = id;

//     lists.push(shopping);

//     storageService
//       .setItem(SHOPPING_LIST_KEY, lists)
//       .then(() => {
//         storageService.getItem(SHOPPING_LIST_KEY).then((list) => {
//           console.warn('Lista criada com sucesso', list);
//         });
//       })
//       .catch((err) => {
//         isError = 'Erro ao criar lista ' + err;
//       });
//   } else if (shopping.name && !isValid(shopping.name)) {
//     isError = 'Já existe uma lista com esse nome.';
//   } else {
//     isError = 'Por favor insira um nome para a lista.';
//   }

//   return { isError };
// };

// const deleteList = (shoppingId: number) => {
//   const shoppingLists = getShoppingLists();
//   const newList = shoppingLists.filter((item) => item.id !== shoppingId);
//   storageService
//     .setItem(SHOPPING_LIST_KEY, JSON.stringify(newList))
//     .then(() => {
//       console.log('Lista deletada com sucesso');
//     })
//     .catch((err) => {
//       console.log('Erro ao deletar lista' + err);
//     });
// };

// const updateShopping = (shopping: ShoppingListsProps) => {
//   const shoppingLists = getShoppingLists();
//   const newList = shoppingLists.filter((item) => item.id !== shopping.id);
//   newList.push(shopping);
//   storageService
//     .setItem(SHOPPING_LIST_KEY, JSON.stringify(newList))
//     .then(() => {
//       console.log('Lista atualizada com sucesso');
//     })
//     .catch((err) => {
//       console.log('Erro ao atualizar lista' + err);
//     });
// };

// const useShoppingList = create<iShoppingListContext>((set) => ({
//   getShoppingLists: () => getShoppingLists(),
//   ShoppingListError: '',
//   saveShopping: (shopping) => {
//     const { isError } = createNewList(shopping);
//     set(() => ({
//       ShoppingListError: isError,
//     }));
//   },
//   updateShopping: (shopping) => {
//     updateShopping(shopping);
//   },
//   deleteShopping: (shoppingId) => {
//     deleteList(shoppingId);
//   },
// }));

// export default useShoppingList;

