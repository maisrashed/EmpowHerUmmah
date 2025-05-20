import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

import {
  useFonts as usePlayfairFonts,
  PlayfairDisplay_700Bold,
} from '@expo-google-fonts/playfair-display';

import {
  useFonts as usePoppinsFonts,
  Poppins_400Regular,
  Poppins_600SemiBold,
} from '@expo-google-fonts/poppins';

export default function SummaryScreen() {
  const [monthlySummary, setMonthlySummary] = useState({});
  const STORAGE_KEY = '@period_marked_dates';
  const router = useRouter();

  const [playfairLoaded] = usePlayfairFonts({ PlayfairDisplay_700Bold });
  const [poppinsLoaded] = usePoppinsFonts({ Poppins_400Regular, Poppins_600SemiBold });

  useEffect(() => {
    loadSummary();
  }, []);

  const loadSummary = async () => {
    try {
      const savedData = await AsyncStorage.getItem(STORAGE_KEY);
      if (savedData) {
        const markedDates = JSON.parse(savedData);
        const summary = {};

        Object.keys(markedDates).forEach((dateStr) => {
          const month = dateStr.slice(0, 7);
          summary[month] = (summary[month] || 0) + 1;
        });

        setMonthlySummary(summary);
      }
    } catch (error) {
      console.error('Failed to load summary:', error);
    }
  };

  if (!playfairLoaded || !poppinsLoaded) return null;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Missed Day Logs by Month</Text>

      {Object.keys(monthlySummary).length === 0 ? (
        <Text style={styles.noDataText}>No period data logged yet.</Text>
      ) : (
        Object.entries(monthlySummary).map(([month, days]) => (
          <View key={month} style={styles.monthCard}>
            <Text style={styles.monthText}>{month}</Text>
            <Text style={styles.daysText}>{days} day(s) logged</Text>
          </View>
        ))
      )}

      <TouchableOpacity 
        onPress={() => router.push('/calendar')} 
        style={{ borderRadius: 30, overflow: 'hidden', marginTop: 30 }}
      >
        <LinearGradient
          colors={['#8B5CF6', '#BFA2DB']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>Back to Calendar</Text>
        </LinearGradient>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#F3E8FF',
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontFamily: 'PlayfairDisplay_700Bold',
    marginBottom: 60,
    marginTop: 70,
    color: '#333',
    textAlign: 'center',
  },
  noDataText: {
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    color: '#666',
    textAlign: 'center',
    marginTop: 40,
  },
  monthCard: {
    backgroundColor: '#EDE9FE',
    padding: 20,
    borderRadius: 15,
    width: '90%',
    alignItems: 'center',
    marginBottom: 15,
  },
  monthText: {
    fontSize: 18,
    fontFamily: 'Poppins_600SemiBold',
    color: '#8B5CF6',
  },
  daysText: {
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    color: '#555',
    marginTop: 5,
  },
  backButton: {
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 5,
    width: 200,
    alignSelf: 'center',
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
  },
});
