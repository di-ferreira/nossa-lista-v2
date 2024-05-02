import React from 'react';
import { TouchableOpacity } from 'react-native';

import { styles } from './styles';

interface IconProp {
  width: number;
  height: number;
  backgroundColor: string;
  children: React.ReactNode;
  onPress?: () => void;
}

const Icon: React.FC<IconProp> = ({
  width,
  height,
  backgroundColor,
  children,
  onPress,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress && onPress}
      style={[styles.container, { width, height, backgroundColor }]}
    >
      {children}
    </TouchableOpacity>
  );
};

export default Icon;

