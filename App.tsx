import {NavigationContainer} from '@react-navigation/native';
import StackNavigator from './components/StackNavigator/StackNavigator';

export default function App() {
  return (
    <NavigationContainer>
      <StackNavigator/>
    </NavigationContainer>
  );
}
