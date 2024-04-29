import React from 'react';

import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Image, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { styles } from './styles';

interface HeaderProps {
  previous?: boolean;
}

function Header({ previous = false }: HeaderProps) {
  const handlePreviuosPress = () => {
    router.replace('/');
  };
  return (
    <View style={styles.container}>
      {previous && (
        <TouchableOpacity
          onPress={handlePreviuosPress}
          style={styles.backButton}
        >
          <MaterialIcons name='keyboard-backspace' size={30} />
        </TouchableOpacity>
      )}
      <Image
        source={require('../../assets/images/logo.png')}
        style={styles.logo}
      />
    </View>
  );
}

export default Header;

