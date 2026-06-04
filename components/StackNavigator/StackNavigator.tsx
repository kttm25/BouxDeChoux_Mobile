import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../Home/Home';
import ProfilSelection from '../ProfilSelection/ProfilSelection';
import Login from '../Login/Login';
import Register from '../Register/Register';
import FirstPage from '../FirstPage/FirstPage';
import { Button, View } from 'react-native';
import { useState } from 'react';
import Profil from '../Profil/Profil';
import { ManageChildCare } from '../ManageChildcares/ManageChildcare';
import CreateChildCare from '../CreateChildcare/CreateChildcare';
import CreateEducator from '../CreateEducator/CreateEducator';
import { ManageEducator } from '../ManageEducator/ManageEducator';
import { ManageParent } from '../ManageParent/ManageParent';
import CreateParent from '../CreateParent/CreateParent';
import CreateChild from '../CreateChild/CreateChild';
import UpdateParent from '../UpdateParent/UpdateParent';
import { ManageChild } from '../ManageChild/ManageChild';
import { ManageRoom } from '../ManageRoom/ManageRooms';
import CreateRoom from '../CreateRoom/CreateRoom';
import UpdateRoom from '../UpdateRoom/UpdateRoom';
import { AssignRoomEducator } from '../AssignRoomEducator/AssignRoomEducator';
import ManageDailyReports from '../ManageDailyReports/ManageDailyReports';
import CreateDailyReport from '../CreateDailyReport/CreateDailyReport';
import ViewDailyReport from '../ViewDailyReport/ViewDailyReport';

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  const [logout, setLogout] = useState(false);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="FirstPage"
        component={FirstPage}
        options={{ title: 'FirstPage' }}
      />
      <Stack.Screen
        name="Profil"
        component={Profil}
        options={{ title: 'Profil' }}
      />
      <Stack.Screen
        name="Home"
        options={({ navigation }) => ({
          title: "Home",
          headerStyle: {
            backgroundColor: 'white',
          },
          headerRight: () => (
            <View style={{ flexDirection: 'row', gap: 10}}>
              <Button
                onPress={() => navigation.navigate("Profil")}
                title="Profil"
              />
              <Button
              color={"red"}
                onPress={() => setLogout(true)}
                title="Logout"
              />
            </View>
          )
        })}
      >
        {({ navigation, route }) => (
          <Home setLogout={setLogout} logout={logout} navigation={navigation} route={route} />
        )}
      </Stack.Screen>
      <Stack.Screen
        name="ProfilSelection"
        component={ProfilSelection}
        options={{
          title: "Profils",
        }}
      />
      <Stack.Screen
        name="ManageChildcare"
        component={ManageChildCare}
        options={{
          title: "Childcares",
        }}
      />
      <Stack.Screen
        name="CreateChildCare"
        component={CreateChildCare}
        options={{
          title: "Créer un childcare",
        }}
      />
      <Stack.Screen
        name="ManageEducator"
        component={ManageEducator}
        options={{
          title: "Educatrices",
        }}
      />
      <Stack.Screen
        name="CreateEducator"
        component={CreateEducator}
        options={{
          title: "Créer une educatrice",
        }}
      />
      
      <Stack.Screen
        name="ManageParent"
        component={ManageParent}
        options={{
          title: "Parents",
        }}
      />
      <Stack.Screen
        name="CreateParent"
        component={CreateParent}
        options={{
          title: "Créer un parent",
        }}
      />
      <Stack.Screen
        name="CreateChild"
        component={CreateChild}
        options={{
          title: "Ajouter un enfant",
        }}
      />
      <Stack.Screen
        name="ManageChild"
        component={ManageChild}
        options={{
          title: "Enfants",
        }}
      />
      <Stack.Screen
        name="ManageRoom"
        component={ManageRoom}
        options={{
          title: "Salles",
        }}
      />
      <Stack.Screen
        name="CreateRoom"
        component={CreateRoom}
        options={{
          title: "Creer une salle",
        }}
      />
      <Stack.Screen
        name="UpdateRoom"
        component={UpdateRoom}
        options={{
          title: "Mettre a jour une salle",
        }}
      />
      <Stack.Screen
        name="AssignRoomEducator"
        component={AssignRoomEducator}
        options={{
          title: "Association educatrices",
        }}
      />
      <Stack.Screen
        name="ManageDailyReports"
        component={ManageDailyReports}
        options={{
          title: "Notes journalières",
        }}
      />
      <Stack.Screen
        name="CreateDailyReport"
        component={CreateDailyReport}
        options={{
          title: "Créer une note",
        }}
      />
      <Stack.Screen
        name="ViewDailyReport"
        component={ViewDailyReport}
        options={{
          title: "Consulter un rapport",
        }}
      />
      <Stack.Screen
        name="UpdateParent"
        component={UpdateParent}
        options={{
          title: "Modifier un parent",
        }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ title: "Login" }} />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{ title: "Register" }} />
    </Stack.Navigator>
  );
}