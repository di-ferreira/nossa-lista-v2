import { theme } from '@/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    width: '100%',
    textAlign: 'center',
    fontSize: theme.fontSize.lg,
    fontFamily: theme.fontFamily.lemonada.bold,
    marginVertical: theme.spacing.xs,
  },
  headerTitle: {
    width: '100%',
    flexDirection: 'row',
    height: theme.spacing.lg,
    alignItems: 'center',
    borderBottomColor: theme.colors.dark,
    borderBottomWidth: 2,
    padding: theme.spacing.xs,
  },
  TextHeader: {
    fontFamily: theme.fontFamily.roboto.bold,
    fontSize: theme.fontSize.md,
    color: theme.colors.dark,
  },
});

