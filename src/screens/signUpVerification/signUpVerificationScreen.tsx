import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { Image, View } from 'react-native'
import OTPTextInput from 'react-native-otp-textinput'
import Toast from 'react-native-toast-message'
import { ALERT_HEADER, ALERT_TYPES, BASE_URL, ROUTES } from '../../assets/constants'
import { IMAGES } from '../../assets/images'
import { COLORS } from '../../assets/stylesGuide'
import { BodyText, CommonHeader, If, Layout, PrimaryButton, TextButton } from '../../components'
import useKeyboard from '../../hooks/Keyboard'
import useAuth from '../../hooks/auth'
import { styles } from './styles'

const SignUpVerificationScreen = () => {
    const navigation = useNavigation<any>()
    const { keyboardStatus } = useKeyboard()
    const { onVerifyEmail, isLoading } = useAuth()
    const route = useRoute<any>()
    const [interval, setinterval] = useState<any>(null)
    const [timer, settimer] = useState(60)
    const [code, setcode] = useState('')
    const [localLoading, setlocalLoading] = useState(false)

    useEffect(() => {
        settimer(60)
        const intervalId = setInterval(() => {
            settimer((prev) => prev - 1)
        }, 1000);
        setinterval(intervalId)


    }, [])

    useEffect(() => {
        if (timer < 1) {
            clearInterval(interval)
            setinterval(null)
            settimer(0)
        }

    }, [timer])


    const handleVerifyEmail = () => {
        if (code?.length > 5 && route?.params?.email) {
            onVerifyEmail(route?.params?.email, code)
        }
    }


    const handleResendOtp = async () => {
        try {
            if (!route?.params?.email) {
                return
            }
            setlocalLoading(true)

            const response = await fetch(BASE_URL + ROUTES.RESEND_VERIFY_EMAIL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: route?.params?.email,
                }),
            });

            if (response.status === 200 || response.status === 201) {
                const data = await response.json();
                Toast.show({
                    type: ALERT_TYPES.SUCCESS,
                    text1: ALERT_HEADER.SUCCESS,
                    text2: data?.message,
                });
                settimer(60)
                const intervalId = setInterval(() => {
                    settimer((prev) => prev - 1)
                }, 1000);
                setinterval(intervalId)

            } else {
                const data = await response.json();
                Toast.show({
                    type: ALERT_TYPES.WARNING,
                    text1: ALERT_HEADER.DANGER,
                    text2: data?.message || 'Invalid OTP!',
                });
            }
            setlocalLoading(false)

        } catch (error) {
            setlocalLoading(false)
            Toast.show({
                type: ALERT_TYPES.WARNING,
                text1: ALERT_HEADER.DANGER,
                text2: JSON.stringify(error),
            });
        }
    }


    return (
        <Layout fixed={true}>
            <CommonHeader
                hideRightBtn={true}
            />

            <Layout >
                <Layout fixed={true} containerStyle={styles.main}>

                    <Image
                        source={IMAGES.OTP}
                        style={styles.phone}
                    />

                    <BodyText style={styles.title}>Verification Code</BodyText>

                    <BodyText style={styles.subtle}>{`We have sent the verification code to\nyour email address`}</BodyText>


                    <OTPTextInput
                        inputCount={6}
                        textInputStyle={styles.textInputStyle}
                        offTintColor={COLORS.BLACK}
                        tintColor={COLORS.BLACK}
                        handleTextChange={(txt) => setcode(txt)}
                    />

                    <BodyText style={styles.txt}>{`Resend OTP in ${timer}s`}</BodyText>

                    {timer < 1 &&
                        <TextButton
                            title={`Resend OTP`}
                            onPress={() => timer < 3 && handleResendOtp()}
                            textStyle={styles.txtBtn}
                            style={{ marginVertical: 0, }}
                        />
                    }
                </Layout>
            </Layout>

            <If condition={!keyboardStatus}>

                <View style={styles.btnContainer}>

                    <PrimaryButton
                        title={`Next`}
                        onPress={() => handleVerifyEmail()}
                        filled={true}
                        isLoading={isLoading || localLoading}
                    />

                </View>
            </If>

        </Layout>
    )
}

export default SignUpVerificationScreen
