import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import {
    Image,
    View
} from 'react-native'
import OTPTextInput from 'react-native-otp-textinput'
import { SCREENS } from '../../assets/constants'
import { IMAGES } from '../../assets/images'
import { COLORS } from '../../assets/stylesGuide'
import { BodyText, CommonHeader, If, Layout, PrimaryButton, Spacer, TextButton } from '../../components'
import useKeyboard from '../../hooks/Keyboard'
import usePrivateKeyApi from '../../hooks/privateKeyApi'
import { styles } from './styles'

const PrivateKeyOtpScreen = () => {
    const navigation = useNavigation<any>()
    const { keyboardStatus } = useKeyboard()
    const { verifyPrivateKeyOtp, getPrivateKeyOtp, isLoading } = usePrivateKeyApi()

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


    const handleVerify = async () => {
        if (code?.length > 5) {
            await verifyPrivateKeyOtp(code, () => {
                navigation.navigate(SCREENS.PRIVATE_KEY_PASSWORD)
            })
        }
    }

    const handleResendOtp = async () => {
        getPrivateKeyOtp(() => {
            settimer(60)
            const intervalId = setInterval(() => {
                settimer((prev) => prev - 1)
            }, 1000);
            setinterval(intervalId)
        })
    }


    return (
        <Layout fixed={true} >
            <CommonHeader
                title={`Private Key OTP`}
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

                    <If condition={keyboardStatus}>
                        <Spacer height={50} />
                    </If>
                </Layout>
            </Layout>

            <If condition={!keyboardStatus}>

                <View style={styles.btnContainer}>

                    <PrimaryButton
                        title={`Confirm OTP`}
                        onPress={() => handleVerify()}
                        filled={true}
                        isLoading={isLoading}
                    />

                </View>
            </If>

        </Layout >
    )
}

export default PrivateKeyOtpScreen

