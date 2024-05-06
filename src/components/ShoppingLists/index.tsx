import Icon from '@/components/Icon';
import { theme } from '@/theme';
import { currencyFormat } from '@/utils/format';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
interface props {
  item: ShoppingListsProps;
  handleListDelete: (id: number) => void;
  handleListEdit: (id: number) => void;
}

const ShoppingLists: React.FC<props> = ({
  item,
  handleListDelete,
  handleListEdit,
}) => {
  const { id, name, total } = item;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.containerText}
        onPress={() => handleListEdit(id)}
      >
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.price}> {currencyFormat(total)}</Text>
      </TouchableOpacity>

      <View style={styles.containerIcon}>
        <Icon
          onPress={() => handleListDelete(id)}
          width={30}
          height={30}
          backgroundColor={theme.colors.red}
        >
          <MaterialCommunityIcons
            name={'delete'}
            size={20}
            color={theme.colors.light}
          />
        </Icon>
      </View>
    </View>
  );
};

export default ShoppingLists;

