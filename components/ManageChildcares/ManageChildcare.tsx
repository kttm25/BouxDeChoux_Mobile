import { Button, FlatList, Text, View } from "react-native";
import { styles } from "../../constants/Styles";
import Separator from "../Separator/Separator";
import ButtonCustom from "../ButtonCustom/ButtonCustom";
import { AppText } from "../../constants/Constants";
import { useEffect, useState } from "react";
import ApiService from "../../services/ApiService";
import { set } from "react-hook-form";
import ChildCare from "../../models/childcare";

export function ManageChildCare({ navigation }: { navigation: any }) {
    const [chidcares, setChildcares] = useState([]);

    useEffect(() => {
        // Perform any necessary setup or API calls here
        ApiService.GetChildCares().then(res => {
            if (res.success === true) {
                setChildcares(res.data);
            }
        }).catch(error => {
            navigation.reset({
                index: 0,
                routes: [{ name: 'FirstPage' }],
            })
        });
    }
        , []);

    return (
        <View style={styles.container}>
            <Text>Gerer ses childcares</Text>
            <Separator />
            <View style={styles.manage_menu}>
                <ButtonCustom
                    title={AppText.create_childcare_button}
                    style={styles.button_menu}
                    onPress={() => navigation.navigate("CreateChildCare")}
                />

                <ButtonCustom
                    title="Gerer"
                    style={styles.button_menu}
                    onPress={() => navigation.navigate("Home")}
                />
            </View>
            <View style={styles.table}>

                <View style={styles.tableTitle}>
                    <Text style={styles.h1}>{AppText.childcare_management_page_title}</Text>
                </View>
                <View style={styles.tableHeader}>
                    <Text style={styles.tableHeading}> Nom</Text>
                    <Text style={styles.tableHeading}> Email</Text>
                    <Text style={styles.tableHeading}> Adresse</Text>
                </View>
                <FlatList
                    data={chidcares}
                    keyExtractor={(item: ChildCare) => item.id.toString()}
                    renderItem={({ item } : {item : ChildCare}) => (
                        <View style={styles.tableRow}>
                            <Text style={styles.tableRowText}>{item.name}</Text>
                            <Text style={styles.tableRowText}>{item.email}</Text>
                            <Text style={styles.tableRowText}>{item.address}</Text>
                        </View>
                    )}>

                </FlatList>
            </View>
        </View>
    );
}