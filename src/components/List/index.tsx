import React from 'react';
import { FlatList, View } from 'react-native';
import { styles } from './styles';

interface iItemProps<T> {
  item: T;
  handleListDelete: (id: string) => void;
  handleListEdit: (id: string) => void;
  handlePurchasedItem?: (item: T) => void;
}
interface iListProps<T> {
  data: T[];
  ItemListComp: React.FC<iItemProps<T>>;
  editList: (id: string) => void;
  deleteList: (id: string) => void;
  handlePurchasedItem?: (item: T) => void;
}

export const List = <T extends object>({
  data,
  ItemListComp,
  deleteList,
  editList,
  handlePurchasedItem,
}: iListProps<T>) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <ItemListComp
            item={item}
            handleListDelete={deleteList}
            handleListEdit={editList}
            handlePurchasedItem={handlePurchasedItem}
          />
        )}
      />
    </View>
  );
};

