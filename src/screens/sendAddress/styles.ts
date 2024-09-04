import { StyleSheet } from "react-native";
import { COLORS, FONTS, FONT_SIZE, hp, wp } from "../../assets/stylesGuide";
import { hasNotch, isIOS } from "../../utils/myUtils";

const styles = StyleSheet.create({
    main: {
        paddingHorizontal: '5%'
    },
    coinContainer: {
        width: '100%',
        backgroundColor: COLORS.WHITE,
        alignSelf: 'center',
        borderRadius: hp(1.2),
        paddingHorizontal: hp(2),
        marginTop: hp(2.5),
        borderWidth: 1,
        borderColor: "rgba(232, 236, 244, 1)",
    },
    logo: {
        width: hp(6.9),
        height: hp(6.9),
        borderRadius: (6.9),
        alignSelf: 'center',
        marginTop: hp(2),
        marginBottom: hp(1),
    },

    txt1: {
        fontFamily: FONTS.MEDIUM,
        fontSize: FONT_SIZE._18,
        marginBottom: hp(3)
    },
    errorInput: {
        borderColor: COLORS.DANGER,
        borderWidth: 1,
    },
    txt2: {
        color: COLORS.DISABLED,
        marginTop: 3
    },
    txt3: {
        fontFamily: FONTS.MEDIUM
    },
    line: {
        width: '100%',
        height: 1 / 2,
        backgroundColor: "#E2E2E2"
    },
    row: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: hp(1)
    },
    txt4: {
        color: COLORS.DISABLED,
        fontFamily: FONTS.MEDIUM
    },
    txt5: {
        fontFamily: FONTS.MEDIUM
    },
    btnContainer: {
        width: '100%',
        position: 'absolute',
        bottom: (isIOS() && hasNotch()) ? hp(3) : hp(2),
        paddingHorizontal: '5%'
    },
    dropDownRow: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: hp(1)
    },
    key: {
        textAlign: 'left',
        fontFamily: FONTS.REGULAR,
        fontSize: FONT_SIZE._14
    },
    inputRow: {
        width: '65%',
        paddingHorizontal: 10,
        backgroundColor: COLORS.WHITE,
        borderRadius: hp(0.9),
        borderWidth: 1,
        borderColor: "rgba(232, 236, 244, 1)",
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
    },
    input: {
        height: 22,
        paddingVertical: 0,
        color: COLORS.TEXT,
        fontSize: FONT_SIZE._20,
        fontFamily: FONTS.MEDIUM,
        marginTop: 0,
        width: 80,
    },
    txt6: {
        marginVertical: 0,
        color: COLORS.DISABLED,
        fontSize: FONT_SIZE._12,
        textAlign: 'left'
    },
    txt7: {
        marginVertical: 0,
        color: COLORS.DISABLED,
        fontSize: FONT_SIZE._20,
        fontFamily: FONTS.MEDIUM,
    }
})

export {
    styles
}