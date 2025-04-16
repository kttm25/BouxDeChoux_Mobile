import { Button, Text, TouchableOpacity, View } from "react-native";
import { styles } from "../../constants/Styles";
import ButtonCustom from "../ButtonCustom/ButtonCustom";

export default function ProfilSelection({ navigation }: { navigation: any }) {
    return (
        <View style={styles.container}>
            <Text>Veuillez selectionner un profil</Text>
            <View >
                <ButtonCustom 
                    title="Responsable" 
                    style={styles.button_principal} 
                    onPress={() =>
                        navigation.navigate('Login')
                    } />
                <ButtonCustom 
                    title="Educatrice" 
                    style={styles.button_principal} 
                    onPress={() =>
                        navigation.navigate('Login')
                    } />
                <ButtonCustom 
                    title="Parent" 
                    style={styles.button_principal} 
                    onPress={() =>
                        navigation.navigate('Login')
                    } />
                    
            </View>
        </View>
    );
}