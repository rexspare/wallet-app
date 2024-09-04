import { StyleSheet } from "react-native";
import { COLORS, FONTS, FONT_SIZE, hp, wp } from "../../assets/stylesGuide";

const styles = StyleSheet.create({
    main: {
    },
    card: {
        width: '90%',
        minHeight: 100,
        backgroundColor: COLORS.BLACK,
        alignSelf: 'center',
        borderRadius: hp(2),
        padding: hp(2)
    },
    logo: {
        width: hp(4.29),
        height: hp(4.29),
        borderRadius: hp(4.29),
        alignSelf: 'center'
    },
    txt1: {
        color: COLORS.WHITE,
        textAlign: 'center',
    },
    view1: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderColor: COLORS.WHITE
    },
    txt2: {
        color: COLORS.WHITE,
        textAlign: 'left',
        marginVertical: 0,
        fontFamily: FONTS.SEMI_BOLD,
        fontSize: FONT_SIZE._28,
        marginTop: -hp(1)
    },
    status: {
        borderWidth: 1,
        borderColor: COLORS.WHITE,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        paddingHorizontal: 4,
        paddingVertical: 2,
        marginTop: hp(0.5)
    },
    txt3: {
        marginVertical: 0,
        fontFamily: FONTS.MEDIUM,
        fontSize: FONT_SIZE._8,
        color: COLORS.WHITE,
        marginLeft: 3
    },
    view2: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: hp(2)
    },
    btn1: {
        width: '48%',
        height: hp(4.85),
        backgroundColor: COLORS.WHITE,
        borderColor: COLORS.WHITE,
        marginBottom: 0
    },
    btn2: {
        width: '48%',
        height: hp(4.85),
        borderColor: COLORS.WHITE,
        backgroundColor: COLORS.BLACK,
        marginBottom: 0,
        borderWidth: 1,
    },
    coinContainer: {
        width: '90%',
        backgroundColor: COLORS.WHITE,
        alignSelf: 'center',
        borderRadius: hp(2),
        padding: hp(2),
        marginTop: hp(2.5)
    },
    view3: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: hp(1)
    },
    txt4: {
        marginVertical: 0,
        fontFamily: FONTS.MEDIUM,
        fontSize: FONT_SIZE._15
    },
    txt5: {
        marginVertical: 0
    },

    row: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.BACKGROUND,
        alignSelf: 'flex-start',
        borderRadius: hp(50),
        padding: 5,
        marginVertical: hp(1)
    },
    chip: {
        backgroundColor: COLORS.BACKGROUND,
        borderRadius: hp(50),
        minWidth: 45,
        paddingHorizontal: 11,
        paddingVertical: 3
    },
    chipTxt: {
        marginVertical: 0,
        color: COLORS.BLACK,
        fontFamily: FONTS.MEDIUM,
        fontSize: FONT_SIZE._11
    },
    item: {
        width: '100%',
        borderBottomWidth: 1 / 2,
        borderColor: "#E2E2E2",
        alignItems: 'flex-start',
        marginBottom: hp(0.5),
        paddingBottom: hp(0.5),
    },
    row1: {
        width: '100%',
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    type: {
        fontFamily: FONTS.MEDIUM,
        fontSize: FONT_SIZE._14,
        color: COLORS.BLACK,
    },
    amount: {
        fontFamily: FONTS.SEMI_BOLD,
        fontSize: FONT_SIZE._14,
        color: COLORS.BLACK,
    },
    trans: {
        fontFamily: FONTS.REGULAR,
        fontSize: FONT_SIZE._12,
        color: COLORS.DISABLED,
        marginVertical: 0
    },
    date: {
        fontFamily: FONTS.REGULAR,
        fontSize: FONT_SIZE._12,
        color: COLORS.DISABLED,
        marginTop: 5
    },
    caretDown: {
        transform: [{rotate:'180deg'}],
    },

})

export {
    styles
}