
import { Button, StyleSheet, Text, View } from 'react-native';
//import { API_URL } from "@env"
import { styles } from '../../constants/Styles';
import { NavigationProps } from '../../constants/Constants';

export default function Home({ navigation } : {navigation : any}) {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Button
        title='Home'
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{ name: 'ProfilSelection' }],
          })
        } />
    </View>
  );
}