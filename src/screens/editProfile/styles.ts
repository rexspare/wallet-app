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
        marginTop: hp(1)
    },
    profileContainerInner: {
        width: '100%',
        backgroundColor: COLORS.WHITE,
        paddingVertical: hp(3),
        borderRadius: 11,
        justifyContent: 'center',
        alignItems: 'center',
    },

    avatar: {
        width: hp(6),
        height: hp(6),
        borderRadius: hp(0.75),
        justifyContent:'flex-end',
        alignItems:'flex-end',
    },
    txt1: {
        fontFamily: FONTS.MEDIUM,
        fontSize: FONT_SIZE._20,
        marginTop: hp(2),
        marginBottom:0
    },
    txt2: {
        marginVertical: 0,
        fontFamily: FONTS.REGULAR,
        fontSize: FONT_SIZE._16,
        marginTop: hp(0.5)
    },
   
    edit:{
        bottom: -hp(0.5),
        right: -hp(0.5),
    },
    btnContainer: {
        width: '90%',
        bottom: 10,
        position: 'absolute',
        alignSelf: 'center'
    },
})

export {
    styles
};
