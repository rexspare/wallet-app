import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, View, ViewStyle } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { BodyText, If } from '.';
import { DownPurple } from '../assets/icons';
import { COLORS, FONTS, FONT_SIZE, hp, wp } from '../assets/stylesGuide';

interface dropDownPros {
    data?: any;
    onChangeDropdown?: (val: any) => any;
    containerStyles?: ViewStyle;
    isError?: boolean;
    onFocus?: () => {};
    dropdownPlaceholder?: string;
    value?: any
    enableSearch?: boolean
    hasInput?: boolean;
    defaultValue?: any;
}

const SwapDropDown: React.FC<dropDownPros> = (props) => {
    const {
        data,
        onChangeDropdown = () => { },
        enableSearch = false,
        hasInput = false,
        defaultValue = null
    } = props

    const [value, setValue] = useState<any>(null);
    const [isFocus, setIsFocus] = useState(false);

    useEffect(() => {
        if (defaultValue != null) {
            setValue(defaultValue)
        }
    }, [defaultValue?.id])



    return (
        <View style={[styles.main, props.containerStyles]}>
            <Dropdown
                style={[styles.dropdown, hasInput ? {
                    width: '40%',
                    borderColor: COLORS.DISABLED,
                    borderRightWidth: 1.5,
                } : {}]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                containerStyle={styles.listContainer}
                itemContainerStyle={{ paddingHorizontal: 5 }}
                iconStyle={styles.iconStyle}
                data={data}
                activeColor={COLORS.BACKGROUND}
                search={enableSearch}
                maxHeight={300}
                labelField="shortName"
                valueField="shortName"
                placeholder={!isFocus ? 'Select Token' : '...'}
                searchPlaceholder="Search..."
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                    setValue(item);
                    onChangeDropdown(item)
                    setIsFocus(false);
                }}
                renderLeftIcon={() => (
                    <If condition={value?.icon}>
                        <Image
                            source={value?.icon}
                            style={styles.itemImg}
                        />
                    </If>

                )}
                renderRightIcon={() => (
                    <DownPurple />
                )}
                renderItem={(item: any, selected: any) => (
                    <View style={styles.item}>
                        <If condition={item?.icon != undefined}>
                            <Image
                                source={item.icon}
                                style={styles.itemImg}
                            />
                        </If>
                        <BodyText style={styles.itemTxt}>{`${item?.shortName}`}</BodyText>
                    </View>
                )}
            />

        </View>

    )
}

export default React.memo(SwapDropDown)

const styles = StyleSheet.create({
    main: {
        width: wp(27),
        alignSelf: 'center',
        backgroundColor: "#101938",
        borderRadius: 8,
    },
    main2: {
        width: '100%',
        alignSelf: 'center',
        backgroundColor: COLORS.BACKGROUND,
        flexDirection: 'row',
        borderColor: COLORS.DISABLED,
        borderWidth: 2
    },
    dropdown: {
        height: hp(4.6),
        width: '100%',
        paddingHorizontal: 8,
        borderRadius: 8,
        overflow: 'hidden'
    },
    placeholderStyle: {
        fontSize: FONT_SIZE._13,
        fontFamily: FONTS.SEMI_BOLD
    },
    selectedTextStyle: {
        fontSize: FONT_SIZE._14,
        fontFamily: FONTS.SEMI_BOLD,
        color: COLORS.WHITE,
    },
    iconStyle: {
        width: FONT_SIZE._23,
        height: FONT_SIZE._23,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: FONT_SIZE._14,
        fontFamily: FONTS.REGULAR
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: '2%',
        paddingVertical: 5
    },
    itemTxt: {
        fontSize: FONT_SIZE._12,
        fontFamily: FONTS.MEDIUM,
        color: COLORS.WHITE,
    },
    itemImg: {
        width: hp(2.57),
        height: hp(2.57),
        marginRight: 10
    },
    input: {
        height: hp(6),
        width: '60%',
        paddingHorizontal: '2%',
        fontSize: FONT_SIZE._18,
        fontFamily: FONTS.REGULAR,
        color: COLORS.TEXT,
        textAlign: 'right',
    },
    listContainer: {
        backgroundColor: "#101938",
        borderWidth: 0,
    }


})