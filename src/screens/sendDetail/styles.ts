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
        borderRadius: hp(2),
        paddingHorizontal: hp(2),
        marginTop: hp(2.5)
    },
    logo: {
        width: hp(3.9),
        height: hp(3.9),
        borderRadius: (6.9),
        alignSelf: 'center',
        marginTop: hp(3),
        marginBottom: hp(1),
    },

    txt1: {
        fontFamily: FONTS.REGULAR,
        fontSize: FONT_SIZE._32,
        color: COLORS.TEXT,
        marginTop: 0,
        marginBottom: 0
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
    txt6: {
        color: COLORS.DISABLED,
        fontSize: FONT_SIZE._20,
        fontFamily: FONTS.REGULAR,
        marginVertical: 0
    },
    txt7: {
        color: COLORS.DISABLED,
        fontSize: FONT_SIZE._16,
        fontFamily: FONTS.REGULAR,
        marginTop: 3,
        marginBottom: hp(3)

    }
})

export {
    styles
}