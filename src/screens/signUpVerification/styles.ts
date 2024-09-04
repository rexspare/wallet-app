import { Dimensions, StatusBar, StyleSheet } from "react-native";
import { COLORS, COMMON_STYLES, FONTS, FONT_SIZE, hp } from "../../assets/stylesGuide";

const styles = StyleSheet.create({
    main: {
        ...COMMON_STYLES.scrollPad,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: hp(80)
    },
    phone: {
        width: hp(15.5),
        height: hp(15.5),
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
        marginBottom: hp(5)
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

})

export {
    styles
};
