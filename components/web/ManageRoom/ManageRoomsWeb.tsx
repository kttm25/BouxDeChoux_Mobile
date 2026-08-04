import { Alert, Pressable, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useEffect, useState } from "react";
import ApiService from "../../../services/ApiService";
import ChildCare from "../../../models/childcare";
import Room from "../../../models/room.model";
import { AppText } from "../../../constants/Constants";

const ROOM_ICONS = ["🦋", "🐞", "🐝", "🦗", "🐛", "🦎", "🐜", "🐌"];

function getOccupancyStatus(current: number, capacity: number): { label: string; color: string; bg: string } {
    const ratio = capacity > 0 ? current / capacity : 0;
    if (ratio >= 1) return { label: "Complet", color: "#dc2626", bg: "#fef2f2" };
    if (ratio >= 0.8) return { label: "Quasi-complet", color: "#d97706", bg: "#fffbeb" };
    return { label: "Disponible", color: "#16a34a", bg: "#f0fdf4" };
}

export default function ManageRooms({ navigation, route }: { navigation: any; route: any }) {
    const [childcares, setChildcares] = useState<ChildCare[]>([]);
    const [selectedChildcareId, setSelectedChildcareId] = useState<number | null>(null);
    const [childcareDropdownOpen, setChildcareDropdownOpen] = useState(false);
    const [rooms, setRooms] = useState<Room[]>([]);
    const [roomOccupancy, setRoomOccupancy] = useState<Record<number, { current: number; capacity: number; educator: string }>>({});
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
            const roomList: Room[] = roomsRes.data ?? [];
            setRooms(roomList);
            const occupancyMap: Record<number, { current: number; capacity: number; educator: string }> = {};
            await Promise.all(
                roomList.map(async (room) => {
                    let current = 0;
                    let educator = "";
                    try {
                        const childrenRes = await ApiService.GetChildrenByRoom(room.id);
                        if (childrenRes.success === true) current = (childrenRes.data ?? []).length;
                    } catch {}
                    try {
                        const eduRes = await ApiService.GetRoomEducators(room.id);
                        if (eduRes.success === true && eduRes.data?.length > 0) {
                            const ed = eduRes.data[0];
                            educator = [ed.firstName, ed.lastName].filter(Boolean).join(" ");
                        }
                    } catch {}
                    const capacity = parseInt(room.description ?? "") || 10;
                    occupancyMap[room.id] = { current, capacity, educator };
                })
            );
            setRoomOccupancy(occupancyMap);
        } else {
            setRooms([]);
        }
    };

    const loadData = async () => {
        try { await loadChildcares(); } catch { setChildcares([]); }
    };

    useEffect(() => { loadData(); }, [route?.params?.refreshKey]);

    useEffect(() => {
        if (selectedChildcareId === null) { setRooms([]); return; }
        loadRoomsByChildcare(selectedChildcareId).catch(() => setRooms([]));
    }, [selectedChildcareId, route?.params?.refreshKey]);

    const handleDeleteRoom = (roomId: number) => {
        Alert.alert("Suppression", "Voulez-vous vraiment supprimer ce local ?", [
            { text: "Annuler", style: "cancel" },
            {
                text: "Supprimer", style: "destructive",
                onPress: async () => {
                    if (!selectedChildcareId) return;
                    try {
                        await ApiService.DeleteRoom(roomId);
                        await loadRoomsByChildcare(selectedChildcareId);
                    } catch { setError(AppText.form_incorrect); }
                },
            },
        ]);
    };

    const totalCurrent = rooms.reduce((sum, r) => sum + (roomOccupancy[r.id]?.current ?? 0), 0);
    const totalCapacity = rooms.reduce((sum, r) => sum + (roomOccupancy[r.id]?.capacity ?? 0), 0);
    const avgOccupancy = totalCapacity > 0 ? Math.round((totalCurrent / totalCapacity) * 100) : 0;

    return (
        <ScrollView contentContainerStyle={{ paddingBottom: 32 }} style={{ backgroundColor: "#f5f6fa", flex: 1 }}>
            <View style={{ padding: 24, maxWidth: 1200, width: "100%", alignSelf: "center" }}>

                {/* Header */}
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
                    <View>
                        <Text style={{ fontSize: 26, fontWeight: "800", color: "#0f172a" }}>Gestion des locaux</Text>
                        <Text style={{ fontSize: 14, color: "#64748b", marginTop: 4 }}>Vue d'ensemble de l'occupation et de l'encadrement des salles.</Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("CreateRoom", { childcareId: selectedChildcareId })}
                        style={{ paddingHorizontal: 18, paddingVertical: 10, borderRadius: 10, backgroundColor: "#e8590c" }}
                        activeOpacity={0.85}
                    >
                        <Text style={{ color: "#fff", fontWeight: "700", fontSize: 14 }}>+ Ajouter un local</Text>
                    </TouchableOpacity>
                </View>

                {/* Childcare selector */}
                {childcares.length > 1 && (
                    <View style={{ marginBottom: 20 }}>
                        <Pressable
                            onPress={() => setChildcareDropdownOpen((prev) => !prev)}
                            style={{ backgroundColor: "#fff", borderWidth: 1, borderColor: "#e2e8f0", borderRadius: 10, paddingVertical: 12, paddingHorizontal: 14 }}
                        >
                            <Text style={{ color: "#0f172a", fontWeight: "600" }}>
                                {childcares.find((c) => c.id === selectedChildcareId)?.name ?? "Selectionner une garderie"}
                            </Text>
                        </Pressable>
                        {childcareDropdownOpen && (
                            <View style={{ backgroundColor: "#fff", borderWidth: 1, borderColor: "#e2e8f0", borderRadius: 10, marginTop: 4 }}>
                                {childcares.map((c) => (
                                    <Pressable key={c.id} onPress={() => { setSelectedChildcareId(c.id); setChildcareDropdownOpen(false); }}
                                        style={{ padding: 12, borderBottomWidth: 1, borderBottomColor: "#f1f5f9" }}>
                                        <Text style={{ color: "#0f172a" }}>{c.name}</Text>
                                    </Pressable>
                                ))}
                            </View>
                        )}
                    </View>
                )}

                {/* Room cards */}
                <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 16, marginBottom: 24 }}>
                    {rooms.length === 0 && <Text style={{ color: "#94a3b8", fontSize: 14 }}>Aucun local pour cette garderie.</Text>}
                    {rooms.map((item, idx) => {
                        const occ = roomOccupancy[item.id] ?? { current: 0, capacity: 10, educator: "" };
                        const status = getOccupancyStatus(occ.current, occ.capacity);
                        const ratio = occ.capacity > 0 ? Math.min(occ.current / occ.capacity, 1) : 0;
                        const barColor = ratio >= 1 ? "#dc2626" : ratio >= 0.8 ? "#d97706" : "#16a34a";

                        return (
                            <View key={item.id} style={{ backgroundColor: "#fff", borderRadius: 16, padding: 20, width: 260, shadowColor: "#000", shadowOpacity: 0.07, shadowRadius: 8, shadowOffset: { width: 0, height: 2 } }}>
                                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                                    <View style={{ width: 44, height: 44, borderRadius: 12, backgroundColor: "#f0fdf4", alignItems: "center", justifyContent: "center" }}>
                                        <Text style={{ fontSize: 22 }}>{ROOM_ICONS[idx % ROOM_ICONS.length]}</Text>
                                    </View>
                                    <View style={{ paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20, backgroundColor: status.bg }}>
                                        <Text style={{ color: status.color, fontWeight: "700", fontSize: 12 }}>{status.label}</Text>
                                    </View>
                                </View>
                                <Text style={{ fontSize: 16, fontWeight: "700", color: "#0f172a", marginBottom: 2 }}>{item.name}</Text>
                                <Text style={{ fontSize: 12, color: "#64748b", marginBottom: 12 }}>{item.description || item.openingHours || ""}</Text>
                                <View style={{ height: 6, backgroundColor: "#f1f5f9", borderRadius: 4, marginBottom: 6, overflow: "hidden" }}>
                                    <View style={{ height: "100%", width: `${Math.round(ratio * 100)}%` as any, backgroundColor: barColor, borderRadius: 4 }} />
                                </View>
                                <Text style={{ fontSize: 12, color: barColor, fontWeight: "600", marginBottom: 12 }}>
                                    Capacite <Text style={{ fontWeight: "800" }}>{occ.current} / {occ.capacity}</Text> enfants
                                </Text>
                                {occ.educator !== "" && (
                                    <View style={{ flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 14, backgroundColor: "#f8fafc", borderRadius: 8, padding: 8 }}>
                                        <View style={{ width: 28, height: 28, borderRadius: 14, backgroundColor: "#e2e8f0", alignItems: "center", justifyContent: "center" }}>
                                            <Text style={{ fontSize: 12 }}>👤</Text>
                                        </View>
                                        <View>
                                            <Text style={{ fontSize: 10, color: "#94a3b8" }}>Educatrice</Text>
                                            <Text style={{ fontSize: 13, fontWeight: "600", color: "#0f172a" }}>{occ.educator}</Text>
                                        </View>
                                    </View>
                                )}
                                <View style={{ flexDirection: "row", gap: 12 }}>
                                    <Pressable onPress={() => navigation.navigate("UpdateRoom", { roomId: item.id, childcareId: selectedChildcareId })}>
                                        <Text style={{ color: "#2A9D8F", fontWeight: "600", fontSize: 13 }}>Modifier</Text>
                                    </Pressable>
                                    <Pressable onPress={() => navigation.navigate("AssignRoomEducator", { roomId: item.id, childcareId: selectedChildcareId, roomName: item.name })}>
                                        <Text style={{ color: "#6366f1", fontWeight: "600", fontSize: 13 }}>Affecter</Text>
                                    </Pressable>
                                    <Pressable onPress={() => handleDeleteRoom(item.id)}>
                                        <Text style={{ color: "#dc2626", fontWeight: "600", fontSize: 13 }}>Supprimer</Text>
                                    </Pressable>
                                </View>
                            </View>
                        );
                    })}
                </View>

                {/* Stats */}
                <View style={{ flexDirection: "row", gap: 16, flexWrap: "wrap" }}>
                    <View style={{ flex: 1, minWidth: 200, backgroundColor: "#1F8A70", borderRadius: 16, padding: 24, overflow: "hidden" }}>
                        <Text style={{ color: "rgba(255,255,255,0.7)", fontSize: 11, fontWeight: "700", letterSpacing: 1, marginBottom: 8 }}>CAPACITE TOTALE</Text>
                        <Text style={{ color: "#fff", fontSize: 32, fontWeight: "800" }}>{totalCurrent} / {totalCapacity}</Text>
                    </View>
                    <View style={{ flex: 1, minWidth: 200, backgroundColor: "#7c3aed", borderRadius: 16, padding: 24, overflow: "hidden" }}>
                        <Text style={{ color: "rgba(255,255,255,0.7)", fontSize: 11, fontWeight: "700", letterSpacing: 1, marginBottom: 8 }}>LOCAUX ACTIFS</Text>
                        <Text style={{ color: "#fff", fontSize: 32, fontWeight: "800" }}>{rooms.length} Salles</Text>
                    </View>
                    <View style={{ flex: 1, minWidth: 200, backgroundColor: "#92400e", borderRadius: 16, padding: 24, overflow: "hidden" }}>
                        <Text style={{ color: "rgba(255,255,255,0.7)", fontSize: 11, fontWeight: "700", letterSpacing: 1, marginBottom: 8 }}>MOYENNE OCCUPATION</Text>
                        <Text style={{ color: "#fff", fontSize: 32, fontWeight: "800" }}>{avgOccupancy}%</Text>
                    </View>
                </View>

                {error !== "" && <Text style={{ color: "#dc2626", marginTop: 12 }}>{error}</Text>}
            </View>
        </ScrollView>
    );
}



