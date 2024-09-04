import React, { ReactNode } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { BodyText } from '.';
import { COLORS, FONTS, FONT_SIZE, hp } from '../assets/stylesGuide';

interface actionButtonProps {
    icon: ReactNode;
    title: string;
    onPress: Function
}

const ActionButton: React.FC<actionButtonProps> = (props) => {
    const { icon, title, onPress } = props
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            style={styles.main}
            onPress={() => onPress()}
        >
            {icon}
            <BodyText style={styles.title}>{title}</BodyText>

        </TouchableOpacity>
    )
}

export default ActionButton

const styles = StyleSheet.create({
    main: {
        alignItems: 'center',
    },
    title: {
        marginVertical: hp(1),
        fontSize: FONT_SIZE._10,
        color: COLORS.PRIMARY,
        fontFamily: FONTS.MEDIUM
    }
})