import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import { BodyText } from '..';
import { COLORS, COMMON_STYLES, FONTS, FONT_SIZE, hp, wp } from '../../assets/stylesGuide';


interface depositCoinItemProps {
    item: any;
    onPress?: Function;
    style?: ViewStyle;
    hidePrice?: boolean;
}

const DespositCoinItem: React.FC<depositCoinItemProps> = (props) => {
    const { item, onPress, style, hidePrice = false } = props
    return (
        <TouchableOpacity
            style={[styles.main, style]}
            activeOpacity={0.8}
            onPress={() => onPress && onPress()}
        >

            <View style={styles.row}>
                <Image
                    source={item.icon}
                    style={styles.icon}
                />
                <View style={{
                    marginLeft: wp(2)
                }}>
                    <BodyText style={styles.name}>{item.name}</BodyText>
                    <BodyText style={styles.shortName}>{item.symbol} · USD</BodyText>
                </View>

            </View>

            <View>
                <BodyText style={styles.priceTxt}>{Number(item.price  || 0)?.toFixed(4)} {item.symbol}</BodyText>
            </View>
        </TouchableOpacity>
    )
}

export default DespositCoinItem

const styles = StyleSheet.create({
    main: {
        width: '100%',
        backgroundColor: COLORS.WHITE,
        borderRadius: 10,
        paddingVertical: hp(1.3),
        ...COMMON_STYLES.flexRowSpaceBetween,
        marginTop: hp(1.2)
    },
    name: {
        marginVertical: 0,
        fontFamily: FONTS.MEDIUM,
        fontSize: FONT_SIZE._16,
        color: COLORS.BLACK,
        textAlign: 'left'
    },
    shortName: {
        marginVertical: 0,
        fontSize: FONT_SIZE._12,
        fontFamily: FONTS.REGULAR,
        color: COLORS.BLACK,
        textAlign: 'left',
        marginTop: hp(0.25)
    },
    priceTxt: {
        marginVertical: 0,
        fontFamily: FONTS.MEDIUM,
        fontSize: FONT_SIZE._15,
        color: COLORS.BLACK,
        textAlign: 'right'
    },
    icon: {
        width: hp(4.29),
        height: hp(4.29),
        resizeMode: 'contain'
    },
    percTxt: {
        marginVertical: 0,
        fontSize: FONT_SIZE._8,
        textAlign: 'right',
        marginTop: hp(0.25),
        textAlignVertical: 'center'
    },
    row: {
        ...COMMON_STYLES.flexRowSpaceBetween
    },
    title: {
        fontFamily: FONTS.SEMI_BOLD,
        marginLeft: 10
    },
    caretDown: {
        transform: [{ rotate: '180deg' }]
    }
})