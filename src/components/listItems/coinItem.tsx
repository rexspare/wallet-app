import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { BodyText } from '..';
import { CaretUp } from '../../assets/icons';
import { COLORS, COMMON_STYLES, FONTS, FONT_SIZE, hp, wp } from '../../assets/stylesGuide';


interface coinItemProps {
    item: any;
    onPress?: Function
}

const CoinItem: React.FC<coinItemProps> = (props) => {
    const { item, onPress } = props

    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => onPress && onPress()}
            style={styles.main}
        >
            <View style={styles.row}>
                <Image
                    source={item.icon}
                    style={styles.icon}
                />
                <View style={{
                    marginLeft: wp(2)
                }}>
                    <BodyText style={styles.name}>{item.symbol}</BodyText>
                    <BodyText style={styles.shortName}>{item.name}</BodyText>
                </View>

            </View>

            <View>
                <View style={styles.row1}>
                    <BodyText style={{
                        ...styles.percTxt,
                        color: item.isPositive ? COLORS.SUCCESS : COLORS.DANGER
                    }}>{item.isPositive ? "+" : "-"}{item?.gain?.toString()?.replace('-', '')}</BodyText>
                </View>

                <BodyText style={styles.name}>${Number(item.price || 0)?.toFixed(2)}</BodyText>

            </View>
        </TouchableOpacity>
    )
}

export default CoinItem

const styles = StyleSheet.create({
    main: {
        width: '100%',
        backgroundColor: COLORS.WHITE,
        borderRadius: 10,
        paddingVertical: hp(1.5),
        ...COMMON_STYLES.flexRowSpaceBetween,
    },
    name: {
        marginVertical: 0,
        fontFamily: FONTS.BOLD,
        fontSize: FONT_SIZE._16,
        color: COLORS.BLACK,
        textAlign: 'left'
    },
    shortName: {
        marginVertical: 0,
        fontSize: FONT_SIZE._12,
        fontFamily: FONTS.REGULAR,
        color: COLORS.DISABLED,
        textAlign: 'left',
    },
    priceTxt: {
        marginVertical: 0,
        fontFamily: FONTS.SEMI_BOLD,
        fontSize: FONT_SIZE._16,
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
        fontSize: FONT_SIZE._12,
        textAlign: 'right',
        fontFamily: FONTS.REGULAR
    },
    row: {
        ...COMMON_STYLES.flexRowSpaceBetween
    },
    title: {
        fontFamily: FONTS.SEMI_BOLD,
        marginLeft: 10
    },
    caretDown: {
        transform: [{ rotate: '180deg' }],
    },
    row1: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: hp(0.25),

    }
})