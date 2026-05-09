import { Text, View, Modal, Pressable } from "react-native";
import { styles } from "../../constants/Styles";
import ApiService from "../../services/ApiService";
import ButtonCustom from "../ButtonCustom/ButtonCustom";

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
        <Modal visible={modalVisible} transparent animationType="fade" onRequestClose={() => setModalVisible(false)}>
            <Pressable
                style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.7)", justifyContent: "center", alignItems: "center" }}
                onPress={() => setModalVisible(false)}
            >
                <Pressable style={styles.modal_container} onPress={(event) => event.stopPropagation()}>
                    <Text>Voulez vous vraiment vous deconnecter?</Text>
                    <ButtonCustom style={styles.button_principal} title="Oui" onPress={handleLogout} />
                    <ButtonCustom style={styles.button_principal} title="Non" onPress={() => setModalVisible(false)} />
                </Pressable>
            </Pressable>
        </Modal>
    );
}