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
        width: '90%',
        bottom: hp(15),
        position: 'absolute',
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
    txtBtn: {
        fontSize: FONT_SIZE._14,
        color: COLORS.BLACK,
        fontFamily: FONTS.REGULAR
    },
    btnTxt: {
        color: COLORS.BACKGROUND,
        fontFamily: FONTS.SEMI_BOLD
    },
    rowMain: {
        width: '100%',
        ...COMMON_STYLES.flexRowSpaceBetween,
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    googleBtn: {
        backgroundColor: "#FFFFFF",
        height: hp(6),
        borderWidth: 0,
        width: '100%'
    },
    lineContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '96%',
        marginVertical: hp(1),
        alignSelf: 'center'

    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: COLORS.GREYD9
    },
    txt1: {
        fontSize: FONT_SIZE._12,
        color: COLORS.BLACK,
        fontFamily: FONTS.MEDIUM,
        marginHorizontal: 8,
    },
    txt2: {
        fontSize: FONT_SIZE._13,
        marginTop:hp(2)
    },
    txt3: {
        fontFamily: FONTS.BOLD,
    }
})

export {
    styles
};
