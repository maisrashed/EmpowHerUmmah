import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  Alert,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  const greetings = [
    'As-salamu alaikum, Noor 🌸',
    'Peace be upon you, Noor 🌷',
    'Welcome back, Noor 🌺',
    'Hey Noor 🧕 Ready to recharge?',
    'May your day be soft and sacred 🌼',
    'Salam Noor! You’re doing amazing 💫',
    'Welcome, lovely soul 🌿',
    'Noor, you are light in motion 🕊️',
    'Hi Noor! Your softness is your strength ✨',
    'You’re enough, Noor 🤍',
    'So glad you’re here 🌙',
    'Welcome back, beautiful 🌸',
    'You are safe here, Noor 💐',
    'Hey hey Noor! 🌞',
    'Your journey is valid and sacred 📿',
  ];
  const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];

  const verses = [
    '"Indeed, with hardship comes ease." — Qur\'an 94:6',
    '"And He found you lost and guided [you]." — Qur\'an 93:7',
    '"Unquestionably, by the remembrance of Allah hearts are assured." — Qur\'an 13:28',
    '"Verily, after every difficulty there is relief." — Qur\'an 94:5',
    '"So remember Me; I will remember you." — Qur\'an 2:152',
    '"My mercy encompasses all things." — Qur\'an 7:156',
    '"He is with you wherever you are." — Qur\'an 57:4',
    '"Do not despair of the mercy of Allah." — Qur\'an 39:53',
    '"Your Lord has not forsaken you." — Qur\'an 93:3',
    '"Allah does not burden a soul beyond that it can bear." — Qur\'an 2:286',
    '"He knows what is within the hearts." — Qur\'an 11:5',
    '"Put your trust in Allah." — Qur\'an 3:159',
    '"He created you in stages." — Qur\'an 71:14',
    '"He is the best of planners." — Qur\'an 3:54',
    '"And We know what his soul whispers to him." — Qur\'an 50:16',
  ];
  const randomVerse = verses[Math.floor(Math.random() * verses.length)];

  const careTips = [
    'Breathe deeply for 10 seconds 🫧',
    'Rest your jaw and shoulders 🌿',
    'Sip something warm 🥣',
    'Grant yourself permission to slow down 🕊️',
    'Take 3 mindful breaths 🌬️',
    'Stretch your arms ☁️',
    'Drink a full glass of water 💧',
    'Text someone comforting 🫂',
    'Blanket + eye rest 🛌',
    'Light a candle & recite a du’a 🕯️',
    'Smile at yourself in the mirror 😌',
    'Name 3 blessings 🍃',
    'Open a window for fresh air 🌬️',
    'Pause multitasking. Just be 🌙',
    'Whisper a peace-giving du’a 📿',
  ];
  const randomTip = careTips[Math.floor(Math.random() * careTips.length)];

  const worshipReminders = [
    "You’re still deeply connected to Allah — even when you’re not praying. Du’a, dhikr, and intention are powerful forms of worship 💞",
    "Every whisper of du’a reaches the One who hears all 📿",
    "Your rest can be an act of worship when paired with gratitude 🌙",
    "Silent dhikr still polishes the heart ✨",
    "Allah sees the tears you don’t explain 🤲",
    "You're worshiping by just trying, even in small ways 💖",
    "Your heart turning toward Allah is worship itself 💫",
    "Even your pain is not lost on Allah — keep going 🤍",
    "Praying with a heavy heart is still prayer 🕊️",
    "Your cycle is sacred. Honor it. Reflect. You are still beloved 💐",
  ];
  const randomWorshipReminder = worshipReminders[Math.floor(Math.random() * worshipReminders.length)];

  const justForMeOptions = [
    '✨ Close your eyes and take 3 deep breaths.',
    '📿 Say “Alhamdulillah” for something tiny.',
    '📝 Journal: “What does my body need today?”',
    '💖 Reminder: Rest is a mercy, not a weakness.',
    '📖 Listen to Surah Ad-Duha for comfort.',
    '🕯️ Light a candle and be still.',
    '🌧️ Sit by a window for 2 minutes.',
    '🥰 Whisper: “I am worthy of gentleness.”',
    '🙏 Hand on heart, say “Bismillah.”',
    '🌺 Do nothing for 60 seconds — that’s enough.',
    '📿 Say SubhanAllah 33 times.',
    '🤲 Ask Allah for exactly what you need.',
    '🌈 Imagine yourself wrapped in divine mercy.',
    '🍯 Make yourself a tiny treat or tea.',
    '🎧 Play your favourite Qur’an recitation.',
  ];
  const handleJustForMe = () => {
    const msg = justForMeOptions[Math.floor(Math.random() * justForMeOptions.length)];
    Alert.alert('Just for You 💌', msg);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Image source={require('../../assets/images/icon.png')} style={styles.icon} />
        <Text style={styles.title}>{randomGreeting}</Text>
        <Text style={styles.subtitle}>{randomVerse}</Text>
      </View>

      <View style={styles.quickLinks}>
        {[
          { label: 'Notebook', emoji: '📝', link: '/notebook' },
          { label: 'Resources', emoji: '📚', link: '/resources' },
          { label: 'Worship', emoji: '🌙', link: '/worship' },
          { label: 'Your Cycle', emoji: '🧕', link: '/calendar' },
        ].map(({ label, emoji, link }) => (
          <LinearGradient
            key={label}
            colors={['#EBDCFD', '#D7C4F1']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.linkGradient}
          >
            <Pressable
              onPress={() => router.push(link)}
              style={({ pressed, hovered }) => [
                styles.linkCard,
                pressed && styles.linkPressed,
                hovered && styles.linkHover,
              ]}
            >
              <Text style={styles.linkEmoji}>{emoji}</Text>
              <Text style={styles.linkText}>{label}</Text>
            </Pressable>
          </LinearGradient>
        ))}
      </View>

      <View style={{ alignItems: 'center' }}>
        <LinearGradient colors={['#CDB5F6', '#B89DEB']}style={styles.tipCard}>
          <Text style={styles.tipTitle}>🧴 Self-Care Tip</Text>
          <Text style={styles.tipText}>{randomTip}</Text>
        </LinearGradient>
      </View>

      <View style={{ alignItems: 'center' }}>
      <LinearGradient colors={['#BFA2F2', '#A98BEF']} style={styles.tipCard}>
      <Text style={styles.tipTitle}>🌙 Worship Reminder</Text>
          <Text style={styles.tipText}>{randomWorshipReminder}</Text>
        </LinearGradient>
      </View>

      <Pressable style={styles.justForMeButton} onPress={handleJustForMe}>
        <Text style={styles.justForMeText}>🎁 Just for Me</Text>
      </Pressable>
    </ScrollView>
  );
}

const COLORS = {
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
    width: 90,
    height: 90,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    color: COLORS.textDark,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.textDark,
    marginTop: 8,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  quickLinks: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  linkGradient: {
    width: '48%',
    borderRadius: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
    borderWidth: 3,
    borderColor: '#D8B4FE'
  },
  linkCard: {
    borderRadius: 24,
    paddingVertical: 30,
    paddingHorizontal: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  linkPressed: {
    transform: [{ scale: 0.97 }],
    opacity: 0.8,
  },
  linkHover: {
    backgroundColor: '#F3F4F6',
  },
  linkEmoji: {
    fontSize: 18,
    marginBottom: 8,
  },
  linkText: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.textDark,
  },
  tipCard: {
    width: '100%',
    maxWidth: 400,
    borderRadius: 24,
    padding: 22,
    marginBottom: 22,
    shadowColor: '#B794F4',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 4,
  },
  tipTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.textDark,
    marginBottom: 10,
    textAlign: 'center',
  },
  tipText: {
    fontSize: 18,
    color: COLORS.textDark,
    lineHeight: 22,
    textAlign: 'center',
  },
  justForMeButton: {
    backgroundColor: COLORS.deepPurple,
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 40,
  },
  justForMeText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
