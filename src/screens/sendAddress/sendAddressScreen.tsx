import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import {
    TextInput,
    View
} from 'react-native'
import { SCREENS } from '../../assets/constants'
import { QrIcon } from '../../assets/icons'
import { hp } from '../../assets/stylesGuide'
import { BodyText, CommonHeader, ErrorText, If, Layout, PrimaryButton, PrimaryInput, SendDropDown, Spacer } from '../../components'
import useKeyboard from '../../hooks/Keyboard'
import useSendApi from '../../hooks/sendApi'
import { useWallet, walletStateSelectors } from '../../states/wallet'
import { getNetwork, getPriceInUsd, getSendLimit, isAddressValid } from '../../utils/myUtils'
import { styles } from './styles'

const SendAddressScreen = () => {
    const navigation = useNavigation<any>()
    const { keyboardStatus } = useKeyboard()
    const { getGasFee, isLoading } = useSendApi()
    const selectedWalletCoin = useWallet(walletStateSelectors.selectedWalletCoin)
    const setSelectedWalletCoin = useWallet(walletStateSelectors.setSelectedWalletCoin)
    const balanceList = useWallet(walletStateSelectors.coinBalanceList)
    const coinList = useWallet(walletStateSelectors.coinList)
    const [address, setaddress] = useState('')
    const [amount, setamount] = useState('')
    const [memo, setmemo] = useState('')
    const [sendLimit, setsendLimit] = useState<any>(0)
    const [transactionFee, settransactionFee] = useState<any>(0.00)
    const [coinPriceInUsd, setcoinPriceInUsd] = useState<any>(false)
    const [isFeeJusitified, setisFeeJusitified] = useState(false)
    const Fee = transactionFee

    useEffect(() => {
        getSendLimit_()
        getFee()
    }, [selectedWalletCoin?.symbol])

    const getSendLimit_ = async () => {
        try {
            const price: any = await getPriceInUsd(selectedWalletCoin?.symbol) as number
            if (price == false) {
                getSendLimit(selectedWalletCoin?.symbol)
                setcoinPriceInUsd(false)
            } else {
                setsendLimit((10 / Number(price))?.toFixed(5));
                setcoinPriceInUsd(Number(price)?.toFixed(5))
            }

        } catch (error) {

        }
    }

    const getAvailableAmount = (coin = selectedWalletCoin?.symbol) => {
        const exists = balanceList.find((x) => x.network_name?.toUpperCase() == coin?.toUpperCase())
        if (exists) {
            return exists.amount
        } else {
            return 0
        }
    }

    const isAmountValid = () => {
        if (selectedWalletCoin?.symbol?.toUpperCase() == "GRADE") {
            return Number(getAvailableAmount()) >= (Number(amount)) && Number(amount) >= Number(sendLimit)
        } else if (selectedWalletCoin?.symbol?.toUpperCase() == "USDT") {
            return Number(getAvailableAmount()) >= (Number(amount)) && Number(amount) >= Number(sendLimit)
        } else {
            return Number(getAvailableAmount()) >= (Number(amount) + transactionFee) && Number(amount) >= Number(sendLimit)
        }
    }

    const isFeeValid = () => {
        if (selectedWalletCoin?.symbol?.toUpperCase() == "GRADE") {
            return Number(getAvailableAmount("BNB")) >= (Number(transactionFee))
        } else if (selectedWalletCoin?.symbol?.toUpperCase() == "USDT") {
            return Number(getAvailableAmount("ETH")) >= (Number(transactionFee))
        } else {
            return Number(getAvailableAmount()) >= (Number(amount) + transactionFee) && Number(amount) >= Number(sendLimit)
        }
    }

    const getSendAmountInusd = () => {
        if (coinPriceInUsd == false) {
            return '--'
        } else {
            return (coinPriceInUsd * Number(amount)).toFixed(2)
        }
    }

    const handleContinue = () => {
        if (amount &&
            isAmountValid() &&
            isFeeValid() &&
            address &&
            isAddressValid(selectedWalletCoin?.symbol, address)
        ) {
            let data: any = {
                amount,
                address,
                amountInUsd: getSendAmountInusd()
            }

            if (selectedWalletCoin?.symbol?.toUpperCase() == "XRP") {
                data = { ...data, memo: memo }
            }
            navigation.navigate(SCREENS.SEND_DETAIL, data)
        }
    }

    const FEE_SYMBOL = selectedWalletCoin?.symbol?.toUpperCase() == "GRADE" ? "BNB" : selectedWalletCoin?.symbol?.toUpperCase() == "USDT" ? "ETH" : selectedWalletCoin?.symbol

    const getFee = async () => {
        getGasFee(selectedWalletCoin?.symbol?.toUpperCase(), (data) => {
            settransactionFee(data ? Number(data)?.toFixed(8) : 0)
        })
    }

    return (
        <Layout fixed={true} >
            <CommonHeader
                title={`Send ${selectedWalletCoin?.shortName}`}
            />

            <Layout contentContainerStyle={styles.main}>

                <PrimaryInput
                    title='Receiver Address:'
                    placeholder='Address'
                    value={address}
                    onChange={(txt) => setaddress(txt)}
                    renderRightIcon={<QrIcon width={hp(2.57)} height={hp(2.57)} />}
                    isPassword={true}
                    inputContainer={{
                        ...(!isAddressValid(selectedWalletCoin?.symbol, address) && styles.errorInput)
                    }}
                    containerStyles={{ marginTop: hp(3) }}
                />
                {
                    !isAddressValid(selectedWalletCoin?.symbol, address) && <ErrorText>Please enter a valid Wallet Address</ErrorText>
                }


                {/* COIN DROPDOWN */}

                <View style={styles.dropDownRow}>
                    <BodyText style={styles.key}>Asset:</BodyText>

                    <SendDropDown
                        data={coinList}
                        onChangeDropdown={(coin) => setSelectedWalletCoin(coin)}
                        defaultValue={selectedWalletCoin}
                    />

                </View>

                <View style={[styles.dropDownRow, { marginTop: hp(2) }]}>
                    <BodyText style={styles.key}>Amount:</BodyText>

                    <View style={styles.inputRow}>
                        <View>
                            <TextInput
                                placeholder='0.00'
                                placeholderTextColor={"rgba(232, 236, 244, 1)"}
                                value={amount}
                                onChangeText={(txt) => setamount(txt)}
                                keyboardType={'numeric'}
                                style={styles.input}
                            />
                            <BodyText style={styles.txt6}>${getSendAmountInusd()}</BodyText>
                        </View>

                        <BodyText style={styles.txt7}>{selectedWalletCoin?.symbol}</BodyText>

                    </View>

                </View>

                <Spacer height={hp(1)} />
                {(!isAmountValid() && amount) && <ErrorText>Minimum Amount cannot be lower than {sendLimit} or greater than available balance</ErrorText>}
                {(!isFeeValid()) && <ErrorText>You need {transactionFee} {FEE_SYMBOL} for the gas fee in addition to the sending amount.</ErrorText>}

                <If condition={selectedWalletCoin?.symbol?.toUpperCase() == "XRP"}>
                    <PrimaryInput
                        title='Memo Code'
                        placeholder='Memo Code'
                        value={memo}
                        onChange={(txt) => setmemo(txt)}
                        keyBoardType={'numeric'}
                    />
                </If>

                <BodyText style={styles.txt2}>Balance: <BodyText style={styles.txt3}>{`${Number(getAvailableAmount() || 0)?.toFixed(5)} ${selectedWalletCoin?.symbol}`}</BodyText></BodyText>


                <View style={styles.coinContainer}>
                    <View style={styles.row}>
                        <BodyText style={styles.txt4}>Network</BodyText>
                        <BodyText style={styles.txt5}>{getNetwork(selectedWalletCoin?.symbol)}</BodyText>
                    </View>
                    <View style={styles.line}></View>
                    <View style={styles.row}>
                        <BodyText style={styles.txt4}>Network Fee</BodyText>
                        <BodyText style={styles.txt5}>{`${transactionFee} ${FEE_SYMBOL}`}</BodyText>
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
                    title='Continue'
                    onPress={() => handleContinue()}
                />
            </View>

        </Layout >
    )
}

export default SendAddressScreen

