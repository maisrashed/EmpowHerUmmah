import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const sahabiyatItems = [
  { name: "Khadijah bint Khuwaylid", title: "The First Believer", story: "When the Prophet ﷺ came home after the first revelation, shaking with fear and confusion, Khadijah (RA) did not question him. Instead, she wrapped him in a cloak and affirmed his character, saying, 'By Allah, He will never disgrace you.' She took him to her cousin Waraqah ibn Nawfal to seek clarity. Khadijah was not just the first to believe in Islam—she gave her wealth, home, and heart to support the Prophet in the earliest and most difficult days of the mission.", virtue: "Loyalty and Support" },
  { name: "Fatimah bint Muhammad", title: "The Prophet’s Heart", story: "Fatimah (RA), the youngest daughter of the Prophet ﷺ, grew up witnessing hardship. She saw her father insulted and attacked, and as a child, would wipe the dirt from his back and soothe him. She carried herself with dignity, married Ali ibn Abi Talib (RA), and raised children who would become leaders of the Ummah. When the Prophet ﷺ told her she would be the first from his family to join him after death, she smiled. She passed away just six months later.", virtue: "Compassion and Strength" },
  { name: "Nusaybah bint Ka’ab", title: "The Warrior of Uhud", story: "Nusaybah (RA) was originally at the Battle of Uhud to provide water and care for the injured. But when the tide turned against the Muslims and the Prophet ﷺ was under threat, she grabbed a sword and shield and fought fiercely to defend him. Despite sustaining numerous wounds, she stayed close to him. The Prophet ﷺ himself praised her bravery and wished that her family would be his companions in Paradise.", virtue: "Courage in Action" },
  { name: "Asma bint Abu Bakr", title: "The Woman of Two Belts", story: "During the Prophet’s secret migration to Medina, Asma (RA), daughter of Abu Bakr (RA), risked her life to bring them food while they hid in the cave of Thawr. She tore her waistband in half to secure the provisions, earning the nickname 'Dhat al-Nitaqayn' (the woman of two belts). When the Quraysh discovered her role, Abu Jahl struck her face—but she stood firm. Years later, as an elderly woman, she encouraged her son Abdullah ibn Zubayr to stand with honor and dignity, even at the cost of his life.", virtue: "Fearless Sacrifice" },
  { name: "Sumayyah bint Khayyat", title: "The First Martyr", story: "Sumayyah (RA), a formerly enslaved woman, was among the very first to accept Islam. She was tortured in the blazing sun by her master for her faith. Even when threatened with death, she refused to renounce Islam. Abu Jahl ultimately murdered her with a spear. She became the first martyr in the history of Islam, honored eternally for her sacrifice.", virtue: "Unbreakable Faith" },
  { name: "Umm Salamah", title: "The Voice of Wisdom", story: "Umm Salamah (RA) faced great hardship when she emigrated to Medina. Her family was torn apart, but she remained patient and faithful. She later married the Prophet ﷺ and became one of his wisest wives. After the Treaty of Hudaybiyyah, when the companions hesitated to act, she advised the Prophet ﷺ to silently complete his rituals—prompting the companions to follow. Her wisdom prevented division and honored the Prophet’s leadership.", virtue: "Wisdom and Diplomacy" },
  { name: "Hafsah bint Umar", title: "The Guardian of the Qur’an", story: "Hafsah (RA), daughter of Umar ibn al-Khattab (RA), was known for her intellect and piety. After the Prophet’s death, the written collection of the Qur’an was entrusted to her for safekeeping. She preserved it diligently, and her copy became the foundation for the standardized Uthmani script we have today. Her sharp memory and responsibility helped preserve the words of Allah for generations to come.", virtue: "Trust and Intelligence" },
  { name: "Umm Ammarah (Nusaybah)", title: "The Fierce Defender", story: "Also known as Umm Ammarah, Nusaybah participated in several battles, not just Uhud. At Hunayn and Yamamah, she was wounded again while holding the Islamic banner high. She even asked the Prophet ﷺ to pray for her place in Jannah, and he did. Her courage was so intense that the Prophet said, 'Wherever I turned, I saw her defending me.'", virtue: "Unshakable Valor" },
  { name: "Rufaida Al-Aslamiyyah", title: "The First Nurse", story: "Rufaida (RA) trained other women in basic medical care and was known for her compassion and organization. During battles, she set up field clinics and treated the wounded. She was given a tent next to the Prophet’s mosque to provide care, making her the first female medical worker in Islam. Her contributions inspired a legacy of women in healthcare.", virtue: "Healing and Leadership" },
  { name: "Umm Sulaym", title: "The Faithful Educator", story: "Umm Sulaym (RA) accepted Islam early, even though her husband refused. After he died, she raised her son Anas ibn Malik with Islamic values. When Abu Talhah proposed to her, she made Islam her only condition for marriage. He embraced the faith, and they became a model of a righteous family. Her son, Anas, would go on to serve the Prophet ﷺ and narrate hundreds of hadiths.", virtue: "Devotion and Nurturing" },
  { name: "Zaynab bint Jahsh", title: "The Humble Devotee", story: "Zaynab (RA), a cousin of the Prophet ﷺ and one of his wives, was known for her humility, worship, and charity. She would sew by hand and give away everything she had to the poor. When she passed away, Aisha (RA) said, 'She was the most generous among us.'", virtue: "Charity and Simplicity" },
  { name: "Safiyyah bint Abdul-Muttalib", title: "The Lioness of Islam", story: "Safiyyah (RA), the Prophet’s aunt, was known for her bravery. During the Battle of the Trench, when an enemy spy tried to sneak into the fortress where Muslim women and children were hiding, Safiyyah herself struck him down. Her boldness protected the entire camp without hesitation.", virtue: "Boldness and Initiative" },
  { name: "Umm Waraqah", title: "The Qur'an Preserver", story: "Umm Waraqah (RA) was so knowledgeable of the Qur’an that the Prophet ﷺ referred to her as 'the martyr' even before her death. He allowed her to lead prayers for her household. She memorized the Qur’an and was dedicated to worship, remembrance, and service to the community.", virtue: "Piety and Scholarship" },
  { name: "Atikah bint Zayd", title: "The Eloquent Believer", story: "Atikah (RA) was married to multiple key companions including Umar ibn al-Khattab and Abdullah ibn Abu Bakr. She was known for her poetry, intellect, and courage. After Umar’s assassination, she mourned him with such eloquence that her poems are remembered in history.", virtue: "Expression and Loyalty" },
  { name: "Lubabah bint Al-Harith (Umm Fadl)", title: "The First Woman After Khadijah", story: "Lubabah (RA), wife of Abbas ibn Abdul-Muttalib, accepted Islam right after Khadijah. She was deeply connected to the Prophet ﷺ and even helped in nurturing his grandchildren. She once struck a man who insulted the Prophet, showing her fearless defense of Islam.", virtue: "Devotion and Defense" },
];

export default function SahabiyatScreen() {
    const [favorites, setFavorites] = useState<string[]>([]);
    const [showFavesOnly, setShowFavesOnly] = useState(false);
  
    useEffect(() => {
      AsyncStorage.getItem('@favorite_sahabiyat').then(data => {
        if (data) setFavorites(JSON.parse(data));
      });
    }, []);
  
    const toggleFavorite = (name: string) => {
      const updated = favorites.includes(name)
        ? favorites.filter(n => n !== name)
        : [...favorites, name];
      setFavorites(updated);
      AsyncStorage.setItem('@favorite_sahabiyat', JSON.stringify(updated));
    };
  
    const sorted = [
      ...sahabiyatItems.filter(s => favorites.includes(s.name)),
      ...sahabiyatItems.filter(s => !favorites.includes(s.name)),
    ];
  
    const list = showFavesOnly ? sorted.filter(s => favorites.includes(s.name)) : sorted;
  
    return (
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>🌸 Sahabiyāt Stories</Text>
        <Text style={styles.instructions}>Long-press to pin a favourite ❤️</Text>
  
        <TouchableOpacity style={styles.filterBtn}
          onPress={() => setShowFavesOnly(p => !p)}>
          <Text style={styles.filterTxt}>
            {showFavesOnly ? 'Show All' : 'Show Favourites Only'}
          </Text>
        </TouchableOpacity>
  
        {list.map((s, i) => (
          <TouchableOpacity
            key={i}
            onLongPress={() => toggleFavorite(s.name)}
            style={[styles.card, favorites.includes(s.name) && styles.cardFav]}
          >
            {/* heart badge */}
            {favorites.includes(s.name) && <Text style={styles.heart}>❤️</Text>}
  
            <Text style={styles.name}>{s.name} — {s.title}</Text>
            <Text style={styles.story}>{s.story}</Text>
  
            {/* virtue badge */}
            <View style={styles.badge}>
              <Text style={styles.badgeTxt}>{s.virtue}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  }
  
  const COLORS = {
    lavender: '#EBDFF9',
    deepPurple: '#7C3AED',
    lightBg: '#FFF5FD',
    card: '#FFFFFF',
    cardAlt: '#FFF8FF',
  };
  
  const styles = StyleSheet.create({
    container: { backgroundColor: COLORS.lightBg, padding: 20 },
    title:   { fontSize: 24, fontWeight: 'bold', color: COLORS.deepPurple, marginBottom: 6 },
    instructions: {
      fontSize: 13, fontStyle: 'italic', color: '#6D28D9',
      marginBottom: 14,
    },
    filterBtn: {
      alignSelf: 'flex-start',
      backgroundColor: COLORS.lavender,
      paddingHorizontal: 16, paddingVertical: 8,
      borderRadius: 20, marginBottom: 18,
    },
    filterTxt: { color: COLORS.deepPurple, fontWeight: '600' },
  
    card: {
      position: 'relative',
      backgroundColor: COLORS.card,
      borderRadius: 14,
      padding: 18,
      marginBottom: 14,
  
      shadowColor: '#BFA2DB',
      shadowOpacity: 0.2,
      shadowRadius: 6,
      shadowOffset: { width: 0, height: 4 },
      elevation: 3,
    },
    cardFav: { backgroundColor: COLORS.cardAlt },
  
    heart: {
      position: 'absolute',
      top: 10, right: 12,
      fontSize: 18,
    },
  
    name:  { fontSize: 16, fontWeight: '600', color: '#4B0082', marginBottom: 8 },
    story: { fontSize: 14, color: '#444', marginBottom: 12, lineHeight: 20 },
  
    badge: {
      alignSelf: 'flex-start',
      backgroundColor: COLORS.lavender,
      paddingHorizontal: 10, paddingVertical: 4,
      borderRadius: 14,
    },
    badgeTxt: { fontSize: 12, color: COLORS.deepPurple, fontWeight: '600' },
  });