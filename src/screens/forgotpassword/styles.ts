import { Dimensions, StatusBar, StyleSheet } from "react-native";
import { COLORS, COMMON_STYLES, FONTS, FONT_SIZE, hp } from "../../assets/stylesGuide";

const styles = StyleSheet.create({
    main: {
        ...COMMON_STYLES.scrollPad,
        alignItems: 'flex-start'
    },
    title: {
        fontSize: FONT_SIZE._32,
        color: COLORS.BLACK,
        fontFamily: FONTS.SEMI_BOLD,
        marginTop: hp(1)
    },

    btnContainer: {
        width: '100%',
        marginTop: hp(5),
        alignSelf: 'center'
    },
    btn: {
        marginTop: 0
    },

    txt: {
        marginVertical: 0,
        fontSize: FONT_SIZE._11,
        textAlign: 'left',
        color: COLORS.SECONDARY,
        marginBottom: hp(3)
    },

})

export {
    styles
};
