import React from 'react';
import { Text, TextInput, View } from 'react-native';

import { styles } from './styles';

interface InputCustomProps {
  label?: string;
  placeholder?: string;
  textValue?: string;
  onChange?: (text: string) => void;
}

const InputCustom: React.FC<InputCustomProps> = ({
  label,
  placeholder,
  textValue,
  onChange,
}) => {
  return (
    <View style={styles.container}>
      {label && <Text>{label}</Text>}
      <TextInput
        value={textValue}
        placeholder={placeholder}
        onChangeText={onChange}
      />
    </View>
  );
};

export default InputCustom;

