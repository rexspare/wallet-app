import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import {
    View
} from 'react-native'
import { SCREENS } from '../../assets/constants'
import { hp } from '../../assets/stylesGuide'
import { CommonHeader, Layout, PrimaryButton, Spacer } from '../../components'
import PrimaryDropDown from '../../components/primaryDropDown'
import { useWallet, walletStateSelectors } from '../../states/wallet'
import { styles } from './styles'
import usePrivateKeyApi from '../../hooks/privateKeyApi'

const PrivateKeyScreen = () => {
    const navigation = useNavigation<any>()
    const coinList = useWallet(walletStateSelectors.coinList)
    const setSelectedWalletCoin = useWallet(walletStateSelectors.setSelectedWalletCoin)
    const { getPrivateKeyOtp, isLoading } = usePrivateKeyApi()
    const [selectedCoin, setselectedCoin] = useState<any>(null)

    const getPrivateKeyOtp_ = async () => {
        if (selectedCoin != null) {
            navigation.navigate(SCREENS.PRIVATE_KEY_PASSWORD)
        }
    }

    return (
        <Layout fixed={true} >
            <CommonHeader
                title={`Private Key`}
                hideRightBtn={true}
            />

            <Layout contentContainerStyle={styles.main}>
                <Spacer height={hp(5)} />

                <PrimaryDropDown
                    data={coinList}
                    title='Select Coin'
                    onChangeDropdown={(item) => {
                        setselectedCoin(item)
                        setSelectedWalletCoin(item)
                    }}
                />

                <Spacer height={hp(15)} />
            </Layout>

            <View style={styles.btnContainer}>
                <PrimaryButton
                    title={`Get Private Key`}
                    onPress={() => getPrivateKeyOtp_()}
                    isLoading={isLoading}
                />
            </View>

        </Layout >
    )
}

export default PrivateKeyScreen

