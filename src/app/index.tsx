// import { List } from '@/components/List';
import Button from '@/components/Button';
import Header from '@/components/Header';
import InputCustom from '@/components/InputCustom';
import { List } from '@/components/List';
import ShoppingLists from '@/components/ShoppingLists';
import {
  DeleteList,
  GetLists,
  NewList,
} from '@/features/shoppingList/ShoppingList.thunk';
import { useAppDispatch, useAppSelector } from '@/hooks/useAppSelector';
import { theme } from '@/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, View } from 'react-native';

const Home: React.FC = () => {
  const [shopping, setShopping] = useState<ShoppingListsProps>({
    id: '',
    name: '',
    items: [],
    total: 0,
  });
  const dispatch = useAppDispatch();
  const { ListsShopping, isLoading, errorMessage } = useAppSelector(
    (state) => state.shoppingList
  );

  const handleLists = async () => {
    await dispatch(GetLists());
  };

  const createNewList = async () => {
    await dispatch(NewList(shopping));
    setShopping({
      id: '',
      name: '',
      items: [],
      total: 0,
    });
  };

  const handleError = () => {
    if (errorMessage !== '') {
      Alert.alert('', errorMessage, [{ text: 'OK' }]);
    }
  };

  const handleListDelete = async (idList: string) => {
    await dispatch(DeleteList(idList));
  };

  const handleListEdit = (idList: string) => {
    router.navigate({ params: { idList }, pathname: '/List/[idList]' });
  };

  useEffect(() => {
    handleLists();
  }, []);

  useEffect(() => {
    handleError();
  }, [errorMessage]);

  return (
    <View style={{ flex: 1 }}>
      <Header />
      <List
        data={ListsShopping}
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
          isLoading ? (
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

