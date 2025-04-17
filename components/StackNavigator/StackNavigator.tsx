import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../Home/Home';
import ProfilSelection from '../ProfilSelection/ProfilSelection';
import Login from '../Login/Login';
import Register from '../Register/Register';

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ title: 'Home' }}
      />
      <Stack.Screen
        name="ProfilSelection"
        component={ProfilSelection}
        options={{ title: "Profils" }} />
      <Stack.Screen
        name="Login"
        component={(props: any) => <Login {...props}/>}
        options={{ title: "Login" }} />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{ title: "Register" }} />
    </Stack.Navigator>
  );
}