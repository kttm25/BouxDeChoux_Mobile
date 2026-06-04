import { Alert, Button, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { useEffect, useState } from "react";
import { styles } from "../../constants/Styles";
import Separator from "../Separator/Separator";
import ButtonCustom from "../ButtonCustom/ButtonCustom";
import ApiService from "../../services/ApiService";
import User from "../../models/user.model";
import RoomEducator from "../../models/roomeducator.model";
import { AppText } from "../../constants/Constants";

function toEducatorId(value: any): string {
    if (value?.educatorId !== undefined && value?.educatorId !== null) {
        return String(value.educatorId);
    }

    if (value?.id !== undefined && value?.id !== null) {
        return String(value.id);
    }

    return "";
}

function educatorLabel(value: any): string {
    const firstName = value?.firstName ?? "";
    const lastName = value?.lastName ?? "";
    const fullName = `${firstName} ${lastName}`.trim();

    if (fullName) {
        return fullName;
    }

    if (value?.email) {
        return value.email;
    }

    return "Educatrice";
}

export function AssignRoomEducator({ navigation, route }: { navigation: any; route: any }) {
    const roomId = Number(route?.params?.roomId);
    const childcareId = Number(route?.params?.childcareId);
    const roomName = String(route?.params?.roomName ?? "");

    const [educators, setEducators] = useState<User[]>([]);
    const [selectedEducatorId, setSelectedEducatorId] = useState("");
    const [educatorDropdownOpen, setEducatorDropdownOpen] = useState(false);
    const [assignHours, setAssignHours] = useState("");

    const [roomEducators, setRoomEducators] = useState<RoomEducator[]>([]);
    const [educatorHoursById, setEducatorHoursById] = useState<Record<string, string>>({});
    const [error, setError] = useState("");

    const loadEducatorsByChildcare = async () => {
        if (!childcareId) {
            setEducators([]);
            return;
        }

        try {
            const usersRes = await ApiService.GetPersonalByChildCares(childcareId);
            if (usersRes.success === true) {
                const childcareEducators = (usersRes.data ?? []).filter((u: User) => u.role?.toLowerCase() === "educatrice");
                setEducators(childcareEducators);
                if (childcareEducators.length > 0) {
                    setSelectedEducatorId((prev) => prev || String(childcareEducators[0].id));
                }
            }
        } catch {
            setEducators([]);
        }
    };

    const loadRoomEducators = async () => {
        if (!roomId) {
            setRoomEducators([]);
            setEducatorHoursById({});
            return;
        }

        try {
            const roomEducatorsRes = await ApiService.GetRoomEducators(roomId);
            if (roomEducatorsRes.success === true) {
                const items: RoomEducator[] = roomEducatorsRes.data ?? [];
                setRoomEducators(items);

                const nextHoursMap: Record<string, string> = {};
                items.forEach((item: any) => {
                    const id = toEducatorId(item);
                    if (id) {
                        nextHoursMap[id] = item?.hours ?? "";
                    }
                });

                setEducatorHoursById(nextHoursMap);
            } else {
                setRoomEducators([]);
                setEducatorHoursById({});
            }
        } catch {
            setRoomEducators([]);
            setEducatorHoursById({});
        }
    };

    useEffect(() => {
        if (!roomId) {
            navigation.navigate("ManageRoom");
            return;
        }

        loadEducatorsByChildcare();
        loadRoomEducators();
    }, [roomId, childcareId]);

    const handleAssignEducator = async () => {
        if (!selectedEducatorId) {
            setError("Selectionnez une educatrice.");
            return;
        }

        try {
            await ApiService.AssignEducatorToRoom(roomId, {
                educatorId: selectedEducatorId,
                hours: assignHours.trim() || undefined,
            });
            setAssignHours("");
            setError("");
            await loadRoomEducators();
        } catch {
            setError(AppText.form_incorrect);
        }
    };

    const handleUnassignEducator = (educatorId: string) => {
        Alert.alert("Retrait", "Retirer cette educatrice de la salle ?", [
            { text: "Annuler", style: "cancel" },
            {
                text: "Retirer",
                style: "destructive",
                onPress: async () => {
                    try {
                        await ApiService.UnassignEducatorFromRoom(roomId, educatorId);
                        await loadRoomEducators();
                    } catch {
                        setError(AppText.form_incorrect);
                    }
                },
            },
        ]);
    };

    const handleUpdateEducatorHours = async (educatorId: string) => {
        const hours = educatorHoursById[educatorId] ?? "";

        try {
            await ApiService.UpdateRoomEducatorHours(roomId, {
                educatorId,
                hours,
            });
            await loadRoomEducators();
        } catch {
            setError(AppText.form_incorrect);
        }
    };

    return (
        <ScrollView contentContainerStyle={{ alignItems: "center", paddingBottom: 24 }} style={{ width: "100%" }}>
            <View style={[styles.container, { justifyContent: "flex-start", width: "100%" }]}>
                <Text style={styles.h1}>Association des educatrices</Text>
                <Text>Salle: {roomName || roomId}</Text>
                <Separator />

                <View style={styles.manage_menu}>
                    <ButtonCustom
                        title="Retour salles"
                        style={styles.button_menu}
                        onPress={() => navigation.navigate("ManageRoom", { refreshKey: Date.now(), childcareId })}
                    />
                </View>

                <View style={[styles.form_container, { width: "95%" }]}>
                    <Pressable
                        onPress={() => setEducatorDropdownOpen((prev) => !prev)}
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
                        <Text>
                            {educatorLabel(educators.find((e) => String(e.id) === selectedEducatorId))}
                        </Text>
                    </Pressable>

                    {educatorDropdownOpen && (
                        <View style={{ width: "100%", borderWidth: 1, borderColor: "#c7c7c7", borderRadius: 4, maxHeight: 180, marginBottom: 6 }}>
                            <ScrollView nestedScrollEnabled>
                                {educators.length === 0 && <Text style={{ padding: 10 }}>Aucune educatrice disponible</Text>}
                                {educators.map((educator) => (
                                    <Pressable
                                        key={educator.id}
                                        onPress={() => {
                                            setSelectedEducatorId(String(educator.id));
                                            setEducatorDropdownOpen(false);
                                        }}
                                        style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: "#efefef" }}
                                    >
                                        <Text>{educatorLabel(educator)}</Text>
                                    </Pressable>
                                ))}
                            </ScrollView>
                        </View>
                    )}

                    <TextInput
                        style={styles.form_text_input}
                        value={assignHours}
                        onChangeText={setAssignHours}
                        placeholder="Horaires (optionnel)"
                    />
                    <ButtonCustom title="Affecter" style={[styles.button_principal, styles.aic]} onPress={handleAssignEducator} />
                </View>

                <View style={styles.table}>
                    <View style={styles.tableTitle}>
                        <Text style={styles.h1}>Educatrices affectees</Text>
                    </View>
                    <View style={styles.tableHeader}>
                        <Text style={styles.tableHeading}>Educatrice</Text>
                        <Text style={styles.tableHeading}>Horaires</Text>
                        <Text style={styles.tableHeading}>Actions</Text>
                    </View>

                    {roomEducators.length === 0 && <Text style={styles.tableRowText}>Aucune educatrice affectee a cette salle.</Text>}
                    {roomEducators.map((item: any, index: number) => {
                        const educatorId = toEducatorId(item);
                        return (
                            <View key={educatorId || `educator-${index}`} style={styles.tableRow}>
                                <Text style={styles.tableRowText}>{educatorLabel(item)}</Text>
                                <TextInput
                                    style={[styles.form_text_input, { flex: 1, margin: 0, marginRight: 4 }]}
                                    value={educatorHoursById[educatorId] ?? ""}
                                    onChangeText={(value) => {
                                        setEducatorHoursById((prev) => ({ ...prev, [educatorId]: value }));
                                    }}
                                    placeholder="Horaires"
                                />
                                <View style={{ flex: 1, gap: 4 }}>
                                    <Button title="Maj horaires" onPress={() => handleUpdateEducatorHours(educatorId)} />
                                    <Button title="Retirer" color="red" onPress={() => handleUnassignEducator(educatorId)} />
                                </View>
                            </View>
                        );
                    })}
                </View>

                {error !== "" && <Text style={styles.text_error}>{error}</Text>}
            </View>
        </ScrollView>
    );
}
