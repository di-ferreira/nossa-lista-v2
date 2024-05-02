export const ShoppingList: ShoppingListsProps[] = [
  {
    id: 1,
    name: 'Mercado',
    total: 500,
    items: [
      {
        id: '1',
        name: 'Tomate',
        price: 2,
        quantity: 5,
        unit: 'kg',
        purchased: false,
        total: 10,
      },
      {
        id: '2',
        name: 'Leche',
        price: 3,
        quantity: 2,
        unit: 'l',
        purchased: true,
        total: 6,
      },
    ],
  },
  {
    id: 2,
    name: 'Açougue',
    total: 600,
    items: [
      {
        id: '1',
        name: 'Carré',
        price: 15,
        quantity: 2,
        unit: 'kg',
        purchased: false,
        total: 30,
      },
      {
        id: '2',
        name: 'alcatra',
        price: 32,
        quantity: 2,
        unit: 'kg',
        purchased: true,
        total: 64,
      },
    ],
  },
];

