import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { styles } from './styles';
interface ButtonProps {
  label?: string;
  icon?: React.ReactNode;
  labelColor?: string;
  backgroundColor?: string;
  onPress?: () => void;
}
const Button: React.FC<ButtonProps> = ({
  label,
  icon,
  labelColor,
  backgroundColor,
  onPress,
}) => {
  return (
    <View style={[styles.container, { backgroundColor }]}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={[styles.buttonText, { color: labelColor }]}>
          {label && label}
        </Text>
        {icon && icon}
      </TouchableOpacity>
    </View>
  );
};

export default Button;

