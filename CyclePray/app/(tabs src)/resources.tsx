import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Linking,
  FlatList,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import {
  FontAwesome5,
  MaterialCommunityIcons,
  AntDesign,
} from '@expo/vector-icons';

import { 
  useFonts as usePlayfairFonts, 
  PlayfairDisplay_700Bold 
} from '@expo-google-fonts/playfair-display';

import { 
  useFonts as usePoppinsFonts, 
  Poppins_400Regular, 
  Poppins_600SemiBold 
} from '@expo-google-fonts/poppins';

export default function ResourcesScreen() {
  const navigation = useNavigation();

  const [activeCategory, setActiveCategory] = useState('all');
  const [favorites, setFavorites] = useState([]);

  const [playfairLoaded] = usePlayfairFonts({ PlayfairDisplay_700Bold });
  const [poppinsLoaded] = usePoppinsFonts({ Poppins_400Regular, Poppins_600SemiBold });

  useEffect(() => {
    const loadFavorites = async () => {
      const saved = await AsyncStorage.getItem('@favorite_resources');
      if (saved) setFavorites(JSON.parse(saved));
    };
    loadFavorites();
  }, []);

  const toggleFavorite = async (title) => {
    const updated = favorites.includes(title)
      ? favorites.filter((item) => item !== title)
      : [...favorites, title];
    setFavorites(updated);
    await AsyncStorage.setItem('@favorite_resources', JSON.stringify(updated));
  };

  const isFavorited = (title) => favorites.includes(title);

  const renderIcon = (category) => {
    switch (category) {
      case 'mental':
        return (
          <MaterialCommunityIcons
            name="head-heart-outline"
            size={20}
            color="#6D28D9"
            style={styles.iconLeft}
          />
        );
      case 'spiritual':
        return (
          <FontAwesome5
            name="mosque"
            size={20}
            color="#6D28D9"
            style={styles.iconLeft}
          />
        );
      default:
        return null;
    }
  };

  const categories = ['all', 'mental', 'spiritual'];

  const filteredResources = resources.filter((r) =>
    activeCategory === 'all' ? true : r.category === activeCategory
  );

  if (!playfairLoaded || !poppinsLoaded) return null;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Resource Center</Text>
        <Text style={styles.subtitle}>nurture your body, mind & soul 🌸</Text>
      </View>

      <View style={styles.filterRow}>
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[styles.filterButton, activeCategory === cat && styles.filterButtonActive]}
            onPress={() => setActiveCategory(cat)}
          >
            <Text style={[styles.filterText, activeCategory === cat && styles.filterTextActive]}>
              {cat.toUpperCase()}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {['mental', 'spiritual'].map((category) => {
        if (activeCategory !== 'all' && activeCategory !== category) return null;
        const sectionResources = resources.filter((r) => r.category === category);

        return (
          <View key={category} style={styles.sectionWrapper}>
            <Text style={styles.sectionTitle}>{category.toUpperCase()} WELLNESS</Text>
            <FlatList
              data={sectionResources}
              keyExtractor={(item, index) => index.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalList}
              renderItem={({ item }) => (
                <LinearGradient colors={['#EDE9FE', '#F5F3FF']} style={styles.resourceCard}>
                  <View style={styles.cardHeader}>
                    {renderIcon(item.category)}
                    <Text style={styles.resourceCardTitle}>{item.title}</Text>
                    <TouchableOpacity onPress={() => toggleFavorite(item.title)} style={styles.favoriteBtn}>
                      <AntDesign
                        name={isFavorited(item.title) ? 'heart' : 'hearto'}
                        size={18}
                        color={isFavorited(item.title) ? '#E11D48' : '#A78BFA'}
                      />
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.resourceCardDescription}>{item.description}</Text>
                  <TouchableOpacity
                    style={styles.resourceCardButton}
                    onPress={() => item.screen.startsWith('http') ? Linking.openURL(item.screen) : navigation.navigate(item.screen)}
                  >
                    <Text style={styles.resourceCardButtonText}>Learn More</Text>
                  </TouchableOpacity>
                </LinearGradient>
              )}
            />
          </View>
        );
      })}
    </ScrollView>
  );
}

const resources = [
  {
    title: 'Understanding PMS',
    description: 'Causes, symptoms, and coping tips for PMS.',
    screen:
      'https://www.plannedparenthood.org/learn/health-and-wellness/premenstrual-syndrome',
    category: 'mental',
  },
  {
    title: 'Mental Health During Periods',
    description: 'Managing anxiety, sadness, and emotional changes.',
    screen:
      'https://www.mind.org.uk/information-support/types-of-mental-health-problems/premenstrual-dysphoric-disorder-pmdd/',
    category: 'mental',
  },
  {
    title: 'Managing Stress With Mindfulness',
    description:
      'Gentle meditations and practices to calm your nervous system.',
    screen: 'https://www.headspace.com/meditation/stress',
    category: 'mental',
  },
  {
    title: 'Cycle Syncing & Mental Focus',
    description:
      'Plan your productivity and creativity around hormonal phases.',
    screen: 'https://www.cyclingwithmyflow.com/productivity-hormones/',
    category: 'mental',
  },
  {
    title: 'Mood Swings Explained',
    description: 'Why moods shift & how to cope with kindness.',
    screen: 'https://www.medicalnewstoday.com/articles/pms-mood-swings',
    category: 'mental',
  },
  {
    title: 'Journaling Through Hormonal Changes',
    description:
      'Use reflective writing to manage emotions during your period.',
    screen:
      'https://www.psychologytoday.com/us/blog/the-empowerment-diary/202001/journaling-through-your-cycle',
    category: 'mental',
  },

  // --- Spiritual (6) ---
  {
    title: 'Islam & Menstruation',
    description:
      'Faith-based insights and rulings about menstruation in Islam.',
    screen:
      'https://www.imana.org/wp-content/uploads/2019/12/MenstruationPart2-Updated.pdf',
    category: 'spiritual',
  },
  {
    title: 'Islamic Self-Care Practices',
    description: 'Holistic spiritual care from an Islamic perspective.',
    screen: 'https://masjideumar.co.uk/files/islamic-living/11-03-17_B.pdf',
    category: 'spiritual',
  },
  {
    title: 'Gratitude & Journaling Prompts',
    description: 'Faith-based journaling prompts to boost mindfulness.',
    screen: 'https://4713562.fs1.hubspotusercontent-na1.net/hubfs/4713562/Website-Paper-PDFs/The%20Art%20of%20Gratitude_%20Quranic%20Themes%20on%20Shukr.pdf',
    category: 'spiritual',
  },
  {
    title: 'Can I Pray During My Period?',
    description: 'Understanding rulings & mindset when unable to pray.',
    screen:
      'https://maktabahassunnahblog.wordpress.com/wp-content/uploads/2015/11/islamic-rulings-on-menstruation-postpartum-condition.pdf',
    category: 'spiritual',
  },
  {
    title: 'Spiritual Reflection Without Salah',
    description:
      'Ways to stay spiritually connected when you can’t perform prayer.',
    screen:
      'https://spiritualpc.net/wp-content/uploads/2020/02/69_keskinoglu.pdf',
    category: 'spiritual',
  },
  {
    title: 'Daily Dhikr & Affirmations',
    description:
      'Simple dhikr and positive statements to maintain inner peace.',
    screen: 'https://dhikr.io/wp-content/uploads/2021/01/Powerful-Daily-Dhikr-Short.pdf',
    category: 'spiritual',
  },
];

const COLORS = {
  primaryPurple: '#BFA2DB',
  accentPurple: '#D8B4FE',
  deepPurple: '#8B5CF6',
  lightBackground: '#F3E8FF',
  textDark: '#333333',
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.lightBackground },
  header: { alignItems: 'center', marginVertical: 20 },
  title: { fontSize: 26,  marginTop: 50, fontFamily: 'PlayfairDisplay_700Bold', color: COLORS.textDark },
  subtitle: { fontSize: 14, fontFamily: 'Poppins_400Regular', color: COLORS.deepPurple, marginTop: 6, fontStyle: 'italic' },
  filterRow: { flexDirection: 'row', justifyContent: 'center', marginBottom: 16 },
  filterButton: { paddingVertical: 6, paddingHorizontal: 14, backgroundColor: '#E9D5FF', borderRadius: 20, margin: 4 },
  filterButtonActive: { backgroundColor: '#8B5CF6' },
  filterText: { fontFamily: 'Poppins_400Regular', fontWeight: '500', color: '#5B21B6' },
  filterTextActive: { color: 'white' },
  sectionWrapper: { marginBottom: 32 },
  sectionTitle: { fontSize: 18, fontFamily: 'PlayfairDisplay_700Bold', color: COLORS.deepPurple, marginBottom: 12, marginTop: 20, marginLeft: '5%'},
  horizontalList: { paddingHorizontal: 10, paddingBottom: 30 },
  resourceCard: { width: 280, marginRight: 16, borderRadius: 18, padding: 20, shadowColor: '#000', shadowOpacity: 0.05, shadowOffset: { width: 0, height: 2 }, shadowRadius: 6, elevation: 3 },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  iconLeft: { marginRight: 10 },
  favoriteBtn: { marginLeft: 'auto', padding: 4 },
  resourceCardTitle: { fontSize: 16, fontFamily: 'Poppins_600SemiBold', color: COLORS.textDark },
  resourceCardDescription: { fontSize: 14, fontFamily: 'Poppins_400Regular', color: '#555', marginBottom: 12 },
  resourceCardButton: { alignSelf: 'flex-start', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, backgroundColor: COLORS.deepPurple },
  resourceCardButtonText: { color: '#fff', fontSize: 14, fontFamily: 'Poppins_600SemiBold' },
});
