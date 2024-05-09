import AddItemComp from '@/components/AddItemComp';
import Button from '@/components/Button';
import Header from '@/components/Header';
import InputCustom from '@/components/InputCustom';
import { List as ListContainer } from '@/components/List';
import ListItem from '@/components/ListItem';
import {
  ListItemProps,
  tUnitMeansure,
  UnitMeansure,
} from '@/components/ListItem/types';
import { theme } from '@/theme';
import { SHOPPING_LIST_KEY } from '@/utils/consts';
import { currencyFormat } from '@/utils/format';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import BottomSheet from '@gorhom/bottom-sheet';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { styles } from './styles';

interface iDropdown {
  label: keyof tUnitMeansure;
  value: tUnitMeansure;
}
const List: React.FC = () => {
  const { id } = useLocalSearchParams();
  const ItemListInitial = {
    id: 0,
    name: '',
    price: 0,
    purchased: false,
    quantity: 0,
    total: 0,
    unit: UnitMeansure[2].value,
  };

  const bottomSheetRef = useRef<BottomSheet>(null);
  const [ShoppingList, setShoppingList] = useState<ShoppingListsProps>({
    id: 0,
    name: '',
    items: [],
    total: 0,
  });

  const [dropdownValue, setDropdownValue] = useState<iDropdown>(
    UnitMeansure[2]
  );
  const [isLoading, setisLoading] = useState<boolean>(false);
  const [isFocusDropdown, setIsFocusDropdown] = useState<boolean>(false);

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
      }
    });
  };

  const AddItem = () => {};

  const OpenModalItem = () => {
    setItemList(ItemListInitial);
    bottomSheetRef.current?.expand();
  };

  const CloseModalItem = () => {
    setItemList(ItemListInitial);
    bottomSheetRef.current?.close();
  };

  useEffect(() => {
    handleLists();
  }, []);

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
            deleteList={() => {}}
            editList={() => {}}
          />
        </SafeAreaView>

        <View style={[styles.headerTitle, { justifyContent: 'space-between' }]}>
          <Text style={styles.TextHeader}>Total:</Text>

          <Text style={styles.TextHeader}>
            {currencyFormat(ShoppingList.total)}
          </Text>
        </View>

        <View>
          <Button
            label='SALVAR LISTA'
            backgroundColor={theme.colors.blue}
            labelColor={theme.colors.light}
            onPress={() => {}}
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
                textValue={String(ItemList.quantity)}
                onChange={(e) => {
                  setItemList(
                    (old) => (old = { ...ItemList, quantity: Number(e) })
                  );
                }}
              />
            </View>
          </View>
          <View style={styles.containerItem}>
            <View style={styles.containerInput}>
              <View style={styles.labelInput}>
                <Text style={styles.labelText}>Preço do Item</Text>
              </View>
              <InputCustom
                placeholder='Preço do Item'
                inputType='decimal-pad'
                textValue={String(ItemList.price)}
                onChange={(e) => {
                  setItemList(
                    (old) => (old = { ...ItemList, quantity: Number(e) })
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
            onPress={AddItem}
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

