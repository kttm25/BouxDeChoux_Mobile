
import { Button, Text, View } from 'react-native';
//import { API_URL } from "@env"
import { styles } from '../../constants/Styles';
import { useEffect } from 'react';
import ApiService from '../../services/ApiService';

export default function FirstPage({ navigation } : {navigation : any}) {
  useEffect(() => {
    // Perform any necessary setup or API calls here
    ApiService.GetUser().then(res => {
      if(res.success === true) {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Home' }],
        })
      }
    }
    ).catch(error => {
      console.log("Error fetching users:", error.message);
    });
  }, []);

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