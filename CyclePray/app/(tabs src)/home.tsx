import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  Alert,
  ScrollView,
  ImageBackground,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Circle } from 'react-native-svg';
import { useRouter } from 'expo-router';

import {
  useFonts as usePlayfairFonts,
  PlayfairDisplay_700Bold,
} from '@expo-google-fonts/playfair-display';
import {
  useFonts as usePoppinsFonts,
  Poppins_400Regular,
  Poppins_600SemiBold,
} from '@expo-google-fonts/poppins';

export default function HomeScreen() {
  const router = useRouter();
  const [missedDays, setMissedDays] = useState(0);
  const [totalDays, setTotalDays] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [userName, setUserName] = useState('');
  const STORAGE_KEY = '@period_marked_dates';

  const [playfairLoaded] = usePlayfairFonts({ PlayfairDisplay_700Bold });
  const [poppinsLoaded] = usePoppinsFonts({ Poppins_400Regular, Poppins_600SemiBold });

  useEffect(() => {
    const loadData = async () => {
      try {
        const savedData = await AsyncStorage.getItem(STORAGE_KEY);
        const storedName = await AsyncStorage.getItem('@user_name');

        if (storedName) setUserName(storedName);

        if (savedData) {
          const markedDates = JSON.parse(savedData);
          const summary = {};

          Object.keys(markedDates).forEach((dateStr) => {
            const month = dateStr.slice(0, 7);
            summary[month] = (summary[month] || 0) + 1;
          });

          const sortedMonths = Object.keys(summary).sort((a, b) => b.localeCompare(a));
          if (sortedMonths.length > 0) {
            const latest = sortedMonths[0];
            setMissedDays(summary[latest]);

            const [year, month] = latest.split('-');
            const daysInMonth = new Date(year, month, 0).getDate();
            setTotalDays(daysInMonth);
          }
        }
      } catch (error) {
        console.error('Failed to load data:', error);
      } finally {
        setDataLoaded(true);
      }
    };

    loadData();
  }, []);

  if (!playfairLoaded || !poppinsLoaded) {
    return null;
  }

  return (
    <ImageBackground
      source={require('../../assets/images/clouds.png')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.overlay} />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Image source={require('../../assets/images/icon.png')} style={styles.icon} />
          <Text style={styles.title}>Hi {userName || 'there'}! Your softness is your strength ✨</Text>
          <Text style={styles.subtitle}>“So remember Me; I will remember you.” — Qur'an 2:152</Text>
        </View>

        {dataLoaded ? (
          totalDays > 0 ? (
            <PrayerMissedCounter missedDays={missedDays} totalDays={totalDays} />
          ) : (
            <Text style={styles.noDataText}>No period data yet</Text>
          )
        ) : null}

        <View style={styles.quickLinks}>
          {[
            { label: 'Notebook', emoji: '📝', link: '/notebook' },
            { label: 'Resources', emoji: '📚', link: '/resources' },
            { label: 'Worship', emoji: '🌙', link: '/worship' },
            { label: 'Your Cycle', emoji: '🧕', link: '/calendar' },
          ].map(({ label, emoji, link }) => (
            <LinearGradient
              key={label}
              colors={['#FDEFFB', '#E3DFFD']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.linkGradient}
            >
              <Pressable
                onPress={() => router.push(link)}
                style={({ pressed }) => [styles.linkCard, pressed && styles.linkPressed]}
              >
                <View style={styles.iconBubble}>
                  <Text style={styles.linkEmoji}>{emoji}</Text>
                </View>
                <Text style={styles.linkText}>{label}</Text>
              </Pressable>
            </LinearGradient>
          ))}
        </View>

        <Pressable
          style={styles.justForMeButton}
          onPress={() => Alert.alert('Just for You 💌', 'Take a deep breath and smile!')}
        >
          <Text style={styles.justForMeText}>🎁 Just for Me</Text>
        </Pressable>
      </ScrollView>
    </ImageBackground>
  );
}

function PrayerMissedCounter({ missedDays, totalDays }) {
  const radius = 90;
  const strokeWidth = 15;
  const center = radius + strokeWidth;
  const circumference = 2 * Math.PI * radius;
  const progress = (missedDays / totalDays) * circumference;

  return (
    <View style={styles.counterContainer}>
      <Svg width={2 * (radius + strokeWidth)} height={2 * (radius + strokeWidth)}>
        <Circle
          stroke="#E5E5E5"
          fill="none"
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={strokeWidth}
        />
        <Circle
          stroke="#B794F4"
          fill="none"
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={circumference - progress}
          strokeLinecap="round"
          rotation="-90"
          origin={`${center}, ${center}`}
        />
      </Svg>
      <View style={styles.counterTextWrapper}>
        <Text style={styles.counterTitle}>Missed Prayers</Text>
        <Text style={styles.counterValue}>{missedDays} / {totalDays}</Text>
      </View>
    </View>
  );
}

const COLORS = {
  deepPurple: '#8B5CF6',
  textDark: '#333333',
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  container: {
    padding: 20,
    paddingTop: 60,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  icon: {
    width: 175,
    height: 70,
    marginTop: 5,
    marginRight: 30,
  },
  title: {
    fontSize: 30,
    fontFamily: 'PlayfairDisplay_700Bold',
    color: COLORS.textDark,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: COLORS.textDark,
    marginTop: 8,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  counterContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 30,
    position: 'relative',
  },
  counterTextWrapper: {
    position: 'absolute',
    top: '40%',
    alignSelf: 'center',
    alignItems: 'center',
  },
  counterTitle: {
    fontSize: 18,
    fontFamily: 'PlayfairDisplay_700Bold',
    color: COLORS.textDark,
    textAlign: 'center',
  },
  counterValue: {
    fontSize: 24,
    fontFamily: 'Poppins_600SemiBold',
    color: COLORS.deepPurple,
    textAlign: 'center',
    marginTop: 8,
  },
  noDataText: {
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    color: COLORS.textDark,
    textAlign: 'center',
    marginVertical: 30,
  },
  quickLinks: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  linkGradient: {
    width: '48%',
    borderRadius: 24,
    marginBottom: 15,
    paddingVertical: 25,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  linkCard: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBubble: {
    backgroundColor