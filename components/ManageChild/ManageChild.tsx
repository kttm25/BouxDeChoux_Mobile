import { Alert, Button, FlatList, Pressable, ScrollView, Text, View } from "react-native";
import { useEffect, useState } from "react";
import { styles } from "../../constants/Styles";
import Separator from "../Separator/Separator";
import ButtonCustom from "../ButtonCustom/ButtonCustom";
import { AppText } from "../../constants/Constants";
import ApiService from "../../services/ApiService";
import ChildCare from "../../models/childcare";
import Child from "../../models/child.model";

export function ManageChild({ navigation, route }: { navigation: any, route: any }) {
    const [childcares, setChildcares] = useState<ChildCare[]>([]);
    const [children, setChildren] = useState<Child[]>([]);
    const [selectedChildcareId, setSelectedChildcareId] = useState<number | null>(null);
    const [childcareDropdownOpen, setChildcareDropdownOpen] = useState(false);

    const loadChildcares = async () => {
        const childcaresRes = await ApiService.GetChildCares();
        if (childcaresRes.success === true) {
            setChildcares(childcaresRes.data);

            if (childcaresRes.data.length > 0 && selectedChildcareId === null) {
                setSelectedChildcareId(childcaresRes.data[0].id);
            }
        }
    };

    const loadChildrenByChildcare = async (childcareId: number) => {
        const childrenRes = await ApiService.GetChildrenByChildcare(childcareId);
        if (childrenRes.success === true) {
            setChildren(childrenRes.data);
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
            setChildren([]);
            return;
        }

        loadChildrenByChildcare(selectedChildcareId).catch(() => {
            setChildren([]);
        });
    }, [selectedChildcareId]);

    const handleDeleteChild = (childId: number) => {
        Alert.alert(
            "Suppression",
            "Voulez-vous vraiment supprimer cet enfant ?",
            [
                { text: "Annuler", style: "cancel" },
                {
                    text: "Supprimer",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            await ApiService.DeleteChild(childId);
                            if (selectedChildcareId !== null) {
                                await loadChildrenByChildcare(selectedChildcareId);
                            }
                        } catch {
                            Alert.alert("Erreur", AppText.form_incorrect);
                        }
                    },
                },
            ]
        );
    };

    return (
        <View style={styles.container}>
            <Text>{AppText.child_management_page_title}</Text>
            <Separator />

            <View style={styles.manage_menu}>
                <ButtonCustom
                    title={AppText.create_child_page_title}
                    style={styles.button_menu}
                    onPress={() => {
                        if (selectedChildcareId !== null) {
                            navigation.navigate("CreateChild", { childcareId: selectedChildcareId });
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
                    <Text style={styles.h1}>Choisir un childcare</Text>
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
                    <Text>{childcares.find((c) => c.id === selectedChildcareId)?.name ?? "-- Sélectionner un childcare --"}</Text>
                </Pressable>

                {childcareDropdownOpen && (
                    <View style={{ width: "100%", borderWidth: 1, borderColor: "#c7c7c7", borderRadius: 4, maxHeight: 180, marginTop: 6 }}>
                        <ScrollView nestedScrollEnabled>
                            {childcares.length === 0 && <Text style={{ padding: 10 }}>Aucun childcare disponible</Text>}
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
                    <Text style={styles.h1}>{AppText.child_management_page_title}</Text>
                    {selectedChildcareId !== null && (
                        <Text>
                            Childcare selectionne: {childcares.find((childcare) => childcare.id === selectedChildcareId)?.name}
                        </Text>
                    )}
                </View>
                <View style={styles.tableHeader}>
                    <Text style={styles.tableHeading}>Prenom</Text>
                    <Text style={styles.tableHeading}>Nom</Text>
                    <Text style={styles.tableHeading}>Naissance</Text>
                    <Text style={styles.tableHeading}>Actions</Text>
                </View>

                <FlatList
                    data={children}
                    keyExtractor={(item: Child) => item.id.toString()}
                    ListEmptyComponent={<Text style={styles.tableRowText}>Aucun enfant trouve pour ce childcare.</Text>}
                    renderItem={({ item }: { item: Child }) => (
                        <View style={styles.tableRow}>
                            <Text style={styles.tableRowText}>{item.firstName}</Text>
                            <Text style={styles.tableRowText}>{item.lastName}</Text>
                            <Text style={styles.tableRowText}>{item.birthDate}</Text>
                            <View style={{ flex: 1 }}>
                                <Button
                                    title="Supprimer"
                                    color="red"
                                    onPress={() => handleDeleteChild(item.id)}
                                />
                            </View>
                        </View>
                    )}
                />
            </View>
        </View>
    );
}
