import Header from '@/components/Header';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';

const List: React.FC = () => {
  const { id } = useLocalSearchParams();
  return (
    <>
      <Header previous />
      <View>
        <Text>Id:{id}</Text>
      </View>
    </>
  );
};

export default List;

