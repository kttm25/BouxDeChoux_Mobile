import { Text, TextInput, View } from "react-native";
import { styles } from "../../constants/Styles";
import Separator from "../Separator/Separator";
import ButtonCustom from "../ButtonCustom/ButtonCustom";
import { AppText } from "../../constants/Constants";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ApiService from "../../services/ApiService";
import { updateUserSchema, UpdateUserSchemaType } from "../../models/updateuser.model";
import User from "../../models/user.model";

export default function UpdateParent({ route, navigation }: { route: any, navigation: any }) {
    const [error, setError] = useState("");
    const parent: User | undefined = route?.params?.parent;

    const { control, handleSubmit, formState: { errors }, reset } = useForm<UpdateUserSchemaType>({
        resolver: yupResolver(updateUserSchema),
    });

    useEffect(() => {
        if (parent) {
            reset({
                firstName: parent.firstName,
                lastName: parent.lastName,
                address: parent.address,
            });
        }
    }, [parent, reset]);

    const onSubmit = async (data: UpdateUserSchemaType) => {
        if (!parent?.id) {
            setError(AppText.form_incorrect);
            return;
        }

        const payload = {
            ...parent,
            ...data,
            role: "parent",
        };

        await ApiService.UpdateParent(parent.id, payload)
            .then((res) => {
                if (res.success === true) {
                    navigation.navigate("ManageParent", { refreshKey: Date.now() });
                }
            })
            .catch(() => {
                setError(AppText.form_incorrect);
            });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.h1}>Modifier un parent</Text>
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
                    defaultValue={parent?.firstName ?? ""}
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
                    defaultValue={parent?.lastName ?? ""}
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
                    defaultValue={parent?.address ?? ""}
                />
                {errors.address && <Text style={styles.text_error}>{errors.address.message}</Text>}

                {error !== "" && <Text style={styles.text_error}>{error}</Text>}

                <ButtonCustom title={AppText.update_button} style={[styles.button_principal, styles.aic]} onPress={handleSubmit(onSubmit)} />
            </View>
        </View>
    );
}
