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
  { text: "SubhanAllahi wa bihamdihi", arabic: "سُبْحَانَ ٱللَّّهِ وَبِحَمْدِهِ", type: "praise" },
  { text: "SubhanAllahi-l-azeem", arabic: "سُبْحَانَ ٱللَّّهِ الْعَظِيمِ", type: "praise" },
  { text: "Bismillah", arabic: "بِسْمِ ٱللَّٰهِ", type: "beginning" },
  { text: "Ya Fattah, open doors for me", arabic: "يَا فَتَّاحُ، ٱفْتَحْ لِي أَبْوَابَ ٱلْخَيْرِ", type: "openness" },
  { text: "Ya Salam, envelope me in peace", arabic: "يَا سَلَامُ، ٱحُطْنِي بِٱلسَّلَامِ", type: "peace" },
  { text: "Rabbi zidni ilma", arabic: "رَبِّ زِدْنِي عِلْمًا", type: "knowledge" },
  { text: "Ya Wadud, fill my heart with love", arabic: "يَا وَدُودُ، ٱمْلَأْ قَلْبِي حُبًّا", type: "love" }
];

export default function DhikrScreen() {
  const [favorites, setFavorites] = useState([]);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

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

        <Text style={styles.title}>🕊️ Dhikr</Text>
        <Text style={styles.instructions}>Long press on any dhikr to save it to the top ❤️</Text>

        <TextInput
          placeholder="Search dhikr..."
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
              <Text style={styles.type}>Type: {item.type}</Text>
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
