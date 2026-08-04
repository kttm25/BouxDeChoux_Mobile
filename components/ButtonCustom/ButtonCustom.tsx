import React from 'react';
import { StyleProp, Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';

type ButtonCustomProps = {
	title?: string;
	onPress?: () => void;
	style?: StyleProp<ViewStyle>;
	textStyle?: StyleProp<TextStyle>;
	disabled?: boolean;
	children?: React.ReactNode;
};

export default function ButtonCustom({ title, onPress, style, textStyle, disabled, children }: ButtonCustomProps) {
	return (
		<TouchableOpacity activeOpacity={0.85} onPress={onPress} style={style} disabled={disabled}>
			{children ?? <Text style={textStyle}>{title}</Text>}
		</TouchableOpacity>
	);
}
