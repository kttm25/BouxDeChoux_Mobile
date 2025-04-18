import { GestureResponderEvent, StyleProp, Text, TouchableOpacity, ViewStyle } from "react-native";

const ButtonCustom = ({ title, style, onPress } : {title: string, style: StyleProp<ViewStyle>, onPress? : ((event: GestureResponderEvent) => void) | undefined}) => (
    <TouchableOpacity style={style} onPress={onPress}>
        <Text>{title}</Text>
    </TouchableOpacity>
);

export default ButtonCustom;