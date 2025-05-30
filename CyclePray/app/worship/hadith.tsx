import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const hadithItems = [
  { text: "Actions are judged by intentions.", arabic: "إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ", reference: "Bukhari & Muslim" },
  { text: "There is reward for every act of kindness.", arabic: "فِي كُلِّ كَبِدٍ رَطْبَةٍ أَجْرٌ", reference: "Muslim" },
  { text: "The most beloved deeds to Allah are those done consistently.", arabic: "أَحَبُّ الأَعْمَالِ إِلَى اللَّهِ أَدْوَمُهَا وَإِنْ قَلَّ", reference: "Bukhari" },
  { text: "Smiling at your brother is charity.", arabic: "تَبَسُّمُكَ فِي وَجْهِ أَخِيكَ لَكَ صَدَقَةٌ", reference: "Tirmidhi" },
  { text: "Allah is gentle and loves gentleness.", arabic: "إِنَّ اللَّهَ رَفِيقٌ يُحِبُّ الرِّفْقَ", reference: "Muslim" },
  { text: "Whoever relieves a burden from a believer, Allah will relieve a burden from them.", arabic: "مَنْ فَرَّجَ عَنْ مُؤْمِنٍ كُرْبَةً، فَرَّجَ اللَّهُ عَنْهُ", reference: "Muslim" },
  { text: "Supplication is the essence of worship.", arabic: "الدُّعَاءُ مُخُّ الْعِبَادَةِ", reference: "Tirmidhi" },
  { text: "The strong is not the one who overcomes others, but the one who controls himself in anger.", arabic: "لَيْسَ الشَّدِيدُ بِالصُّرْعَةِ...", reference: "Bukhari" },
  { text: "Modesty brings nothing but good.", arabic: "الْحَيَاءُ لَا يَأْتِي إِلَّا بِخَيْرٍ", reference: "Bukhari" },
  { text: "Part of the excellence of a person's Islam is leaving what does not concern him.", arabic: "مِنْ حُسْنِ إِسْلَامِ الْمَرْءِ...", reference: "Tirmidhi" },
  { text: "The best among you are those who have the best manners and character.", arabic: "خِيَارُكُمْ أَحَاسِنُكُمْ أَخْلَاقًا", reference: "Bukhari" },
  { text: "Make things easy and do not make them difficult.", arabic: "يَسِّرُوا وَلَا تُعَسِّرُوا", reference: "Bukhari" },
  { text: "Cleanliness is half of faith.", arabic: "الطُّهُورُ شَطْرُ الْإِيمَانِ", reference: "Muslim" },
  { text: "None of you truly believes until he loves for his brother what he loves for himself.", arabic: "لَا يُؤْمِنُ أَحَدُكُمْ حَتَّى يُحِبَّ لِأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ", reference: "Bukhari & Muslim" },
  { text: "He who does not thank people, does not thank Allah.", arabic: "مَنْ لَا يَشْكُرِ النَّاسَ لَا يَشْكُرِ اللَّهَ", reference: "Tirmidhi" }
];

export default function HadithScreen() {
  const [favorites, setFavorites] = useState([]);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('@favorite_hadith').then(data => {
      if (data) setFavorites(JSON.parse(data));
    });
  }, []);

  const toggleFavorite = (text) => {
    const updated = favorites.includes(text)
      ? favorites.filter(item => item !== text)
      : [...favorites, text];
    setFavorites(updated);
    AsyncStorage.setItem('@favorite_hadith', JSON.stringify(updated));
  };

  const sortedItems = [
    ...hadithItems.filter(item => favorites.includes(item.text)),
    ...hadithItems.filter(item => !favorites.includes(item.text))
  ];

  const filteredItems = showFavoritesOnly
    ? sortedItems.filter(item => favorites.includes(item.text))
    : sortedItems;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>📜 Hadith</Text>
      <Text style={styles.instructions}>Long press on any hadith to save it to the top ❤️</Text>
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
          <Text style={styles.type}>Source: {item.reference}</Text>
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
