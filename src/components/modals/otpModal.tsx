import Clipboard from '@react-native-clipboard/clipboard';
import React, { FC, useEffect, useState } from 'react';
import { Modal, Platform, StyleSheet, TouchableOpacity, View } from 'react-native';

import Icon from 'react-native-vector-icons/Entypo';
import { BodyText, Label, PrimaryInput, TextButton } from '..';
import { CrossIcon, OTPVerifyIcon, PasteIcon, TickIcon } from '../../assets/icons';
import { COLORS, COMMON_STYLES, FONTS, FONT_SIZE, hp, wp } from '../../assets/stylesGuide';
import PrimaryButton from '../primaryButton';
import OTPTextInput from 'react-native-otp-textinput'



interface otpModalProps {
    visible: boolean;
    onclose: Function;
    confirm: Function;
    setisLoading?: Function;
    isLoading?: boolean;
    value: string;
    setValue: Function;
}

const OtpModal: FC<otpModalProps> = ({
    visible,
    onclose = () => { },
    confirm = () => { },
    setisLoading = () => { },
    isLoading = false,
    value,
    setValue = () => { },
}) => {

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={() => onclose()}
        >
            <View style={styles.modalContainer}>
                <View style={styles.confirmModalContent}>

                    <View style={{
                        width: '100%',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: 10
                    }}>
                        <View style={{ width: 18 }}>
                        </View>

                        <BodyText style={styles.txt1}>{`lang['_356']`}</BodyText>

                        <TouchableOpacity hitSlop={{ top: 15, left: 15, right: 15, bottom: 15 }} onPress={() => onclose()}>
                            <CrossIcon width={18} height={18} />
                        </TouchableOpacity>
                    </View>

                    <OTPVerifyIcon
                        width={hp(11)}
                        height={hp(11)}
                        style={{ marginTop: hp(4) }}
                    />

                    <Label style={styles.title}>{`lang['_24']`}</Label>

                    <BodyText style={styles.subtle}>{`lang['_25']`}</BodyText>

                    <OTPTextInput
                        inputCount={6}
                        textInputStyle={styles.textInputStyle}
                        tintColor={COLORS.PRIMARY}
                        handleTextChange={(txt) => setValue(txt)}
                    />

                    <View style={styles.btnContainer}>
                        <PrimaryButton
                            title={`lang["_26"]`}
                            onPress={() => confirm()}
                            filled={true}
                            isLoading={isLoading}
                        />


                    </View>

                </View>
            </View>
        </Modal>
    )
}

export default OtpModal

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        borderRadius: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },

    confirmModalContent: {
        marginTop: "auto",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.BACKGROUND,
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        position: "relative"
    },
    txt1: {
        color: COLORS.BLACK,
        marginVertical: 0,
        fontSize: FONT_SIZE._16
    },
    title: {
        fontSize: FONT_SIZE._22,
        marginTop: hp(4),
        color: COLORS.PRIMARY,
        fontFamily: FONTS.SEMI_BOLD
    },
    subtle: {
        fontSize: FONT_SIZE._13,
        marginTop: hp(0.8),
        marginBottom: hp(2.2),
        color: COLORS.DISABLED
    },
    textInputStyle: {
        borderBottomWidth: 1.5,
        borderWidth: 1.5,
        borderRadius: 5,
        width: hp(6),
        height: hp(6),
    },
    btnContainer: {
        width: '100%',
        alignSelf: 'center',
        alignItems: 'center',
        marginTop: hp(4),
        marginBottom: hp(2)
    },
    btn: {
        marginTop: 0
    },
    txtBtn: {
        fontFamily: FONTS.SEMI_BOLD,
        marginVertical: 0
    },

})