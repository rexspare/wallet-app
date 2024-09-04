import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useState, useEffect } from 'react'
import { Image, View } from 'react-native'
import OTPTextInput from 'react-native-otp-textinput'
import { IMAGES } from '../../assets/images'
import { COLORS } from '../../assets/stylesGuide'
import { BodyText, CommonHeader, If, Layout, PrimaryButton, TextButton } from '../../components'
import useKeyboard from '../../hooks/Keyboard'
import { styles } from './styles'
import { SCREENS } from '../../assets/constants'
import { useWallet, walletStateSelectors } from '../../states/wallet'
import useSendApi from '../../hooks/sendApi'


const SendOtpScreen = () => {
    const navigation = useNavigation<any>()
    const route = useRoute<any>()
    const { keyboardStatus } = useKeyboard()
    const { address, amount } = route?.params
    const { getSendOtp, verifySendOtp, send, isLoading } = useSendApi()
    const selectedWalletCoin = useWallet(walletStateSelectors.selectedWalletCoin)

    const [interval, setinterval] = useState<any>(null)
    const [timer, settimer] = useState(60)
    const [code, setcode] = useState('')
    const [isLocalLoading, setisLocalLoading] = useState(false)

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
            verifySendOtp(code, async () => {
                try {
                    setisLocalLoading(true)
                    const response: any = await send(selectedWalletCoin, address, amount, route?.params?.memo || undefined)
                    setisLocalLoading(false)
                  
                    if (response && response?.transaction_hash) {
                        navigation.navigate(SCREENS.SEND_SUCCESS, {
                            amount,
                            address,
                            memo: route?.params?.memo || undefined,
                            response
                        })
                    }

                } catch (error) {
                    console.log({ handleVerify: error });
                    setisLocalLoading(false)
                }
            })
        }
    }

    const handleResendOtp = async () => {
        getSendOtp(() => {
            settimer(60)
            const intervalId = setInterval(() => {
                settimer((prev) => prev - 1)
            }, 1000);
            setinterval(intervalId)
        })
    }

    return (
        <Layout fixed={true}>
            <CommonHeader
                title={`Send ${selectedWalletCoin?.shortName}`}
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

                    <BodyText style={styles.txt}>{`Resend OTP in ${timer > 1 ? timer : 0}s`}</BodyText>

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
                        title={`Confirm OTP`}
                        onPress={() => handleVerify()}
                        filled={true}
                        isLoading={isLoading || isLocalLoading}
                    />

                </View>
            </If>

        </Layout>
    )
}

export default SendOtpScreen
