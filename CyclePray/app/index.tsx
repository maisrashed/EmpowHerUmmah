// app/index.tsx
import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator, View } from 'react-native';

export default function Index() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkVisited = async () => {
      const name = await AsyncStorage.getItem('@user_name');

      if (name) {
        router.replace('/(tabs src)/home'); // or your preferred default tab
      } else {
        router.replace('/LandingScreen');
      }

      setLoading(false);
    };

    checkVisited();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
    </View>
  );
}
