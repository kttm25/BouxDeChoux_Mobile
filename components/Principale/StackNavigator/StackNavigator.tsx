import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button, View } from 'react-native';
import { useState } from 'react';
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

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  const [logout, setLogout] = useState<boolean>(false);
  return (
    <Stack.Navigator>
      <Stack.Screen name='FirstPage' component={FirstPage} options={{ title: 'FirstPage', headerShown: false }} />
      <Stack.Screen
        name='Home'
        options={({ navigation }) => ({
          title: 'Home',
          headerShown: false,
          headerStyle: { backgroundColor: 'white' },
          headerRight: () => (
            <View style={{ flexDirection: 'row', gap: 10 }}>
              <Button color={'red'} onPress={() => setLogout(true)} title='Logout' />
            </View>
          ),
        })}
      >
        {({ navigation, route }) => (
          <Home setLogout={setLogout} logout={logout} navigation={navigation} route={route} />
        )}
      </Stack.Screen>
      <Stack.Screen name='ProfilSelection' component={ProfilSelection} options={{ title: 'Profils', headerShown: false }} />
      <Stack.Screen name='Login' component={Login} options={{ title: 'Login', headerShown: false }} />
      <Stack.Screen name='Register' component={Register} options={{ title: 'Register', headerShown: false }} />
      <Stack.Screen name='Profil' component={Profil} options={{ title: 'Profil', headerShown: false }} />
      <Stack.Screen name='ManageChildcare' component={ManageChildcare} options={{ headerShown: false }} />
      <Stack.Screen name='CreateChildCare' component={CreateChildcare} options={{ headerShown: false }} />
      <Stack.Screen name='ManageEducator' component={ManageEducator} options={{ headerShown: false }} />
      <Stack.Screen name='CreateEducator' component={CreateEducator} options={{ headerShown: false }} />
      <Stack.Screen name='ManageParent' component={ManageParent} options={{ headerShown: false }} />
      <Stack.Screen name='CreateParent' component={CreateParent} options={{ headerShown: false }} />
      <Stack.Screen name='CreateChild' component={CreateChild} options={{ headerShown: false }} />
      <Stack.Screen name='ManageChild' component={ManageChild} options={{ headerShown: false }} />
      <Stack.Screen name='ManageRoom' component={ManageRoom} options={{ headerShown: false }} />
      <Stack.Screen name='CreateRoom' component={CreateRoom} options={{ headerShown: false }} />
      <Stack.Screen name='UpdateRoom' component={UpdateRoom} options={{ headerShown: false }} />
      <Stack.Screen name='AssignRoomEducator' component={AssignRoomEducator} options={{ headerShown: false }} />
      <Stack.Screen name='ManageDailyReports' component={ManageDailyReports} options={{ headerShown: false }} />
      <Stack.Screen name='CreateDailyReport' component={CreateDailyReport} options={{ headerShown: false }} />
      <Stack.Screen name='UpdateDailyReport' component={UpdateDailyReport} options={{ headerShown: false }} />
      <Stack.Screen name='ViewDailyReport' component={ViewDailyReport} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
