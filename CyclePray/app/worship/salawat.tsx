import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';


const salawatList = [
  // Short Salawat
  {
    name: "Basic Salawat",
    arabic: "اللَّهُمَّ صَلِّ عَلَىٰ مُحَمَّد",
    transliteration: "Allahumma salli ‘ala Muhammad",
    meaning: "O Allah, send blessings upon Muhammad.",
    virtue: "Short, simple, and beloved form of salawat."
  },
  {
    name: "Peace and Blessings",
    arabic: "صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ",
    transliteration: "Salla Allahu ‘alayhi wa sallam",
    meaning: "May Allah send peace and blessings upon him.",
    virtue: "Often said after the Prophet's name."
  },
  {
    name: "Salawat for Light",
    arabic: "اللَّهُمَّ صَلِّ عَلَىٰ سَيِّدِنَا مُحَمَّدٍ نُورِ الْقُلُوبِ",
    transliteration: "Allahumma salli ‘ala Sayyidina Muhammad nooril qulub",
    meaning: "O Allah, send blessings upon our master Muhammad, the light of hearts.",
    virtue: "Invokes spiritual light and inner peace."
  },
  {
    name: "Salawat of Mercy",
    arabic: "اللَّهُمَّ صَلِّ عَلَىٰ مُحَمَّدٍ وَارْحَمْ أُمَّتَهُ",
    transliteration: "Allahumma salli ‘ala Muhammad wa irham ummatah",
    meaning: "O Allah, send blessings upon Muhammad and have mercy on his Ummah.",
    virtue: "Combines salawat with a prayer for the community."
  },
  {
    name: "Salawat for Ease",
    arabic: "اللَّهُمَّ صَلِّ عَلَىٰ مُحَمَّدٍ وَفَرِّجْ هَمِّي",
    transliteration: "Allahumma salli ‘ala Muhammad wa farij hammi",
    meaning: "O Allah, send blessings upon Muhammad and relieve my worry.",
    virtue: "Simple salawat combined with du’a for relief."
  },
  {
    name: "Every Breath Salawat",
    arabic: "صَلَاةً تُعَادِلُ أَنْفَاسَ الْخَلَائِقِ",
    transliteration: "Salatan tu‘adilu anfasa al-khala’iq",
    meaning: "Blessings equal to the breaths of all creation.",
    virtue: "Symbolic of limitless praise."
  },
  {
    name: "Salawat of Love",
    arabic: "اللَّهُمَّ صَلِّ عَلَىٰ حَبِيبِكَ مُحَمَّد",
    transliteration: "Allahumma salli ‘ala Habibika Muhammad",
    meaning: "O Allah, send blessings upon Your beloved Muhammad.",
    virtue: "Soft and affectionate; shows love for the Prophet ﷺ."
  },
  {
    name: "Salawat with Peace",
    arabic: "اللَّهُمَّ صَلِّ وَسَلِّمْ عَلَىٰ مُحَمَّد",
    transliteration: "Allahumma salli wa sallim ‘ala Muhammad",
    meaning: "O Allah, send peace and blessings upon Muhammad.",
    virtue: "Combines both salawat and salam together."
  },
  {
    name: "Salawat of Contentment",
    arabic: "اللَّهُمَّ صَلِّ عَلَىٰ مُحَمَّدٍ حَتَّىٰ أَرْضَىٰ",
    transliteration: "Allahumma salli ‘ala Muhammad hatta arda",
    meaning: "O Allah, send blessings upon Muhammad until I am content.",
    virtue: "A personal, heartfelt salawat."
  },
  {
    name: "Salawat for Jannah",
    arabic: "اللَّهُمَّ صَلِّ عَلَىٰ مُحَمَّدٍ وَارْزُقْنَا صُحْبَتَهُ فِي الْجَنَّةِ",
    transliteration: "Allahumma salli ‘ala Muhammad wa arzuqna suhbahu fil-jannah",
    meaning: "O Allah, send blessings upon Muhammad and grant us his companionship in Paradise.",
    virtue: "A salawat with longing and hope."
  },
  // Long Salawat
  {
    name: "Salat al-Ibrahimiyyah",
    arabic: "اللَّهُمَّ صَلِّ عَلَىٰ مُحَمَّدٍ وَعَلَىٰ آلِ مُحَمَّدٍ كَمَا صَلَّيْتَ عَلَىٰ إِبْرَاهِيمَ وَعَلَىٰ آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ، اللَّهُمَّ بَارِكْ عَلَىٰ مُحَمَّدٍ وَعَلَىٰ آلِ مُحَمَّدٍ كَمَا بَارَكْتَ عَلَىٰ إِبْرَاهِيمَ وَعَلَىٰ آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ",
    transliteration: "Allahumma salli ‘ala Muhammadin wa ‘ala aali Muhammadin kama sallayta ‘ala Ibrahima wa ‘ala aali Ibrahima innaka Hamidun Majid. Allahumma barik ‘ala Muhammadin wa ‘ala aali Muhammadin kama barakta ‘ala Ibrahima wa ‘ala aali Ibrahima innaka Hamidun Majid.",
    meaning: "O Allah, send Your prayers upon Muhammad and the family of Muhammad...",
    virtue: "Recited in every salah; best form of salawat."
  },
  {
    name: "Salawat An-Nur (The Light)",
    arabic: "اللَّهُمَّ صَلِّ عَلَىٰ سَيِّدِنَا مُحَمَّدٍ نُورِ الْأَنْوَارِ، وَسِرِّ الْأَسْرَارِ...",
    transliteration: "Allahumma salli ‘ala Sayyidina Muhammadin nooril anwar...",
    meaning: "O Allah, send blessings upon our master Muhammad, the light of all lights...",
    virtue: "A salawat of deep spiritual reflection, often recited in gatherings of dhikr."
  },
  {
    name: "Salawat al-Fatih (The Opener)",
    arabic: "اللَّهُمَّ صَلِّ عَلَىٰ سَيِّدِنَا مُحَمَّدٍ الْفَاتِحِ لِمَا أُغْلِقَ...",
    transliteration: "Allahumma salli ‘ala Sayyidina Muhammadin al-fatihi lima ughliqa...",
    meaning: "O Allah, send blessings upon our master Muhammad, the Opener of what was closed...",
    virtue: "Highly esteemed by scholars; considered powerful for unlocking spiritual openings."
  },
  {
    name: "Salawat Tunjina (The Relief Prayer)",
    arabic: "اللَّهُمَّ صَلِّ عَلَىٰ سَيِّدِنَا مُحَمَّدٍ صَلَاةً تُنْجِينَا بِهَا...",
    transliteration: "Allahumma salli ‘ala Sayyidina Muhammadin salatan tunjina biha...",
    meaning: "O Allah, send blessings upon our master Muhammad...",
    virtue: "Recited for protection, relief from hardship, and spiritual elevation."
  },
  {
    name: "Salawat al-Mashishiyya",
    arabic: "اللَّهُمَّ صَلِّ عَلَىٰ مَنْ مِنْهُ انْشَقَّتِ الْأَسْرَارُ...",
    transliteration: "Allahumma salli ‘ala man minhu inshakkat al-asrar...",
    meaning: "O Allah, send prayers upon the one from whom secrets unfolded...",
    virtue: "Mystical and poetic salawat, widely recited in Sufi traditions."
  }
];

export default function SalawatScreen() {
  const [favorites, setFavorites] = useState([]);
  const [showFavesOnly, setShowFavesOnly] = useState(false);
  const [search, setSearch] = useState('');
  const router = useRouter();

  useEffect(() => {
    AsyncStorage.getItem('@favorite_salawat').then((data) => {
      if (data) setFavorites(JSON.parse(data));
    });
  }, []);

  const toggleFavorite = async (item) => {
    const updated = favorites.some(f => f.name === item.name)
      ? favorites.filter(f => f.name !== item.name)
      : [item, ...favorites];

    setFavorites(updated);
    await AsyncStorage.setItem('@favorite_salawat', JSON.stringify(updated));
  };

  const isFav = (item) => favorites.some(f => f.name === item.name);

  const filtered = salawatList.filter(
    (s) =>
      (!showFavesOnly || isFav(s)) &&
      (s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.transliteration.toLowerCase().includes(search.toLowerCase()) ||
        s.meaning.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightBg }}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => router.push('/worship')} style={styles.backButton}>
          <Ionicons name="arrow-back" size={18} color="#7C3AED" />
          <Text style={styles.backButtonText}>Back to Worship</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Salawat List</Text>
        <Text style={styles.instructions}>Long-press to pin a favourite ❤️</Text>

        <TextInput
          style={styles.searchInput}
          placeholder="Search salawat..."
          placeholderTextColor="#A78BFA"
          value={search}
          onChangeText={setSearch}
        />

        <TouchableOpacity style={styles.filterBtn} onPress={() => setShowFavesOnly(p => !p)}>
          <Text style={styles.filterTxt}>{showFavesOnly ? 'Show All' : 'Show Favourites Only'}</Text>
        </TouchableOpacity>

        <FlatList
          data={filtered}
          keyExtractor={(item) => item.name}
          contentContainerStyle={{ paddingBottom: 28 }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              onLongPress={() => toggleFavorite(item)}
              style={[styles.card, isFav(item) && styles.cardFav]}
            >
              {isFav(item) && <Text style={styles.heart}>❤️</Text>}

              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.arabic}>{item.arabic}</Text>
              <Text style={styles.translit}>{item.transliteration}</Text>
              <Text style={styles.meaning}>{item.meaning}</Text>

              <View style={styles.badge}>
                <Text style={styles.badgeTxt}>{item.virtue}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const COLORS = {
  deepPurple: '#7C3AED',
  lavender: '#EBDFF9',
  lightBg: '#FFF5FD',
  cardBg: '#FFFFFF',
  cardAlt: '#FFF8FF',
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: COLORS.lavender,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  backButtonText: {
    color: COLORS.deepPurple,
    fontSize: 14,
    fontWeight: '600',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.deepPurple,
    marginBottom: 6,
  },
  instructions: {
    fontSize: 13,
    fontStyle: 'italic',
    color: '#6D28D9',
    marginBottom: 14,
  },
  searchInput: {
    backgroundColor: COLORS.lavender,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 14,
    marginBottom: 12,
    color: '#4B0082',
  },
  filterBtn: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.lavender,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 18,
  },
  filterTxt: {
    color: COLORS.deepPurple,
    fontWeight: '600',
  },
  card: {
    position: 'relative',
    backgroundColor: COLORS.cardBg,
    borderRadius: 14,
    padding: 18,
    marginBottom: 16,
    shadowColor: '#BFA2DB',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  cardFav: { backgroundColor: COLORS.cardAlt },
  heart: {
    position: 'absolute',
    top: 10,
    right: 12,
    fontSize: 18,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4B0082',
    marginBottom: 8,
  },
  arabic: {
    fontSize: 20,
    textAlign: 'right',
    marginBottom: 6,
    color: '#222',
  },
  translit: {
    fontStyle: 'italic',
    color: '#666',
    marginBottom: 6,
  },
  meaning: {
    fontSize: 14,
    color: '#444',
    marginBottom: 10,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.lavender,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 14,
  },
  badgeTxt: {
    fontSize: 12,
    color: COLORS.deepPurple,
    fontWeight: '600',
  },
});