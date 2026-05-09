import { Alert, Button, FlatList, Pressable, ScrollView, Text, View } from "react-native";
import { styles } from "../../constants/Styles";
import Separator from "../Separator/Separator";
import ButtonCustom from "../ButtonCustom/ButtonCustom";
import { AppText } from "../../constants/Constants";
import { useEffect, useState } from "react";
import ApiService from "../../services/ApiService";
import ChildCare from "../../models/childcare";
import User from "../../models/user.model";

type ChildCareUser = User;

export function ManageParent({ navigation, route }: { navigation: any, route: any }) {
    const [parents, setParents] = useState<ChildCareUser[]>([]);
    const [childcares, setChildcares] = useState<ChildCare[]>([]);
    const [selectedChildcareId, setSelectedChildcareId] = useState<number | null>(null);
    const [childcareDropdownOpen, setChildcareDropdownOpen] = useState(false);

    const loadData = () => {
        ApiService.GetChildCares()
            .then((childcaresRes) => {
                if (childcaresRes.success === true) {
                    setChildcares(childcaresRes.data);

                    if (childcaresRes.data.length > 0) {
                        setSelectedChildcareId((prev) => prev ?? childcaresRes.data[0].id);
                    }
                }
            })
            .catch(() => {
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'FirstPage' }],
                })
            });
    };

    const loadParentsByChildcare = (childcareId: number) => {
        ApiService.GetParentByChildCares(childcareId)
            .then((parentsRes) => {
                if (parentsRes.success === true) {
                    setParents(parentsRes.data.filter((user: User) => user.role?.toLowerCase() === "parent"));
                }
            })
            .catch(() => {
                setParents([]);
            });
    };

    useEffect(() => {
        loadData();
    }
    , [route?.params?.refreshKey]);

    useEffect(() => {
        if (selectedChildcareId !== null) {
            loadParentsByChildcare(selectedChildcareId);
        } else {
            setParents([]);
        }
    }, [selectedChildcareId]);

    const handleDeleteParent = (parentId: number) => {
        Alert.alert(
            "Suppression",
            "Voulez-vous vraiment supprimer ce parent ?",
            [
                { text: "Annuler", style: "cancel" },
                {
                    text: "Supprimer",
                    style: "destructive",
                    onPress: () => {
                        ApiService.DeleteParent(parentId)
                            .then(() => {
                                if (selectedChildcareId !== null) {
                                    loadParentsByChildcare(selectedChildcareId);
                                }
                            })
                            .catch(() => Alert.alert("Erreur", AppText.form_incorrect));
                    },
                },
            ]
        );
    };

    return (
        <View style={styles.container}>
            <Text>Gerer les parents</Text>
            <Separator />
            <View style={styles.manage_menu}>
                <ButtonCustom
                    title={AppText.create_parent_page_title}
                    style={styles.button_menu}
                    onPress={() => {
                        if (selectedChildcareId !== null) {
                            navigation.navigate("CreateParent", { childcareId: selectedChildcareId });
                        }
                    }}
                />

                <ButtonCustom
                    title="Créer un enfant"
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
                    <Text style={styles.h1}>{AppText.parent_management_page_title}</Text>
                    {selectedChildcareId !== null && (
                        <Text>Childcare selectionne: {childcares.find((childcare) => childcare.id === selectedChildcareId)?.name}</Text>
                    )}
                </View>
                <View style={styles.tableHeader}>
                    <Text style={styles.tableHeading}> Nom</Text>
                    <Text style={styles.tableHeading}> Email</Text>
                    <Text style={styles.tableHeading}> Adresse</Text>
                    <Text style={styles.tableHeading}> Actions</Text>
                </View>
                <FlatList
                    data={parents}
                    keyExtractor={(item: User) => item.id.toString()}
                    ListEmptyComponent={<Text style={styles.tableRowText}>Aucun parent trouve pour ce childcare.</Text>}
                    renderItem={({ item } : {item : ChildCareUser}) => (
                        <View style={styles.tableRow}>
                            <Text style={styles.tableRowText}>{item.firstName + " " + item.lastName}</Text>
                            <Text style={styles.tableRowText}>{item.email}</Text>
                            <Text style={styles.tableRowText}>{item.address}</Text>
                            <View style={{ flex: 1, gap: 4 }}>
                                <Button
                                    title="Modifier"
                                    onPress={() => navigation.navigate("UpdateParent", { parent: item, childcareId: selectedChildcareId })}
                                />
                                <Button
                                    title="Supprimer"
                                    color="red"
                                    onPress={() => handleDeleteParent(item.id)}
                                />
                            </View>
                        </View>
                    )}>

                </FlatList>
            </View>
        </View>
    );
}