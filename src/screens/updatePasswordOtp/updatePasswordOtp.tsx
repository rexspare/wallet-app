import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { Image, View } from 'react-native'
import OTPTextInput from 'react-native-otp-textinput'
import { IMAGES } from '../../assets/images'
import { COLORS } from '../../assets/stylesGuide'
import { BodyText, CommonHeader, If, Layout, PrimaryButton, TextButton } from '../../components'
import useKeyboard from '../../hooks/Keyboard'
import useSettingApi from '../../hooks/settingApi'
import { styles } from './styles'


const UpdatePasswordOtpScreen = () => {
    const navigation = useNavigation<any>()
    const { keyboardStatus } = useKeyboard()
    const route = useRoute<any>()
    const { passwordUpdateOtp, passwordUpdate, isLoading } = useSettingApi()
    const [interval, setinterval] = useState<any>(null)
    const [timer, settimer] = useState(60)
    const [code, setcode] = useState('')
    const [localLoading, setlocalLoading] = useState(false)
    const { password, newPassword } = route?.params

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

    const handleUpdatePassword = () => {
        if (code?.length > 5 && route?.params?.password && route?.params?.newPassword) {
            passwordUpdate(
                JSON.stringify({
                    current_password: password,
                    new_password: newPassword,
                    otp: code,
                    OTP: code
                })
            )
        }
    }
    const handleResendOtp = async () => {
        try {
            if (route?.params?.email) {
                passwordUpdateOtp(() => {
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
                title='Reset Password'
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
                        title={`Change Password`}
                        onPress={() => handleUpdatePassword()}
                        isLoading={isLoading}
                        filled={true}
                    />

                </View>
            </If>

        </Layout>
    )
}

export default UpdatePasswordOtpScreen
