import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
  ImageBackground,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
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
  Poppins_600SemiBold,
} from '@expo-google-fonts/poppins';

export default function CalendarScreen() {
  const [markedDates, setMarkedDates] = useState({});
  const [showResumeReminder, setShowResumeReminder] = useState(false);
  const [userName, setUserName] = useState('');
  const STORAGE_KEY = '@period_marked_dates';
  const router = useRouter();

  const [playfairLoaded] = usePlayfairFonts({ PlayfairDisplay_700Bold });
  const [poppinsLoaded] = usePoppinsFonts({ Poppins_400Regular, Poppins_600SemiBold });

  const periodColors = ['#8B5CF6', '#A78BFA', '#C4B5FD', '#A78BFA', '#8B5CF6'];

  useEffect(() => {
    loadMarkedDates();
    loadUserName();
  }, []);

  const loadMarkedDates = async () => {
    try {
      const savedData = await AsyncStorage.getItem(STORAGE_KEY);
      if (savedData) {
        setMarkedDates(JSON.parse(savedData));
      }
    } catch (error) {
      console.error('Failed to load dates:', error);
    }
  };

  const loadUserName = async () => {
    try {
      const name = await AsyncStorage.getItem('@user_name');
      if (name) setUserName(name);
    } catch (error) {
      console.error('Failed to load name:', error);
    }
  };

  const saveMarkedDates = async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(markedDates));
      Alert.alert('Success', 'Your period data has been saved.', [
        { text: 'OK', onPress: () => router.push('/summary') },
      ]);
    } catch (error) {
      console.error('Failed to save dates:', error);
    }
  };

  const handleDayPress = (day) => {
    const date = day.dateString;
    const currentPeriodDays = Object.keys(markedDates).length;
    const colorIndex = Math.min(currentPeriodDays, periodColors.length - 1);
    const selectedColor = periodColors[colorIndex];

    setShowResumeReminder(false);

    setMarkedDates((prev) => {
      const isMarked = prev[date];
      if (isMarked) {
        const updated = { ...prev };
        delete updated[date];
        return updated;
      } else {
        return {
          ...prev,
          [date]: {
            selected: true,
            selectedColor: selectedColor,
            textColor: '#fff',
          },
        };
      }
    });
  };

  const handleFinishPeriod = () => {
    setShowResumeReminder(true);
  };

  if (!playfairLoaded || !poppinsLoaded) return null;

  return (
    <ImageBackground
      source={require('../../assets/images/clouds.png')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.overlay} />
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Your Calendar, {userName || '...'} </Text>
        </View>

        <Calendar
          onDayPress={handleDayPress}
          markedDates={markedDates}
          theme={{
            backgroundColor: COLORS.lightBackground,
            calendarBackground: COLORS.lightBackground,
            selectedDayBackgroundColor: COLORS.deepPurple,
            todayTextColor: COLORS.deepPurple,
            arrowColor: COLORS.deepPurple,
            textMonthFontWeight: 'bold',
            textDayFontSize: 16,
            textMonthFontSize: 20,
            dayTextColor: COLORS.textDark,
            monthTextColor: COLORS.deepPurple,
          }}
        />

        {Object.keys(markedDates).length > 0 && !showResumeReminder && (
          <View style={styles.banner}>
            <Text style={styles.bannerText}>
              You are exempt from prayer during menstruation. 💖 Take care and stay spiritually connected.
            </Text>
          </View>
        )}

        {showResumeReminder && (
          <View style={styles.bannerReminder}>
            <Text style={styles.bannerText}>
              🌸 It’s time to resume your prayers today, {userName || 'friend'}. May Allah accept them!
            </Text>
          </View>
        )}

        <TouchableOpacity onPress={handleFinishPeriod} style={{ borderRadius: 30, overflow: 'hidden', marginTop: 20 }}>
          <LinearGradient colors={['#A78BFA', '#C4B5FD']} style={styles.finishButton}>
            <Text style={styles.finishButtonText}>I've Finished My Period</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity onPress={saveMarkedDates} style={{ borderRadius: 30, overflow: 'hidden', marginTop: 20 }}>
          <LinearGradient colors={['#8B5CF6', '#BFA2DB']} style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Save & View Period Data</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const COLORS = {
  deepPurple: '#8B5CF6',
  lightBackground: '#F3E8FF',
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
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    zIndex: 0,
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    padding: 20,
    paddingTop: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontFamily: 'PlayfairDisplay_700Bold',
    color: COLORS.textDark,
    textAlign: 'center',
    marginTop: 40,
  },
  banner: {
    backgroundColor: '#EDE9FE',
    padding: 15,
    borderRadius: 15,
    marginTop: 20,
  },
  bannerReminder: {
    backgroundColor: '#D8B4FE',
    padding: 15,
    borderRadius: 15,
    marginTop: 20,
  },
  bannerText: {
    color: COLORS.textDark,
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 20,
    fontFamily: 'Poppins_400Regular',
  },
  finishButton: {
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
  },
  finishButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
  },
  saveButton: {
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
  },
});
