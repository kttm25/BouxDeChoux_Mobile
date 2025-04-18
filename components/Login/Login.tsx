import { Button, Text, TextInput, View } from "react-native";
import { styles } from "../../constants/Styles";
import Separator from "../Separator/Separator";
import ButtonCustom from "../ButtonCustom/ButtonCustom";
import { AppText } from "../../constants/Constants";
import { Controller, useForm } from "react-hook-form";
import ApiService from "../../services/ApiService"; // Adjust the path as needed
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from "../../models/login.dto";

export default function Login({ route, navigation }: { route: any, navigation: any }) {

    const apiService = new ApiService();
    const { control, handleSubmit, formState: { errors } } = useForm({resolver: yupResolver(loginSchema)});

    const onSubmit = async (data: any) => {
        await ApiService.Login(data.email, data.password);
    };

    /*return (
        <View style={styles.container}>
            <Text style={styles.h1}>Login page</Text>
            <Separator />
            <View style={styles.form_container}>
                <TextInput style={styles.form_text_input} placeholder={AppText.email_input} onChange={() => setEmail}/>
                <TextInput  secureTextEntry={true} style={styles.form_text_input} placeholder={AppText.password_input} onChange={() => setEmail}/>
                <ButtonCustom title={AppText.connexion_button} style={[styles.button_principal, styles.aic]} onPress={() => {return null}} />
                {route.params.role == "responsable" ? <Text style={styles.text_secondary}
                    onPress={() => navigation.navigate('Register', { role: 'responsable' })}>
                    {AppText.password_forgetten}
                </Text>
                : null}
            </View>
        </View>
    )*/
    return (
        <View style={styles.container}>
            <Text style={styles.h1}>Login page</Text>
            <Separator />

            <View style={styles.form_container}>
                <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={styles.form_text_input}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            defaultValue="test@test.cm"
                            placeholder={AppText.email_input}
                        />
                    )}
                    name="email"
                    rules={{ required: true }}
                    defaultValue=""
                />
                {errors.email && <Text style={styles.text_error}>{errors.email.message}</Text>}
                <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={styles.form_text_input}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            defaultValue="Test@1234!"
                            secureTextEntry
                            placeholder={AppText.password_input}
                        />
                    )}
                    name="password"
                    rules={{ required: true }}
                    defaultValue=""
                />
                {errors.password && <Text style={styles.text_error}>{errors.password.message}</Text>}
                
                <ButtonCustom title={AppText.connexion_button} style={[styles.button_principal, styles.aic]} onPress={handleSubmit(onSubmit)} />
                {route.params.role == "responsable" ? <Text style={styles.text_secondary}
                    onPress={() => navigation.navigate('Register', { role: 'responsable' })}>
                    {AppText.password_forgetten}
                </Text>
                    : null}
            </View>
        </View>
    );
}