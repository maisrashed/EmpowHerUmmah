import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  SafeAreaView,
  Platform,
  ImageBackground,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

import {
  useFonts as usePlayfairFonts,
  PlayfairDisplay_700Bold,
} from '@expo-google-fonts/playfair-display';
import {
  useFonts as usePoppinsFonts,
  Poppins_400Regular,
} from '@expo-google-fonts/poppins';

const screenWidth = Dimensions.get('window').width;

export default function WorshipMenuScreen() {
  const router = useRouter();
  const [userName, setUserName] = useState('');

  const categories = [
    { label: 'Dhikr', emoji: '🕊️', route: '/worship/dhikr' },
    { label: "Du'as", emoji: '📿', route: '/worship/duas' },
    { label: 'Sahabiyat Stories', emoji: '🌸', route: '/worship/sahabiyat' },
    { label: "Qur'an Verses", emoji: '📖', route: '/worship/quran' },
    { label: 'Hadith', emoji: '🧠', route: '/worship/hadith' },
    { label: 'Salawat', emoji: '🌙', route: '/worship/salawat' },
  ];

  const [playfairLoaded] = usePlayfairFonts({ PlayfairDisplay_700Bold });
  const [poppinsLoaded] = usePoppinsFonts({ Poppins_400Regular });

  useEffect(() => {
    const fetchName = async () => {
      try {
        const name = await AsyncStorage.getItem('@user_name');
        if (name) setUserName(name);
      } catch (error) {
        console.error('Failed to load user name:', error);
      }
    };
    fetchName();
  }, []);

  const handlePickForMe = () => {
    const index = Math.floor(Math.random() * categories.length);
    const randomCategory = categories[index];
    router.push(randomCategory.route);
  };

  if (!playfairLoaded || !poppinsLoaded) return null;

  return (
    <ImageBackground
      source={require('../../assets/images/clouds.png')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.overlay} />
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Text style={styles.title}>Your Worship Center, {userName || 'friend'}</Text>
            <Text style={styles.subtitle}>gentle ways to stay spiritually connected 💫</Text>
          </View>

          <View style={styles.grid}>
            {categories.map((cat, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => router.push(cat.route)}
                activeOpacity={0.85}
              >
                <LinearGradient
                  colors={['#FDEFFB', '#E3DFFD']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.card}
                >
                  <Text style={styles.emoji}>{cat.emoji}</Text>
                  <Text style={styles.cardText}>{cat.label}</Text>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>

          <LinearGradient
            colors={['#FDEFFB', '#E3DFFD']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.pickButton}
          >
            <TouchableOpacity onPress={handlePickForMe} activeOpacity={0.85}>
              <Text style={styles.pickButtonText}>✨ Pick For Me</Text>
            </TouchableOpacity>
          </LinearGradient>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}

const COLORS = {
  deepPurple: '#8B5CF6',
  softPurple: '#9C6ADE',
  cardBorder: 'black',
  cardShadow: '#C9B6E4',
  textDark: '#333333',
  background: '#FFF5FD',
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 20 : 0,
  },
  container: {
    paddingBottom: 80,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  title: {
    fontSize: 26,
    fontFamily: 'PlayfairDisplay_700Bold',
    color: COLORS.textDark,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: COLORS.deepPurple,
    marginTop: 6,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    columnGap: 20,
    rowGap: 20,
  },
  card: {
    width: screenWidth * 0.4,
    height: screenWidth * 0.42,
    borderRadius: 32,
    paddingVertical: 0,
    paddingHorizontal: 10,
    backgroundColor: '#F9F0FF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.cardShadow,
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 16,
    elevation: 6,
    borderWidth: 2,
    borderColor: '#F9F0FF',
  },
  emoji: {
    fontSize: 38,
    marginBottom: 10,
  },
  cardText: {
    fontSize: 16,
    color: COLORS.textDark,
    fontFamily: 'Poppins_400Regular',
    textAlign: 'center',
    paddingHorizontal: 4,
  },
  pickButton: {
    marginTop: 40,
    paddingVertical: 14,
    paddingHorizontal: 42,
    borderRadius: 32,
    alignSelf: 'center',
    shadowColor: COLORS.cardShadow,
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 5,
    borderWidth: 2,
    borderColor: '#F9F0FF',
  },
  pickButtonText: {
    color: 'black',
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    textAlign: 'center',
  },
});
