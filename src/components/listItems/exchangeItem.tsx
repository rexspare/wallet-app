import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { BodyText } from '..';
import { COLORS, COMMON_STYLES, FONTS, FONT_SIZE, hp, wp } from '../../assets/stylesGuide';


interface exchangeItemProps {
    item: any;
    selectedRate: any;
    onPress?: Function
}

const ExchangeItem: React.FC<exchangeItemProps> = (props) => {
    const { item, onPress, selectedRate } = props
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            style={styles.main}
            onPress={() => onPress && onPress()}
        >
            <View style={styles.view1}>
                <View style={styles.row}>
                    <Image
                        source={item.icon}
                        style={styles.icon}
                    />
                    <View style={{
                        marginLeft: wp(2)
                    }}>
                        <BodyText style={styles.name}>{item.name}</BodyText>
                        <BodyText style={styles.shortName}>{item.shortName}/{selectedRate?.title}</BodyText>
                    </View>

                </View>
            </View>

            <View style={styles.view2}>
                <BodyText style={styles.priceTxt}>{item.price}</BodyText>
            </View>

            <View style={styles.view3}>
                <BodyText style={{
                    ...styles.percTxt,
                    color: item.isPositive ? COLORS.SUCCESS : COLORS.DANGER
                }}>{item.gain}</BodyText>
            </View>

            <View style={styles.view4}>
                <BodyText style={styles.priceTxt}>{item.vol}</BodyText>
            </View>

        </TouchableOpacity>
    )
}

export default ExchangeItem

const styles = StyleSheet.create({
    main: {
        width: '100%',
        paddingHorizontal: '4%',
        backgroundColor: COLORS.BACKGROUND,
        paddingVertical: hp(1.7),
        ...COMMON_STYLES.flexRowSpaceBetween,
        borderBottomWidth: 1 / 2,
        borderColor: COLORS.BORDER_GREY
    },
    view1: {
        width: '40%',
        flexDirection: 'row',
    },
    view2: {
        width: '20%',
        flexDirection: 'row',
    },
    view3: {
        width: '15%',
        flexDirection: 'row',
    },
    view4: {
        width: '25%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
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
        fontFamily: FONTS.REGULAR,
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
        fontSize: FONT_SIZE._12,
        textAlign: 'right',
        marginTop: hp(0.25)
    },
    row: {
        ...COMMON_STYLES.flexRowSpaceBetween
    },
    title: {
        fontFamily: FONTS.SEMI_BOLD,
        marginLeft: 10
    }
})