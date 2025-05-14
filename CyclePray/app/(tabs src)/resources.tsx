// app/screens/ResourcesScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Linking,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import {
  Ionicons,
  FontAwesome5,
  MaterialCommunityIcons,
  AntDesign,
} from '@expo/vector-icons';

// ────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ────────────────────────────────────────────────────────────
export default function ResourcesScreen() {
  const navigation = useNavigation();

  // active tab (all / physical / mental / spiritual)
  const [activeCategory, setActiveCategory] = useState('all');

  // favorites loaded from AsyncStorage
  const [favorites, setFavorites] = useState([]);

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
      case 'physical':
        return (
          <Ionicons
            name="fitness-outline"
            size={20}
            color="#6D28D9"
            style={styles.iconLeft}
          />
        );
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

  const categories = ['all', 'physical', 'mental', 'spiritual'];

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {/* ─── Header ───────────────────────────────────────────────────── */}
      <View style={styles.header}>
        <Image
          source={require('../../assets/images/icon.png')}
          style={styles.icon}
        />
        <Text style={styles.title}>Resource Center</Text>
        <Text style={styles.subtitle}>nurture your body, mind & soul 🌸</Text>
      </View>

      {/* ─── Category Filter Buttons ─────────────────────────────────── */}
      <View style={styles.filterRow}>
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[
              styles.filterButton,
              activeCategory === cat && styles.filterButtonActive,
            ]}
            onPress={() => setActiveCategory(cat)}
          >
            <Text
              style={[
                styles.filterText,
                activeCategory === cat && styles.filterTextActive,
              ]}
            >
              {cat.toUpperCase()}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* ─── Resource Sections ───────────────────────────────────────── */}
      {['physical', 'mental', 'spiritual'].map((category) => {
        if (activeCategory !== 'all' && activeCategory !== category) return null;

        return (
          <View key={category} style={styles.sectionWrapper}>
            <Text style={styles.sectionTitle}>
              {category.toUpperCase()} WELLNESS
            </Text>

            {resources
              .filter((r) => r.category === category)
              .map(({ title, description, screen }, idx) => (
                <LinearGradient
                  key={idx}
                  colors={['#EDE9FE', '#F5F3FF']}
                  style={styles.resourceCard}
                >
                  {/* Card header with main icon + fave heart */}
                  <View style={styles.cardHeader}>
                    {renderIcon(category)}
                    <Text style={styles.resourceCardTitle}>{title}</Text>

                    <TouchableOpacity
                      onPress={() => toggleFavorite(title)}
                      style={styles.favoriteBtn}
                    >
                      <AntDesign
                        name={isFavorited(title) ? 'heart' : 'hearto'}
                        size={18}
                        color={isFavorited(title) ? '#E11D48' : '#A78BFA'}
                      />
                    </TouchableOpacity>
                  </View>

                  <Text style={styles.resourceCardDescription}>
                    {description}
                  </Text>

                  <TouchableOpacity
                    style={styles.resourceCardButton}
                    onPress={() =>
                      screen.startsWith('http')
                        ? Linking.openURL(screen)
                        : navigation.navigate(screen)
                    }
                  >
                    <Text style={styles.resourceCardButtonText}>Learn More</Text>
                  </TouchableOpacity>
                </LinearGradient>
              ))}
          </View>
        );
      })}

      {/* ─── Placeholder Save Preferences (future use) ───────────────── */}
      <TouchableOpacity style={styles.saveButton}>
        <LinearGradient
          colors={['#8B5CF6', '#BFA2DB']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.saveButtonInner}
        >
          <Text style={styles.saveButtonText}>💾 Save Preferences</Text>
        </LinearGradient>
      </TouchableOpacity>
    </ScrollView>
  );
}

// ────────────────────────────────────────────────────────────
// RESOURCE DATA (20 items)
// ────────────────────────────────────────────────────────────
const resources = [
  // --- Physical (8) ---
  {
    title: 'Cramps Relief Tips',
    description: 'Effective techniques to relieve menstrual cramps.',
    screen:
      'https://www.healthline.com/health/womens-health/menstrual-cramp-relief',
    category: 'physical',
  },
  {
    title: 'Healthy Period Diet',
    description: 'How to eat well during your period for energy & wellness.',
    screen: 'https://www.medicalnewstoday.com/articles/period-diet',
    category: 'physical',
  },
  {
    title: 'Yoga for Menstruation',
    description: 'Yoga poses to ease pain and promote balance.',
    screen: 'https://www.yogajournal.com/poses/yoga-for-menstruation/',
    category: 'physical',
  },
  {
    title: 'Sleep Tips for Your Cycle',
    description: 'Improve your rest during menstruation with sleep advice.',
    screen: 'https://www.sleepfoundation.org/menstruation-and-sleep',
    category: 'physical',
  },
  {
    title: 'Hygiene Tips for Your Period',
    description:
      'Best practices for staying clean, fresh, and confident on your cycle.',
    screen: 'https://www.healthline.com/health/menstrual-hygiene-tips',
    category: 'physical',
  },
  {
    title: 'Period-Friendly Workouts',
    description:
      'Gentle exercise routines that support your body during menstruation.',
    screen:
      'https://www.self.com/story/best-workouts-for-every-phase-of-your-menstrual-cycle',
    category: 'physical',
  },
  {
    title: 'Product Comparison: Pads, Cups, Tampons',
    description: 'Pros and cons of common menstrual products.',
    screen: 'https://www.medicalnewstoday.com/articles/menstrual-cup-vs-tampon',
    category: 'physical',
  },
  {
    title: 'Herbal Teas for Cramp Relief',
    description: 'Natural teas that can help reduce bloating and cramps.',
    screen: 'https://www.healthline.com/nutrition/tea-for-cramps',
    category: 'physical',
  },

  // --- Mental (6) ---
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
      'https://yaqeeninstitute.org/read/paper/understanding-menstruation-in-islam',
    category: 'spiritual',
  },
  {
    title: 'Islamic Self-Care Practices',
    description: 'Holistic spiritual care from an Islamic perspective.',
    screen: 'https://www.productivemuslim.com/self-care-in-islam/',
    category: 'spiritual',
  },
  {
    title: 'Gratitude & Journaling Prompts',
    description: 'Faith-based journaling prompts to boost mindfulness.',
    screen: 'https://muslimjournal.com/gratitude-journaling',
    category: 'spiritual',
  },
  {
    title: 'Can I Pray During My Period?',
    description: 'Understanding rulings & mindset when unable to pray.',
    screen:
      'https://seekersguidance.org/answers/general-counsel/can-a-woman-pray-or-recite-the-quran-during-her-period/',
    category: 'spiritual',
  },
  {
    title: 'Spiritual Reflection Without Salah',
    description:
      'Ways to stay spiritually connected when you can’t perform prayer.',
    screen:
      'https://quranacademy.io/blog/ways-to-stay-connected-to-allah-during-menstruation/',
    category: 'spiritual',
  },
  {
    title: 'Daily Dhikr & Affirmations',
    description:
      'Simple dhikr and positive statements to maintain inner peace.',
    screen: 'https://quranicquotes.com/dhikr-phrases-from-quran/',
    category: 'spiritual',
  },
];

// ────────────────────────────────────────────────────────────
// STYLE SHEET
// ────────────────────────────────────────────────────────────
const COLORS = {
  primaryPurple: '#BFA2DB',
  accentPurple: '#D8B4FE',
  deepPurple: '#8B5CF6',
  lightBackground: '#F3E8FF',
  textDark: '#333333',
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.lightBackground },
  scrollContent: { padding: 20, paddingBottom: 80 },
  header: { alignItems: 'center', marginBottom: 20 },
  icon: { width: 65, height: 65, resizeMode: 'contain', marginBottom: 6 },
  title: { fontSize: 26, fontWeight: '700', color: COLORS.textDark },
  subtitle: {
    fontSize: 14,
    color: COLORS.deepPurple,
    marginTop: 4,
    fontStyle: 'italic',
  },

  // filter buttons
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  filterButton: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    backgroundColor: '#E9D5FF',
    borderRadius: 20,
    margin: 4,
  },
  filterButtonActive: {
    backgroundColor: '#8B5CF6',
  },
  filterText: { fontWeight: '500', color: '#5B21B6' },
  filterTextActive: { color: 'white' },

  // section & card
  sectionWrapper: { marginBottom: 32 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.deepPurple,
    marginBottom: 10,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  iconLeft: { marginRight: 10 },
  favoriteBtn: { marginLeft: 'auto', padding: 4 },

  resourceCard: {
    borderRadius: 18,
    padding: 20,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  resourceCardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textDark,
  },
  resourceCardDescription: {
    fontSize: 14,
    color: '#555',
    marginBottom: 12,
  },
  resourceCardButton: {
    alignSelf: 'flex-start',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: COLORS.deepPurple,
  },
  resourceCardButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },

  // bottom save button (placeholder)
  saveButton: {
    marginTop: 20,
    borderRadius: 30,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  saveButtonInner: {
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});
