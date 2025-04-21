import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
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
        component={({ navigation }: NativeStackScreenProps<any, 'Home'>) => <Home setLogout={setLogout} logout={logout} navigation={navigation} />}
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
                onPress={() => navigation.navigate("Login")}
                //onPress={() => setLogout(true)}
                title="Logout"
              />
            </View>
          )
        })}
      />
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
        name="Login"
        component={(props: any) => <Login {...props} />}
        options={{ title: "Login" }} />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{ title: "Register" }} />
    </Stack.Navigator>
  );
}