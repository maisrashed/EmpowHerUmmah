import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const duasItems = [
  { text: "O Allah, make this a means of purification.", arabic: "اللَّهُمَّ اجْعَلْهُ سَبَبًا لِلتَّطْهِيرِ", type: "healing" },
  { text: "Ya Shafi, grant me strength and softness today.", arabic: "يَا شَافِي، أَعْطِنِي قُوَّةً وَلِينًا", type: "strength" },
  { text: "O Turner of hearts, keep my heart firm upon Your religion.", arabic: "يَا مُقَلِّبَ الْقُلُوبِ، ثَبِّتْ قَلْبِي عَلَى دِينِكَ", type: "faith" },
  { text: "O Allah, You love to forgive — so forgive me.", arabic: "اللَّهُمَّ إِنَّكَ عَفُوٌّ تُحِبُّ الْعَفْوَ فَاعْفُ عَنِّي", type: "forgiveness" },
  { text: "O Allah, grant me peace within myself.", arabic: "اللَّهُمَّ أَنْزِلْ السَّكِينَةَ فِي قَلْبِي", type: "peace" },
  { text: "Help me show gentleness to myself today.", arabic: "اللَّهُمَّ أَعِنِّي عَلَى لِينِ الذَّاتِ", type: "gentleness" },
  { text: "Wrap me in Your mercy, Ya Rahman.", arabic: "يَا رَحْمَٰنُ، ٱغْمُرْنِي بِرَحْمَتِكَ", type: "mercy" },
  { text: "Guide my heart, soothe my soul.", arabic: "ٱهْدِ قَلْبِي وَهَدِّئْ نَفْسِي", type: "guidance" },
  { text: "O Allah, replace my fear with trust in You.", arabic: "ٱللَّهُمَّ ٱسْتَبْدِلْ خَوْفِي بِثِقَةٍ فِيكَ", type: "trust" },
  { text: "Grant me serenity in this sacred pause.", arabic: "ٱللَّهُمَّ ٱمْنَحْنِي ٱلسَّكِينَةَ فِي هَذَا ٱلْوَقْتِ ٱلْمُقَدَّسِ", type: "peace" },
  { text: "O Allah, grant me clarity and calmness.", arabic: "ٱللَّهُمَّ ٱرْزُقْنِي ٱلْوُضُوحَ وَٱلْهُدُوءَ", type: "clarity" },
  { text: "Strengthen my faith in moments of doubt.", arabic: "ٱللَّهُمَّ قَوِّ إِيمَانِي فِي لَحَظَاتِ ٱلشَّكِّ", type: "faith" },
  { text: "Ya Noor, bring light into my darkness.", arabic: "يَا نُورُ، أَنْرِ دَاخِلِي فِي ٱلظَّلَامِ", type: "light" },
  { text: "O Allah, calm the noise inside me.", arabic: "ٱللَّهُمَّ ٱسْكِتْ ٱلضَّجِيجَ دَاخِلِي", type: "tranquility" },
  { text: "Make me content with what You’ve given me.", arabic: "ٱللَّهُمَّ ٱجْعَلْنِي رَاضِيًا بِمَا قَسَمْتَ لِي", type: "contentment" }
];

export default function DuasScreen() {
  const [favorites, setFavorites] = useState([]);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('@favorite_duas').then(data => {
      if (data) setFavorites(JSON.parse(data));
    });
  }, []);

  const toggleFavorite = (text) => {
    const updated = favorites.includes(text)
      ? favorites.filter(item => item !== text)
      : [...favorites, text];
    setFavorites(updated);
    AsyncStorage.setItem('@favorite_duas', JSON.stringify(updated));
  };

  const sortedItems = [
    ...duasItems.filter(item => favorites.includes(item.text)),
    ...duasItems.filter(item => !favorites.includes(item.text))
  ];

  const filteredItems = showFavoritesOnly
    ? sortedItems.filter(item => favorites.includes(item.text))
    : sortedItems;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>📿 Du'as</Text>
      <Text style={styles.instructions}>Long press on any du'a to save it to the top ❤️</Text>
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
