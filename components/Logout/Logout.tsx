import { useState } from "react";
import { Pressable, Text, View, StyleSheet, Alert, SafeAreaView, Button } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { styles } from "../../constants/Styles";
import ApiService from "../../services/ApiService";
import ReactNativeModal from "react-native-modal";
import ButtonCustom from "../ButtonCustom/ButtonCustom";
import { set } from "react-hook-form";

export default function Logout({ navigation, modalVisible,setModalVisible }: { navigation: any, modalVisible: boolean, setModalVisible: Function }) {
    async function handleLogout() {
        await ApiService.Logout().then(res => {
            if (res.success === true) {
                console.log("Logout successful:", res.data);
                setModalVisible(false);
                // Store the token in local storage or cookies if needed
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'FirstPage' }],
                })
            }
        })
    }

    return (
        <ReactNativeModal isVisible={modalVisible} backdropOpacity={0.70} >
          <View style={styles.modal_container}>
            <Text>Voulez vous vraiment vous deconnecter?</Text>
            <ButtonCustom style={styles.button_principal} title="Oui" onPress={handleLogout} />
            <ButtonCustom style={styles.button_principal} title="Non" onPress={() => setModalVisible(!modalVisible)} />
          </View>
        </ReactNativeModal>
    );
}