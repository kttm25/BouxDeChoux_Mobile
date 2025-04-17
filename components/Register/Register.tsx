import { Text, TextInput, View } from "react-native";
import { styles } from "../../constants/Styles";
import Separator from "../Separator/Separator";
import ButtonCustom from "../ButtonCustom/ButtonCustom";
import { AppText } from "../../constants/Constants";

export default function Register() {
    return (
        <View style={styles.container}>
            <Text style={styles.h1}>Register Page</Text>
            <Separator />
            <View style={styles.form_container}>
                <TextInput style={styles.form_text_input} placeholder={AppText.email_input} />
                <TextInput style={styles.form_text_input} placeholder={AppText.first_name_input} />
                <TextInput style={styles.form_text_input} placeholder={AppText.last_name_input} />
                <TextInput style={styles.form_text_input} placeholder={AppText.phone_number_input} />
                <TextInput secureTextEntry={true} style={styles.form_text_input} placeholder={AppText.password_input} />
                <TextInput secureTextEntry={true} style={styles.form_text_input} placeholder={AppText.confirm_password_input} />
                <ButtonCustom title={AppText.connexion_button} style={[styles.button_principal, styles.aic]} onPress={() => { return null }} />
            </View>
        </View>
    )
}