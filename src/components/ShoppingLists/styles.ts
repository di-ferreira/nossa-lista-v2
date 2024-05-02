import { theme } from '@/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 35,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 30,
    marginTop: 10,
    marginBottom: 10,
    borderBottomColor: theme.colors.dark,
    borderBottomWidth: 1,
  },
  containerText: {
    flexDirection: 'row',
    width: '70%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    fontSize: theme.fontSize.lg,
  },
  title: {
    fontFamily: theme.fontFamily.lemonada.semibold,
    fontSize: theme.fontSize.sm,
    width: '55%',
  },
  price: {
    fontFamily: theme.fontFamily.lemonada.regular,
    fontSize: theme.fontSize.sm,
    width: '45%',
  },
  containerIcon: {
    height: '100%',
    flexDirection: 'row',
    width: '40%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
});

