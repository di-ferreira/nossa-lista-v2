import AddItemComp from '@/components/AddItemComp';
import Button from '@/components/Button';
import Header from '@/components/Header';
import InputCustom from '@/components/InputCustom';
import { List as ListContainer } from '@/components/List';
import ListItem from '@/components/ListItem';
import {
  eUnitMeansure,
  ListItemProps,
  UnitMeansure,
} from '@/components/ListItem/types';
import { theme } from '@/theme';
import { SHOPPING_LIST_KEY } from '@/utils/consts';
import { commaToDot, dotToComma, formatPrice } from '@/utils/format';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import BottomSheet from '@gorhom/bottom-sheet';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { styles } from './styles';

interface iDropdown {
  label: keyof eUnitMeansure;
  value: eUnitMeansure;
}
const List: React.FC = () => {
  const { id } = useLocalSearchParams();
  const ItemListInitial: ListItemProps = {
    id: 0,
    name: '',
    price: 0,
    purchased: false,
    quantity: 1,
    total: 0,
    unit: eUnitMeansure.KILO,
  };

  const bottomSheetRef = useRef<BottomSheet>(null);
  const [ShoppingList, setShoppingList] = useState<ShoppingListsProps>({
    id: 0,
    name: '',
    items: [],
    total: 0,
  });

  const [StoredShoppingList, setStoredShoppingList] = useState<
    ShoppingListsProps[]
  >([]);

  const [dropdownValue, setDropdownValue] = useState<iDropdown>(
    UnitMeansure[2]
  );
  const [isLoading, setisLoading] = useState<boolean>(false);
  const [isFocusDropdown, setIsFocusDropdown] = useState<boolean>(false);
  const [ItemQuantity, setItemQuantity] = useState<string>('');
  const [ItemPrice, setItemPrice] = useState<string>('');

  const [ItemList, setItemList] = useState<ListItemProps>(ItemListInitial);

  const handleLists = () => {
    AsyncStorage.getItem(SHOPPING_LIST_KEY).then((data) => {
      if (data) {
        const storedLists: ShoppingListsProps[] = JSON.parse(data);
        storedLists.filter((list) => {
          if (list.id === parseInt(String(id))) {
            setShoppingList(list);
          }
        });
        setStoredShoppingList(storedLists);
      }
    });
  };

  const AddItem = () => {
    let id = ShoppingList.items.length + 1;

    ShoppingList.items.map((item) => {
      if (item.id === id) {
        let newId = item.id + 1;

        id = newId;
      }
    });

    const price = commaToDot(ItemPrice);
    const quantity = commaToDot(ItemQuantity);

    const newItem: ListItemProps = {
      ...ItemList,
      id: id,
      quantity,
      price,
      unit: dropdownValue.value,
      purchased: false,
      total: price * quantity,
    };

    if (!validateItem(newItem)) {
      Alert.alert('', 'Por favor insira um nome para o item!', [
        { text: 'OK' },
      ]);
      return;
    }
    setShoppingList(
      (old) =>
        (old = {
          ...old,
          total: ShoppingList.total + newItem.total,
          items: [...old.items, newItem],
        })
    );
    setItemList(ItemListInitial);
    CloseModalItem();
  };

  const saveItem = () => {
    if (ItemList.id <= 0) AddItem();
    else saveEditedItem();

    const totalPrice = ShoppingList.items.reduce(
      (sum: number, listItems: ListItemProps) => {
        return sum + listItems.total;
      },
      0
    );
    console.log('total - saveItem', totalPrice);

    setShoppingList(
      (old) =>
        (old = {
          ...old,
          total: totalPrice,
        })
    );
  };

  const OpenModalItem = () => {
    bottomSheetRef.current?.expand();
  };

  const CloseModalItem = () => {
    setItemList(ItemListInitial);
    setItemQuantity('');
    setItemPrice('');
    bottomSheetRef.current?.close();
  };

  useEffect(() => {
    handleLists();
  }, []);

  //- carrega itens e total da lista
  // useEffect(() => {
  //   if (lists !== []) {
  //     lists.map((list) => {
  //       if (list.id === idList) {
  //         setListItems(list.listItems);
  //         setTotalList(list.totalList);
  //       }
  //     });
  //   }
  // }, [lists]);

  //- verifica o price
  // useEffect(() => {
  //   if (quantity) {
  //     if (isEditItem === false) {
  //       setPrice(0.0);
  //     }
  //   }
  // }, [quantity, isEditItem]);

  //- calcula total do item
  // useEffect(() => {
  //   if (price) {
  //     let convertedPrice = dotToComma(price);
  //     setTotalItem(convertedPrice * quantity);
  //   } else {
  //     setTotalItem(0);
  //   }
  // }, [price, quantity]);

  // - Calcula o total da lista
  // useEffect(() => {
  //   const totalPrice = ShoppingList.items.reduce((sum, listItems) => {
  //     return sum + listItems.totalItem;
  //   }, 0);
  //   setShoppingList(
  //     (old) =>
  //       (old = {
  //         ...old,
  //         total: totalPrice,
  //       })
  //   );
  // }, [ShoppingList]);

  //- deleta um item
  const deletItem = (id: number) => {
    const newlist = ShoppingList.items.filter((item) => item.id !== id);

    const totalPrice = ShoppingList.items.reduce(
      (sum: number, listItems: ListItemProps) => {
        if (listItems.id !== id) {
          return sum + listItems.total;
        } else {
          return sum;
        }
      },
      0
    );
    console.log('total', totalPrice);

    setShoppingList(
      (old) =>
        (old = {
          ...old,
          items: newlist,
          total: totalPrice,
        })
    );
  };

  //- verifica se item não esta com nome e quantidade vazio
  const validateItem = (item: ListItemProps): boolean => {
    let result: boolean = true;
    if (item.name == '' || item.quantity <= 0) {
      result = false;
    }

    return result;
  };

  //- marca se foi comprado
  const onPurchased = (id: number) => {
    const newList: ListItemProps[] = ShoppingList.items.map((item) => {
      if (item.id === id) {
        item.purchased = !item.purchased;
      }
      return item;
    });

    setShoppingList((old) => (old = { ...ShoppingList, items: newList }));
  };

  const saveEditedItem = () => {
    const newList: ListItemProps[] = ShoppingList.items.map((item) => {
      if (item.id === ItemList.id) {
        item.name = ItemList.name;
        item.quantity = commaToDot(ItemQuantity);
        item.price = commaToDot(ItemPrice);
        item.unit = ItemList.unit;
        item.total = item.quantity * item.price;
      }
      return item;
    });

    setShoppingList((old) => (old = { ...ShoppingList, items: newList }));
    CloseModalItem();
  };

  const editItem = (id: number) => {
    ShoppingList.items.map((item: ListItemProps) => {
      if (item.id === id) {
        const unitValue = UnitMeansure.find((u) => u.value === item.unit);
        setItemQuantity(dotToComma(item.quantity));
        setItemPrice(dotToComma(item.price));
        // setDropdownValue(unitValue);
        setItemList(
          (old) =>
            (old = {
              id: item.id,
              name: item.name,
              quantity: item.quantity,
              price: item.price,
              purchased: item.purchased,
              total: item.total,
              unit: item.unit,
            })
        );
      }
    });
    OpenModalItem();
  };

  //- Salva a lista completa
  const saveList = async () => {
    setisLoading(false);
    let editedLists: ShoppingListsProps[] = StoredShoppingList.map(
      (editedList: ShoppingListsProps) => {
        if (editedList.id === ShoppingList.id) {
          editedList = ShoppingList;
        }
        return editedList;
      }
    );

    setStoredShoppingList(editedLists);
    await AsyncStorage.setItem(SHOPPING_LIST_KEY, JSON.stringify(editedLists));
    Alert.alert('', 'Lista salva com sucesso!', [
      { text: 'Continuar editando' },
      {
        text: 'Sair',
        onPress: () => router.navigate('/'),
        style: 'cancel',
      },
    ]);
  };

  return (
    <>
      <Header previous />

      <View style={styles.container}>
        <Text style={styles.title}> {ShoppingList.name} </Text>

        <View style={styles.headerTitle}>
          <View
            style={{
              width: '75%',
              flexDirection: 'row',
            }}
          >
            <Text style={[styles.TextHeader, { width: '25%', marginLeft: 12 }]}>
              Item
            </Text>
            <Text style={[styles.TextHeader, { width: '15%' }]}>Qtd.</Text>
            <Text
              style={[styles.TextHeader, { width: '30%', textAlign: 'center' }]}
            >
              Preço
            </Text>
            <Text
              style={[styles.TextHeader, { width: '25%', textAlign: 'center' }]}
            >
              Total
            </Text>
          </View>
          <Text
            style={[styles.TextHeader, { width: '25%', textAlign: 'center' }]}
          >
            Ações
          </Text>
        </View>
        <SafeAreaView style={styles.container}>
          <TouchableOpacity
            onPress={OpenModalItem}
            style={styles.containerAddItem}
          >
            <Text
              style={[
                styles.TextHeader,
                {
                  marginRight: theme.spacing.xl,
                  color: theme.colors.gray[600],
                },
              ]}
            >
              Adicionar item
            </Text>
            <MaterialCommunityIcons
              name={'plus-circle-outline'}
              size={30}
              color={theme.colors.gray[600]}
            />
          </TouchableOpacity>

          <ListContainer
            data={ShoppingList.items}
            ItemListComp={ListItem}
            deleteList={deletItem}
            handlePurchasedItem={onPurchased}
            editList={editItem}
          />
        </SafeAreaView>

        <View style={[styles.headerTitle, { justifyContent: 'space-between' }]}>
          <Text style={styles.TextHeader}>Total:</Text>

          <Text style={styles.TextHeader}>
            {formatPrice(ShoppingList.total)}
          </Text>
        </View>

        <View>
          <Button
            label='SALVAR LISTA'
            backgroundColor={theme.colors.blue}
            labelColor={theme.colors.light}
            onPress={saveList}
            icon={
              isLoading ? (
                <ActivityIndicator color={theme.colors.light} />
              ) : (
                <MaterialCommunityIcons
                  name={'send'}
                  size={30}
                  color={theme.colors.light}
                />
              )
            }
          />
        </View>
      </View>

      <AddItemComp ref={bottomSheetRef} onClose={CloseModalItem}>
        <View style={{ flex: 1, gap: 10, paddingHorizontal: 15 }}>
          <View style={styles.containerItem}>
            <View style={styles.containerInput}>
              <View style={styles.labelInput}>
                <Text style={styles.labelText}>Nome do Item</Text>
              </View>
              <InputCustom
                placeholder='Nome do Item'
                textValue={ItemList.name}
                onChange={(e) => {
                  setItemList(
                    (old) => (old = { ...ItemList, name: String(e) })
                  );
                }}
              />
            </View>
            <View style={styles.containerInput}>
              <View style={styles.labelInput}>
                <Text style={styles.labelText}>Quantidade do Item</Text>
              </View>
              <InputCustom
                placeholder='Quantidade do Item'
                inputType='numeric'
                textValue={ItemQuantity}
                onChange={(e) => setItemQuantity(e)}
              />
            </View>
          </View>
          <View style={styles.containerItem}>
            <View style={styles.containerInput}>
              <View style={styles.labelInput}>
                <Text style={styles.labelText}>Preço do Item(R$)</Text>
              </View>
              <InputCustom
                placeholder='Preço do Item'
                inputType='decimal-pad'
                textValue={ItemPrice}
                onChange={(e) => setItemPrice(e)}
                onBlur={() => {
                  setItemList(
                    (old) => (old = { ...ItemList, price: Number(ItemPrice) })
                  );
                }}
              />
            </View>

            <View style={styles.containerInput}>
              <View style={styles.labelInput}>
                <Text style={styles.labelText}>Preço do Item</Text>
              </View>
              <Dropdown
                style={[
                  styles.dropdown,
                  isFocusDropdown && { borderColor: theme.colors.gray[700] },
                ]}
                placeholderStyle={[
                  styles.placeholderStyle,
                  !isFocusDropdown
                    ? { color: theme.colors.light }
                    : { color: theme.colors.gray[700] },
                ]}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={UnitMeansure}
                maxHeight={300}
                labelField='label'
                valueField='value'
                placeholder={
                  !isFocusDropdown ? String(dropdownValue.value) : '...'
                }
                value={dropdownValue}
                onFocus={() => setIsFocusDropdown(true)}
                onBlur={() => setIsFocusDropdown(false)}
                onChange={(item) => {
                  setDropdownValue(item);
                  setIsFocusDropdown(false);
                }}
                renderLeftIcon={() => (
                  <MaterialCommunityIcons
                    style={styles.icon}
                    color={
                      isFocusDropdown
                        ? theme.colors.gray[700]
                        : theme.colors.light
                    }
                    name='chevron-down'
                    size={20}
                  />
                )}
              />
            </View>
          </View>
          <Button
            label='ADICIONAR ITEM'
            backgroundColor={theme.colors.dark}
            labelColor={theme.colors.light}
            borderRadius={5}
            width={'103%'}
            onPress={saveItem}
            icon={
              // loading ? (
              //   <ActivityIndicator color={theme.colors.light} />
              // ) : (
              <MaterialCommunityIcons
                name={'send'}
                size={30}
                color={theme.colors.light}
              />
              // )
            }
          />
        </View>
      </AddItemComp>
    </>
  );
};

export default List;

