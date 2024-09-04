import { StyleSheet } from "react-native";
import { COLORS, FONTS, FONT_SIZE, hp } from "../../assets/stylesGuide";

const styles = StyleSheet.create({
    main: {
    },
    card: {
        width: '90%',
        minHeight: 100,
        backgroundColor: COLORS.BLACK,
        alignSelf: 'center',
        borderRadius: hp(2),
        padding: hp(2)
    },
    txt1: {
        color: COLORS.WHITE,
        textAlign: 'left',
        marginVertical: 0
    },
    view1: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: hp(0.5)
    },
    txt2: {
        color: COLORS.WHITE,
        textAlign: 'left',
        marginVertical: 0,
        fontFamily: FONTS.SEMI_BOLD,
        fontSize: FONT_SIZE._28
    },
    status: {
        borderWidth: 1,
        borderColor: COLORS.WHITE,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        paddingHorizontal: 4,
        paddingVertical: 2,
        marginLeft: 8
    },
    txt3: {
        marginVertical: 0,
        fontFamily: FONTS.MEDIUM,
        fontSize: FONT_SIZE._12,
        color: COLORS.WHITE,
        marginLeft: 3
    },
    view2: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: hp(2)
    },
    btn1: {
        width: '48%',
        height: hp(4.85),
        backgroundColor: COLORS.WHITE,
        borderColor: COLORS.WHITE,
        marginBottom: 0
    },
    btn2: {
        width: '48%',
        height: hp(4.85),
        borderColor: COLORS.WHITE,
        backgroundColor: COLORS.BLACK,
        marginBottom: 0,
        borderWidth: 1,
    },
    coinContainer: {
        width: '90%',
        backgroundColor: COLORS.WHITE,
        alignSelf: 'center',
        borderRadius: hp(2),
        padding: hp(2),
        marginTop: hp(2.5)
    },
    view3: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: hp(1)
    },
    txt4: {
        marginVertical: 0,
        fontFamily: FONTS.MEDIUM,
        fontSize: FONT_SIZE._15
    },
    txt5: {
        marginVertical: 0
    },
    line: {
        width: '100%',
        height: hp(0.1),
        minHeight: 0.7,
        maxHeight: 1,
        backgroundColor: "#E2E2E2"
    },
    loaderContainer: {
        width: '100%',
        height: hp(50),
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export {
    styles
}