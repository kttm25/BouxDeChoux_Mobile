import { Text, TextInput, View } from "react-native";
import { styles } from "../../constants/Styles";
import Separator from "../Separator/Separator";
import ButtonCustom from "../ButtonCustom/ButtonCustom";
import { AppText } from "../../constants/Constants";
import { useEffect, useState } from "react";
import { Controller, set, useForm } from "react-hook-form";
import { registerSchema, RegisterSchemaType } from "../../models/register.model";
import { yupResolver } from "@hookform/resolvers/yup";
import ApiService from "../../services/ApiService";
import { updateUserSchema } from "../../models/updateuser.model";
import User from "../../models/user.model";

export default function Profil({ route, navigation }: { route: any, navigation: any }) {

    const [error, setError] = useState("");
    const { control, handleSubmit, formState: { errors }, reset } = useForm({ resolver: yupResolver(updateUserSchema) });
    const [user, setUser] = useState<User | undefined>(undefined);

    useEffect(() => {
        // Perform any necessary setup or API calls here
        ApiService.GetUser().then(res => {
            if (res.success === true) {
                console.log("Get user successful:", res.data);
                setUser(res.data);
                reset({
                    firstName: res.data.firstName,
                    lastName: res.data.lastName,
                    address: res.data.address,
                });
            }
        }).catch(error => {
            navigation.reset({
                index: 0,
                routes: [{ name: 'FirstPage' }],
            })
        });
    }
    , []);

    const onSubmit = async (data: any) => {
        await ApiService.UpdateUser(data).then(res => {
            if (res.success === true) {
                console.log("Update user successful:", res.data);
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
            <Text style={styles.h1}>{AppText.update_page_title}</Text>
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
                            placeholder={AppText.first_name_input}
                        />
                    )}
                    name="firstName"
                    rules={{ required: true }}
                    defaultValue={user?.firstName}
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
                    defaultValue={user?.lastName}
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
                    defaultValue={user?.address}
                />
                {errors.address && <Text style={styles.text_error}>{errors.address.message}</Text>}
                
                {error != "" && <Text style={styles.text_error}>{error}</Text>}
                
                <ButtonCustom title={AppText.update_button} style={[styles.button_principal, styles.aic]} onPress={handleSubmit(onSubmit)} />
            </View>
        </View>
    )
}