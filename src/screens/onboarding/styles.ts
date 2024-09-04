import { StatusBar, StyleSheet } from "react-native";
import { COLORS, COMMON_STYLES, FONTS, FONT_SIZE, hp, wp } from "../../assets/stylesGuide";
import { hasNotch, isIOS } from "../../utils/myUtils";

const styles = StyleSheet.create({
    title: {
        fontFamily: FONTS.MEDIUM,
        fontSize: FONT_SIZE._26,
    },
    subtitle: {
        fontFamily: FONTS.REGULAR,
        fontSize: FONT_SIZE._14,
        color: COLORS.GREYB0,
        marginTop: hp(1.5),
        width: '80%',
        alignSelf: 'center'
    },
    image: {
        height: '100%',
        width: '100%',
        resizeMode: 'contain',
    },
    indicator: {
        height: 8,
        width: 8,
        backgroundColor: COLORS.GREYD9,
        marginHorizontal: 2,
        borderRadius: 4,
    },

    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: (isIOS() && hasNotch()) ? 60 : StatusBar.currentHeight,
        paddingHorizontal: '5%'
    },
    skipBtn: {
        ...COMMON_STYLES.center_
    },
    skipTxt: {
        fontSize: FONT_SIZE._16,
    },
    footerContainer: {
        width: wp(100),
        minHeight: hp(30),
        backgroundColor: COLORS.WHITE,
        paddingHorizontal: '5%',
        paddingTop: hp(4),
        paddingBottom: hp(2),
        borderRadius: hp(4)
    },
    dotsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: hp(1.5)
    },
    item: {
        width: wp(100),
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export {
    styles
}