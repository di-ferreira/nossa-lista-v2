import { theme } from '@/theme';
import { currencyFormat } from '@/utils/format';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { ListItemProps } from './listItem';
import { styles } from './styles';

interface props {
  item: ListItemProps;
  handleListDelete: (id: number) => void;
  handleListEdit: (id: number) => void;
}

const ListItem: React.FC<props> = ({
  item,
  handleListDelete,
  handleListEdit,
}) => {
  const { id, name, price, purchased, quantity, unit } = item;

  return (
    <View style={styles.container}>
      <View style={[styles.stroke, purchased && { display: 'none' }]} />
      <View style={[styles.column, { width: '75%' }]}>
        <Text>{name}</Text>

        <Text>
          {quantity}
          {unit}
        </Text>

        <Text>
          {currencyFormat(price)}/{unit}
        </Text>
        <Text>{currencyFormat(quantity * price)}</Text>
      </View>

      <View style={[styles.column, { width: '25%' }]}>
        <TouchableOpacity
          style={[styles.buttons, { backgroundColor: theme.colors.warn.main }]}
          onPress={() => handleListEdit(id)}
        >
          <MaterialIcons
            name='edit'
            size={theme.fontSize.lg}
            color={theme.colors.light}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.buttons,
            { backgroundColor: theme.colors.danger.main },
          ]}
          onPress={() => handleListDelete(id)}
        >
          <MaterialCommunityIcons
            name='trash-can'
            size={theme.fontSize.lg}
            color={theme.colors.light}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ListItem;

