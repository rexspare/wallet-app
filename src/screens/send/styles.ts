import { StyleSheet } from "react-native";
import { COLORS, FONTS, FONT_SIZE, hp, wp } from "../../assets/stylesGuide";

const styles = StyleSheet.create({
    main: {
    },
    searchInput: {
        width: wp(90),
        alignSelf: 'center'
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
    }

})

export {
    styles
}