import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './components/Principale/StackNavigator/StackNavigator';

const linking = {
  prefixes: ['http://localhost:8081', 'https://localhost:8081'],
  config: {
    screens: {
      FirstPage: '',
      ProfilSelection: 'profil-selection',
      Login: 'login/:role',
      Home: 'home',
      Register: 'register',
      Profil: 'profil',
      ManageChildcare: 'manage-childcare',
      CreateChildCare: 'create-childcare',
      ManageEducator: 'manage-educator',
      CreateEducator: 'create-educator',
      ManageParent: 'manage-parent',
      CreateParent: 'create-parent',
      CreateChild: 'create-child',
      ManageChild: 'manage-child',
      ManageRoom: 'manage-room',
      CreateRoom: 'create-room',
      UpdateRoom: 'update-room',
      AssignRoomEducator: 'assign-room-educator',
      ManageDailyReports: 'manage-daily-reports',
      CreateDailyReport: 'create-daily-report',
      UpdateDailyReport: 'update-daily-report',
      ViewDailyReport: 'view-daily-report',
    },
  },
};

export default function App() {
  return (
    <NavigationContainer linking={linking}>
      <StackNavigator />
    </NavigationContainer>
  );
}
