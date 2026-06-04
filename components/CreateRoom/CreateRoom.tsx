import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { useEffect, useState } from "react";
import { styles } from "../../constants/Styles";
import Separator from "../Separator/Separator";
import ButtonCustom from "../ButtonCustom/ButtonCustom";
import ApiService from "../../services/ApiService";
import ChildCare from "../../models/childcare";
import { AppText } from "../../constants/Constants";

export default function CreateRoom({ navigation, route }: { navigation: any; route: any }) {
    const [childcares, setChildcares] = useState<ChildCare[]>([]);
    const [selectedChildcareId, setSelectedChildcareId] = useState<number | null>(null);
    const [childcareDropdownOpen, setChildcareDropdownOpen] = useState(false);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [openingHours, setOpeningHours] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        ApiService.GetChildCares()
            .then((res) => {
                if (res.success === true) {
                    const items = res.data ?? [];
                    setChildcares(items);

                    const routeId = Number(route?.params?.childcareId);
                    if (routeId) {
                        setSelectedChildcareId(routeId);
                    } else if (items.length > 0) {
                        setSelectedChildcareId(items[0].id);
                    }
                }
            })
            .catch(() => {
                navigation.reset({ index: 0, routes: [{ name: "FirstPage" }] });
            });
    }, []);

    const handleCreateRoom = async () => {
        if (!selectedChildcareId) {
            setError("Veuillez selectionner une garderie.");
            return;
        }

        if (!name.trim() || !description.trim()) {
            setError("Le nom et la description de la salle sont requis.");
            return;
        }

        try {
            await ApiService.CreateRoom(selectedChildcareId, {
                name: name.trim(),
                description: description.trim(),
                openingHours: openingHours.trim() || undefined,
            });

            navigation.reset({
                index: 1,
                routes: [
                    { name: "Home" },
                    { name: "ManageRoom", params: { refreshKey: Date.now(), childcareId: selectedChildcareId } },
                ],
            });
        } catch {
            setError(AppText.form_incorrect);
        }
    };

    return (
        <ScrollView contentContainerStyle={{ alignItems: "center", paddingBottom: 24 }} style={{ width: "100%" }}>
            <View style={[styles.container, { justifyContent: "flex-start", width: "100%" }]}>
                <Text style={styles.h1}>Creer une salle</Text>
                <Separator />

                <View style={[styles.form_container, { width: "95%" }]}>
                    <Text>Garderie</Text>
                    <Pressable
                        onPress={() => setChildcareDropdownOpen((prev) => !prev)}
                        style={{
                            width: "100%",
                            borderWidth: 1,
                            borderColor: "#c7c7c7",
                            borderRadius: 4,
                            paddingVertical: 12,
                            paddingHorizontal: 10,
                            backgroundColor: "white",
                            marginBottom: 6,
                        }}
                    >
                        <Text>{childcares.find((c) => c.id === selectedChildcareId)?.name ?? "-- Selectionner une garderie --"}</Text>
                    </Pressable>

                    {childcareDropdownOpen && (
                        <View style={{ width: "100%", borderWidth: 1, borderColor: "#c7c7c7", borderRadius: 4, maxHeight: 180, marginBottom: 8 }}>
                            <ScrollView nestedScrollEnabled>
                                {childcares.length === 0 && <Text style={{ padding: 10 }}>Aucune garderie disponible</Text>}
                                {childcares.map((childcare) => (
                                    <Pressable
                                        key={childcare.id}
                                        onPress={() => {
                                            setSelectedChildcareId(childcare.id);
                                            setChildcareDropdownOpen(false);
                                        }}
                                        style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: "#efefef" }}
                                    >
                                        <Text>{childcare.name}</Text>
                                    </Pressable>
                                ))}
                            </ScrollView>
                        </View>
                    )}

                    <TextInput
                        style={styles.form_text_input}
                        value={name}
                        onChangeText={(value) => {
                            setName(value);
                            setError("");
                        }}
                        placeholder="Nom de la salle"
                    />
                    <TextInput
                        style={styles.form_text_input}
                        value={description}
                        onChangeText={(value) => {
                            setDescription(value);
                            setError("");
                        }}
                        placeholder="Description"
                    />
                    <TextInput
                        style={styles.form_text_input}
                        value={openingHours}
                        onChangeText={(value) => {
                            setOpeningHours(value);
                            setError("");
                        }}
                        placeholder="Horaires (optionnel)"
                    />

                    <ButtonCustom title="Creer" style={[styles.button_principal, styles.aic]} onPress={handleCreateRoom} />
                    {error !== "" && <Text style={styles.text_error}>{error}</Text>}
                </View>
            </View>
        </ScrollView>
    );
}
