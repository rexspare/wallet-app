import React from 'react';
import { ActivityIndicator, StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';
import { COLORS, FONTS, FONT_SIZE } from '../assets/stylesGuide';


interface textButtonProps {
    title: string;
    onPress: () => any;
    style?: ViewStyle | [ViewStyle] | any;
    textStyle?: TextStyle | [TextStyle] | any;
    isLoading?: boolean;
}

const TextButton: React.FC<textButtonProps> = (props) => {
    const {
        title = 'title',
        onPress = () => { },
        isLoading = false
    } = props
    return (
        <TouchableOpacity
            style={[styles.main, props.style]}
            activeOpacity={0.8}
            onPress={() => props.onPress()}
            disabled={props.isLoading}
        >
            {
                props.isLoading ?
                    <ActivityIndicator color={COLORS.WHITE} />
                    :
                    <Text style={[styles.title, props.textStyle]}>{props.title}</Text>
            }
        </TouchableOpacity>
    )
}

export default React.memo(TextButton)

const styles = StyleSheet.create({
    main: {

    },
    title: {
        color: COLORS.PRIMARY,
        fontSize: FONT_SIZE._14,
        fontFamily: FONTS.MEDIUM
    }
})