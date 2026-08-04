import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from '../../../constants/Styles';
import AuthSession from '../../../services/AuthSession';
import { useEffect } from 'react';

const roleCards = [
  {
    role: 'parent',
    letter: 'P',
    title: 'Espace Parent',
    description: 'Fiches journalieres, photos et absences de vos enfants.',
    accent: '#2A9D8F',
    bg: '#e0f5f0',
  },
  {
    role: 'educatrice',
    letter: 'E',
    title: 'Educatrice',
    description: 'Saisie quotidienne, activites et suivi des enfants.',
    accent: '#7C3AED',
    bg: '#f0e8ff',
  },
  {
    role: 'responsable',
    letter: 'D',
    title: 'Direction',
    description: 'Locaux, ratios, inscriptions et rapports.',
    accent: '#C85A00',
    bg: '#fff0d8',
  },
];

export default function FirstPageWeb({ navigation }: { navigation: any }) {
  useEffect(() => {
    const session = AuthSession.loadAuthSession();
    if (session) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home', params: { role: session.role } }],
      });
    }
  }, [navigation]);

  return (
    <View style={styles.screenShell}>
      <View style={[styles.decorativeBlob, { width: 320, height: 320, backgroundColor: 'rgba(42,157,143,.07)', top: -60, right: -80 }]} />
      <View style={[styles.decorativeBlob, { width: 240, height: 240, backgroundColor: 'rgba(124,58,237,.05)', bottom: -50, left: -50 }]} />

      <View style={styles.centeredContent}>
        <View style={styles.heroCard}>
          <Text style={styles.heroTitle}>Bout de Choux</Text>
          <Text style={styles.heroSubtitle}>Systeme de gestion de creche - choisissez votre espace.</Text>

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
                <Text style={[styles.roleCta, { color: card.accent }]}>Se connecter</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.footerText}>Confidentialite - Support - Documentation</Text>
        </View>
      </View>
    </View>
  );
}
