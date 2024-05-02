import Button from '@/components/Button';
import Header from '@/components/Header';
import InputCustom from '@/components/InputCustom';
import { List } from '@/components/List';
import ShoppingLists from '@/components/ShoppingLists';
import { theme } from '@/theme';
import { ShoppingList } from '@/utils/List';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { View } from 'react-native';

const Home: React.FC = () => {
  return (
    <View style={{ flex: 1 }}>
      <Header />
      <List data={ShoppingList} ItemListComp={ShoppingLists} />
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

