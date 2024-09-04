import Clipboard from '@react-native-clipboard/clipboard';
import React, { useEffect, useState } from 'react';
import { Modal, Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import OTPTextInput from 'react-native-otp-textinput';

import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Entypo';
import { BodyText, PrimaryInput } from '..';
import { CrossIcon, PasteIcon, TickIcon } from '../../assets/icons';
import { COLORS, COMMON_STYLES, FONTS, FONT_SIZE, hp, wp } from '../../assets/stylesGuide';
import { appStateSelectors, useApp } from '../../states/app';
import { hasNotch, isIOS } from '../../utils/myUtils';
import PrimaryButton from '../primaryButton';
import useSendApi from '../../hooks/sendApi';

interface verifModalProps {
    visible: boolean;
    onclose: Function;
    handleVerified: Function;
}

const VerifyModal = ({
    visible,
    onclose = () => { },
    handleVerified = () => { },
}: verifModalProps) => {
    const Status = {
        Pending: "Pending",
        Inprogress: "Inprogress",
        Completed: "Completed"
    }
    const token = useApp(appStateSelectors.token)
    const { isLoading, getSendOtp, verifySendOtp, verifyTotp } = useSendApi()
    const [otpStatus, setotpStatus] = useState(Status.Pending)
    const [authenticatorStatus, setauthenticatorStatus] = useState(Status.Pending)
    const [authenticatorCode, setauthenticatorCode] = useState('')
    const [interval, setinterval] = useState<any>(null)
    const [timer, settimer] = useState(60)
    const [boxes, setBoxes] = useState('');


    const handleClose = () => {
        setotpStatus(Status.Pending)
        setauthenticatorStatus(Status.Pending)
        setauthenticatorCode("")
        onclose(false)
    }

    const pasteFromClipboard = async () => {
        try {
            const text = await Clipboard.getString();
            console.log({ text });
            setTimeout(() => {
                setauthenticatorCode(text);
            }, 100);
        } catch (error) {
            console.log({ error });
        }
    };


    const handleTOTPVerify = async (isRefreshed?: boolean) => {
        if (!authenticatorCode) {
            return
        }
        await verifyTotp(authenticatorCode, () => { setauthenticatorStatus(Status.Completed) })
    }


    useEffect(() => {
        if (timer == 1) {
            clearInterval(interval)
            setinterval(null)
            settimer(0)
        }
    }, [timer])

    const handleSendEmailOtp = async () => {
        setotpStatus(Status.Inprogress)
        await getSendOtp(() => {
            settimer(60)
            const intervalId = setInterval(() => {
                settimer((prev) => prev - 1)
            }, 1000);
            setinterval(intervalId)
        })
    }


    const handleVerifyEmailOtp = async () => {
        if (boxes?.length < 6) {
            return;
        }
        await verifySendOtp(boxes, () => { setotpStatus(Status.Completed) })
    }

    const handleConfirm = () => {
        if (otpStatus == Status.Completed && authenticatorStatus == Status.Completed) {
            setotpStatus(Status.Pending)
            setauthenticatorStatus(Status.Pending)
            setauthenticatorCode('')
            setBoxes('')
            handleVerified()
        }
    }



    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={() => handleClose()}
        >
            <View style={styles.modalContainer}>
                <View style={styles.confirmModalContent}>

                    <View style={{
                        width: '100%',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: (otpStatus != Status.Inprogress && authenticatorStatus != Status.Inprogress) ? 20 : 60,
                        marginTop: 10
                    }}>
                        <TouchableOpacity hitSlop={{ top: 15, left: 15, right: 15, bottom: 15 }} onPress={() => {
                            if (otpStatus == Status.Inprogress) {
                                setotpStatus(Status.Pending)
                                return
                            }
                            if (authenticatorStatus == Status.Inprogress) {
                                setauthenticatorStatus(Status.Pending)
                                return
                            }

                        }}>
                            <Icon name='chevron-left' color={COLORS.DISABLED} size={18} />
                        </TouchableOpacity>

                        <BodyText style={styles.txt7}>{(otpStatus != Status.Inprogress && authenticatorStatus != Status.Inprogress) ? `Complete Authentication` : `OTP CONFIRMATION`}</BodyText>
                        <TouchableOpacity hitSlop={{ top: 15, left: 15, right: 15, bottom: 15 }} onPress={() => handleClose()}>
                            <CrossIcon width={18} height={18} />
                        </TouchableOpacity>
                    </View>
                    {
                        (otpStatus != Status.Inprogress && authenticatorStatus != Status.Inprogress) ?
                            <>
                                <BodyText style={styles.txt1}>{`Security verifications requirements`}</BodyText>
                                <BodyText style={styles.txt2}>{`Complete these two verifications to complete this transaction`}</BodyText>


                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    onPress={() => authenticatorStatus == Status.Pending && setauthenticatorStatus(Status.Inprogress)}
                                    style={styles.item}>

                                    <View>
                                        <BodyText style={styles.txt3}>{`Authenticator`}</BodyText>
                                        <BodyText style={styles.txt4}>{`Verify with Authenticator`}</BodyText>
                                    </View>
                                    {
                                        authenticatorStatus == Status.Completed &&
                                        <TickIcon width={hp(2)} height={hp(2)} />
                                    }
                                </TouchableOpacity>

                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    onPress={() => otpStatus == Status.Pending && handleSendEmailOtp()}
                                    style={styles.item}
                                >

                                    <View>
                                        <BodyText style={styles.txt3}>{`Email OTP`}</BodyText>
                                        <BodyText style={styles.txt4}>{`Verify with Email`}</BodyText>
                                    </View>
                                    {
                                        otpStatus == Status.Completed &&
                                        <TickIcon width={hp(2)} height={hp(2)} />
                                    }
                                </TouchableOpacity>

                                <View style={styles.bottomContainer}>

                                    <View style={styles.btnContainer}>
                                        <PrimaryButton
                                            title={'Confirm'}
                                            filled={true}
                                            style={styles.btn50}
                                            onPress={() => { handleConfirm() }}
                                            isLoading={isLoading}
                                        />

                                        <PrimaryButton
                                            title={'Cancel'}
                                            style={styles.btn50}
                                            onPress={() => { handleClose() }}
                                        />
                                    </View>

                                </View>


                            </>
                            :
                            authenticatorStatus == Status.Inprogress ?
                                <>
                                    <BodyText style={styles.txt5}>{'Paste the 6-digit Key from Authenticator App'}</BodyText>

                                    <PrimaryInput
                                        hideTitle={true}
                                        value={authenticatorCode}
                                        placeholder={`Authenticator App Code`}
                                        onChange={(txt) => setauthenticatorCode(txt)}
                                        containerStyles={styles.inputcontainerStyles}
                                        inputContainer={styles.inputContainer}
                                        inputStyles={styles.inputStyles}
                                        renderRightIcon={<PasteIcon width={hp(3)} height={hp(3)} />}
                                        onPressRightIcon={() => pasteFromClipboard()}
                                        isPassword={true}
                                    />

                                    <PrimaryButton
                                        title={`Confirm Code`}
                                        filled={true}
                                        style={styles.btn1}
                                        onPress={() => handleTOTPVerify()}
                                        isLoading={isLoading}
                                    />
                                </>
                                :
                                <>
                                    <BodyText style={styles.txt6}>{`Enter the verification code we just sent on your Email Address.`}</BodyText>


                                    <OTPTextInput
                                        inputCount={6}
                                        textInputStyle={styles.textInputStyle}
                                        offTintColor={COLORS.PRIMARY}
                                        tintColor={COLORS.PRIMARY}
                                        handleTextChange={(txt) => setBoxes(txt)
                                        }
                                    />
                                    {timer > 1 && <BodyText style={{ color: COLORS.BLACK, marginBottom: 12 }}>{`Resend OTP in`} {timer}s</BodyText>}
                                    <TouchableOpacity
                                        style={{ marginBottom: 100 }}
                                        onPress={() => timer < 2 && handleSendEmailOtp()}
                                    >
                                        <BodyText style={{ color: COLORS.PRIMARY }}>{`Resend OTP`}</BodyText>
                                    </TouchableOpacity>

                                    <PrimaryButton
                                        title={`Confirm OTP`}
                                        filled={true}
                                        style={styles.btn1}
                                        onPress={() => handleVerifyEmailOtp()}
                                        isLoading={isLoading}
                                    />
                                </>
                    }


                </View>
            </View>
        </Modal>
    )
}

export default VerifyModal

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

    textInputStyle: {
        borderBottomWidth: 1 / 2,
        borderWidth: 1 / 2,
        borderColor: COLORS.GREYD9,
        borderRadius: 5,
        width: hp(5.4),
        height: hp(5.4),
        backgroundColor: COLORS.BACKGROUND,
        color: COLORS.BLACK,
        padding: 0,
        fontSize: FONT_SIZE._16,
        fontFamily: FONTS.SEMI_BOLD
    },
    txt1: {
        color: COLORS.BLACK,
        fontSize: FONT_SIZE._16,
        fontFamily: FONTS.MEDIUM,
        marginVertical: 0,
    },
    txt2: {
        color: COLORS.BLACK,
        fontSize: FONT_SIZE._11,
        fontFamily: FONTS.MEDIUM,
        marginTop: 8,
        marginBottom: 30,
        marginVertical: 0
    },
    item: {
        width: '100%',
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: '5%',
        paddingVertical: 15,
        marginVertical: 3,
        backgroundColor: COLORS.WHITE
    },

    txt3: {
        color: COLORS.BLACK,
        fontSize: FONT_SIZE._14,
        fontFamily: FONTS.REGULAR,
        marginVertical: 0,
        textAlign: 'left'
    },
    txt4: {
        color: COLORS.BLACK,
        fontSize: FONT_SIZE._12,
        fontFamily: FONTS.REGULAR,
        marginTop: 3,
        marginVertical: 0,
        textAlign: 'left'
    },
    bottomContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: Platform.OS === 'ios' ? 20 : 5,
        marginTop: 50,
    },

    txt5: {
        color: COLORS.BLACK,
        textAlign: "center",
        marginBottom: hp(3)
    },
    txt6: {
        color: COLORS.DISABLED,
        maxWidth: 220,
        textAlign: "center",
        marginBottom: 40
    },
    txt7: {
        color: COLORS.BLACK,
        marginVertical: 0,
        fontSize: FONT_SIZE._16,
        fontFamily: FONTS.SEMI_BOLD
    },
    btnContainer: {
        ...COMMON_STYLES.flexRowSpaceBetween,
        paddingBottom: (isIOS() && hasNotch()) ? hp(3) : hp(1),
        marginTop: hp(4),
        width: '100%'
    },
    btn50: {
        width: wp(42),
        height: hp(5.5)
    },
    inputcontainerStyles: {
        width: '98%',
        marginBottom: hp(2),
        marginTop: hp(1)
    },
    inputContainer: {
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: hp(10),
    },
    inputStyles: {
        height: hp(6),
        fontSize: FONT_SIZE._13,
        fontFamily: FONTS.REGULAR,
        paddingLeft: 20
    },
    btn1: {
        width: wp(90),
        marginBottom: (isIOS() && hasNotch()) ? hp(4) : hp(2),
    },
});