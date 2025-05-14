import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

export default function ResourcesScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../../assets/images/icon.png')} style={styles.icon} />
        <Text style={styles.title}>Resource Center</Text>
      </View>

      {/* Resource Card 1 */}
      <View style={styles.resourceCard}>
        <Text style={styles.resourceCardTitle}>Cramps Relief Tips</Text>
        <Text style={styles.resourceCardDescription}>
          Discover effective techniques to relieve menstrual cramps. Natural remedies and expert advice.
        </Text>
        <TouchableOpacity
          style={styles.resourceCardButton}
          onPress={() => navigation.navigate('CrampsRelief')}>
          <Text style={styles.resourceCardButtonText}>Learn More</Text>
        </TouchableOpacity>
      </View>

      {/* Resource Card 2 */}
      <View style={styles.resourceCard}>
        <Text style={styles.resourceCardTitle}>Healthy Period Diet</Text>
        <Text style={styles.resourceCardDescription}>
          A guide to eating well during your period to support your health and energy levels.
        </Text>
        <TouchableOpacity
          style={styles.resourceCardButton}
          onPress={() => navigation.navigate('HealthyDiet')}>
          <Text style={styles.resourceCardButtonText}>Learn More</Text>
        </TouchableOpacity>
      </View>

      {/* Resource Card 3 */}
      <View style={styles.resourceCard}>
        <Text style={styles.resourceCardTitle}>Yoga for Menstruation</Text>
        <Text style={styles.resourceCardDescription}>
          Explore yoga poses that can ease menstrual pain and improve overall wellness during your cycle.
        </Text>
        <TouchableOpacity
          style={styles.resourceCardButton}
          onPress={() => navigation.navigate('YogaForMenstruation')}>
          <Text style={styles.resourceCardButtonText}>Learn More</Text>
        </TouchableOpacity>
      </View>

      {/* Save Data Button */}
      <TouchableOpacity style={styles.saveButton}>
        <LinearGradient
          colors={['#8B5CF6', '#BFA2DB']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.saveButtonInner}
        >
          <Text style={styles.saveButtonText}>Save Resource Preferences</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

const COLORS = {
  primaryPurple: '#BFA2DB',
  accentPurple: '#D8B4FE',
  deepPurple: '#8B5CF6',
  lightBackground: '#F3E8FF',
  neutralGray: '#E0E0E0',
  textDark: '#333333',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightBackground,
    padding: 20,
    paddingTop: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  icon: {
    width: 175,
    height: 70,
    marginTop: 5,
    marginRight: 265,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.textDark,
    textAlign: 'center',
    marginTop: -2,
  },
  resourceCard: {
    backgroundColor: '#EDE9FE',
    padding: 20,
    marginBottom: 20,
    borderRadius: 15,
  },
  resourceCardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.textDark,
  },
  resourceCardDescription: {
    fontSize: 14,
    color: COLORS.textDark,
    marginVertical: 10,
  },
  resourceCardButton: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: COLORS.deepPurple,
  },
  resourceCardButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  saveButton: {
    marginTop: 20,
    borderRadius: 30,
    overflow: 'hidden',
  },
  saveButtonInner: {
    paddingVertical: 15,
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
