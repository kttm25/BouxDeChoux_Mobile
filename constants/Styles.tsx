import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    manage_menu: {
        alignContent: 'space-between',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: "100%",
        paddingLeft: 5,
        paddingRight: 5,
    },
    modal_container: {
        height: "30%",
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    h1: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    h2: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    h3: {
        fontSize: 18,
        fontWeight: 'bold',
    },

    form_container: {
        backgroundColor: '#fff',
        width: "80%",
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    form_text: {
        fontSize: 11,
    },
    form_text_input: {
        margin: 5,
        padding: 15,
        borderWidth: 1,
        borderRadius: 4,
        width: "100%",
        borderColor: "black"
    },
    form_text_input_2: {
        margin: 5,
        borderWidth: 1,
        borderRadius: 4,
        width: "100%",
        backgroundColor: "white",
        borderColor: "black"
    },
    aic: {
        alignItems: "center",
        width: "100%",
    },
    gridContainer: {
        width: 220,
    },
    table: {
        width: "100%",
    },
    tableTitle: {
        backgroundColor: "#FDD49E",
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
        elevation: 2,
        shadowColor: "#000",
        marginBottom: 5,
    },
    tableHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        padding: 10,
        fontFamily: "Arial",
    },
    tableHeading: {
        flex: 1,
        fontSize: 16,
    },
    tableRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    tableRowText: {
        flex: 1,
    },
    picker: { 
        backgroundColor: 'rgb(211, 211, 211)', 
        elevation: 1, 
        zIndex: 22, 
        width: '100%', 
        marginTop: 60, 
        position: 'absolute' 
    },
    button_principal: {
        backgroundColor: "#FDD49E",
        margin: 5,
        color: "#FDD49E",
        alignItems: 'center',
        padding: 5,
        minWidth: "60%",
        minHeight: "8%",
        justifyContent: "center",
        borderRadius: 5,
    },
    button_menu: {
        backgroundColor: "#FDD49E",
        color: "#FDD49E",
        alignItems: 'center',
        padding: 5,
        minWidth: "30%",
        minHeight: "8%",
        justifyContent: "center",
        borderRadius: 5,
    },
    text_secondary: {
        color: "blue",
        margin: 5,
        fontSize: 14,
    },
    text_error: {
        color: "red",
        fontSize: 14,
    },
    separator: {
        marginVertical: 8,
        margin: 10,
        minWidth: "80%",
        borderBottomColor: '#737373',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
});