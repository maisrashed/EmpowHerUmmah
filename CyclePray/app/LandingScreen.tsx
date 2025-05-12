import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, KeyboardAvoidingView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

export default function LandingScreen() {
  const [name, setName] = useState('');
  const navigation = useNavigation();

  const handleContinue = async () => {
    if (name.trim() === '') return;
    try {
      await AsyncStorage.setItem('@user_name', name);
      navigation.navigate('(tabs src)');
    } catch (error) {
      console.error('Error saving name:', error);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Text style={styles.welcome}>WELCOME TO</Text>
      <Image source={require('../assets/images/icon.png')} style={styles.logo} />
      <Text style={styles.appName}>CyclePray</Text>
      <Text style={styles.description}>
        An app for Muslim women to track periods and stay spiritually connected. 💖
      </Text>

      <Text style={styles.inputLabel}>WHAT SHOULD WE CALL YOU?</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
      />

      <TouchableOpacity onPress={handleContinue} style={{ borderRadius: 30, overflow: 'hidden', marginTop: 30 }}>
        <LinearGradient
          colors={['#8B5CF6', '#BFA2DB']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.continueButton}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </LinearGradient>
      </TouchableOpacity>
    </KeyboardAvoidingView>
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
    flex: 1,
    backgroundColor: COLORS.lightBackground,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  welcome: {
    fontSize: 16,
    color: COLORS.textDark,
    marginBottom: 10,
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  appName: {
    fontSize: 32,
    fontWeight: '700',
    color: COLORS.deepPurple,
    marginBottom: 10,
  },
  description: {
    textAlign: 'center',
    fontSize: 16,
    color: COLORS.textDark,
    marginBottom: 40,
    paddingHorizontal: 20,
    lineHeight: 24,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textDark,
    marginBottom: 8,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: COLORS.neutralGray,
    borderRadius: 10,
    padding: 12,
    backgroundColor: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
  continueButton: {
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 5,
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});
