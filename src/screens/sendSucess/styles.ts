import { Dimensions, StatusBar, StyleSheet } from "react-native";
import { COLORS, COMMON_STYLES, FONTS, FONT_SIZE, hp } from "../../assets/stylesGuide";

const styles = StyleSheet.create({
    main: {
        ...COMMON_STYLES.scrollPad,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: hp(80),
        paddingBottom: hp(15)
    },
    success: {
        width: hp(13.95),
        height: hp(13.95),
        resizeMode: 'contain',
        alignSelf: 'center'
    },

    title: {
        fontFamily: FONTS.BOLD,
        fontSize: FONT_SIZE._16,
        marginTop: hp(4),
        marginBottom: hp(0.5)
    },
    subtle: {
        fontFamily: FONTS.REGULAR,
        fontSize: FONT_SIZE._13,
        marginBottom: hp(0)
    },
    subtle1: {
        fontFamily: FONTS.REGULAR,
        fontSize: FONT_SIZE._13,
        marginBottom: hp(5),
        marginTop: hp(0)
    },

    btnContainer: {
        width: '90%',
        bottom: hp(2.5),
        alignSelf: 'center'
    },
    btn: {
        marginTop: 0
    },

    txt: {
        marginTop: hp(2),
        marginBottom: 5,
        fontSize: FONT_SIZE._11,
        textAlign: 'left',
        color: COLORS.BLACK,
    },

    textInputStyle: {
        borderBottomWidth: 1 / 2,
        borderWidth: 1 / 2,
        borderColor: COLORS.GREYD9,
        borderRadius: 5,
        width: hp(5.4),
        height: hp(5.4),
        backgroundColor: COLORS.BACKGROUND,
        color: COLORS.BLACK,
        padding: 0,
        fontSize: FONT_SIZE._16,
        fontFamily: FONTS.SEMI_BOLD
    },
    txtBtn: {
        fontFamily: FONTS.SEMI_BOLD,
        marginVertical: 0,
        fontSize: FONT_SIZE._14,
        color: COLORS.BLACK
    },
    txt1: {
        fontFamily: FONTS.MEDIUM,
        marginVertical: 0,
    },
    txt2: {
        fontSize: FONT_SIZE._13,
        paddingHorizontal: '3%',
        maxWidth: 400,
        marginBottom: hp(7)
    }

})

export {
    styles
};
