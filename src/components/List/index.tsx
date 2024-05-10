import React from 'react';
import { FlatList, View } from 'react-native';
import { styles } from './styles';

interface iItemProps<T> {
  item: T;
  handleListDelete: (id: number) => void;
  handleListEdit: (id: number) => void;
  handlePurchasedItem?: (id: number) => void;
}
interface iListProps<T> {
  data: T[];
  ItemListComp: React.FC<iItemProps<T>>;
  editList: (id: number) => void;
  deleteList: (id: number) => void;
  handlePurchasedItem?: (id: number) => void;
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

