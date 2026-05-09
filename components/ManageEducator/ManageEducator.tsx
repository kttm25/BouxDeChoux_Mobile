import { Button, FlatList, Pressable, ScrollView, Text, View } from "react-native";
import { styles } from "../../constants/Styles";
import Separator from "../Separator/Separator";
import ButtonCustom from "../ButtonCustom/ButtonCustom";
import { AppText } from "../../constants/Constants";
import { useEffect, useState } from "react";
import ApiService from "../../services/ApiService";
import ChildCare from "../../models/childcare";
import User from "../../models/user.model";

export function ManageEducator({ navigation }: { navigation: any }) {
    const [educator, setEducator] = useState<User[]>([]);
    const [childcares, setChildcares] = useState<ChildCare[]>([]);
    const [selectedChildcareId, setSelectedChildcareId] = useState<number | null>(null);
    const [childcareDropdownOpen, setChildcareDropdownOpen] = useState(false);

    useEffect(() => {
        ApiService.GetChildCares().then(res => {
            if (res.success === true) {
                setChildcares(res.data);
                if (res.data.length > 0) {
                    setSelectedChildcareId(res.data[0].id);
                }
            }
        }).catch(() => {
            navigation.reset({
                index: 0,
                routes: [{ name: 'FirstPage' }],
            })
        });
    }
        , []);

    useEffect(() => {
        if (selectedChildcareId === null) {
            setEducator([]);
            return;
        }

        ApiService.GetPersonalByChildCares(selectedChildcareId)
            .then(res => {
                if (res.success === true) {
                    setEducator(res.data.filter((user: User) => user.role?.toLowerCase() === "educatrice"));
                }
            })
            .catch(() => {
                setEducator([]);
            });
    }, [selectedChildcareId]);

    return (
        <View style={styles.container}>
            <Text>Gerer les educatrices</Text>
            <Separator />
            <View style={styles.manage_menu}>
                <ButtonCustom
                    title={AppText.create_educatrice_button}
                    style={styles.button_menu}
                    onPress={() => null/*navigation.navigate("CreateEducator")*/}
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
                    <Text style={styles.h1}>{AppText.educatrice_management_page_title}</Text>
                    {selectedChildcareId !== null && (
                        <Text>Childcare selectionne: {childcares.find((childcare) => childcare.id === selectedChildcareId)?.name}</Text>
                    )}
                </View>
                <View style={styles.tableHeader}>
                    <Text style={styles.tableHeading}> Nom</Text>
                    <Text style={styles.tableHeading}> Email</Text>
                    <Text style={styles.tableHeading}> Adresse</Text>
                </View>
                <FlatList
                    data={educator}
                    keyExtractor={(item: User) => item.id.toString()}
                    ListEmptyComponent={<Text style={styles.tableRowText}>Aucune educatrice trouvee pour ce childcare.</Text>}
                    renderItem={({ item } : {item : User}) => (
                        <View style={styles.tableRow}>
                            <Text style={styles.tableRowText}>{item.firstName + " " + item.lastName}</Text>
                            <Text style={styles.tableRowText}>{item.email}</Text>
                            <Text style={styles.tableRowText}>{item.address}</Text>
                        </View>
                    )}>

                </FlatList>
            </View>
        </View>
    );
}