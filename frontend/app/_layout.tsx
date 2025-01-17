import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import "./globals.css"
import { ApolloProvider } from '@apollo/client';
import client from '../lib/apolloClient';


SplashScreen.preventAutoHideAsync();


export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
      <ApolloProvider client={client}>
        <Stack screenOptions={{ headerShown: false }} />
      </ApolloProvider>
  );
}
