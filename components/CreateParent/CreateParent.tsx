import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { styles } from "../../constants/Styles";
import Separator from "../Separator/Separator";
import ButtonCustom from "../ButtonCustom/ButtonCustom";
import { AppText } from "../../constants/Constants";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { registerSchema, RegisterSchemaType } from "../../models/register.model";
import { yupResolver } from "@hookform/resolvers/yup";
import ApiService from "../../services/ApiService";
import ChildCare from "../../models/childcare";

export default function CreateParent({ route, navigation }: { route: any, navigation: any }) {

    const [error, setError] = useState("");
    const [childcares, setChildcares] = useState<ChildCare[]>([]);
    const [selectedChildcareId, setSelectedChildcareId] = useState<number | null>(null);
    const [childcareDropdownOpen, setChildcareDropdownOpen] = useState(false);
    const { control, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(registerSchema) });

    useEffect(() => {
        ApiService.GetChildCares().then(res => {
            if (res.success === true) {
                setChildcares(res.data);
                const routeId = Number(route?.params?.childcareId);
                if (routeId) {
                    setSelectedChildcareId(routeId);
                } else if (res.data.length > 0) {
                    setSelectedChildcareId(res.data[0].id);
                }
            }
        }).catch(() => {});
    }, []);

    const onSubmit = async (data: any) => {
        if (!selectedChildcareId) {
            setError("Veuillez sélectionner un childcare");
            return;
        }
        let parent = {
            ...data,
            role: "parent",
        };
        await ApiService.CreateParent(parent, selectedChildcareId).then(res => {
            if (res.success === true) {
                console.log("Create parent successful:", res.data);
                // Store the token in local storage or cookies if needed
                navigation.navigate('Home', { role: route.params.role });
            }
        }
        ).catch(error => {
            if(error.message === "Conflict") {
                console.log("Email already exists:", error.message);
                setError(AppText.user_already_exists);
            }else {
                console.log("Create parent error:", error.message);
                setError(AppText.form_incorrect);
            }
        });
    };
    return (
        <ScrollView contentContainerStyle={{ alignItems: "center", paddingBottom: 24 }} style={{ width: "100%" }}>
        <View style={[styles.container, { justifyContent: "flex-start", width: "100%" }]}>
            <Text style={styles.h1}>{AppText.create_parent_page_title}</Text>
            <Separator />
            <View style={styles.form_container}>
                <Text>Childcare</Text>
                <Pressable
                    onPress={() => setChildcareDropdownOpen(prev => !prev)}
                    style={{
                        width: "100%",
                        borderWidth: 1,
                        borderColor: "#c7c7c7",
                        borderRadius: 4,
                        paddingVertical: 12,
                        paddingHorizontal: 10,
                        backgroundColor: "white",
                        marginBottom: 4,
                    }}
                >
                    <Text>{childcares.find(c => c.id === selectedChildcareId)?.name ?? "-- Sélectionner un childcare --"}</Text>
                </Pressable>
                {childcareDropdownOpen && (
                    <View style={{ width: "100%", borderWidth: 1, borderColor: "#c7c7c7", borderRadius: 4, maxHeight: 180, marginBottom: 8 }}>
                        <ScrollView nestedScrollEnabled>
                            {childcares.length === 0 && <Text style={{ padding: 10 }}>Aucun childcare disponible</Text>}
                            {childcares.map(c => (
                                <Pressable
                                    key={c.id}
                                    onPress={() => { setSelectedChildcareId(c.id); setChildcareDropdownOpen(false); }}
                                    style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: "#efefef" }}
                                >
                                    <Text>{c.name}</Text>
                                </Pressable>
                            ))}
                        </ScrollView>
                    </View>
                )}

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
                    defaultValue="user12@example.com"
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
                    defaultValue="string"
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
                    defaultValue="string"
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
                    defaultValue="string"
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
                    defaultValue="3432314563"
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
                    defaultValue="Test@1234"
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
                    defaultValue="Test@1234"
                />
                {errors.confirmPassword && <Text style={styles.text_error}>{String(errors.confirmPassword.message)}</Text>}

                {error != "" && <Text style={styles.text_error}>{error}</Text>}
                
                <ButtonCustom title={AppText.create_button} style={[styles.button_principal, styles.aic]} onPress={handleSubmit(onSubmit)} />
            </View>
        </View>
        </ScrollView>
    )
}