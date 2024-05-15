// import { List } from '@/components/List';
import Button from '@/components/Button';
import Header from '@/components/Header';
import InputCustom from '@/components/InputCustom';
import { List } from '@/components/List';
import ShoppingLists from '@/components/ShoppingLists';
import { theme } from '@/theme';
import { SHOPPING_LIST_KEY } from '@/utils/consts';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, View } from 'react-native';

const Home: React.FC = () => {
  const [shoppingList, setShoppingList] = useState<ShoppingListsProps[]>([]);
  const [shopping, setShopping] = useState<ShoppingListsProps>({
    id: 0,
    name: '',
    items: [],
    total: 0,
  });
  const [loading, setLoading] = useState<boolean>(false);

  const handleLists = () => {
    AsyncStorage.getItem(SHOPPING_LIST_KEY).then((data) => {
      if (data) {
        const storedLists = JSON.parse(data);
        setShoppingList((old) => {
          return storedLists;
        });
      }
    });
  };

  const isValid = () => {
    let listTitle = '';

    shoppingList.map((list) => {
      if (list.name === shopping.name) {
        listTitle = list.name;
      }
    });

    if (shopping.name !== undefined && shopping.name !== '') {
      if (listTitle !== shopping.name) {
        return true;
      }
    }
    return false;
  };

  const createNewList = async () => {
    if (isValid()) {
      setLoading(true);
      let id = shoppingList.length + 1;

      shoppingList.map((item) => {
        if (item.id === id) {
          let newId = item.id + 1;
          id = newId;
          setShopping((old) => (old = { ...shopping, id: newId }));
        }
      });

      const newShopping = {
        ...shopping,
        id: id,
      };

      setShoppingList((old) => (old = [...shoppingList, newShopping]));

      await AsyncStorage.setItem(
        SHOPPING_LIST_KEY,
        JSON.stringify([...shoppingList, newShopping])
      );

      router.navigate({
        params: { idList: newShopping.id },
        pathname: '/List/[idList]',
      });

      setLoading(false);
      setShopping({
        id: 0,
        name: '',
        items: [],
        total: 0,
      });
    } else if (shopping.name && !isValid()) {
      Alert.alert('', 'Já existe uma lista com esse nome.', [{ text: 'OK' }]);
    } else {
      Alert.alert('', 'Por favor insira um nome para a lista.', [
        { text: 'OK' },
      ]);
    }
  };

  const handleListDelete = async (idList: number) => {
    console.log(idList);

    let newLists = shoppingList.filter((list) => list.id !== idList);
    await AsyncStorage.setItem(SHOPPING_LIST_KEY, JSON.stringify(newLists));
    setShoppingList(newLists);
  };

  const handleListEdit = (idList: number) => {
    router.navigate({ params: { idList }, pathname: '/List/[idList]' });
  };

  useEffect(() => {
    handleLists();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Header />
      <List
        data={shoppingList}
        ItemListComp={ShoppingLists}
        deleteList={handleListDelete}
        editList={handleListEdit}
      />
      <InputCustom
        placeholder='Nome da lista'
        onChange={(text) => {
          setShopping({ ...shopping, name: text });
        }}
        textValue={shopping.name}
      />

      <Button
        label='NOVA LISTA'
        backgroundColor={theme.colors.blue}
        labelColor={theme.colors.light}
        onPress={createNewList}
        icon={
          loading ? (
            <ActivityIndicator color={theme.colors.light} />
          ) : (
            <MaterialCommunityIcons
              name={'file-check'}
              size={30}
              color={theme.colors.light}
            />
          )
        }
      />
    </View>
  );
};

export default Home;

