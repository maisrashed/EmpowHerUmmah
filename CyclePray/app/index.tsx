import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator, View } from 'react-native';

export default function Index() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkFirstLaunch = async () => {
      try {
        const hasLaunched = await AsyncStorage.getItem('@has_launched_before');
        if (hasLaunched === 'true') {
          router.replace('/(tabs src)/home');
        } else {
          router.replace('/landing'); 
        }
      } catch (error) {
        console.error('Error checking first launch:', error);
      } finally {
        setLoading(false);
      }
    };

    checkFirstLaunch();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
    </View>
  );
}
