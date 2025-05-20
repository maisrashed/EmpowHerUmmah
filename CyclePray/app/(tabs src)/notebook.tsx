// Modern, elegant, and aesthetic NotebookScreen for women-focused UI
import React, { useState, useCallback } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';

import {
  useFonts as usePlayfairFonts,
  PlayfairDisplay_700Bold,
} from '@expo-google-fonts/playfair-display';
import {
  useFonts as usePoppinsFonts,
  Poppins_400Regular,
  Poppins_600SemiBold,
} from '@expo-google-fonts/poppins';

export default function NotebookScreen() {
  const router = useRouter();

  const [selectedFeeling, setSelectedFeeling] = useState(null);
  const [selectedFlow, setSelectedFlow] = useState(null);
  const [note, setNote] = useState('');
  const [intentions, setIntentions] = useState({ reflection: false, dhikr: false, dua: false });

  const FEELING_KEY = '@selected_feeling';
  const FLOW_KEY = '@selected_flow';
  const NOTE_KEY = '@reflection_note';
  const HISTORY_KEY = '@notebook_history';

  const [playfairLoaded] = usePlayfairFonts({ PlayfairDisplay_700Bold });
  const [poppinsLoaded] = usePoppinsFonts({ Poppins_400Regular, Poppins_600SemiBold });

  useFocusEffect(
    useCallback(() => {
      setSelectedFeeling(null);
      setSelectedFlow(null);
      setNote('');
      setIntentions({ reflection: false, dhikr: false, dua: false });
    }, [])
  );

  const feelings = [
    { label: 'Happy', emoji: '😊' },
    { label: 'Sad', emoji: '😭' },
    { label: 'Angry', emoji: '😠' },
    { label: 'Tired', emoji: '🥱' },
    { label: 'Anxious', emoji: '😟' },
    { label: 'Overwhelmed', emoji: '😵‍💫' },
    { label: 'Excited', emoji: '🤩' },
    { label: 'Content', emoji: '😌' },
    { label: 'Lonely', emoji: '😔' },
    { label: 'Motivated', emoji: '💪' },
  ];

  const flows = [
    { label: 'Light', emoji: '💧' },
    { label: 'Medium', emoji: '💦' },
    { label: 'Heavy', emoji: '🌊' },
  ];

  const toggleIntention = (key) => {
    setIntentions({ ...intentions, [key]: !intentions[key] });
  };

  const saveSelections = async () => {
    try {
      const entry = {
        date: new Date().toISOString(),
        feeling: selectedFeeling,
        flow: selectedFlow,
        note,
        intentions,
      };
      const historyRaw = await AsyncStorage.getItem(HISTORY_KEY);
      const history = historyRaw ? JSON.parse(historyRaw) : [];
      history.unshift(entry);
      await Promise.all([
        AsyncStorage.setItem(FEELING_KEY, selectedFeeling || ''),
        AsyncStorage.setItem(FLOW_KEY, selectedFlow || ''),
        AsyncStorage.setItem(NOTE_KEY, note || ''),
        AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(history)),
      ]);
      Alert.alert('Saved!', 'Your entry has been recorded 💜');
    } catch (err) {
      Alert.alert('Error', 'Could not save your entry.');
    }
  };

  if (!playfairLoaded || !poppinsLoaded) return null;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>Notebook</Text>
      <Text style={styles.subtitle}>Reflect with gentleness 🌸</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>How are you feeling?</Text>
        <View style={styles.gridWrap}>
          {feelings.map(({ label, emoji }) => (
            <TouchableOpacity
              key={label}
              style={[styles.emojiBox, selectedFeeling === label && styles.selectedBox]}
              onPress={() => setSelectedFeeling(label)}
            >
              <Text style={styles.emoji}>{emoji}</Text>
              <Text style={styles.emojiLabel}>{label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>How is your flow today?</Text>
        <View style={styles.gridWrap}>
          {flows.map(({ label, emoji }) => (
            <TouchableOpacity
              key={label}
              style={[styles.emojiBox, selectedFlow === label && styles.selectedBox]}
              onPress={() => setSelectedFlow(label)}
            >
              <Text style={styles.emoji}>{emoji}</Text>
              <Text style={styles.emojiLabel}>{label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Would you like to reflect?</Text>
        <TextInput
          style={styles.noteInput}
          multiline
          placeholder="Write a dua, thought, or emotion..."
          placeholderTextColor="#9B89B6"
          value={note}
          onChangeText={setNote}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Today's Intentions</Text>
        {Object.entries(intentions).map(([key, value]) => (
          <TouchableOpacity
            key={key}
            style={styles.checkboxRow}
            onPress={() => toggleIntention(key)}
          >
            <Text style={styles.checkbox}>{value ? '☑️' : '⬜'}</Text>
            <Text style={styles.intentLabel}>
              {{ reflection: 'Reflected on a verse', dhikr: 'Did dhikr', dua: 'Made dua with intention' }[key]}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity onPress={saveSelections} style={styles.saveButton}>
        <Text style={styles.saveText}>💾 Save Entry</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F4FC',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontFamily: 'PlayfairDisplay_700Bold',
    color: '#4C1D95',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#7C3AED',
    textAlign: 'center',
    marginBottom: 30,
    fontStyle: 'italic',
  },
  section: {
    marginBottom: 24,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    color: '#6B21A8',
    marginBottom: 12,
  },
  gridWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'center',
  },
  emojiBox: {
    width: 80,
    backgroundColor: '#F3E8FF',
    padding: 12,
    borderRadius: 14,
    alignItems: 'center',
    marginBottom: 10,
  },
  selectedBox: {
    backgroundColor: '#D8B4FE',
    borderWidth: 1.5,
    borderColor: '#A855F7',
  },
  emoji: {
    fontSize: 28,
  },
  emojiLabel: {
    marginTop: 6,
    fontSize: 13,
    fontFamily: 'Poppins_400Regular',
    color: '#4B0082',
  },
  noteInput: {
    backgroundColor: '#F3E8FF',
    padding: 14,
    borderRadius: 12,
    borderColor: '#D8B4FE',
    borderWidth: 1,
    textAlignVertical: 'top',
    minHeight: 100,
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkbox: {
    fontSize: 20,
    marginRight: 8,
  },
  intentLabel: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#3B0764',
  },
  saveButton: {
    backgroundColor: '#8B5CF6',
    paddingVertical: 14,
    borderRadius: 26,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 40,
  },
  saveText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
  },
});
