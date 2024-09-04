import { StyleSheet } from "react-native";
import { COMMON_STYLES, FONTS, FONT_SIZE, hp } from "../../assets/stylesGuide";

const styles = StyleSheet.create({
    main: {
        ...COMMON_STYLES.scrollPad,
        alignItems: 'flex-start'
    },
    txt1: {
        fontFamily: FONTS.SEMI_BOLD,
        fontSize: FONT_SIZE._18,
        marginTop: hp(2)
    },
    txt2: {
        fontFamily: FONTS.REGULAR,
        fontSize: FONT_SIZE._15,
        textAlign: 'left'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    txt3: {
        fontFamily: FONTS.REGULAR,
        fontSize: FONT_SIZE._12,
        textAlign: 'left',
        marginVertical: hp(0.5)
    },
    btnContainer: {
        width: '90%',
        bottom: hp(2.5),
        position: 'absolute',
        alignSelf: 'center'
    },
})

export { styles }