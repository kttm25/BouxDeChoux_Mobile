import { FlatList, Keyboard, Text, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-paper";
import { styles } from "../../constants/Styles";
import Separator from "../Separator/Separator";
import ButtonCustom from "../ButtonCustom/ButtonCustom";
import { AppText } from "../../constants/Constants";
import { useCallback, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ApiService from "../../services/ApiService";
import { chilcareSchema } from "../../models/createChidcare.model";
import CreateChildCareDto from "../../models/createchildcare.dto";

export default function CreateChildCare({ route, navigation }: { route: any, navigation: any }) {

    const openingHoursOptions = [
        { label: "Lundi - Vendredi, de 8h a 18h", value: "08:00;09:00;10:00;11:00;12:00;13:00;14:00;15:00;16:00;17:00;18:00" },
        { label: "Lundi - Vendredi, de 8h a 12h", value: "08:00;09:00;10:00;11:00;12:00" },
        { label: "Lundi - Vendredi, de 12h a 18h", value: "12:00;13:00;14:00;15:00;16:00;17:00;18:00" },
    ]

    const [error, setError] = useState("");
    const { control, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(chilcareSchema) });

    const [openingHours, setOpeningHours] = useState<string>("Choissiez une option");
    const [show, setShow] = useState(false);
    const openPicker = useCallback(
        () => {
            Keyboard.dismiss()
            setShow(true)
        },
        [show]
    );

    const hidePicker = useCallback(
        (item: any) => {
            setShow(false)
            setOpeningHours(item)
        },
        [show, openingHours]
    );

    const onSubmit = async (data: any) => {
        let childcareData: CreateChildCareDto = {
            name: data.name,
            email: data.email,
            address: data.address,
            phoneNumber: data.phoneNumber,
            maxCapacity: data.maxChildrenCapacity,
            actualCapacity: 0,
            mondayOpeningHours: openingHoursOptions.find(item => item.label === openingHours)?.value.split(";") || [],
            tuesdayOpeningHours: openingHoursOptions.find(item => item.label === openingHours)?.value.split(";") || [],
            wednesdayOpeningHours: openingHoursOptions.find(item => item.label === openingHours)?.value.split(";") || [],
            thursdayOpeningHours: openingHoursOptions.find(item => item.label === openingHours)?.value.split(";") || [],
            fridayOpeningHours: openingHoursOptions.find(item => item.label === openingHours)?.value.split(";") || [],
        };
        console.log("Childcare data:", childcareData);
        await ApiService.CreateChildCare(childcareData).then(res => {
            if (res.success === true) {
                console.log("Create childcare successful:", res.data);
                // Store the token in local storage or cookies if needed
                navigation.navigate('Home');
            }
        }
        ).catch(error => {
            if (error.message === "Conflict") {
                console.log("Childcare already exists:", error.message);
                setError(AppText.childcare_already_exists);
            } else {
                console.log("Childcare error createpage:", error.message);
                setError(AppText.form_incorrect);
            }
        });
    };
    return (
        <View style={styles.container}>
            <Text style={styles.h1}>{AppText.create_childcare_title}</Text>
            <Separator />
            <View style={styles.form_container}>
                <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={styles.form_text_input_2}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            onFocus={() => setError("")}
                            value={String(value)}
                            placeholder={AppText.name_childcare_input}
                        />
                    )}
                    name="name"
                    rules={{ required: true }}
                    defaultValue="string"
                />
                {errors.name && <Text style={styles.text_error}>{errors.name.message}</Text>}

                <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={styles.form_text_input_2}
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
                            style={styles.form_text_input_2}
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
                            style={styles.form_text_input_2}
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
                            style={styles.form_text_input_2}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={String(value)}
                            keyboardType="numeric"
                            onFocus={() => setError("")}
                            placeholder={AppText.maxChildren_input}
                        />
                    )}
                    name="maxChildrenCapacity"
                    rules={{ required: true }}
                    defaultValue={20}
                />
                {errors.maxChildrenCapacity && <Text style={styles.text_error}>{errors.maxChildrenCapacity.message}</Text>}

                <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <View style={{ width: '100%' }}>
                            <TextInput
                                style={styles.form_text_input_2}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                onPress={openPicker}
                                value={value || "Choisissez une option"}
                                onFocus={() => setError("")}
                                editable={false}
                                defaultValue="Choisissez une option"
                                right={<TextInput.Icon onPress={openPicker} onFocus={() => setError("")} icon="chevron-down" size={20} />}
                            />
                            {show ?
                                <FlatList
                                    style={styles.picker}
                                    data={openingHoursOptions.map((item) => item.label)}
                                    renderItem={({ item, index }) => (
                                        <TouchableOpacity
                                            onPress={() => {
                                                onChange(item); // Met à jour la valeur dans react-hook-form
                                                hidePicker(item);
                                            }}>
                                            <Text style={{ padding: 8 }}>
                                                {item}
                                            </Text>
                                        </TouchableOpacity>
                                    )}
                                    keyExtractor={item => item}
                                />
                                : <View></View>}
                        </View>
                    )}
                    name="openinghours"
                    rules={{ required: true }}
                />
                {errors.openinghours && <Text style={styles.text_error}>{String(errors.openinghours.message)}</Text>}

                {error != "" && <Text style={styles.text_error}>{error}</Text>}

                <ButtonCustom title={AppText.create_button} style={[styles.button_principal, styles.aic]} onPress={handleSubmit(onSubmit)} />
            </View>
        </View>
    )
}