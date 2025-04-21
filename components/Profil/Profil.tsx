import { Text, TextInput, View } from "react-native";
import { styles } from "../../constants/Styles";
import Separator from "../Separator/Separator";
import ButtonCustom from "../ButtonCustom/ButtonCustom";
import { AppText } from "../../constants/Constants";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { registerSchema, RegisterSchemaType } from "../../models/register.model";
import { yupResolver } from "@hookform/resolvers/yup";
import ApiService from "../../services/ApiService";

export default function Profil({ route, navigation }: { route: any, navigation: any }) {

    const [error, setError] = useState("");
    const { control, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(registerSchema) });

    const test = () => {
        console.log("Test function called");
    }
    const onSubmit = async (data: any) => {
        await ApiService.RegisterManger(data).then(res => {
            if (res.success === true) {
                console.log("Register successful:", res.data);
                // Store the token in local storage or cookies if needed
                navigation.navigate('Home');
            }
        }
        ).catch(error => {
            if(error.message === "Conflict") {
                console.log("Email already exists:", error.message);
                setError(AppText.user_already_exists);
            }else {
                console.log("Register error registerpage:", error.message);
                setError(AppText.form_incorrect);
            }
        });
    };
    return (
        <View style={styles.container}>
            <Text style={styles.h1}>{AppText.register_page_title}</Text>
            <Separator />
            <View style={styles.form_container}>
                <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={styles.form_text_input}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            onFocus={() => setError("")}
                            value={value}
                            placeholder={AppText.email_input}
                        />
                    )}
                    name="email"
                    rules={{ required: true }}
                />
                {errors.email && <Text style={styles.text_error}>{errors.email.message}</Text>}
                
                <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={styles.form_text_input}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            onFocus={() => setError("")}
                            value={value}
                            placeholder={AppText.first_name_input}
                        />
                    )}
                    name="firstName"
                    rules={{ required: true }}
                />
                {errors.firstName && <Text style={styles.text_error}>{errors.firstName.message}</Text>}
                
                <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={styles.form_text_input}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            onFocus={() => setError("")}
                            value={value}
                            placeholder={AppText.last_name_input}
                        />
                    )}
                    name="lastName"
                    rules={{ required: true }}
                />
                {errors.lastName && <Text style={styles.text_error}>{errors.lastName.message}</Text>}
                
                <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={styles.form_text_input}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            onFocus={() => setError("")}
                            value={value}
                            placeholder={AppText.address_input}
                        />
                    )}
                    name="address"
                    rules={{ required: true }}
                />
                {errors.address && <Text style={styles.text_error}>{errors.address.message}</Text>}
                
                <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={styles.form_text_input}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            onFocus={() => setError("")}
                            value={value}
                            placeholder={AppText.phone_number_input}
                        />
                    )}
                    name="phoneNumber"
                    rules={{ required: true }}
                />
                {errors.phoneNumber && <Text style={styles.text_error}>{errors.phoneNumber.message}</Text>}
                
                <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={styles.form_text_input}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            onFocus={() => setError("")}
                            secureTextEntry
                            placeholder={AppText.password_input}
                        />
                    )}
                    name="password"
                    rules={{ required: true }}
                />
                {errors.password && <Text style={styles.text_error}>{errors.password.message}</Text>}
                
                <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={styles.form_text_input}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            onFocus={() => setError("")}
                            secureTextEntry
                            placeholder={AppText.password_input}
                        />
                    )}
                    name="confirmPassword"
                    rules={{ required: true }}
                />
                {errors.confirmPassword && <Text style={styles.text_error}>{String(errors.confirmPassword.message)}</Text>}

                {error != "" && <Text style={styles.text_error}>{error}</Text>}
                
                <ButtonCustom title={AppText.register_button} style={[styles.button_principal, styles.aic]} onPress={handleSubmit(onSubmit)} />
            </View>
        </View>
    )
}