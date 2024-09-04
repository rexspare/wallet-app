import { Dimensions, StatusBar, StyleSheet } from "react-native";
import { COMMON_STYLES } from "../../assets/stylesGuide";

const styles = StyleSheet.create({
    imbBackgorund: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height + (StatusBar.currentHeight || 0),
    },
    main: {
        ...COMMON_STYLES.scrollPad,
        alignItems: 'flex-start'
    },

})

export {
    styles
};
