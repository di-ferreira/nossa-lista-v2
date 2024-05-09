import { theme } from '@/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import BottomSheet from '@gorhom/bottom-sheet';
import React, { forwardRef } from 'react';
import { View } from 'react-native';
import { styles } from './styles';

interface iAddItemComp {
  children?: React.ReactElement;
  onClose: () => void;
}

const AddItemComp = forwardRef<BottomSheet, iAddItemComp>(
  ({ onClose, children }, ref) => {
    return (
      <BottomSheet
        ref={ref}
        index={0}
        snapPoints={[0.01, 250]}
        backgroundStyle={styles.container}
        handleComponent={() => null}
      >
        <View style={styles.content}>
          <View style={styles.header}>
            <MaterialCommunityIcons
              onPress={onClose}
              name={'close'}
              size={30}
              color={theme.colors.dark}
            />
          </View>
          {children}
        </View>
      </BottomSheet>
    );
  }
);

export default AddItemComp;

