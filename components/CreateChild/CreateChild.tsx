import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { Platform, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { styles } from "../../constants/Styles";
import Separator from "../Separator/Separator";
import ButtonCustom from "../ButtonCustom/ButtonCustom";
import { AppText } from "../../constants/Constants";
import { useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { createChildSchema, CreateChildSchemaType } from "../../models/createchild.model";
import { yupResolver } from "@hookform/resolvers/yup";
import ApiService from "../../services/ApiService";
import User from "../../models/user.model";
import ChildCare from "../../models/childcare";

type ChildCareUser = User;

const ALLERGY_OPTIONS = [
    "Arachides",
    "Lait",
    "Oeufs",
    "Gluten",
    "Soja",
    "FruitsDeMer",
    "Noix",
    "Sesame",
];

export default function CreateChild({ route, navigation }: { route: any, navigation: any }) {

    const [error, setError] = useState("");
    const [childcares, setChildcares] = useState<ChildCare[]>([]);
    const [selectedChildcareId, setSelectedChildcareId] = useState<number | null>(null);
    const [childcareDropdownOpen, setChildcareDropdownOpen] = useState(false);
    const [parents, setParents] = useState<ChildCareUser[]>([]);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selectedParentId, setSelectedParentId] = useState<number | null>(null);
    const [selectedParents, setSelectedParents] = useState<ChildCareUser[]>([]);
    const [selectedAllergies, setSelectedAllergies] = useState<string[]>([]);
    const [birthDatePickerVisible, setBirthDatePickerVisible] = useState(false);
    const [selectedBirthDate, setSelectedBirthDate] = useState<Date>(new Date());
    const { control, handleSubmit, formState: { errors }, setValue } = useForm<CreateChildSchemaType>({ resolver: yupResolver(createChildSchema) });

    const formatBirthDate = (date: Date): string => {
        const year = date.getFullYear();
        const month = `${date.getMonth() + 1}`.padStart(2, "0");
        const day = `${date.getDate()}`.padStart(2, "0");
        return `${year}-${month}-${day}`;
    };

    useEffect(() => {
        ApiService.GetChildCares().then(res => {
            if (res.success === true) {
                setChildcares(res.data);
                const routeId = Number(route?.params?.childcareId);
                if (routeId) {
                    setSelectedChildcareId(routeId);
                }
            }
        }).catch(() => {});
    }, []);

    useEffect(() => {
        setValue("birthDate", formatBirthDate(selectedBirthDate));
    }, [selectedBirthDate, setValue]);

    useEffect(() => {
        if (!selectedChildcareId) {
            setParents([]);
            setSelectedParentId(null);
            setSelectedParents([]);
            return;
        }

        ApiService.GetParentByChildCares(selectedChildcareId)
            .then((res) => {
                if (res.success === true) {
                    const filteredParents = res.data.filter((user: ChildCareUser) => user.role?.toLowerCase() === "parent");

                    setParents(filteredParents);

                    if (filteredParents.length > 0) {
                        setSelectedParentId(filteredParents[0].id);
                    }

                    const routeParentId = Number(route?.params?.parentId);
                    if (routeParentId) {
                        const routeParent = filteredParents.find((parent: ChildCareUser) => parent.id === routeParentId);
                        if (routeParent) {
                            setSelectedParents([routeParent]);
                        }
                    }
                }
            })
            .catch(() => {
                setError(AppText.form_incorrect);
            });
    }, [selectedChildcareId, route?.params?.parentId]);

    const selectedParentLabel = useMemo(() => {
        if (!selectedChildcareId) {
            return "-- Choisir une garderie d'abord --";
        }

        const selected = parents.find((parent) => parent.id === selectedParentId);
        if (!selected) {
            return "-- Sélectionner un parent --";
        }

        return `${selected.firstName} ${selected.lastName}`;
    }, [parents, selectedParentId, selectedChildcareId]);

    const addSelectedParent = () => {
        if (!selectedChildcareId) {
            setError("Veuillez sélectionner une garderie avant le parent");
            return;
        }

        if (selectedParentId === null) {
            return;
        }

        const selected = parents.find((parent) => parent.id === selectedParentId);
        if (!selected) {
            return;
        }

        if (selectedParents.some((parent) => parent.id === selected.id)) {
            return;
        }

        setSelectedParents((prev) => [...prev, selected]);
    };

    const removeSelectedParent = (parentId: number) => {
        setSelectedParents((prev) => prev.filter((parent) => parent.id !== parentId));
    };

    const toggleAllergy = (allergy: string) => {
        setSelectedAllergies((prev) => {
            if (prev.includes(allergy)) {
                return prev.filter((item) => item !== allergy);
            }

            return [...prev, allergy];
        });
    };

    const handleBirthDateChange = (event: DateTimePickerEvent, date?: Date) => {
        if (Platform.OS === "android") {
            setBirthDatePickerVisible(false);
        }

        if (event.type === "dismissed" || !date) {
            return;
        }

        setSelectedBirthDate(date);
    };

    const onSubmit = async (data: CreateChildSchemaType) => {
        if (!selectedChildcareId) {
            setError("Veuillez sélectionner un childcare");
            return;
        }

        if (selectedParents.length === 0) {
            setError("Veuillez sélectionner au moins un parent");
            return;
        }

        const parentIds = selectedParents.map((parent) => String(parent.id));
        const allergiesPayload = ALLERGY_OPTIONS.reduce((acc, allergy) => {
            acc[allergy] = selectedAllergies.includes(allergy);
            return acc;
        }, {} as Record<string, boolean>);

        let child = {
            ...data,
            birthDate: formatBirthDate(selectedBirthDate),
            allergies: JSON.stringify(allergiesPayload),
            parentId: parentIds[0],
            parentIds,
        };

        await ApiService.CreateChild(child, selectedChildcareId).then(res => {
            if (res.success === true) {
                console.log("Create child successful:", res.data);
                navigation.navigate('ManageParent', { refreshKey: Date.now() });
            }
        }
        ).catch(error => {
            console.log("Create child error:", error.message);
            setError(AppText.form_incorrect);
        });
    };
    
    return (
        <ScrollView contentContainerStyle={{ alignItems: "center", paddingBottom: 24 }} style={{ width: "100%" }}>
            <View style={[styles.container, { justifyContent: "flex-start", width: "100%" }]}>
            <Text style={styles.h1}>Créer un enfant</Text>
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
                                    onPress={() => {
                                        setSelectedChildcareId(c.id);
                                        setSelectedParentId(null);
                                        setSelectedParents([]);
                                        setDropdownOpen(false);
                                        setChildcareDropdownOpen(false);
                                    }}
                                    style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: "#efefef" }}
                                >
                                    <Text>{c.name}</Text>
                                </Pressable>
                            ))}
                        </ScrollView>
                    </View>
                )}

                <Text>LastName</Text>
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
                    defaultValue=""
                />
                {errors.lastName && <Text style={styles.text_error}>{errors.lastName.message}</Text>}

                <Text>FirstName</Text>
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
                    defaultValue=""
                />
                {errors.firstName && <Text style={styles.text_error}>{errors.firstName.message}</Text>}

                <Text>BirthDate</Text>
                <Controller
                    control={control}
                    render={({ field: { value } }) => (
                        <Pressable onPress={() => setBirthDatePickerVisible(true)} style={{ width: "100%" }}>
                            <TextInput
                                style={styles.form_text_input}
                                value={value}
                                editable={false}
                                pointerEvents="none"
                                placeholder="Date de naissance"
                            />
                        </Pressable>
                    )}
                    name="birthDate"
                    rules={{ required: true }}
                    defaultValue={formatBirthDate(selectedBirthDate)}
                />
                {errors.birthDate && <Text style={styles.text_error}>{errors.birthDate.message}</Text>}

                {birthDatePickerVisible && (
                    <DateTimePicker
                        value={selectedBirthDate}
                        mode="date"
                        display={Platform.OS === "ios" ? "spinner" : "default"}
                        onChange={handleBirthDateChange}
                        maximumDate={new Date()}
                    />
                )}

                <Text>Parents</Text>
                <View style={{ width: "100%", flexDirection: "row", alignItems: "center", gap: 8, marginVertical: 5 }}>
                    <Pressable
                        onPress={() => {
                            if (!selectedChildcareId) {
                                setError("Veuillez sélectionner une garderie avant le parent");
                                return;
                            }
                            setDropdownOpen((prev) => !prev)
                        }}
                        style={{
                            flex: 1,
                            borderWidth: 1,
                            borderColor: "#c7c7c7",
                            borderRadius: 4,
                            paddingVertical: 12,
                            paddingHorizontal: 10,
                            backgroundColor: selectedChildcareId ? "white" : "#f0f0f0",
                            opacity: selectedChildcareId ? 1 : 0.7,
                        }}
                    >
                        <Text>{selectedParentLabel}</Text>
                    </Pressable>

                    <Pressable
                        onPress={addSelectedParent}
                        style={{
                            borderWidth: 1,
                            borderColor: "#2f6fed",
                            borderRadius: 6,
                            paddingVertical: 10,
                            paddingHorizontal: 12,
                            backgroundColor: selectedChildcareId ? "#f7fbff" : "#e5e5e5",
                            opacity: selectedChildcareId ? 1 : 0.7,
                        }}
                    >
                        <Text style={{ color: "#2f6fed" }}>Ajouter</Text>
                    </Pressable>
                </View>

                {dropdownOpen && (
                    <View style={{ width: "100%", borderWidth: 1, borderColor: "#c7c7c7", borderRadius: 4, maxHeight: 180, marginBottom: 8 }}>
                        <ScrollView nestedScrollEnabled>
                            {parents.length === 0 && <Text style={{ padding: 10 }}>Aucun parent disponible</Text>}
                            {parents.map((parent) => (
                                <Pressable
                                    key={parent.id}
                                    onPress={() => {
                                        setSelectedParentId(parent.id);
                                        setDropdownOpen(false);
                                    }}
                                    style={{ paddingVertical: 10, paddingHorizontal: 10, borderBottomWidth: 1, borderBottomColor: "#efefef" }}
                                >
                                    <Text>{parent.firstName} {parent.lastName}</Text>
                                </Pressable>
                            ))}
                        </ScrollView>
                    </View>
                )}

                <View style={{ width: "100%", flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: 10 }}>
                    {selectedParents.map((parent) => (
                        <Pressable
                            key={parent.id}
                            onPress={() => removeSelectedParent(parent.id)}
                            style={{
                                backgroundColor: "#6c757d",
                                paddingHorizontal: 10,
                                paddingVertical: 6,
                                borderRadius: 4,
                                flexDirection: "row",
                                alignItems: "center",
                                gap: 6,
                            }}
                        >
                            <Text style={{ color: "white", fontWeight: "600" }}>{parent.firstName} {parent.lastName}</Text>
                            <Text style={{ color: "white" }}>x</Text>
                        </Pressable>
                    ))}
                </View>

                <Text>Allergies</Text>
                <View style={{ width: "100%", marginBottom: 8 }}>
                    {ALLERGY_OPTIONS.map((allergy) => {
                        const isSelected = selectedAllergies.includes(allergy);
                        return (
                            <Pressable
                                key={allergy}
                                onPress={() => toggleAllergy(allergy)}
                                style={{ flexDirection: "row", alignItems: "center", marginBottom: 4 }}
                            >
                                <View
                                    style={{
                                        width: 18,
                                        height: 18,
                                        borderRadius: 3,
                                        borderWidth: 1,
                                        borderColor: "#808080",
                                        marginRight: 8,
                                        backgroundColor: isSelected ? "#2f6fed" : "white",
                                    }}
                                />
                                <Text>{allergy}</Text>
                            </Pressable>
                        );
                    })}
                </View>

                <Text>Medication</Text>
                <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={styles.form_text_input}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            onFocus={() => setError("")}
                            value={value}
                            placeholder="Médicaments (optionnel)"
                        />
                    )}
                    name="medication"
                    rules={{ required: false }}
                    defaultValue=""
                />
                {errors.medication && <Text style={styles.text_error}>{errors.medication.message}</Text>}

                <Text>Comment</Text>
                <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={styles.form_text_input}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            onFocus={() => setError("")}
                            value={value}
                            placeholder="Commentaires (optionnel)"
                            multiline
                        />
                    )}
                    name="comment"
                    rules={{ required: false }}
                    defaultValue=""
                />
                {errors.comment && <Text style={styles.text_error}>{errors.comment.message}</Text>}

                {error != "" && <Text style={styles.text_error}>{error}</Text>}

                <View style={{ width: "100%", flexDirection: "row", justifyContent: "flex-start", gap: 10 }}>
                    <ButtonCustom title={AppText.create_button} style={[styles.button_principal, { minWidth: 90, minHeight: 40 }]} onPress={handleSubmit(onSubmit)} />
                    <ButtonCustom title="Retour" style={[styles.button_menu, { minWidth: 90, minHeight: 40, backgroundColor: "#6c757d" }]} onPress={() => navigation.goBack()} />
                </View>
            </View>
        </View>
        </ScrollView>
    );
}
