import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useColorScheme } from '@/hooks/useColorScheme';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const [hasVisited, setHasVisited] = useState(false);
  const [checkingVisit, setCheckingVisit] = useState(true);

  useEffect(() => {
    const checkVisit = async () => {
      const name = await AsyncStorage.getItem('@user_name');
      setHasVisited(!!name);
      setCheckingVisit(false);
    };
    checkVisit();
  }, []);

  useEffect(() => {
    if (loaded && !checkingVisit) {
      SplashScreen.hideAsync();
    }
  }, [loaded, checkingVisit]);

  if (!loaded || checkingVisit) {
    return null; // Optional: Add a custom loading indicator here
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        {!hasVisited && <Stack.Screen name="LandingScreen" />}
        <Stack.Screen name="(tabs src)" />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
