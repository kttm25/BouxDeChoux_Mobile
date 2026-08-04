import { Pressable, ScrollView, Text, View } from 'react-native';

type ActiveKey = 'dashboard' | 'utilisateurs' | 'locaux' | 'enfants' | 'rapports';

type AdminTaskBarProps = {
  navigation: any;
  activeKey: ActiveKey;
};

type NavItem = {
  key: ActiveKey | 'affectations' | 'messages' | 'programmes';
  label: string;
  route?: string;
};

const NAV_ITEMS: NavItem[] = [
  { key: 'utilisateurs', label: 'Utilisateurs', route: 'ManageChildcare' },
  { key: 'locaux', label: 'Locaux', route: 'ManageRoom' },
  { key: 'enfants', label: 'Enfants', route: 'ManageChild' },
  { key: 'affectations', label: 'Affectations', route: 'AssignRoomEducator' },
  { key: 'messages', label: 'Messages' },
  { key: 'rapports', label: 'Rapports', route: 'ManageDailyReports' },
  { key: 'programmes', label: 'Programmes' },
  { key: 'dashboard', label: 'Tableau blanc', route: 'Home' },
];

export default function AdminTaskBar({ navigation, activeKey }: AdminTaskBarProps) {
  const onNavigate = (route?: string) => {
    if (!route) {
      return;
    }

    navigation.navigate(route);
  };

  return (
    <View style={{ backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#e5e7eb' }}>
      <View style={{ height: 56, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16 }}>
        <Pressable
          onPress={() => navigation.navigate('Home')}
          style={{
            borderWidth: 1,
            borderColor: '#d1d5db',
            borderRadius: 999,
            paddingHorizontal: 14,
            paddingVertical: 8,
            backgroundColor: '#ffffff',
            marginRight: 14,
          }}
        >
          <Text style={{ color: '#374151', fontSize: 14, fontWeight: '700' }}>● ← Horaires</Text>
        </Pressable>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ alignItems: 'center', paddingRight: 16 }}>
          {NAV_ITEMS.map((item) => {
            const isActive = item.key === activeKey;
            return (
              <Pressable
                key={item.key}
                onPress={() => onNavigate(item.route)}
                style={{
                  paddingHorizontal: 12,
                  paddingVertical: 8,
                  marginRight: 6,
                  borderBottomWidth: 2,
                  borderBottomColor: isActive ? '#c85a00' : 'transparent',
                  opacity: item.route ? 1 : 0.6,
                }}
              >
                <Text
                  style={{
                    color: isActive ? '#c85a00' : '#4b5563',
                    fontSize: 15,
                    fontWeight: isActive ? '700' : '500',
                  }}
                >
                  {item.label}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        <View style={{ marginLeft: 'auto', flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <Text style={{ fontSize: 20 }}>🔔</Text>
          <Text style={{ fontSize: 20 }}>⚙️</Text>
          <View style={{ width: 34, height: 34, borderRadius: 17, backgroundColor: '#e5e7eb', alignItems: 'center', justifyContent: 'center' }}>
            <Text>👶</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
