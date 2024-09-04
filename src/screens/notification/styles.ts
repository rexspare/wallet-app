import { StyleSheet } from "react-native";
import { COLORS, COMMON_STYLES, FONTS, FONT_SIZE, hp, wp } from "../../assets/stylesGuide";

const styles = StyleSheet.create({
    imbBackgorund: {
        width: '100%',
        height: '100%',
    },
    main: {
        ...COMMON_STYLES.scrollPad,
        alignItems: 'flex-start',
        borderWidth: 2
    },
    coinContainer: {
        width: '90%',
        backgroundColor: COLORS.WHITE,
        alignSelf: 'center',
        borderRadius: hp(2),
        marginVertical: hp(2.5),
    },
    item: {
        width: '100%',
        borderBottomWidth: 1 / 2,
        paddingHorizontal: '7%',
        borderColor: COLORS.DISABLED,
        paddingVertical: hp(1.5)
    },
    txt1: {
        textAlign: 'left',
        fontFamily: FONTS.SEMI_BOLD,
        fontSize: FONT_SIZE._12
    },
    txt2: {
        textAlign: 'left',
        fontFamily: FONTS.SEMI_BOLD,
        fontSize: FONT_SIZE._8,
        color: COLORS.DISABLED,
        marginTop: 0
    },
})

export {
    styles
};
