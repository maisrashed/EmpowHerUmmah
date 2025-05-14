import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function HomeScreen() {
  const [mood, setMood] = useState('');
  const [flow, setFlow] = useState('');

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={require('../../assets/images/icon.png')} style={styles.icon} />
        <Text style={styles.title}>Welcome Back, Noor!</Text>
        <Text style={styles.subtitle}>May your day be peaceful and fulfilling 💖</Text>
      </View>

      {/* Recent Activity */}
      <LinearGradient colors={['#F3E8FF', '#E9D5FF']} style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Recent Activity</Text>
        <View style={styles.activityRow}>
          <TouchableOpacity style={styles.activityCard}>
            <Text style={styles.activityLabel}>Last Dua Recited</Text>
            <LinearGradient colors={['#8B5CF6', '#BFA2DB']} style={styles.gradientButton}>
              <Text style={styles.buttonText}>+ Click Me</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity style={styles.activityCard}>
            <Text style={styles.activityLabel}>Last Dhikr Length</Text>
            <Text style={styles.activityValue}>10 min</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Mood Section */}
      <LinearGradient colors={['#F3E8FF', '#E9D5FF']} style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>How are you feeling?</Text>
        <View style={styles.moodRow}>
          {['😊 Happy', '😔 Sad', '😡 Angry', '😴 Tired'].map((item) => (
            <TouchableOpacity
              key={item}
              style={[
                styles.moodCard,
                mood === item && { borderColor: COLORS.deepPurple },
              ]}
              onPress={() => setMood(item)}
            >
              <Text style={styles.moodText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </LinearGradient>

      {/* Flow Section */}
      <LinearGradient colors={['#F3E8FF', '#E9D5FF']} style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>How is your flow today?</Text>
        <View style={styles.moodRow}>
          {['💧 Light', '💧💧 Medium', '💧💧💧 Heavy'].map((item) => (
            <TouchableOpacity
              key={item}
              style={[
                styles.moodCard,
                flow === item && { borderColor: COLORS.deepPurple },
              ]}
              onPress={() => setFlow(item)}
            >
              <Text style={styles.moodText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </LinearGradient>
    </ScrollView>
  );
}

const COLORS = {
  primaryPurple: '#BFA2DB',
  accentPurple: '#D8B4FE',
  deepPurple: '#8B5CF6',
  lightBackground: '#F3E8FF',
  textDark: '#333333',
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.lightBackground,
    padding: 20,
    paddingTop: 60,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  icon: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: COLORS.textDark,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.textDark,
    marginTop: 5,
  },
  sectionCard: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 30,
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.textDark,
    marginBottom: 15,
  },
  activityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  activityCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  activityLabel: {
    fontSize: 14,
    color: COLORS.textDark,
    marginBottom: 10,
    textAlign: 'center',
  },
  activityValue: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.deepPurple,
  },
  gradientButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  moodRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  moodCard: {
    width: '47%',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginBottom: 15,
  },
  moodText: {
    fontSize: 16,
    color: COLORS.textDark,
    textAlign: 'center',
  },
});
