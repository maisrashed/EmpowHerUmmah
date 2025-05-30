import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
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
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Image source={require('../assets/images/icon.png')} style={styles.logo} />

      <Text style={styles.description}>
        A gentle space for Muslim women to track their cycle and stay spiritually connected 💖
      </Text>

      <Text style={styles.inputLabel}>What should we call you?</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
        placeholderTextColor="#aaa"
      />

      <TouchableOpacity
        onPress={handleContinue}
        style={{ borderRadius: 30, overflow: 'hidden', marginTop: 30 }}
      >
        <LinearGradient
          colors={['#BFA2DB', '#8B5CF6']}
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
  deepPurple: '#8B5CF6',
  background: '#F8F3FF',
  textDark: '#333',
  inputBorder: '#D1C4E9',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  logo: {
    width: 160,
    height: 160,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  description: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.textDark,
    marginBottom: 40,
    lineHeight: 24,
    paddingHorizontal: 10,
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
    borderColor: COLORS.inputBorder,
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    textAlign: 'center',
    fontSize: 16,
    color: COLORS.textDark,
  },
  continueButton: {
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    width: 200,
    shadowColor: COLORS.deepPurple,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 6,
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});
