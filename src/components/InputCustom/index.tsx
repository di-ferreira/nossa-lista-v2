import React from 'react';
import { Text, TextInput, View } from 'react-native';

import { styles } from './styles';

interface InputCustomProps {
  label?: string;
}

const InputCustom: React.FC<InputCustomProps> = ({ label }) => {
  return (
    <View style={styles.container}>
      {label && <Text>{label}</Text>}
      <TextInput placeholder='Nova Lista' />
    </View>
  );
};

export default InputCustom;

