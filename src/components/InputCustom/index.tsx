import React from 'react';
import { KeyboardTypeOptions, Text, TextInput, View } from 'react-native';

import { styles } from './styles';

interface InputCustomProps {
  label?: string;
  placeholder?: string;
  textValue?: string;
  inputType?: KeyboardTypeOptions;
  onChange?: (text: string) => void;
}

const InputCustom: React.FC<InputCustomProps> = ({
  label,
  placeholder,
  textValue,
  onChange,
  inputType,
}) => {
  return (
    <View style={styles.container}>
      {label && <Text>{label}</Text>}
      <TextInput
        value={textValue}
        placeholder={placeholder}
        onChangeText={onChange}
        keyboardType={inputType ? inputType : 'default'}
      />
    </View>
  );
};

export default InputCustom;

