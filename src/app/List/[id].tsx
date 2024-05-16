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
import {
  EditList,
  GetListByID,
} from '@/features/shoppingList/ShoppingList.thunk';
import { useAppDispatch, useAppSelector } from '@/hooks/useAppSelector';
import { theme } from '@/theme';
import { commaToDot, dotToComma, formatPrice } from '@/utils/format';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import BottomSheet from '@gorhom/bottom-sheet';
import { useLocalSearchParams } from 'expo-router';
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
    id: '',
    name: '',
    price: 0,
    purchased: false,
    quantity: 1,
    total: 0,
    unit: eUnitMeansure.KILO,
  };

  const dispatch = useAppDispatch();
  const { isLoading, errorMessage, CurrentList } = useAppSelector(
    (state) => state.shoppingList
  );

  const bottomSheetRef = useRef<BottomSheet>(null);

  const [dropdownValue, setDropdownValue] = useState<iDropdown>(
    UnitMeansure[2]
  );
  const [isFocusDropdown, setIsFocusDropdown] = useState<boolean>(false);
  const [ItemQuantity, setItemQuantity] = useState<string>('');
  const [ItemPrice, setItemPrice] = useState<string>('');

  const [ItemList, setItemList] = useState<ListItemProps>(ItemListInitial);

  const handleLists = () => {
    id && dispatch(GetListByID(id.toString()));
  };

  const handleError = () => {
    if (errorMessage !== '') {
      Alert.alert('', errorMessage, [{ text: 'OK' }]);
    }
  };

  useEffect(() => {
    handleError();
  }, [errorMessage]);

  const AddItem = () => {
    const price = commaToDot(ItemPrice);
    const quantity = commaToDot(ItemQuantity);

    const newItem: ListItemProps = {
      ...ItemList,
      quantity,
      price,
      unit: dropdownValue.value,
      purchased: false,
      total: price * quantity,
    };

    const newList: ShoppingListsProps = {
      ...CurrentList,
      items: [...CurrentList.items, newItem],
    };

    dispatch(EditList(newList));

    setItemList(ItemListInitial);
    CloseModalItem();
  };

  const saveEditedItem = async () => {
    const newListItems: ListItemProps[] = CurrentList.items.map((item) => {
      if (item.id === ItemList.id) {
        item.name = ItemList.name;
        item.quantity = commaToDot(ItemQuantity);
        item.price = commaToDot(ItemPrice);
        item.unit = ItemList.unit;
        item.total = item.quantity * item.price;
      }
      return item;
    });

    const newList: ShoppingListsProps = {
      ...CurrentList,
      items: newListItems,
    };

    await dispatch(EditList(newList));
    CloseModalItem();
  };

  const saveItem = () => {
    if (ItemList.id.trim() === '') AddItem();
    else saveEditedItem();
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

  const deletItem = async (id: string) => {
    const newListItems: ListItemProps[] = CurrentList.items.filter(
      (item) => item.id !== id
    );

    const newList: ShoppingListsProps = {
      ...CurrentList,
      items: newListItems,
    };

    await dispatch(EditList(newList));
  };

  const onPurchased = async (itemValue: ListItemProps) => {
    const newItem: ListItemProps = {
      ...itemValue,
      purchased: !itemValue.purchased,
    };

    const newListItems: ListItemProps[] = CurrentList.items.map(
      (item: ListItemProps) => {
        if (item.id === newItem.id) {
          item = newItem;
        }
        return item;
      }
    );

    const newList: ShoppingListsProps = {
      ...CurrentList,
      items: newListItems,
    };

    await dispatch(EditList(newList));
  };

  const editItem = (id: string) => {
    CurrentList.items.map((item: ListItemProps) => {
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

  return (
    <>
      <Header previous />

      <View style={styles.container}>
        <Text style={styles.title}> {CurrentList.name} </Text>

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
            data={CurrentList.items}
            ItemListComp={ListItem}
            deleteList={deletItem}
            handlePurchasedItem={onPurchased}
            editList={editItem}
          />
        </SafeAreaView>

        <View style={[styles.headerTitle, { justifyContent: 'space-between' }]}>
          <Text style={styles.TextHeader}>Total:</Text>

          <Text style={styles.TextHeader}>
            {formatPrice(CurrentList.total)}
          </Text>
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
      </AddItemComp>
    </>
  );
};

export default List;

