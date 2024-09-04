import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import {
    View
} from 'react-native'
import { SCREENS } from '../../assets/constants'
import { hp } from '../../assets/stylesGuide'
import { CommonHeader, Layout, PrimaryButton, PrimaryInput, Spacer } from '../../components'
import usePrivateKeyApi from '../../hooks/privateKeyApi'
import { useWallet, walletStateSelectors } from '../../states/wallet'
import { styles } from './styles'

const PrivateKeyPasswordScreen = () => {
    const navigation = useNavigation<any>()
    const selectedWalletCoin = useWallet(walletStateSelectors.selectedWalletCoin)
    const { verifyPrivateKeyPassword, getPirvateKey, isLoading } = usePrivateKeyApi()
    const [password, setpassword] = useState('')

    const verifyPassword = async () => {
        await verifyPrivateKeyPassword(password, async () => {
            const privateKey = await getPirvateKey(selectedWalletCoin)
            if (privateKey != false) {
                navigation.replace(SCREENS.PRIVATE_KEY_SUCCESS, {
                    privateKey: privateKey
                })
            }
        })
    }

    return (
        <Layout fixed={true} >
            <CommonHeader
                title={`Password`}
                hideRightBtn={true}
            />

            <Layout contentContainerStyle={styles.main}>
                <Spacer height={hp(5)} />

                <PrimaryInput
                    title='Enter Password'
                    placeholder='Password'
                    value={password}
                    onChange={(txt) => setpassword(txt)}
                    isPassword={true}
                />

                <Spacer height={hp(15)} />
            </Layout>

            <View style={styles.btnContainer}>
                <PrimaryButton
                    title={`Verify Password`}
                    onPress={() => verifyPassword()}
                    isLoading={isLoading}
                />
            </View>

        </Layout >
    )
}

export default PrivateKeyPasswordScreen

