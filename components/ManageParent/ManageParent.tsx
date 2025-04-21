import { Button, FlatList, Text, View } from "react-native";
import { styles } from "../../constants/Styles";
import Separator from "../Separator/Separator";
import ButtonCustom from "../ButtonCustom/ButtonCustom";
import { AppText } from "../../constants/Constants";
import { useEffect, useState } from "react";
import ApiService from "../../services/ApiService";
import { set } from "react-hook-form";
import ChildCare from "../../models/childcare";
import User from "../../models/user.model";

export function ManageParent({ navigation }: { navigation: any }) {
    const [parent, setParent] = useState([]);

    useEffect(() => {
        // Perform any necessary setup or API calls here
        ApiService.GetChildCareUsers().then(res => {
            if (res.success === true) {
                setParent(res.data.filter((user: User) => user.role === "parent"));
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
            <Text>Gerer les parents</Text>
            <Separator />
            <View style={styles.manage_menu}>
                <ButtonCustom
                    title={AppText.create_parent_page_title}
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
                    <Text style={styles.h1}>{AppText.parent_management_page_title}</Text>
                </View>
                <View style={styles.tableHeader}>
                    <Text style={styles.tableHeading}> Nom</Text>
                    <Text style={styles.tableHeading}> Email</Text>
                    <Text style={styles.tableHeading}> Adresse</Text>
                </View>
                <FlatList
                    data={parent}
                    keyExtractor={(item: User) => item.id.toString()}
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