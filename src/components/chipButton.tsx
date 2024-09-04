import { FC } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { BodyText } from '.';
import { COLORS, FONTS, FONT_SIZE, hp } from '../assets/stylesGuide';

interface chipButtonProps {
    title: string;
    isSelected: boolean;
    onPress: Function;
}

const ChipButton: FC<chipButtonProps> = (props) => {
    const { title, isSelected, onPress = () => { } } = props

    const styles = styles_(isSelected)

    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => onPress()}
            style={styles.main}>
            <BodyText style={styles.title}>{title}</BodyText>
        </TouchableOpacity>
    )
}

export default ChipButton

const styles_ = (isSelected: boolean) => StyleSheet.create({
    main: {
        width: 'auto',
        paddingVertical: hp(0.8),
        paddingHorizontal: FONT_SIZE._12,
        borderRadius: 7,
        backgroundColor: isSelected ? COLORS.PRIMARY : COLORS.BACKGROUND
    },
    title: {
        marginVertical: 0,
        color: isSelected ? COLORS.WHITE : COLORS.DISABLED,
        fontFamily: FONTS.MEDIUM,
        fontSize: FONT_SIZE._12
    }
})