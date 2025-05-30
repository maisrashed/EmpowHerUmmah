import React, { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

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
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

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

  const filteredItems = (showFavoritesOnly
    ? sortedItems.filter(item => favorites.includes(item.text))
    : sortedItems
  ).filter(item =>
    item.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF5FD' }}>
      <View style={styles.innerContainer}>
        <TouchableOpacity onPress={() => router.push('/worship')} style={styles.backButton}>
          <Ionicons name="arrow-back" size={18} color="#7C3AED" />
          <Text style={styles.backButtonText}>Back to Worship</Text>
        </TouchableOpacity>

        <Text style={styles.title}>📜 Hadith</Text>
        <Text style={styles.instructions}>Long press on any hadith to save it to the top ❤️</Text>

        <TextInput
          placeholder="Search hadith..."
          placeholderTextColor="#A78BFA"
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        <TouchableOpacity style={styles.filterButton} onPress={() => setShowFavoritesOnly(!showFavoritesOnly)}>
          <Text style={styles.filterButtonText}>
            {showFavoritesOnly ? 'Show All' : 'Show Favorites Only'}
          </Text>
        </TouchableOpacity>

        <ScrollView style={styles.scrollArea} showsVerticalScrollIndicator={false}>
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
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  innerContainer: {
    flex: 1,
    padding: 20,
  },
  scrollArea: {
    flex: 1,
    marginTop: 10,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#EBDFF9',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  backButtonText: {
    color: '#7C3AED',
    fontSize: 14,
    fontWeight: '600',
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
  searchInput: {
    backgroundColor: '#F3E8FF',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 12,
    marginBottom: 12,
    fontSize: 15,
    color: '#4B0082',
  },
  filterButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#EBDFF9',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginBottom: 8,
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
