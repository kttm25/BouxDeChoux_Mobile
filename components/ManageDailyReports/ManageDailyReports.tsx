import { Alert, Button, FlatList, Pressable, ScrollView, Text, View } from "react-native";
import { useEffect, useMemo, useState } from "react";
import { styles } from "../../constants/Styles";
import Separator from "../Separator/Separator";
import ButtonCustom from "../ButtonCustom/ButtonCustom";
import ApiService from "../../services/ApiService";
import ChildCare from "../../models/childcare";
import Child from "../../models/child.model";
import DailyReport from "../../models/dailyReport.model";

function formatDisplayDate(dateValue: string): string {
    const parsed = new Date(dateValue);
    if (Number.isNaN(parsed.getTime())) {
        return dateValue;
    }

    return parsed.toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });
}

function chipLabel(value: number): string {
    return `${value}/3`;
}

function valueColor(value: number): string {
    if (value >= 3) return "#1F8A70";
    if (value === 2) return "#E09F3E";
    return "#D1495B";
}

export default function ManageDailyReports({ navigation, route }: { navigation: any; route: any }) {
    const [childcares, setChildcares] = useState<ChildCare[]>([]);
    const [children, setChildren] = useState<Child[]>([]);
    const [selectedChildcareId, setSelectedChildcareId] = useState<number | null>(null);
    const [selectedChildId, setSelectedChildId] = useState<number | null>(null);
    const [selectedChildcareDropdownOpen, setSelectedChildcareDropdownOpen] = useState(false);
    const [selectedChildDropdownOpen, setSelectedChildDropdownOpen] = useState(false);
    const [reports, setReports] = useState<DailyReport[]>([]);
    const [error, setError] = useState("");

    const selectedChildcare = useMemo(() => childcares.find((item) => item.id === selectedChildcareId), [childcares, selectedChildcareId]);
    const selectedChild = useMemo(() => children.find((item) => item.id === selectedChildId), [children, selectedChildId]);

    const loadChildcares = async () => {
        const childcaresRes = await ApiService.GetChildCares();
        if (childcaresRes.success === true) {
            const items = childcaresRes.data ?? [];
            setChildcares(items);

            const routeChildcareId = Number(route?.params?.childcareId);
            if (routeChildcareId) {
                setSelectedChildcareId(routeChildcareId);
            } else if (items.length > 0 && selectedChildcareId === null) {
                setSelectedChildcareId(items[0].id);
            }
        }
    };

    const loadChildren = async (childcareId: number) => {
        const childrenRes = await ApiService.GetChildrenByChildcare(childcareId);
        if (childrenRes.success === true) {
            const items = childrenRes.data ?? [];
            setChildren(items);

            const routeChildId = Number(route?.params?.childId);
            if (routeChildId) {
                const routeChild = items.find((item: Child) => item.id === routeChildId);
                setSelectedChildId(routeChild?.id ?? (items[0]?.id ?? null));
            } else if (items.length > 0) {
                setSelectedChildId((prev) => prev ?? items[0].id);
            } else {
                setSelectedChildId(null);
            }
        } else {
            setChildren([]);
            setSelectedChildId(null);
        }
    };

    const loadReports = async (childId: number) => {
        const reportsRes = await ApiService.GetDailyReportsByChild(childId);
        if (reportsRes.success === true) {
            setReports(reportsRes.data ?? []);
        } else {
            setReports([]);
        }
    };

    useEffect(() => {
        loadChildcares().catch(() => {
            navigation.reset({ index: 0, routes: [{ name: "FirstPage" }] });
        });
    }, [route?.params?.refreshKey]);

    useEffect(() => {
        if (selectedChildcareId === null) {
            setChildren([]);
            setSelectedChildId(null);
            setReports([]);
            return;
        }

        loadChildren(selectedChildcareId).catch(() => {
            setChildren([]);
            setSelectedChildId(null);
            setReports([]);
        });
    }, [selectedChildcareId, route?.params?.refreshKey]);

    useEffect(() => {
        if (selectedChildId === null) {
            setReports([]);
            return;
        }

        loadReports(selectedChildId).catch(() => setReports([]));
    }, [selectedChildId, route?.params?.refreshKey]);

    const handleDeleteReport = (reportId: number) => {
        Alert.alert("Suppression", "Voulez-vous vraiment supprimer cette note journalière ?", [
            { text: "Annuler", style: "cancel" },
            {
                text: "Supprimer",
                style: "destructive",
                onPress: async () => {
                    try {
                        await ApiService.DeleteDailyReport(reportId);
                        if (selectedChildId !== null) {
                            await loadReports(selectedChildId);
                        }
                    } catch {
                        setError("Impossible de supprimer la note.");
                    }
                },
            },
        ]);
    };

    return (
        <FlatList
            data={reports}
            keyExtractor={(item: DailyReport) => item.id.toString()}
            contentContainerStyle={{ paddingBottom: 24 }}
            ListHeaderComponent={
                <View style={[styles.container, { justifyContent: "flex-start", width: "100%" }]}>
                    <Text style={styles.h1}>Notes journalières</Text>
                    <Separator />

                    <View style={styles.manage_menu}>
                        <ButtonCustom
                            title="Créer une note"
                            style={styles.button_menu}
                            onPress={() => {
                                if (selectedChildId !== null && selectedChildcareId !== null) {
                                    navigation.navigate("CreateDailyReport", {
                                        childId: selectedChildId,
                                        childName: `${selectedChild?.firstName ?? ""} ${selectedChild?.lastName ?? ""}`.trim(),
                                        childcareId: selectedChildcareId,
                                    });
                                }
                            }}
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
                            onPress={() => setSelectedChildcareDropdownOpen((prev) => !prev)}
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
                            <Text>{selectedChildcare?.name ?? "-- Sélectionner une garderie --"}</Text>
                        </Pressable>

                        {selectedChildcareDropdownOpen && (
                            <View style={{ width: "100%", borderWidth: 1, borderColor: "#c7c7c7", borderRadius: 4, maxHeight: 180, marginTop: 6 }}>
                                <ScrollView nestedScrollEnabled>
                                    {childcares.length === 0 && <Text style={{ padding: 10 }}>Aucune garderie disponible</Text>}
                                    {childcares.map((childcare) => (
                                        <Pressable
                                            key={childcare.id}
                                            onPress={() => {
                                                setSelectedChildcareId(childcare.id);
                                                setSelectedChildcareDropdownOpen(false);
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
                            <Text style={styles.h1}>Choisir un enfant</Text>
                        </View>
                        <Pressable
                            onPress={() => setSelectedChildDropdownOpen((prev) => !prev)}
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
                            <Text>{selectedChild ? `${selectedChild.firstName} ${selectedChild.lastName}` : "-- Sélectionner un enfant --"}</Text>
                        </Pressable>

                        {selectedChildDropdownOpen && (
                            <View style={{ width: "100%", borderWidth: 1, borderColor: "#c7c7c7", borderRadius: 4, maxHeight: 180, marginTop: 6 }}>
                                <ScrollView nestedScrollEnabled>
                                    {children.length === 0 && <Text style={{ padding: 10 }}>Aucun enfant disponible</Text>}
                                    {children.map((child) => (
                                        <Pressable
                                            key={child.id}
                                            onPress={() => {
                                                setSelectedChildId(child.id);
                                                setSelectedChildDropdownOpen(false);
                                            }}
                                            style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: "#efefef" }}
                                        >
                                            <Text>{child.firstName} {child.lastName}</Text>
                                        </Pressable>
                                    ))}
                                </ScrollView>
                            </View>
                        )}
                    </View>

                    {error !== "" && <Text style={styles.text_error}>{error}</Text>}

                    <View style={styles.table}>
                        <View style={styles.tableTitle}>
                            <Text style={styles.h1}>Historique des notes</Text>
                            {selectedChild && <Text>Enfant selectionne: {selectedChild.firstName} {selectedChild.lastName}</Text>}
                            <Text>Une note créée ne peut plus être modifiée.</Text>
                        </View>
                        <View style={styles.tableHeader}>
                            <Text style={styles.tableHeading}>Date</Text>
                            <Text style={styles.tableHeading}>Humeur</Text>
                            <Text style={styles.tableHeading}>Participation</Text>
                            <Text style={styles.tableHeading}>Actions</Text>
                        </View>
                    </View>
                </View>
            }
            ListEmptyComponent={
                <View style={{ paddingHorizontal: 16 }}>
                    <Text style={styles.tableRowText}>Aucune note trouvée pour cet enfant.</Text>
                </View>
            }
            renderItem={({ item }) => (
                <View style={[styles.tableRow, { paddingHorizontal: 10, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: "#EAEAEA" }]}>
                    <Text style={styles.tableRowText}>{formatDisplayDate(item.date)}</Text>
                    <View style={{ flex: 1, alignItems: "flex-start", gap: 4 }}>
                        <Text style={{ backgroundColor: valueColor(item.mood), color: "white", borderRadius: 999, paddingHorizontal: 10, paddingVertical: 4 }}>{chipLabel(item.mood)}</Text>
                    </View>
                    <View style={{ flex: 1, alignItems: "flex-start", gap: 4 }}>
                        <Text style={{ backgroundColor: valueColor(item.participation), color: "white", borderRadius: 999, paddingHorizontal: 10, paddingVertical: 4 }}>{chipLabel(item.participation)}</Text>
                    </View>
                    <View style={{ flex: 1, gap: 4 }}>
                        <Button
                            title="Consulter"
                            onPress={() => navigation.navigate("ViewDailyReport", {
                                report: item,
                                childName: `${selectedChild?.firstName ?? ""} ${selectedChild?.lastName ?? ""}`.trim(),
                            })}
                        />
                        <Button title="Supprimer" color="red" onPress={() => handleDeleteReport(item.id)} />
                    </View>
                </View>
            )}
        />
    );
}
