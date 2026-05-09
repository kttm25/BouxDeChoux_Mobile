
import { Button, Text, View } from 'react-native';
//import { API_URL } from "@env"
import { styles } from '../../constants/Styles';
import Separator from '../Separator/Separator';
import { AppText } from '../../constants/Constants';
import ButtonCustom from '../ButtonCustom/ButtonCustom';
import Logout from '../Logout/Logout';
import { useEffect, useState } from 'react';
import ApiService from '../../services/ApiService';

export default function Home({ navigation, route, setLogout, logout }: { setLogout: Function, logout: boolean, navigation: any, route?: any }) {
  const [role, setRole] = useState("");
  useEffect(() => {
    // Perform any necessary setup or API calls here
    ApiService.GetUser().then(res => {
      if (res.success === true) {
        setRole(res.data.role);
      }
    }).catch(error => {
      navigation.reset({
        index: 0,
        routes: [{ name: 'FirstPage' }],
      })
    });
  }
    , []);

  const normalizedRole = (role || route?.params?.role || "").toString().trim().toLowerCase();
  const canManageChildcare = normalizedRole === "responsable" || normalizedRole === "manager";

  return (
    <View style={styles.container}>
      <Logout setModalVisible={setLogout} modalVisible={logout} navigation={navigation} />
      {canManageChildcare && <View style={styles.container}>
        <Text style={styles.h1}>{AppText.childcare_management_page_title}</Text>
        <Separator />
        <ButtonCustom title={AppText.manage_childcare_button} style={[styles.button_principal, styles.aic]} onPress={() => (navigation.navigate('ManageChildcare'))} />
        <ButtonCustom title={AppText.manage_educatrice_button} style={[styles.button_principal, styles.aic]} onPress={() => (navigation.navigate('ManageEducator'))} />
        <ButtonCustom title={AppText.manage_parent_button} style={[styles.button_principal, styles.aic]} onPress={() => (navigation.navigate('ManageParent'))} />
        <ButtonCustom title={AppText.manage_child_button} style={[styles.button_principal, styles.aic]} onPress={() => (navigation.navigate('ManageChild'))} />
      </View>}
    </View>
  );
}