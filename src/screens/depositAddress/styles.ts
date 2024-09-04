import { StyleSheet } from "react-native";
import { COLORS, FONTS, FONT_SIZE, hp, wp } from "../../assets/stylesGuide";
import { hasNotch, isIOS } from "../../utils/myUtils";

const styles = StyleSheet.create({
    main: {
        paddingHorizontal: '5%'
    },
    qrContainer: {
        width: hp(22.96),
        height: hp(22.96),
        borderRadius: hp(2),
        padding: hp(0),
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: hp(3),
        marginBottom: hp(1),
        backgroundColor: COLORS.WHITE
    },
    qr: {
        width: '100%',
        height: '100%',
        borderRadius: hp(3),
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.WHITE
    },
    icon: {
        width: hp(6.43),
        height: hp(6.43),
        borderRadius: hp(6.43)
    },
    qrImg: {
        borderRadius: hp(2),
    },
    coinContainer: {
        width: '100%',
        backgroundColor: COLORS.WHITE,
        alignSelf: 'center',
        borderRadius: hp(2),
        paddingHorizontal: hp(2),
        marginTop: hp(2.5),
        paddingVertical: 5
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
        marginTop: 0
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
        marginVertical: hp(0.5)
    },
    txt4: {
        color: COLORS.DISABLED,
        fontFamily: FONTS.REGULAR
    },
    txt5: {
        fontFamily: FONTS.REGULAR,
        fontSize: FONT_SIZE._14
    },
    txt6: {
        fontFamily: FONTS.MEDIUM,
        fontSize: FONT_SIZE._14,
        color: COLORS.DISABLED,
        textAlign: 'left'
    },
    txt7: {
        fontFamily: FONTS.MEDIUM,
        fontSize: FONT_SIZE._16,
        color: COLORS.BLACK,
        textAlign: 'left',
        marginTop: 0
    },
    txt8: {
        fontSize: FONT_SIZE._12,
        textAlign: 'left',
        color:COLORS.BLACK,
        marginTop: hp(7)
    },
    txt9: {
        fontSize: FONT_SIZE._12,
        textAlign: 'left',
        color:COLORS.BLACK,
        marginTop:0
    },
    btnContainer: {
        width: '100%',
        position: 'absolute',
        bottom: (isIOS() && hasNotch()) ? hp(3) : hp(2),
        paddingHorizontal: '5%'
    },

})

export {
    styles
}