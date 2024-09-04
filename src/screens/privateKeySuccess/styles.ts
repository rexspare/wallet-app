import { StyleSheet } from "react-native";
import { COLORS, FONTS, FONT_SIZE, hp, wp } from "../../assets/stylesGuide";
import { hasNotch, isIOS } from "../../utils/myUtils";

const styles = StyleSheet.create({
    main: {
        paddingHorizontal: '5%'
    },
    btnContainer: {
        width: '100%',
        position: 'absolute',
        bottom: (isIOS() && hasNotch()) ? hp(3) : hp(2),
        paddingHorizontal: '5%'
    },

    txt1: {
        fontFamily: FONTS.MEDIUM,
        fontSize: FONT_SIZE._14,
        color: COLORS.DISABLED,
        textAlign: 'left'
    },
    txt2: {
        fontFamily: FONTS.MEDIUM,
        fontSize: FONT_SIZE._16,
        color: COLORS.BLACK,
        textAlign: 'left',
        marginTop: 0
    },
    row: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: hp(0.5),
        backgroundColor: COLORS.WHITE
    },
})

export {
    styles
}