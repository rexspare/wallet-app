import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { BodyText } from '..';
import { TickIcon } from '../../assets/icons';
import { COLORS, COMMON_STYLES, FONTS, FONT_SIZE, hp, wp } from '../../assets/stylesGuide';


interface selectScyptoItemProps {
    item: any;
    onPress?: Function;
    selected?: any;
}

const SelectCryptoItem: React.FC<selectScyptoItemProps> = (props) => {
    const { item, onPress, selected } = props

    return (
        <TouchableOpacity
            activeOpacity={0.8}
            style={styles.main}
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
                    <BodyText style={styles.shortName}>{item.shortName}</BodyText>
                </View>

            </View>

            <View>
                {
                    selected == item.shortName &&
                    <TickIcon />
                }
            </View>

        </TouchableOpacity>
    )
}

export default SelectCryptoItem

const styles = StyleSheet.create({
    main: {
        width: '100%',
        paddingHorizontal: '4%',
        backgroundColor: COLORS.BACKGROUND,
        paddingVertical: hp(1.3),
        ...COMMON_STYLES.flexRowSpaceBetween,
        marginTop: hp(1),
        borderBottomWidth: 1,
        borderColor: COLORS.BORDER_GREY
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