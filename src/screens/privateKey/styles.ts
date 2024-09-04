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

})

export {
    styles
}