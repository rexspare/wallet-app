import { StyleSheet } from "react-native";
import { COLORS, COMMON_STYLES, FONTS, FONT_SIZE, hp, wp } from "../../assets/stylesGuide";

const styles = StyleSheet.create({
    imbBackgorund: {
        width: '100%',
        height: '100%',
    },
    main: {
        ...COMMON_STYLES.scrollPad,
        alignItems: 'flex-start'
    },
    profileContainer: {
        width: '100%',
        borderRadius: 11,
        padding: 1,
        marginTop: hp(3)
    },
    profileContainerInner: {
        width: '100%',
        backgroundColor: COLORS.WHITE,
        paddingHorizontal: '4%',
        paddingVertical: hp(2),
        borderRadius: 13,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    avatar: {
        width: hp(6.97),
        height: hp(6.97),
        borderRadius: hp(6.97),
        marginRight: '8%',
    },
    txt1: {
        marginVertical: 0,
        textAlign: 'left',
        fontFamily: FONTS.MEDIUM,
        fontSize: FONT_SIZE._18
    },
    txt2: {
        marginVertical: 0,
        textAlign: 'left',
        fontFamily: FONTS.SEMI_BOLD,
        fontSize: FONT_SIZE._15,
        marginTop: hp(0.5)
    },
    item: {
        width: wp(90),
        marginVertical: hp(2),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: '5%',
    },
    title: {
        fontFamily: FONTS.SEMI_BOLD,
        fontSize: FONT_SIZE._15,
        color: COLORS.BLACK,
        marginLeft: hp(2)
    },
    coinContainer: {
        width: '100%',
        backgroundColor: COLORS.WHITE,
        alignSelf: 'center',
        borderRadius: hp(2),
        marginTop: hp(2.5)
    },
    line: {
        width: '90%',
        height: 1 / 2,
        backgroundColor: "#E2E2E2",
        alignSelf: 'center',
    }
})

export {
    styles
};
