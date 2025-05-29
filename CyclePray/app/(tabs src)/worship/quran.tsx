import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const verseItems = [
  { text: "Indeed, with hardship comes ease.", arabic: "فَإِنَّ مَعَ ٱلْعُسْرِ يُسْرًا", reference: "94:6" },
  { text: "Your Lord has not forsaken you.", arabic: "مَا وَدَّعَكَ رَبُّكَ وَمَا قَلَىٰ", reference: "93:3" },
  { text: "Allah does not burden a soul beyond that it can bear.", arabic: "لَا يُكَلِّفُ ٱللَّهُ نَفْسًا إِلَّا وُسْعَهَا", reference: "2:286" },
  { text: "He is with you wherever you are.", arabic: "وَهُوَ مَعَكُمْ أَيْنَ مَا كُنتُمْ", reference: "57:4" },
  { text: "Put your trust in Allah.", arabic: "فَتَوَكَّلْ عَلَى ٱللَّهِ", reference: "3:159" },
  { text: "So remember Me; I will remember you.", arabic: "فَٱذْكُرُونِي أَذْكُرْكُمْ", reference: "2:152" },
  { text: "Do not despair of the mercy of Allah.", arabic: "لَا تَقْنَطُوا مِن رَّحْمَةِ ٱللَّهِ", reference: "39:53" },
  { text: "He knows what is within the hearts.", arabic: "يَعْلَمُ خَائِنَةَ ٱلْأَعْيُنِ وَمَا تُخْفِي ٱلصُّدُورُ", reference: "11:5" },
  { text: "He created you in stages.", arabic: "وَقَدْ خَلَقَكُمْ أَطْوَارًا", reference: "71:14" },
  { text: "Verily, after every difficulty there is relief.", arabic: "إِنَّ مَعَ ٱلْعُسْرِ يُسْرًا", reference: "94:5" },
  { text: "My mercy encompasses all things.", arabic: "وَرَحْمَتِي وَسِعَتْ كُلَّ شَيْءٍ", reference: "7:156" },
  { text: "And He found you lost and guided [you].", arabic: "وَوَجَدَكَ ضَالًّا فَهَدَىٰ", reference: "93:7" },
  { text: "Indeed, Allah is with those who are patient.", arabic: "إِنَّ ٱللَّهَ مَعَ ٱلصَّابِرِينَ", reference: "2:153" },
  { text: "And whoever relies upon Allah – then He is sufficient for him.", arabic: "وَمَن يَتَوَكَّلْ عَلَى ٱللَّهِ فَهُوَ حَسْبُهُ", reference: "65:3" },
  { text: "He knows what every soul earns.", arabic: "وَيَعْلَمُ مَا كَسَبَتْ كُلُّ نَفْسٍ", reference: "31:34" }
];

export default function QuranVersesScreen() {
  const [favorites, setFavorites] = useState([]);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('@favorite_quran').then(data => {
      if (data) setFavorites(JSON.parse(data));
    });
  }, []);

  const toggleFavorite = (text) => {
    const updated = favorites.includes(text)
      ? favorites.filter(item => item !== text)
      : [...favorites, text];
    setFavorites(updated);
    AsyncStorage.setItem('@favorite_quran', JSON.stringify(updated));
  };

  const sortedItems = [
    ...verseItems.filter(item => favorites.includes(item.text)),
    ...verseItems.filter(item => !favorites.includes(item.text))
  ];

  const filteredItems = showFavoritesOnly
    ? sortedItems.filter(item => favorites.includes(item.text))
    : sortedItems;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>📖 Qur'anic Verses</Text>
      <Text style={styles.instructions}>Long press to favorite and pin verses to the top ❤️</Text>
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
          <Text style={styles.reference}>({item.reference})</Text>
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
  reference: {
    fontSize: 12,
    color: '#888',
  },
  heart: {
    fontSize: 18,
    marginTop: 8,
    textAlign: 'center',
  },
});
