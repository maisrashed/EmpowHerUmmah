import { useRouter } from 'expo-router';
import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function NotebookScreen({ navigation }) {
    const router = useRouter();
  const [selectedFeeling, setSelectedFeeling] = useState(null);
  const [selectedFlow, setSelectedFlow] = useState(null);
  const [note, setNote] = useState('');
  const [intentions, setIntentions] = useState({
    reflection: false,
    dhikr: false,
    dua: false,
  });

  const FEELING_KEY = '@selected_feeling';
  const FLOW_KEY = '@selected_flow';
  const NOTE_KEY = '@reflection_note';
  const HISTORY_KEY = '@notebook_history';

  useEffect(() => {
    const loadData = async () => {
      const [f, fl, n] = await Promise.all([
        AsyncStorage.getItem(FEELING_KEY),
        AsyncStorage.getItem(FLOW_KEY),
        AsyncStorage.getItem(NOTE_KEY),
      ]);
      if (f) setSelectedFeeling(f);
      if (fl) setSelectedFlow(fl);
      if (n) setNote(n);
    };
    loadData();
  }, []);

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

  const feelings = [
    { label: 'Happy', emoji: '😊' },
    { label: 'Sad', emoji: '😭' },
    { label: 'Angry', emoji: '😠' },
    { label: 'Tired', emoji: '🥱' },
  ];
  const flows = [
    { label: 'Light', emoji: '💧' },
    { label: 'Medium', emoji: '💦' },
    { label: 'Heavy', emoji: '🌊' },
  ];

  const toggleIntention = (key) => {
    setIntentions({ ...intentions, [key]: !intentions[key] });
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: '#F3E8FF' }}
      contentContainerStyle={{ padding: 20, paddingTop: 50, paddingBottom: 100 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Image source={require('../../assets/images/icon.png')} style={styles.logo} />
        <Text style={styles.title}>Your Notebook, Noor</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>How are you feeling?</Text>
        <View style={styles.row}>
          {feelings.map(({ label, emoji }) => (
            <TouchableOpacity
              key={label}
              style={[styles.emojiBox, selectedFeeling === label && styles.selected]}
              onPress={() => setSelectedFeeling(label)}
            >
              <Text style={styles.emoji}>{emoji}</Text>
              <Text>{label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>How is your flow today?</Text>
        <View style={styles.row}>
          {flows.map(({ label, emoji }) => (
            <TouchableOpacity
              key={label}
              style={[styles.emojiBox, selectedFlow === label && styles.selected]}
              onPress={() => setSelectedFlow(label)}
            >
              <Text style={styles.emoji}>{emoji}</Text>
              <Text>{label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Would you like to reflect?</Text>
        <TextInput
          style={styles.noteInput}
          multiline
          placeholder="Write a dua, thought, or emotion..."
          value={note}
          onChangeText={setNote}
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Today's Intentions</Text>
        {Object.entries(intentions).map(([key, value]) => (
          <TouchableOpacity
            key={key}
            style={styles.checkboxRow}
            onPress={() => toggleIntention(key)}
          >
            <Text style={styles.checkbox}>{value ? '✅' : '⬜'} </Text>
            <Text style={styles.intentLabel}>
              {{
                reflection: 'Reflected on a verse',
                dhikr: 'Did dhikr',
                dua: 'Made dua with intention',
              }[key]}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      

      <TouchableOpacity onPress={saveSelections} style={styles.saveButton}>
        <Text style={styles.saveText}>Save Entry</Text>
      </TouchableOpacity>

      <TouchableOpacity
  onPress={() => router.push('/notebook/history')}
  style={[styles.saveButton, { marginTop: 10 }]}
>
  <Text style={styles.saveText}>View Past Entries</Text>
</TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 8,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  emojiBox: {
    alignItems: 'center',
    padding: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#DDD6FE',
    backgroundColor: '#F9F5FF',
    width: 70,
    margin: 5,
  },
  selected: {
    backgroundColor: '#C4B5FD',
    borderColor: '#8B5CF6',
  },
  emoji: {
    fontSize: 28,
  },
  noteInput: {
    backgroundColor: '#F3E8FF',
    padding: 10,
    borderRadius: 10,
    borderColor: '#D8B4FE',
    borderWidth: 1,
    textAlignVertical: 'top',
    minHeight: 80,
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
  },
  saveButton: {
    backgroundColor: '#8B5CF6',
    borderRadius: 30,
    paddingVertical: 14,
    alignItems: 'center',
  },
  saveText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});