import { theme } from '@/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: theme.spacing.lg,
    flexDirection: 'row',
    marginTop: theme.spacing.xs,
  },
  column: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.md,
  },
  buttons: {
    width: 30,
    height: 30,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stroke: {
    position: 'absolute',
    top: '25%',
    left: '2%',
    width: '90%',
    height: 1,
    backgroundColor: theme.colors.gray[800],
  },
});

