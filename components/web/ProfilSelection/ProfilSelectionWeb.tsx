import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from '../../../constants/Styles';

const roleCards = [
  {
    role: 'responsable',
    letter: 'D',
    title: 'Direction',
    description: 'Gestion des locaux, ratios et rapports.',
    accent: '#C85A00',
    bg: '#fff0d8',
  },
  {
    role: 'educatrice',
    letter: 'E',
    title: 'Educatrice',
    description: 'Saisie journaliere et programme des activites.',
    accent: '#7C3AED',
    bg: '#f0e8ff',
  },
  {
    role: 'parent',
    letter: 'P',
    title: 'Parent',
    description: 'Suivi quotidien, photos et absences.',
    accent: '#2A9D8F',
    bg: '#e0f5f0',
  },
];

export default function ProfilSelectionWeb({ navigation }: { navigation: any }) {
  return (
    <View style={styles.screenShell}>
      <View style={styles.centeredContent}>
        <View style={styles.heroCard}>
          <Text style={styles.heroTitle}>Selection du profil</Text>
          <Text style={styles.heroSubtitle}>Choisissez le portail a ouvrir.</Text>

          <View style={styles.roleGrid}>
            {roleCards.map((card) => (
              <TouchableOpacity
                key={card.role}
                style={styles.roleCard}
                activeOpacity={0.9}
                onPress={() => navigation.navigate('Login', { role: card.role })}
              >
                <View style={[styles.roleIcon, { backgroundColor: card.bg }]}>
                  <Text style={{ color: card.accent, fontWeight: '800', fontSize: 20 }}>{card.letter}</Text>
                </View>
                <Text style={styles.roleTitle}>{card.title}</Text>
                <Text style={styles.roleText}>{card.description}</Text>
                <Text style={[styles.roleCta, { color: card.accent }]}>Ouvrir</Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity style={[styles.secondaryButton, { alignSelf: 'flex-start' }]} onPress={() => navigation.navigate('FirstPage')}>
            <Text style={styles.secondaryButtonText}>Retour</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
