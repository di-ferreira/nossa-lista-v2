import { theme } from '@/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: theme.spacing.lg,
    paddingBottom: theme.spacing.md,
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.xs,
    height: 80,
    backgroundColor: theme.colors.light,
  },
  logo: {
    flex: 1,
    alignSelf: 'center',
    width: 150,
    height: 50,
    resizeMode: 'contain',
  },
  backButton: {
    width: 50,
    height: 50,
    marginRight: -25,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

