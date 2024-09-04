import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { Image, View } from 'react-native'
import OTPTextInput from 'react-native-otp-textinput'
import { IMAGES } from '../../assets/images'
import { COLORS } from '../../assets/stylesGuide'
import { BodyText, CommonHeader, If, Layout, PrimaryButton, TextButton } from '../../components'
import useKeyboard from '../../hooks/Keyboard'
import { styles } from './styles'
import useAuth from '../../hooks/auth'


const PasswordOtp = () => {
    const navigation = useNavigation<any>()
    const route = useRoute<any>()
    const { keyboardStatus } = useKeyboard()
    const { onVerifyPasswordOtp, onResetPasswordRequest, isLoading } = useAuth()
    const [interval, setinterval] = useState<any>(null)
    const [timer, settimer] = useState(60)
    const [code, setcode] = useState('')

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
            onVerifyPasswordOtp(route?.params?.email, code)
        }
    }

    const handleResendOtp = async () => {
        try {
            if (route?.params?.email) {
                onResetPasswordRequest(route?.params?.email, () => {
                    settimer(60)
                    const intervalId = setInterval(() => {
                        settimer((prev) => prev - 1)
                    }, 1000);
                    setinterval(intervalId)
                })
            }
        } catch (error) {

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
                        filled={true}
                        onPress={() => handleVerifyEmail()}
                        isLoading={isLoading}
                    />

                </View>
            </If>

        </Layout>
    )
}

export default PasswordOtp
