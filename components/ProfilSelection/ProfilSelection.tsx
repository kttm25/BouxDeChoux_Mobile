import { Button, Text, TouchableOpacity, View } from "react-native";
import { styles } from "../../constants/Styles";
import ButtonCustom from "../ButtonCustom/ButtonCustom";
import { AppText } from "../../constants/Constants";

export default function ProfilSelection({ navigation }: { navigation: any }) {
    return (
        <View style={styles.container}>
            <Text>Veuillez selectionner un profil</Text>
            <View >
                <ButtonCustom 
                    title={AppText.responsable_button} 
                    style={styles.button_principal} 
                    onPress={() =>
                        navigation.navigate('Login', { role: 'responsable' })
                    } />
                <ButtonCustom 
                    title={AppText.educatrice_button}  
                    style={styles.button_principal} 
                    onPress={() =>
                        navigation.navigate('Login', { role: 'educatrice' })
                    } />
                <ButtonCustom 
                    title={AppText.parent_button} 
                    style={styles.button_principal} 
                    onPress={() =>
                        navigation.navigate('Login', { role: 'parent' })
                    } />
                    
            </View>
        </View>
    );
}