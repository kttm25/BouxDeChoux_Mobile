import { Alert, Pressable, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useEffect, useState } from "react";
import { AppText } from "../../../constants/Constants";
import ApiService from "../../../services/ApiService";
import ChildCare from "../../../models/childcare";
import Child from "../../../models/child.model";
import AdminTaskBar from "../AdminTaskBar/AdminTaskBar";

const AVATAR_COLORS = ["#e0f5f0", "#fff0d8", "#fce7f3", "#e0f2fe", "#f0e8ff"];

function formatAge(birthDate: string): string {
    if (!birthDate) return "";
    const born = new Date(birthDate);
    if (isNaN(born.getTime())) return birthDate;
    const diffMs = Date.now() - born.getTime();
    const months = Math.floor(diffMs / (1000 * 60 * 60 * 24 * 30.44));
    if (months < 24) return `${months} mois`;
    return `${Math.floor(months / 12)} ans`;
}

export default function ManageChild({ navigation, route }: { navigation: any, route: any }) {
    const [childcares, setChildcares] = useState<ChildCare[]>([]);
    const [children, setChildren] = useState<Child[]>([]);
    const [selectedChildcareId, setSelectedChildcareId] = useState<number | null>(null);
    const [childcareDropdownOpen, setChildcareDropdownOpen] = useState(false);

    const loadChildcares = async () => {
        const res = await ApiService.GetChildCares();
        if (res.success === true) {
            setChildcares(res.data);
            if (res.data.length > 0 && selectedChildcareId === null) setSelectedChildcareId(res.data[0].id);
        }
    };

    const loadChildren = async (childcareId: number) => {
        const res = await ApiService.GetChildrenByChildcare(childcareId);
        if (res.success === true) setChildren(res.data);
    };

    useEffect(() => { loadChildcares().catch(() => setChildcares([])); }, [route?.params?.refreshKey]);
    useEffect(() => {
        if (selectedChildcareId === null) { setChildren([]); return; }
        loadChildren(selectedChildcareId).catch(() => setChildren([]));
    }, [selectedChildcareId]);

    const handleDelete = (childId: number) => {
        Alert.alert("Suppression", "Voulez-vous vraiment supprimer cet enfant ?", [
            { text: "Annuler", style: "cancel" },
            {
                text: "Supprimer", style: "destructive",
                onPress: async () => {
                    try {
                        await ApiService.DeleteChild(childId);
                        if (selectedChildcareId !== null) await loadChildren(selectedChildcareId);
                    } catch { Alert.alert("Erreur", AppText.form_incorrect); }
                },
            },
        ]);
    };

    return (
        <View style={{ flex: 1 }}>
            <AdminTaskBar navigation={navigation} activeKey="enfants" />
            <ScrollView contentContainerStyle={{ paddingBottom: 32 }} style={{ backgroundColor: "#f5f6fa", flex: 1 }}>
                <View style={{ padding: 24, maxWidth: 1200, width: "100%", alignSelf: "center" }}>

                {/* Header */}
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
                    <View>
                        <Text style={{ fontSize: 26, fontWeight: "800", color: "#0f172a" }}>Gestion des enfants</Text>
                        <Text style={{ fontSize: 14, color: "#64748b", marginTop: 4 }}>Consulter les profils et inscriptions des enfants.</Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => selectedChildcareId !== null && navigation.navigate("CreateChild", { childcareId: selectedChildcareId })}
                        style={{ paddingHorizontal: 18, paddingVertical: 10, borderRadius: 10, backgroundColor: "#e8590c" }}
                        activeOpacity={0.85}
                    >
                        <Text style={{ color: "#fff", fontWeight: "700", fontSize: 14 }}>+ Inscrire un enfant</Text>
                    </TouchableOpacity>
                </View>

                {/* Childcare selector */}
                {childcares.length > 1 && (
                    <View style={{ marginBottom: 20 }}>
                        <Pressable onPress={() => setChildcareDropdownOpen(p => !p)}
                            style={{ backgroundColor: "#fff", borderWidth: 1, borderColor: "#e2e8f0", borderRadius: 10, paddingVertical: 12, paddingHorizontal: 14 }}>
                            <Text style={{ color: "#0f172a", fontWeight: "600" }}>
                                {childcares.find(c => c.id === selectedChildcareId)?.name ?? "Selectionner une garderie"}
                            </Text>
                        </Pressable>
                        {childcareDropdownOpen && (
                            <View style={{ backgroundColor: "#fff", borderWidth: 1, borderColor: "#e2e8f0", borderRadius: 10, marginTop: 4 }}>
                                {childcares.map(c => (
                                    <Pressable key={c.id} onPress={() => { setSelectedChildcareId(c.id); setChildcareDropdownOpen(false); }}
                                        style={{ padding: 12, borderBottomWidth: 1, borderBottomColor: "#f1f5f9" }}>
                                        <Text style={{ color: "#0f172a" }}>{c.name}</Text>
                                    </Pressable>
                                ))}
                            </View>
                        )}
                    </View>
                )}

                {/* Children cards */}
                <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 16, marginBottom: 24 }}>
                    {children.length === 0 && <Text style={{ color: "#94a3b8", fontSize: 14 }}>Aucun enfant pour cette garderie.</Text>}
                    {children.map((item, idx) => (
                        <View key={item.id} style={{ backgroundColor: "#fff", borderRadius: 16, padding: 20, width: 260, shadowColor: "#000", shadowOpacity: 0.07, shadowRadius: 8, shadowOffset: { width: 0, height: 2 } }}>
                            <View style={{ flexDirection: "row", alignItems: "center", gap: 12, marginBottom: 14 }}>
                                <View style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: AVATAR_COLORS[idx % AVATAR_COLORS.length], alignItems: "center", justifyContent: "center" }}>
                                    <Text style={{ fontSize: 18, fontWeight: "700", color: "#0f172a" }}>
                                        {(item.firstName?.[0] ?? "") + (item.lastName?.[0] ?? "")}
                                    </Text>
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text style={{ fontSize: 15, fontWeight: "700", color: "#0f172a" }}>{item.firstName} {item.lastName}</Text>
                                    <Text style={{ fontSize: 12, color: "#64748b" }}>{formatAge(item.birthDate)}</Text>
                                </View>
                            </View>
                            <View style={{ gap: 4, marginBottom: 14 }}>
                                {item.allergies ? <Text style={{ fontSize: 12, color: "#b45309" }}>⚠️ {item.allergies}</Text> : null}
                                {item.medication ? <Text style={{ fontSize: 12, color: "#0369a1" }}>💊 {item.medication}</Text> : null}
                            </View>
                            <View style={{ flexDirection: "row", gap: 12 }}>
                                <Pressable onPress={() => navigation.navigate("ManageDailyReports", { childcareId: selectedChildcareId, childId: item.id })}>
                                    <Text style={{ color: "#2A9D8F", fontWeight: "600", fontSize: 13 }}>Notes</Text>
                                </Pressable>
                                <Pressable onPress={() => handleDelete(item.id)}>
                                    <Text style={{ color: "#dc2626", fontWeight: "600", fontSize: 13 }}>Supprimer</Text>
                                </Pressable>
                            </View>
                        </View>
                    ))}
                </View>

                    {/* Stats */}
                    <View style={{ flexDirection: "row", gap: 16, flexWrap: "wrap" }}>
                        <View style={{ flex: 1, minWidth: 200, backgroundColor: "#e8590c", borderRadius: 16, padding: 24 }}>
                            <Text style={{ color: "rgba(255,255,255,0.7)", fontSize: 11, fontWeight: "700", letterSpacing: 1, marginBottom: 8 }}>TOTAL ENFANTS</Text>
                            <Text style={{ color: "#fff", fontSize: 32, fontWeight: "800" }}>{children.length}</Text>
                        </View>
                        <View style={{ flex: 1, minWidth: 200, backgroundColor: "#7c3aed", borderRadius: 16, padding: 24 }}>
                            <Text style={{ color: "rgba(255,255,255,0.7)", fontSize: 11, fontWeight: "700", letterSpacing: 1, marginBottom: 8 }}>GARDERIE</Text>
                            <Text style={{ color: "#fff", fontSize: 20, fontWeight: "800" }}>
                                {childcares.find(c => c.id === selectedChildcareId)?.name ?? "—"}
                            </Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

