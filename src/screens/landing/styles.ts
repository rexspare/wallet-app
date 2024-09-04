import { Platform, StatusBar, StyleSheet } from "react-native";
import { COLORS, FONT_SIZE, FONTS, hp, wp } from "../../assets/stylesGuide";
import { hasNotch, isIOS } from "../../utils/myUtils";

const styles = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        height: hp(7.5),
        width: hp(7.5),
    },
    imageBg: {
        width: wp(100),
        height: (hp(100) + (StatusBar.currentHeight || 0)),
        backgroundColor: COLORS.BACKGROUND
    },
    context: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoContainer: {
        width: wp(100),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: hp(28),
        borderColor: COLORS.DANGER
    },
    btnContainer: {
        width: wp(100),
        paddingHorizontal: '5%',
        position: 'absolute',
        bottom: hp(4)
    },
    logoTxt: {
        fontFamily: FONTS.BOLD,
        fontSize: FONT_SIZE._24,
        textAlign: 'left',
        marginLeft: 8
    },
    walletTxt:{
        fontFamily: FONTS.REGULAR,
        fontSize: FONT_SIZE._20,
        color:COLORS.TEXT,
        textAlign: 'left',
    }
})

export {
    styles
}