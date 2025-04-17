import { Text, TextInput, View } from "react-native";
import { styles } from "../../constants/Styles";
import Separator from "../Separator/Separator";
import ButtonCustom from "../ButtonCustom/ButtonCustom";
import { AppText } from "../../constants/Constants";

export default function Login({ route, navigation}: {route: any, navigation: any}) {
    return (
        <View style={styles.container}>
            <Text style={styles.h1}>Login page</Text>
            <Separator />
            <View style={styles.form_container}>
                <TextInput style={styles.form_text_input} placeholder={AppText.email_input}/>
                <TextInput  secureTextEntry={true} style={styles.form_text_input} placeholder={AppText.password_input}/>
                <ButtonCustom title={AppText.connexion_button} style={[styles.button_principal, styles.aic]} onPress={() => {return null}} />
                {route.params.role == "responsable" ? <Text style={styles.text_secondary}
                    onPress={() => navigation.navigate('Register', { role: 'responsable' })}>
                    {AppText.create_account_text}
                </Text>
                : null}
            </View>
        </View>
    )
}