import { ScrollView, Text, TextInput, View } from "react-native";
import { useEffect, useState } from "react";
import { styles } from "../../constants/Styles";
import Separator from "../Separator/Separator";
import ButtonCustom from "../ButtonCustom/ButtonCustom";
import ApiService from "../../services/ApiService";
import { AppText } from "../../constants/Constants";

export default function UpdateRoom({ navigation, route }: { navigation: any; route: any }) {
    const roomId = Number(route?.params?.roomId);
    const childcareId = Number(route?.params?.childcareId);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [openingHours, setOpeningHours] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if (!roomId) {
            navigation.navigate("ManageRoom");
            return;
        }

        ApiService.GetRoomById(roomId)
            .then((res) => {
                if (res.success === true) {
                    const room = res.data;
                    setName(room?.name ?? "");
                    setDescription(room?.description ?? "");
                    setOpeningHours(room?.openingHours ?? "");
                }
            })
            .catch(() => setError(AppText.form_incorrect));
    }, [roomId]);

    const handleUpdate = async () => {
        if (!name.trim() || !description.trim()) {
            setError("Le nom et la description de la salle sont requis.");
            return;
        }

        try {
            await ApiService.UpdateRoom(roomId, {
                name: name.trim(),
                description: description.trim(),
                openingHours: openingHours.trim() || undefined,
            });

            navigation.reset({
                index: 1,
                routes: [
                    { name: "Home" },
                    { name: "ManageRoom", params: { refreshKey: Date.now(), childcareId } },
                ],
            });
        } catch {
            setError(AppText.form_incorrect);
        }
    };

    return (
        <ScrollView contentContainerStyle={{ alignItems: "center", paddingBottom: 24 }} style={{ width: "100%" }}>
            <View style={[styles.container, { justifyContent: "flex-start", width: "100%" }]}>
                <Text style={styles.h1}>Mettre a jour une salle</Text>
                <Separator />

                <View style={[styles.form_container, { width: "95%" }]}>
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

                    <ButtonCustom title="Mettre a jour" style={[styles.button_principal, styles.aic]} onPress={handleUpdate} />
                    {error !== "" && <Text style={styles.text_error}>{error}</Text>}
                </View>
            </View>
        </ScrollView>
    );
}
