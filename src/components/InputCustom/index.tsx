import React from 'react';
import {
  KeyboardTypeOptions,
  NativeSyntheticEvent,
  Text,
  TextInput,
  TextInputFocusEventData,
  View,
} from 'react-native';

import { styles } from './styles';

interface InputCustomProps {
  label?: string;
  placeholder?: string;
  textValue?: string;
  inputType?: KeyboardTypeOptions;
  onChange?: (text: string) => void;
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  onFocus?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
}

const InputCustom: React.FC<InputCustomProps> = ({
  label,
  placeholder,
  textValue,
  onChange,
  onBlur,
  onFocus,
  inputType,
}) => {
  return (
    <View style={styles.container}>
      {label && <Text>{label}</Text>}
      <TextInput
        value={textValue}
        placeholder={placeholder}
        onChangeText={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        keyboardType={inputType ? inputType : 'default'}
      />
    </View>
  );
};

export default InputCustom;

