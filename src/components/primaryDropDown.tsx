import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, TextStyle, View, ViewStyle } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { BodyText, If } from '.';
import { DownPurple } from '../assets/icons';
import { COLORS, FONTS, FONT_SIZE, hp, wp } from '../assets/stylesGuide';

interface primaryDropDownProps {
    data?: any;
    onChangeDropdown?: (val: any) => any;
    containerStyles?: ViewStyle;
    dropdownContainer?: ViewStyle;
    titleStyles?: TextStyle;
    isError?: boolean;
    onFocus?: () => {};
    dropdownPlaceholder?: string;
    title?: string;
    value?: any
    enableSearch?: boolean
    hasInput?: boolean;
    defaultValue?: any;
}

const PrimaryDropDown: React.FC<primaryDropDownProps> = (props) => {
    const {
        data,
        onChangeDropdown = () => { },
        enableSearch = false,
        hasInput = false,
        defaultValue = null,
        title
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
            <BodyText style={{
                ...styles.title,
                ...props.titleStyles
            }}>{title}</BodyText>
            <Dropdown
                style={[styles.dropdown, props?.dropdownContainer]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={data}
                search={enableSearch}
                maxHeight={300}
                labelField="symbol"
                valueField="symbol"
                placeholder={!isFocus ? 'Select Coin' : '...'}
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
                renderItem={(item: any, selected: any) => (
                    <View style={styles.item}>
                        <If condition={item?.icon != undefined}>
                            <Image
                                source={item.icon}
                                style={styles.itemImg}
                            />
                        </If>
                        <BodyText style={styles.itemTxt}>{`${item?.name}`}</BodyText>
                    </View>
                )}
            />

        </View>

    )
}

export default React.memo(PrimaryDropDown)

const styles = StyleSheet.create({
    main: {
        width: '100%',
        alignSelf: 'center',
        backgroundColor: COLORS.BACKGROUND,
    },
    main2: {
        width: '100%',
        alignSelf: 'center',
        backgroundColor: COLORS.BACKGROUND,
        flexDirection: 'row',
        borderColor: COLORS.DISABLED,
        borderWidth: 2
    },
    title: {
        marginBottom: 5,
        textAlign: 'left',
        fontFamily: FONTS.MEDIUM,
        color: COLORS.BLACK
    },
    dropdown: {
        height: hp(6),
        width: '100%',
        paddingHorizontal: 10,
        backgroundColor: COLORS.WHITE,
        borderRadius: hp(0.9),
        borderWidth: 1,
        borderColor: "rgba(232, 236, 244, 1)"
    },
    placeholderStyle: {
        fontSize: FONT_SIZE._13,
        fontFamily: FONTS.SEMI_BOLD,
        color: COLORS.DISABLED
    },
    selectedTextStyle: {
        fontSize: FONT_SIZE._13,
        fontFamily: FONTS.SEMI_BOLD,
        color: COLORS.TEXT
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
        color: COLORS.TEXT,
    },
    itemImg: {
        width: hp(3.2),
        height: hp(3.2),
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



})