import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

const screenWidth = Dimensions.get('window').width;

export default function WorshipMenuScreen() {
  const router = useRouter();

  const categories = [
    { label: 'Dhikr', emoji: '🕊️', route: '/worship/dhikr' },
    { label: "Du'as", emoji: '📿', route: '/worship/duas' },
    { label: 'Sahabiyat Stories', emoji: '🌸', route: '/worship/sahabiyat' },
    { label: "Qur'an Verses", emoji: '📖', route: '/worship/quran' },
    { label: 'Hadith', emoji: '🧠', route: '/worship/hadith' },
    { label: 'Salawat', emoji: '🌙', route: '/worship/salawat' },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>Your Worship Center, {userName || 'friend'}</Text>
      <Text style={styles.subtitle}>gentle ways to stay spiritually connected 💫</Text>

      <View style={styles.grid}>
        {categories.map((cat, index) => (
          <TouchableOpacity key={index} onPress={() => router.push(cat.route)} activeOpacity={0.85}>
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
    </ScrollView>
  );
}

const COLORS = {
  deepPurple: '#8B5CF6',
  textDark: '#333333',
};

const styles = StyleSheet.create({
  container: {
    padding: 28,
    backgroundColor: '#FFF5FD',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.deepPurple,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    fontStyle: 'italic',
    color: COLORS.deepPurple,
    textAlign: 'center',
    marginBottom: 28,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 16,
  },
  card: {
    width: screenWidth * 0.4,
    height: screenWidth * 0.4,
    borderRadius: 24,
    padding: 16,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#BFA2DB',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
    elevation: 8,
  },
  emoji: {
    fontSize: 32,
    marginBottom: 10,
  },
  cardText: {
    fontSize: 15,
    color: COLORS.textDark,
    fontWeight: '600',
    textAlign: 'center',
  },
});
