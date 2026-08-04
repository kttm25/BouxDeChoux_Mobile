import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button, View } from 'react-native';
import Home from '../Home/Home';
import ProfilSelection from '../ProfilSelection/ProfilSelection';
import Login from '../Login/Login';
import FirstPage from '../FirstPage/FirstPage';
import Register from '../Register/Register';
import Profil from '../Profil/Profil';
import ManageChildcare from '../ManageChildcares/ManageChildcare';
import CreateChildcare from '../CreateChildcare/CreateChildcare';
import ManageEducator from '../ManageEducator/ManageEducator';
import CreateEducator from '../CreateEducator/CreateEducator';
import ManageParent from '../ManageParent/ManageParent';
import CreateParent from '../CreateParent/CreateParent';
import CreateChild from '../CreateChild/CreateChild';
import ManageChild from '../ManageChild/ManageChild';
import ManageRoom from '../ManageRoom/ManageRoom';
import CreateRoom from '../CreateRoom/CreateRoom';
import UpdateRoom from '../UpdateRoom/UpdateRoom';
import AssignRoomEducator from '../AssignRoomEducator/AssignRoomEducator';
import ManageDailyReports from '../ManageDailyReports/ManageDailyReports';
import CreateDailyReport from '../CreateDailyReport/CreateDailyReport';
import UpdateDailyReport from '../UpdateDailyReport/UpdateDailyReport';
import ViewDailyReport from '../ViewDailyReport/ViewDailyReport';
import ApiService from '../../../services/ApiService';

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  async function handleLogout(navigation: any) {
    try {
      await ApiService.Logout();
    } finally {
      navigation.reset({
        index: 0,
        routes: [{ name: 'FirstPage' }],
      });
    }
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerTintColor: '#1f2937',
        headerTitleStyle: { fontWeight: '600' },
      }}
    >
      <Stack.Screen name='FirstPage' component={FirstPage} options={{ title: 'FirstPage', headerShown: false }} />
      <Stack.Screen
        name='Home'
        options={({ navigation }) => ({
          title: 'Home',
          headerShown: true,
          headerStyle: { backgroundColor: 'white' },
          headerRight: () => (
            <View style={{ flexDirection: 'row', gap: 10 }}>
              <Button color={'red'} onPress={() => handleLogout(navigation)} title='Logout' />
            </View>
          ),
        })}
      >
        {({ navigation, route }) => <Home navigation={navigation} route={route} />}
      </Stack.Screen>
      <Stack.Screen name='ProfilSelection' component={ProfilSelection} options={{ title: 'Profils', headerShown: true }} />
      <Stack.Screen name='Login' component={Login} options={{ title: 'Login', headerShown: true }} />
      <Stack.Screen name='Register' component={Register} options={{ title: 'Register', headerShown: true }} />
      <Stack.Screen name='Profil' component={Profil} options={{ title: 'Profil', headerShown: true }} />
      <Stack.Screen name='ManageChildcare' component={ManageChildcare} options={{ title: 'Gestion Creches', headerShown: true }} />
      <Stack.Screen name='CreateChildCare' component={CreateChildcare} options={{ title: 'Creer Creche', headerShown: true }} />
      <Stack.Screen name='ManageEducator' component={ManageEducator} options={{ title: 'Gestion Educateurs', headerShown: true }} />
      <Stack.Screen name='CreateEducator' component={CreateEducator} options={{ title: 'Creer Educateur', headerShown: true }} />
      <Stack.Screen name='ManageParent' component={ManageParent} options={{ title: 'Gestion Parents', headerShown: true }} />
      <Stack.Screen name='CreateParent' component={CreateParent} options={{ title: 'Creer Parent', headerShown: true }} />
      <Stack.Screen name='CreateChild' component={CreateChild} options={{ title: 'Creer Enfant', headerShown: true }} />
      <Stack.Screen name='ManageChild' component={ManageChild} options={{ title: 'Gestion Enfants', headerShown: true }} />
      <Stack.Screen name='ManageRoom' component={ManageRoom} options={{ title: 'Gestion Salles', headerShown: true }} />
      <Stack.Screen name='CreateRoom' component={CreateRoom} options={{ title: 'Creer Salle', headerShown: true }} />
      <Stack.Screen name='UpdateRoom' component={UpdateRoom} options={{ title: 'Modifier Salle', headerShown: true }} />
      <Stack.Screen name='AssignRoomEducator' component={AssignRoomEducator} options={{ title: 'Assigner Educateur', headerShown: true }} />
      <Stack.Screen name='ManageDailyReports' component={ManageDailyReports} options={{ title: 'Rapports Journaliers', headerShown: true }} />
      <Stack.Screen name='CreateDailyReport' component={CreateDailyReport} options={{ title: 'Creer Rapport', headerShown: true }} />
      <Stack.Screen name='UpdateDailyReport' component={UpdateDailyReport} options={{ title: 'Modifier Rapport', headerShown: true }} />
      <Stack.Screen name='ViewDailyReport' component={ViewDailyReport} options={{ title: 'Voir Rapport', headerShown: true }} />
    </Stack.Navigator>
  );
}
