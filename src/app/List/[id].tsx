import AddItemComp from '@/components/AddItemComp';
import Button from '@/components/Button';
import Header from '@/components/Header';
import InputCustom from '@/components/InputCustom';
import { List as ListContainer } from '@/components/List';
import ListItem from '@/components/ListItem';
import { ListItemProps } from '@/components/ListItem/listItem';
import { theme } from '@/theme';
import { SHOPPING_LIST_KEY } from '@/utils/consts';
import { currencyFormat } from '@/utils/format';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import BottomSheet from '@gorhom/bottom-sheet';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams } from 'expo-router';
import { DropdownData } from 'expo-select-dropdown';
import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';

const List: React.FC = () => {
  const { id } = useLocalSearchParams();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [ShoppingList, setShoppingList] = useState<ShoppingListsProps>({
    id: 0,
    name: '',
    items: [],
    total: 0,
  });

  const [ItemList, setItemList] = useState<ListItemProps>();
  const [selected, setSelected] = useState<DropdownData<string, string> | null>(
    null
  );
  const [dataDropdown, _] = useState<DropdownData<string, string>[]>([]);

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
    bottomSheetRef.current?.expand();
  };

  const CloseModalItem = () => {
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
      </View>
      <AddItemComp ref={bottomSheetRef} onClose={CloseModalItem}>
        <View>
          <InputCustom />
          {/* <SelectDropdown
            data={dataDropdown}
            placeholder={'Select option'}
            selected={selected}
            setSelected={setSelected}
            searchOptions={{ cursorColor: '#007bff' }}
            searchBoxStyles={{ borderColor: '#007bff' }}
            dropdownStyles={{ borderColor: '#007bff' }}
          /> */}
        </View>
      </AddItemComp>
    </>
  );
};

export default List;

