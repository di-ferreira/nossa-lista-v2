import React from 'react';
import { DimensionValue, Text, TouchableOpacity, View } from 'react-native';

import { styles } from './styles';
interface ButtonProps {
  label?: string;
  icon?: React.ReactNode;
  labelColor?: string;
  backgroundColor?: string;
  borderRadius?: number;
  width?: DimensionValue;
  onPress?: () => void;
}
const Button: React.FC<ButtonProps> = ({
  label,
  icon,
  labelColor,
  backgroundColor,
  borderRadius,
  width,
  onPress,
}) => {
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor,
          borderRadius: borderRadius ? borderRadius : 0,
          width: width && width,
        },
      ]}
    >
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

