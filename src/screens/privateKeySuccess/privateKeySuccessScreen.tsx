import { CommonActions, useNavigation, useRoute } from '@react-navigation/native'
import React, { useState } from 'react'
import {
    View
} from 'react-native'
import { SCREENS } from '../../assets/constants'
import { CopyIcon, TickIcon } from '../../assets/icons'
import { hp } from '../../assets/stylesGuide'
import { CommonHeader, Layout, PrimaryButton, PrimaryInput, Spacer } from '../../components'
import { copyToClipboard, onShare } from '../../utils/myUtils'
import { styles } from './styles'

const PrivateKeySuccessScreen = () => {
    const navigation = useNavigation<any>()
    const route = useRoute<any>()
    const privateKey = route?.params?.privateKey
    const [isCopied, setisCopied] = useState(false)

  

    const handleCopy = () => {
        copyToClipboard(privateKey?.private_key || "")
        setisCopied(true)
        setTimeout(() => {
            setisCopied(false)
        }, 1000);
    }

    const onBackPress = () => {
        navigation.dispatch(
            CommonActions.reset({
                index: 1,
                routes: [
                    {
                        name: SCREENS.BOTTOM,
                    },
                    {
                        name: SCREENS.SETTINGS,
                    },
                ],
            })
        );
    }

    return (
        <Layout fixed={true} >
            <CommonHeader
                title={`Private Key`}
                hideRightBtn={true}
                onBackPress={() => onBackPress()}
            />

            <Layout contentContainerStyle={styles.main}>
                <Spacer height={hp(5)} />

                <PrimaryInput
                    title='Private Key'
                    value={privateKey?.private_key || ""}
                    isPassword={true}
                    onPressRightIcon={() => handleCopy()}
                    renderRightIcon={isCopied ?
                        <TickIcon width={hp(1.57)} height={hp(1.57)} />
                        :
                        <CopyIcon width={hp(2.57)} height={hp(2.57)} />}
                />

                <Spacer height={hp(15)} />
            </Layout>

            <View style={styles.btnContainer}>
                <PrimaryButton
                    title={`Share`}
                    onPress={() => { onShare(privateKey?.private_key || "") }}
                />
            </View>

        </Layout >
    )
}

export default PrivateKeySuccessScreen

