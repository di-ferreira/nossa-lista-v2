import { theme } from '@/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
    height: 45,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 15,
  },
  buttonText: {
    fontFamily: theme.fontFamily.lemonada.bold,
    textTransform: 'uppercase',
  },
});

