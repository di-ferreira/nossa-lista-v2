import { theme } from '@/theme';
import { dotToComma, formatPrice } from '@/utils/format';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
import { ListItemProps } from './types';

interface props {
  item: ListItemProps;
  handleListDelete: (id: string) => void;
  handleListEdit: (id: string) => void;
  handlePurchasedItem?: (item: ListItemProps) => void;
}

const ListItem: React.FC<props> = ({
  item,
  handleListDelete,
  handleListEdit,
  handlePurchasedItem,
}) => {
  const { id, name, price, purchased, quantity, unit } = item;

  return (
    <View style={styles.container}>
      <View style={[styles.stroke, !purchased && { display: 'none' }]} />
      <TouchableOpacity
        style={[styles.column, { width: '75%' }]}
        onPress={() => handlePurchasedItem && handlePurchasedItem(item)}
      >
        <Text>{name}</Text>

        <Text>
          {dotToComma(quantity)}
          {unit}
        </Text>

        <Text>
          {formatPrice(price)}/{unit}
        </Text>
        <Text>{formatPrice(quantity * price)}</Text>
      </TouchableOpacity>

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

