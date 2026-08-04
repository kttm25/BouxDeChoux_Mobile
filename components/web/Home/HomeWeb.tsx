import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { styles } from '../../../constants/Styles';
import AdminTaskBar from '../AdminTaskBar/AdminTaskBar';

const adminCards = [
  { title: 'Gestion Childcares', text: 'Creer et gerer vos structures.', route: 'ManageChildcare', accent: '#2A9D8F' },
  { title: 'Gestion Educateurs', text: 'Ajouter et organiser le personnel.', route: 'ManageEducator', accent: '#7C3AED' },
  { title: 'Gestion Parents', text: 'Piloter les comptes famille.', route: 'ManageParent', accent: '#C85A00' },
  { title: 'Gestion Enfants', text: 'Suivi et attribution des enfants.', route: 'ManageChild', accent: '#2A9D8F' },
  { title: 'Gestion Salles', text: 'Capacites, affectations et salles.', route: 'ManageRoom', accent: '#C85A00' },
  { title: 'Rapports', text: 'Notes et rapports journaliers.', route: 'ManageDailyReports', accent: '#7C3AED' },
];

export default function HomeWeb({ navigation, route }: { navigation: any; route: any }) {
  const role = String(route?.params?.role ?? 'responsable').toLowerCase();
  const title = role === 'parent' ? 'Espace Parent' : role === 'educatrice' ? 'Espace Educatrice' : 'Portail Direction';

  return (
    <View style={{ flex: 1 }}>
      <AdminTaskBar navigation={navigation} activeKey='dashboard' />
      <ScrollView style={styles.dashboardScreen} contentContainerStyle={styles.dashboardContainer}>
        <View style={styles.dashboardHeader}>
          <Text style={styles.dashboardTitle}>{title}</Text>
          <Text style={styles.dashboardSubtitle}>Interface web integree depuis la maquette Bout de Choux.</Text>
        </View>

        <View style={styles.dashboardGrid}>
          {adminCards.map((card) => (
            <TouchableOpacity key={card.route} style={styles.dashboardCard} activeOpacity={0.9} onPress={() => navigation.navigate(card.route)}>
              <View style={[styles.dashboardCardIcon, { backgroundColor: `${card.accent}1A` }]} />
              <Text style={styles.dashboardCardTitle}>{card.title}</Text>
              <Text style={styles.dashboardCardText}>{card.text}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
