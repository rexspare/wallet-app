import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { BodyText } from '..';
import { IMAGES } from '../../assets/images';
import { COLORS, COMMON_STYLES, FONTS, FONT_SIZE, hp, wp } from '../../assets/stylesGuide';


interface walletHistoryItemProps {
    item: any;
    onPress?: Function
}

const WalletHistoryItem: React.FC<walletHistoryItemProps> = (props) => {
    const { item, onPress } = props
    const selectedWalletCoin = {}

    return (
        <TouchableOpacity
            activeOpacity={0.8}
            style={styles.main}
            onPress={() => onPress && onPress()}
        >
            <View style={styles.row}>
                <Image
                    source={item?.type == 'Deposit' ? IMAGES.DEPOSIT : IMAGES.WITHDRAW}
                    style={styles.icon}
                />
                <View style={{
                    marginLeft: wp(2)
                }}>
                    <BodyText style={styles.name}>{item.type}</BodyText>
                    <BodyText style={styles.shortName}>{item.date}</BodyText>
                </View>

            </View>

            <View>
                <BodyText style={{
                    ...styles.priceTxt,
                    color: item?.type == 'Deposit' ? COLORS.DANGER : COLORS.SUCCESS
                }}>{item.amount}</BodyText>
                <BodyText style={{
                    ...styles.percTxt,
                }}>{selectedWalletCoin.shortName}</BodyText>
            </View>

        </TouchableOpacity>
    )
}

export default WalletHistoryItem

const styles = StyleSheet.create({
    main: {
        width: '100%',
        paddingHorizontal: '4%',
        backgroundColor: COLORS.BACKGROUND,
        borderRadius: 8,
        paddingVertical: hp(1.3),
        ...COMMON_STYLES.flexRowSpaceBetween,
        marginTop: hp(1)
    },
    name: {
        marginVertical: 0,
        fontFamily: FONTS.MEDIUM,
        fontSize: FONT_SIZE._13,
        color: COLORS.PRIMARY,
        textAlign: 'left'
    },
    shortName: {
        marginVertical: 0,
        fontSize: FONT_SIZE._12,
        color: COLORS.DISABLED,
        textAlign: 'left',
        marginTop: hp(0.25)
    },
    priceTxt: {
        marginVertical: 0,
        fontFamily: FONTS.BOLD,
        fontSize: FONT_SIZE._13,
        color: COLORS.BLACK,
        textAlign: 'right'
    },
    icon: {
        width: hp(4.35),
        height: hp(4.35),
        resizeMode: 'contain'
    },
    percTxt: {
        marginVertical: 0,
        fontSize: FONT_SIZE._11,
        textAlign: 'right',
        marginTop: hp(0.25),
        color: COLORS.DISABLED
    },
    row: {
        ...COMMON_STYLES.flexRowSpaceBetween
    },
    title: {
        fontFamily: FONTS.SEMI_BOLD,
        marginLeft: 10
    }
})