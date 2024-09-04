import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useState } from 'react'
import {
    Image,
    View
} from 'react-native'
import { SCREENS } from '../../assets/constants'
import { hp } from '../../assets/stylesGuide'
import { BodyText, CommonHeader, If, Layout, PrimaryButton, PrimaryInput, Spacer, VerifyModal } from '../../components'
import { useWallet, walletStateSelectors } from '../../states/wallet'
import { getNetwork, minimizeAddress } from '../../utils/myUtils'
import { styles } from './styles'
import { appStateSelectors, useApp } from '../../states/app'
import useSendApi from '../../hooks/sendApi'

const SendDetailScreen = () => {
    const navigation = useNavigation<any>()
    const route = useRoute<any>()
    const { getSendOtp, send, isLoading } = useSendApi()
    const selectedWalletCoin = useWallet(walletStateSelectors.selectedWalletCoin)
    const user = useApp(appStateSelectors.user)
    const { address, amount, amountInUsd } = route?.params
    const [istotpModalVisible, setistotpModalVisible] = useState(false)


    const handleContinue = () => {
        // setistotpModalVisible(true)

        // if (user?.is_totp) {
        //     setistotpModalVisible(true)
        // } else {
        //     getSendOtp(() => navigation.navigate(SCREENS.SEND_OTP, {
        //         amount,
        //         address
        //     }))
        // }

        getSendOtp(() => navigation.navigate(SCREENS.SEND_OTP, {
            amount,
            address,
            memo: route?.params?.memo || undefined
        }))
    }

    const onSuccess = async () => {
        try {
            setistotpModalVisible(false)

            const response: any = await send(
                selectedWalletCoin,
                address,
                amount,
                route?.params?.memo || undefined
            )

            if (response && response?.transaction_hash) {
                navigation.navigate(SCREENS.SEND_SUCCESS, {
                    amount,
                    address,
                    memo: route?.params?.memo || undefined,
                    response
                })
            }
        } catch (error) {

        }
    }
    const FEE = selectedWalletCoin?.symbol?.toUpperCase() == "GRADE" ? "BNB" : selectedWalletCoin?.symbol?.toUpperCase() == "USDT" ? "ETH" : selectedWalletCoin?.symbol


    return (
        <Layout fixed={true} >
            <CommonHeader
                title={`Send ${selectedWalletCoin?.shortName}`}
                hideRightBtn={true}
            />

            <Layout contentContainerStyle={styles.main}>


                <Spacer height={hp(2)} />
                <PrimaryInput
                    title='Sending to:'
                    value={minimizeAddress(address)}
                    editable={false}
                />

                <Image
                    source={selectedWalletCoin?.icon}
                    style={styles.logo}
                />

                <BodyText style={styles.txt6}>AMOUNT</BodyText>

                <BodyText style={styles.txt1}>{amount} {selectedWalletCoin?.shortName}</BodyText>

                <BodyText style={styles.txt7}>${amountInUsd}</BodyText>


                <View style={styles.coinContainer}>
                    <View style={styles.line}></View>
                    <View style={styles.row}>
                        <BodyText style={styles.txt4}>Network</BodyText>
                        <BodyText style={styles.txt5}>{getNetwork(selectedWalletCoin?.symbol)}</BodyText>
                    </View>
                    <View style={styles.line}></View>
                    <View style={styles.row}>
                        <BodyText style={styles.txt4}>Network Fee</BodyText>
                        <BodyText style={styles.txt5}>{`${FEE}`}</BodyText>
                    </View>
                </View>


                <If condition={selectedWalletCoin?.symbol?.toUpperCase() == "GRADE"}>
                    <BodyText style={styles.txt3}>Need BNB as a gas fee for this transfer</BodyText>
                </If>

                <If condition={selectedWalletCoin?.symbol?.toUpperCase() == "USDT"}>
                    <BodyText style={styles.txt3}>Need ETH as a gas fee for this transfer</BodyText>
                </If>

                <Spacer height={hp(15)} />

            </Layout>

            <View style={styles.btnContainer}>
                <PrimaryButton
                    title={`Send ${selectedWalletCoin?.symbol}`}
                    onPress={() => handleContinue()}
                    isLoading={isLoading}
                />
            </View>

            <VerifyModal
                visible={istotpModalVisible}
                onclose={() => setistotpModalVisible(false)}
                handleVerified={onSuccess}
            />


        </Layout >
    )
}

export default SendDetailScreen

