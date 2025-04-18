import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
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

    form_container : {
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
    aic : {
        alignItems: "center",
        width: "100%",
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