import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

export default function NotebookHistory() {
  const [entries, setEntries] = useState([]);
  const HISTORY_KEY = '@notebook_history';
  const router = useRouter();

  useEffect(() => {
    const loadHistory = async () => {
      const raw = await AsyncStorage.getItem(HISTORY_KEY);
      if (raw) {
        const data = JSON.parse(raw);
        setEntries(data);
      }
    };
    loadHistory();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.entryCard}>
      <Text style={styles.date}>{new Date(item.date).toLocaleDateString()}</Text>
      <Text style={styles.label}>
        Feeling: <Text style={styles.value}>{item.feeling || '-'}</Text>
      </Text>
      <Text style={styles.label}>
        Flow: <Text style={styles.value}>{item.flow || '-'}</Text>
      </Text>
      <Text style={styles.label}>Note:</Text>
      <Text style={styles.note}>{item.note || 'No reflection'}</Text>
      <Text style={styles.label}>Intentions:</Text>
      <View style={styles.intentList}>
        {Object.entries(item.intentions || {}).map(
          ([key, value]) =>
            value && (
              <Text key={key} style={styles.intentTag}>
                {{
                  reflection: '🕊️ Reflection',
                  dhikr: '🧿 Dhikr',
                  dua: '🙏 Dua',
                }[key] || key}
              </Text>
            )
        )}
      </View>
    </View>
  );

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 80 }}
    >
      <Text style={styles.title}>📘 Past Notebook Entries</Text>

      {/* ⬆️ Moved button right under the title */}
      <TouchableOpacity
        onPress={() => router.replace('/notebook')}
        style={styles.backButton}
      >
        <Text style={styles.backText}>← Back to Notebook</Text>
      </TouchableOpacity>

      {entries.length === 0 ? (
        <Text style={styles.empty}>No entries found yet.</Text>
      ) : (
        <FlatList
          data={entries}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          scrollEnabled={false}
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F3E8FF',
    padding: 20,
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#4B0082',
  },
  empty: {
    textAlign: 'center',
    fontSize: 16,
    color: '#999',
    marginTop: 50,
  },
  entryCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  date: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B21A8',
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginTop: 6,
  },
  value: {
    fontWeight: '400',
    color: '#333',
  },
  note: {
    fontStyle: 'italic',
    color: '#444',
    marginTop: 4,
  },
  intentList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
    gap: 6,
  },
  intentTag: {
    backgroundColor: '#DDD6FE',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 12,
    color: '#4B0082',
    marginRight: 6,
    marginTop: 4,
  },
  backButton: {
    backgroundColor: '#8B5CF6',
    borderRadius: 30,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  backText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
