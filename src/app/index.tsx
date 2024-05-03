import Button from '@/components/Button';
import Header from '@/components/Header';
import InputCustom from '@/components/InputCustom';
import { List } from '@/components/List';
import ShoppingLists from '@/components/ShoppingLists';
import useShoppingList from '@/hooks/useShoppingList';
import { mmkvStorage } from '@/services/mmkvService';
import { initializeStorageService } from '@/services/storageServices';
import { theme } from '@/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';

const Home: React.FC = () => {
  const { getShoppingLists } = useShoppingList();
  const [shoppingList, setShoppingList] = useState<ShoppingListsProps[]>([]);

  useEffect(() => {
    initializeStorageService(mmkvStorage);
    // setShoppingList(getShoppingLists);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Header />
      <List data={shoppingList} ItemListComp={ShoppingLists} />
      <InputCustom />
      <Button
        label='NOVA LISTA'
        backgroundColor={theme.colors.blue}
        labelColor={theme.colors.light}
        icon={
          <MaterialCommunityIcons
            name={'file-check'}
            size={30}
            color={theme.colors.light}
          />
        }
      />
    </View>
  );
};

export default Home;

