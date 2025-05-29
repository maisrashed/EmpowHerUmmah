import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const dhikrItems = [
  { text: "SubhanAllah (33x)", arabic: "سُبْحَانَ ٱللَّٰه", type: "praise" },
  { text: "Alhamdulillah (33x)", arabic: "ٱلْـحَـمْـدُ للهِ", type: "gratitude" },
  { text: "Allahu Akbar (34x)", arabic: "ٱللَّٰهُ أَكْبَر", type: "glorification" },
  { text: "Astaghfirullah", arabic: "أَسْتَغْفِرُ ٱللّٰه", type: "forgiveness" },
  { text: "La ilaha illallah", arabic: "لَا إِلٰهَ إِلَّا ٱللَّٰه", type: "faith" },
  { text: "HasbunAllahu wa ni'mal wakeel", arabic: "حَسْبُنَا ٱللَّهُ وَنِعْمَ ٱلْوَكِيلُ", type: "reliance" },
  { text: "La hawla wa la quwwata illa billah", arabic: "لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّٰه", type: "resilience" },
  { text: "Ya Rahman, Ya Raheem", arabic: "يَا رَحْمَٰنُ، يَا رَحِيم", type: "names" },
  { text: "Ya Allah, forgive me", arabic: "يَا ٱللّٰهُ اغْفِرْ لِي", type: "forgiveness" },
  { text: "Ya Lateef, make it easy for me", arabic: "يَا لَطِيفُ، يَسِّرْ لِي", type: "ease" },
  { text: "SubhanAllahi wa bihamdihi", arabic: "سُبْحَانَ ٱللَّهِ وَبِحَمْدِهِ", type: "praise" },
  { text: "SubhanAllahi-l-azeem", arabic: "سُبْحَانَ ٱللَّهِ الْعَظِيمِ", type: "praise" },
  { text: "Bismillah", arabic: "بِسْمِ ٱللَّٰهِ", type: "beginning" },
  { text: "Ya Fattah, open doors for me", arabic: "يَا فَتَّاحُ، ٱفْتَحْ لِي أَبْوَابَ ٱلْخَيْرِ", type: "openness" },
  { text: "Ya Salam, envelope me in peace", arabic: "يَا سَلَامُ، ٱحُطْنِي بِٱلسَّلَامِ", type: "peace" },
  { text: "Rabbi zidni ilma", arabic: "رَبِّ زِدْنِي عِلْمًا", type: "knowledge" },
  { text: "Ya Wadud, fill my heart with love", arabic: "يَا وَدُودُ، ٱمْلَأْ قَلْبِي حُبًّا", type: "love" }
];

export default function DhikrScreen() {
  const [favorites, setFavorites] = useState([]);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('@favorite_dhikr').then(data => {
      if (data) setFavorites(JSON.parse(data));
    });
  }, []);

  const toggleFavorite = (text) => {
    const updated = favorites.includes(text)
      ? favorites.filter(item => item !== text)
      : [...favorites, text];
    setFavorites(updated);
    AsyncStorage.setItem('@favorite_dhikr', JSON.stringify(updated));
  };

  const sortedItems = [
    ...dhikrItems.filter(item => favorites.includes(item.text)),
    ...dhikrItems.filter(item => !favorites.includes(item.text))
  ];

  const filteredItems = showFavoritesOnly
    ? sortedItems.filter(item => favorites.includes(item.text))
    : sortedItems;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>🕊️ Dhikr</Text>
      <Text style={styles.instructions}>Long press on any dhikr to save it to the top ❤️</Text>
      <TouchableOpacity style={styles.filterButton} onPress={() => setShowFavoritesOnly(!showFavoritesOnly)}>
        <Text style={styles.filterButtonText}>{showFavoritesOnly ? 'Show All' : 'Show Favorites Only'}</Text>
      </TouchableOpacity>
      {filteredItems.map((item, index) => (
        <TouchableOpacity
          key={index}
          onLongPress={() => toggleFavorite(item.text)}
          style={styles.card}
        >
          <Text style={styles.arabic}>{item.arabic}</Text>
          <Text style={styles.translation}>{item.text}</Text>
          <Text style={styles.type}>Type: {item.type}</Text>
          {favorites.includes(item.text) && <Text style={styles.heart}>❤️</Text>}
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#FFF5FD',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#7C3AED',
    marginBottom: 8,
  },
  instructions: {
    fontSize: 13,
    color: '#6D28D9',
    marginBottom: 12,
    fontStyle: 'italic',
  },
  filterButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#EBDFF9',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginBottom: 16,
  },
  filterButtonText: {
    color: '#7C3AED',
    fontWeight: '600',
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    shadowColor: '#BFA2DB',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 3,
  },
  arabic: {
    fontSize: 20,
    textAlign: 'right',
    marginBottom: 4,
  },
  translation: {
    fontSize: 16,
    color: '#444',
  },
  type: {
    fontSize: 12,
    color: '#888',
  },
  heart: {
    fontSize: 18,
    marginTop: 8,
    textAlign: 'center',
  },
});

