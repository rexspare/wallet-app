import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import {
    ActivityIndicator,
    Image,
    ImageBackground,
    TouchableOpacity,
    View
} from 'react-native'
import { CopyIcon, TickIcon } from '../../assets/icons'
import { COLORS, hp } from '../../assets/stylesGuide'
import { BodyText, CommonHeader, Layout, PrimaryButton, Spacer } from '../../components'
import useWalletApi from '../../hooks/walletApi'
import { useWallet, walletStateSelectors } from '../../states/wallet'
import { copyToClipboard, getNetwork, minimizeAddress, onShare } from '../../utils/myUtils'
import { styles } from './styles'

const DespositAddressScreen = () => {
    const navigation = useNavigation<any>()
    const selectedWalletCoin = useWallet(walletStateSelectors.selectedWalletCoin)
    const { getWalletAddress, isLoading } = useWalletApi()
    const [coinAddress, setcoinAddress] = useState<any>({})
    const [isCopied, setisCopied] = useState(false)


    useEffect(() => {
        if (selectedWalletCoin?.symbol && selectedWalletCoin?.symbol != "SAI") {
            getWalletAddress(setcoinAddress)
        }
    }, [selectedWalletCoin?.symbol])

    const handleCopy = () => {
        copyToClipboard(coinAddress?.address || "")
        setisCopied(true)
        setTimeout(() => {
            setisCopied(false)
        }, 1000);
    }

    return (
        <Layout fixed={true} >
            <CommonHeader
                title={`Receive ${selectedWalletCoin?.shortName}`}
                hideRightBtn={true}
            />

            <Layout contentContainerStyle={styles.main}>


                <View style={styles.qrContainer}>
                    <ImageBackground
                        source={{ uri: coinAddress?.address_qr_code_url }}
                        style={styles.qr}
                        imageStyle={styles.qrImg}
                    >
                        {
                            isLoading ?
                                <ActivityIndicator color={COLORS.PRIMARY} size={'large'} />
                                :
                                <Image
                                    source={selectedWalletCoin.icon}
                                    style={styles.icon}
                                />
                        }

                    </ImageBackground>
                </View>

                <View style={styles.coinContainer}>
                    <BodyText style={styles.txt6}>Network</BodyText>
                    <BodyText style={styles.txt7}>{getNetwork(selectedWalletCoin?.symbol)}</BodyText>
                    <View style={styles.line}></View>

                    <BodyText style={styles.txt6}>Deposit Address</BodyText>
                    <View style={styles.row}>
                        <BodyText style={styles.txt7}>{minimizeAddress(coinAddress?.address || "")}</BodyText>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
                            onPress={() => handleCopy()}
                        >
                            {
                                isCopied ?
                                    <TickIcon width={hp(1.57)} height={hp(1.57)} />
                                    :
                                    <CopyIcon width={hp(2.57)} height={hp(2.57)} />
                            }
                        </TouchableOpacity>
                    </View>

                </View>


                <View style={styles.coinContainer}>
                    <View style={styles.row}>
                        <BodyText style={styles.txt4}>Minimum Deposit</BodyText>
                        <BodyText style={styles.txt5}>{`0.000001 ${selectedWalletCoin?.symbol}`}</BodyText>
                    </View>
                    <View style={styles.line}></View>
                    <View style={styles.row}>
                        <BodyText style={styles.txt4}>Credited (Trading enabled)</BodyText>
                        <BodyText style={styles.txt5}>6 Confirmation</BodyText>
                    </View>

                </View>


                {/* <BodyText style={styles.txt8}>*Do not transact with Sanctioned Entitles. <BodyText
                    style={{ fontFamily: FONTS.MEDIUM }}
                >
                    Learn more
                </BodyText></BodyText>
                <BodyText style={styles.txt9}>*Don't send NFTs to this address.</BodyText> */}

                <Spacer height={hp(15)} />

            </Layout>

            <View style={styles.btnContainer}>
                <PrimaryButton
                    title={`Share`}
                    onPress={() => coinAddress?.address && onShare(coinAddress?.address || "")}
                />
            </View>

        </Layout >
    )
}

export default DespositAddressScreen

