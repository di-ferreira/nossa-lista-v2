import { theme } from '@/theme';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { ListItemProps } from './listItem';

const ListItem: React.FC<ListItemProps> = ({
  id,
  name,
  price,
  purchased,
  quantity,
  unit,
}) => {
  return (
    <View>
      <View />
      <View>
        <View />
        <View>
          <Text>{name}</Text>

          <Text>{quantity}</Text>

          <Text>{price}</Text>
        </View>

        <View>
          <TouchableOpacity onPress={() => {}}>
            <MaterialIcons
              name='edit'
              size={theme.fontSize.lg}
              color={theme.colors.light}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {}}>
            <MaterialCommunityIcons
              name='trash-can'
              size={theme.fontSize.lg}
              color={theme.colors.light}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ListItem;

