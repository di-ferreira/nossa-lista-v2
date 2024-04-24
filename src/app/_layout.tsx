import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { Slot } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function Layout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('@/assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  if (loaded) {
    SplashScreen.hideAsync();
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar barStyle='light-content' />
      {loaded && <Slot />}
    </GestureHandlerRootView>
  );
}

