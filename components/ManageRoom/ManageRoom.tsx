import { Alert, Button, Pressable, ScrollView, Text, View } from "react-native";
import { useEffect, useState } from "react";
import { styles } from "../../constants/Styles";
import Separator from "../Separator/Separator";
import ButtonCustom from "../ButtonCustom/ButtonCustom";
import ApiService from "../../services/ApiService";
import ChildCare from "../../models/childcare";
import Room from "../../models/room.model";
import { AppText } from "../../constants/Constants";

export function ManageRoom({ navigation, route }: { navigation: any; route: any }) {
    const [childcares, setChildcares] = useState<ChildCare[]>([]);
    const [selectedChildcareId, setSelectedChildcareId] = useState<number | null>(null);
    const [childcareDropdownOpen, setChildcareDropdownOpen] = useState(false);
    const [rooms, setRooms] = useState<Room[]>([]);
    const [error, setError] = useState("");

    const loadChildcares = async () => {
        const childcaresRes = await ApiService.GetChildCares();
        if (childcaresRes.success === true) {
            const items = childcaresRes.data ?? [];
            setChildcares(items);
            if (items.length > 0 && selectedChildcareId === null) {
                setSelectedChildcareId(items[0].id);
            }
        }
    };

    const loadRoomsByChildcare = async (childcareId: number) => {
        const roomsRes = await ApiService.GetRoomsByChildCare(childcareId);
        if (roomsRes.success === true) {
            setRooms(roomsRes.data ?? []);
        } else {
            setRooms([]);
        }
    };

    const loadData = async () => {
        try {
            await loadChildcares();
        } catch {
            navigation.reset({
                index: 0,
                routes: [{ name: "FirstPage" }],
            });
        }
    };

    useEffect(() => {
        loadData();
    }, [route?.params?.refreshKey]);

    useEffect(() => {
        if (selectedChildcareId === null) {
            setRooms([]);
            return;
        }

        loadRoomsByChildcare(selectedChildcareId).catch(() => {
            setRooms([]);
        });
    }, [selectedChildcareId, route?.params?.refreshKey]);

    const handleDeleteRoom = (roomId: number) => {
        Alert.alert("Suppression", "Voulez-vous vraiment supprimer cette salle ?", [
            { text: "Annuler", style: "cancel" },
            {
                text: "Supprimer",
                style: "destructive",
                onPress: async () => {
                    if (!selectedChildcareId) {
                        return;
                    }

                    try {
                        await ApiService.DeleteRoom(roomId);
                        await loadRoomsByChildcare(selectedChildcareId);
                    } catch {
                        setError(AppText.form_incorrect);
                    }
                },
            },
        ]);
    };

    return (
        <ScrollView contentContainerStyle={{ alignItems: "center", paddingBottom: 24 }} style={{ width: "100%" }}>
            <View style={[styles.container, { justifyContent: "flex-start", width: "100%" }]}>
                <Text style={styles.h1}>Gestion des salles</Text>
                <Separator />

                <View style={styles.manage_menu}>
                    <ButtonCustom
                        title="Creer une salle"
                        style={styles.button_menu}
                        onPress={() => navigation.navigate("CreateRoom", { childcareId: selectedChildcareId })}
                    />
                    <ButtonCustom
                        title="Gerer"
                        style={styles.button_menu}
                        onPress={() => navigation.navigate("Home")}
                    />
                </View>

                <View style={styles.table}>
                    <View style={styles.tableTitle}>
                        <Text style={styles.h1}>Choisir une garderie</Text>
                    </View>
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
                        }}
                    >
                        <Text>{childcares.find((c) => c.id === selectedChildcareId)?.name ?? "-- Selectionner une garderie --"}</Text>
                    </Pressable>

                    {childcareDropdownOpen && (
                        <View style={{ width: "100%", borderWidth: 1, borderColor: "#c7c7c7", borderRadius: 4, maxHeight: 180, marginTop: 6 }}>
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
                </View>

                <View style={styles.table}>
                    <View style={styles.tableTitle}>
                        <Text style={styles.h1}>Liste des salles</Text>
                    </View>
                    <View style={styles.tableHeader}>
                        <Text style={styles.tableHeading}>Nom</Text>
                        <Text style={styles.tableHeading}>Description</Text>
                        <Text style={styles.tableHeading}>Actions</Text>
                    </View>

                    {rooms.length === 0 && <Text style={styles.tableRowText}>Aucune salle pour cette garderie.</Text>}
                    {rooms.map((item: Room) => (
                        <View key={item.id} style={styles.tableRow}>
                            <Text style={styles.tableRowText}>{item.name}</Text>
                            <Text style={styles.tableRowText}>{item.description}</Text>
                            <View style={{ flex: 1, gap: 4 }}>
                                <Button
                                    title="Modifier"
                                    onPress={() => navigation.navigate("UpdateRoom", { roomId: item.id, childcareId: selectedChildcareId })}
                                />
                                <Button
                                    title="Associer educatrices"
                                    onPress={() => navigation.navigate("AssignRoomEducator", { roomId: item.id, childcareId: selectedChildcareId, roomName: item.name })}
                                />
                                <Button title="Supprimer" color="red" onPress={() => handleDeleteRoom(item.id)} />
                            </View>
                        </View>
                    ))}
                </View>

                {error !== "" && <Text style={styles.text_error}>{error}</Text>}
            </View>
        </ScrollView>
    );
}
