import { useNavigation } from '@react-navigation/native'
import React, { useEffect } from 'react'
import {
    ActivityIndicator,
    View
} from 'react-native'
import { SCREENS } from '../../assets/constants'
import { RecievceBtnIcon, SendBtnIcon } from '../../assets/icons'
import { COLORS, hp } from '../../assets/stylesGuide'
import { BodyText, CoinItem, HomeHeader, Layout, PrimaryButton, Spacer } from '../../components'
import useNotification from '../../hooks/notification'
import useWalletApi from '../../hooks/walletApi'
import { appStateSelectors, useApp } from '../../states/app'
import { useWallet, walletStateSelectors } from '../../states/wallet'
import { getCurrencySymbol, getTotalBalanceInFiat, sortCoinsList } from '../../utils/myUtils'
import { styles } from './styles'

const HomeScreen = () => {
    const navigation = useNavigation<any>()
    const user = useApp(appStateSelectors.user)
    const setSelectedWalletCoin = useWallet(walletStateSelectors.setSelectedWalletCoin)
    const coinList = useWallet(walletStateSelectors.coinList)
    const coinBalanceList = useWallet(walletStateSelectors.coinBalanceList)
    const { getCoinList, getCoinBalanceList, isLoading } = useWalletApi()
    const { getNotificationTransactions } = useNotification()

    const handleSelectToken = (coin: any) => {
        setSelectedWalletCoin(coin)
        navigation.navigate(SCREENS.TOKEN_DETAIL)
    }

    useEffect(() => {
        const subscribe = navigation.addListener("focus", async () => {
            getCoinList()
            getNotificationTransactions()
        })
        return subscribe
    }, [navigation])


    return (
        <Layout fixed={true} >
            <HomeHeader />
            <Layout contentContainerStyle={styles.main}>
                {/* MAN CARD */}
                <View style={styles.card}>
                    <BodyText style={styles.txt1}>Total Balance</BodyText>
                    <View style={styles.view1}>
                        {/* PRICE */}
                        <BodyText style={styles.txt2}>{`${getCurrencySymbol(user?.base_currency)}${getTotalBalanceInFiat(coinBalanceList)}`}</BodyText>

                        {/* <View style={styles.status}>
                            <CaretUp width={hp(1)} height={hp(0.6)} fill={COLORS.WHITE} />
                            <BodyText style={styles.txt3}>2.54%</BodyText>

                        </View> */}
                    </View>
                    {/* BUTTON CONTAINER */}
                    <View style={styles.view2}>

                        <PrimaryButton
                            title='Send'
                            icon={<SendBtnIcon width={hp(1.93)} height={hp(1.93)} />}
                            onPress={() => navigation.navigate(SCREENS.SEND)}
                            style={styles.btn1}
                            textStyle={{ color: COLORS.BLACK }}
                        />

                        <PrimaryButton
                            title='Receive'
                            icon={<RecievceBtnIcon width={hp(1.93)} height={hp(1.93)} />}
                            onPress={() => navigation.navigate(SCREENS.DEPOSIT)}
                            style={styles.btn2}
                        />

                    </View>

                </View>

                {/* COINS */}

                <View style={styles.coinContainer}>
                    <View style={styles.view3}>
                        <BodyText style={styles.txt4}>My Assets</BodyText>
                        {/* <BodyText style={styles.txt5}>View all</BodyText> */}
                        <BodyText style={styles.txt5}></BodyText>
                    </View>

                    {
                        isLoading ?
                            <View style={styles.loaderContainer}>
                                <ActivityIndicator color={COLORS.PRIMARY} size={'large'} />
                            </View>
                            :
                            sortCoinsList(coinList).map((coin: any, index: number) => (
                                <View
                                    key={index}
                                    style={{ width: '100%' }}>
                                    <CoinItem
                                        item={coin}
                                        onPress={() => handleSelectToken(coin)}
                                    />
                                    {index != coinList?.length - 1 && <View style={styles.line}></View >}

                                </View>
                            ))
                    }
                </View>

                <Spacer height={hp(15)} />



            </Layout>
        </Layout >
    )
}

export default HomeScreen

