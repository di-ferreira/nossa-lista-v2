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
  containerAddItem: {
    width: '100%',
    height: theme.spacing.lg,
    flexDirection: 'row',
    marginTop: theme.spacing.xs,
    paddingHorizontal: theme.spacing.md,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  containerItem: {
    flexDirection: 'row',
    width: '100%',
    height: 55,
    gap: 15,
    paddingVertical: 15,
  },
  containerInput: {
    height: 40,
    borderWidth: 0.5,
    borderColor: theme.colors.light,
    borderRadius: 8,
    width: '50%',
    position: 'relative',
  },
  labelInput: {
    position: 'absolute',
    top: -22,
  },
  labelText: {
    fontFamily: theme.fontFamily.lemonada.semibold,
    fontSize: theme.fontSize.xs,
    color: theme.colors.light,
  },
  dropdown: {
    width: '100%',
    height: 40,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

