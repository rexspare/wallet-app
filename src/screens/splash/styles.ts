import { StyleSheet } from "react-native";
import { COLORS, FONT_SIZE, FONTS, hp, wp } from "../../assets/stylesGuide";

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
    logoContainer: {
        width: wp(100),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: COLORS.DANGER,
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
        marginLeft: 8,
    },
    walletTxt:{
        fontFamily: FONTS.REGULAR,
        fontSize: FONT_SIZE._20,
        color:COLORS.TEXT,
        borderWidth:2,
        textAlign: 'left',

    }
})

export {
    styles
}