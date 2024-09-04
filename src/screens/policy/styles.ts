import { StyleSheet } from "react-native";
import { COLORS, COMMON_STYLES, FONTS, FONT_SIZE, hp } from "../../assets/stylesGuide";

const styles = StyleSheet.create({
    main: {
        ...COMMON_STYLES.scrollPad,
        alignItems: 'flex-start'
    },
    txt1: {
        fontFamily: FONTS.SEMI_BOLD,
        fontSize: FONT_SIZE._22,
        marginTop: hp(2),
        textAlign: 'left'
    },
    txt2: {
        fontFamily: FONTS.REGULAR,
        fontSize: FONT_SIZE._15,
        textAlign: 'left'
    },
    txt3: {
        fontFamily: FONTS.SEMI_BOLD,
        fontSize: FONT_SIZE._18,
        marginTop: hp(2),
        textAlign: 'left'
    },
    txt4: {
        fontFamily: FONTS.REGULAR,
        fontSize: FONT_SIZE._15,
        marginTop: 0,
        textAlign: 'left'
    },
    txt5: {
        fontFamily: FONTS.SEMI_BOLD,
        fontSize: FONT_SIZE._15,
        marginTop: 0,
        textAlign: 'left'
    },
    link:{
        color: COLORS.LINK
    }
})

export { styles }