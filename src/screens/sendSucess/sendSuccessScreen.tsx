import { CommonActions, useNavigation, useRoute } from '@react-navigation/native'
import React from 'react'
import { Image, View } from 'react-native'
import { SCREENS } from '../../assets/constants'
import { IMAGES } from '../../assets/images'
import { FONTS } from '../../assets/stylesGuide'
import { BodyText, CommonHeader, If, Layout, PrimaryButton } from '../../components'
import useKeyboard from '../../hooks/Keyboard'
import { useWallet, walletStateSelectors } from '../../states/wallet'
import { styles } from './styles'


const SendSuccessScreen = () => {
    const navigation = useNavigation<any>()
    const route = useRoute<any>()
    const { keyboardStatus } = useKeyboard()
    const { address, amount, response } = route?.params
    const selectedWalletCoin = useWallet(walletStateSelectors.selectedWalletCoin)

    return (
        <Layout fixed={true}>
            <CommonHeader
                title={`Send ${selectedWalletCoin?.shortName}`}
                hideRightBtn={true}
            />

            <Layout >
                <Layout fixed={true} containerStyle={styles.main}>

                    <Image
                        source={IMAGES.SUCCESS}
                        style={styles.success}
                    />

                    <BodyText style={styles.title}>Sent Successfully!</BodyText>

                    <BodyText style={styles.subtle}><BodyText fontFamily={FONTS.MEDIUM}>{`${amount} ${selectedWalletCoin?.symbol}`}</BodyText> sent to</BodyText>
                    <BodyText style={styles.subtle1}>{`${address}`}</BodyText>


                </Layout>
            </Layout>

            <If condition={!keyboardStatus}>

                <View style={styles.btnContainer}>

                    <BodyText style={styles.txt1}>Transaction ID : {response?.transaction_hash}</BodyText>
                    <BodyText style={styles.txt2}>We'll send you an email of confirmation. It may take a few minutes to see the payment in your balance.</BodyText>

                    <PrimaryButton
                        title={`Back to Home`}
                        onPress={() =>  navigation.dispatch(
                            CommonActions.reset({
                              index: 0,
                              routes: [
                                {
                                  name: SCREENS.BOTTOM,
                                },
                              ],
                            })
                          )}
                        filled={true}
                    />

                </View>
            </If>

        </Layout>
    )
}

export default SendSuccessScreen
