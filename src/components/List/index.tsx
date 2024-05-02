import React from 'react';
import { FlatList, View } from 'react-native';
import { styles } from './styles';

interface iListProps<T> {
  data: T[];
  ItemListComp: React.FC<{ item: T }>;
}

export const List = <T extends object>({
  data,
  ItemListComp,
}: iListProps<T>) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => <ItemListComp item={item} />}
      />
    </View>
  );
};

