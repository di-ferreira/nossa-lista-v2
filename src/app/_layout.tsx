import {
  Lemonada_300Light,
  Lemonada_400Regular,
  Lemonada_500Medium,
  Lemonada_600SemiBold,
  Lemonada_700Bold,
} from '@expo-google-fonts/lemonada';
import {
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto';
import { useFonts } from 'expo-font';
import { Slot } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function Layout() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
    Lemonada_300Light,
    Lemonada_400Regular,
    Lemonada_500Medium,
    Lemonada_600SemiBold,
    Lemonada_700Bold,
  });

  if (fontsLoaded) {
    SplashScreen.hideAsync();
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar barStyle='dark-content' />
      {fontsLoaded && <Slot />}
    </GestureHandlerRootView>
  );
}

