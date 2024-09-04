import { useNavigation } from '@react-navigation/native'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import {
    ActivityIndicator,
    FlatList,
    Image,
    TouchableOpacity,
    View
} from 'react-native'
import { SCREENS } from '../../assets/constants'
import { CaretUp, RecievceBtnIcon, SendBtnIcon } from '../../assets/icons'
import { COLORS, hp } from '../../assets/stylesGuide'
import { BodyText, CommonHeader, Layout, NotificationDetailModal, PrimaryButton, Spacer } from '../../components'
import useNotification from '../../hooks/notification'
import useWalletApi from '../../hooks/walletApi'
import { useWallet, walletStateSelectors } from '../../states/wallet'
import { minimizeAddress } from '../../utils/myUtils'
import { styles } from './styles'

const TokenDetailScreen = () => {
    const navigation = useNavigation<any>()
    const { getCoinTransactions, isLoading } = useWalletApi()
    const selectedWalletCoin = useWallet(walletStateSelectors.selectedWalletCoin)
    const balanceList = useWallet(walletStateSelectors.coinBalanceList)
    const { getNotificationDetail, markNotificationAsRead, isLoading: isNotifyLoading } = useNotification()
    const [selectedNotification, setselectedNotification] = useState({})
    const [isModalVisble, setisModalVisble] = useState(false)

    const handleSelected = async (item: any) => {
        setisModalVisble(true)
        getNotificationDetail(item?.id, setselectedNotification)
    }

    const handleCloseModal = () => {
        setselectedNotification({})
        setisModalVisble(false)
    }

    const [selectedType, setselectedType] = useState('All')
    const [transactions, settransactions] = useState<any>([])

    const TRANSACTION_ACTIONS = [
        {
            id: 1,
            title: "All"
        },
        {
            id: 2,
            title: "Deposit"
        },
        {
            id: 3,
            title: "Send"
        },
    ]

    useEffect(() => {
        if (selectedWalletCoin?.symbol) {
            getCoinTransactions(selectedWalletCoin?.symbol, settransactions)
        }
    }, [selectedWalletCoin?.symbol])

    const getTransactions = () => {
        return selectedType == 'All' ? transactions : transactions.filter((x: any) => x.type == selectedType)
    }


    const getAvailableAmount = () => {
        const exists = balanceList.find((x) => x.network_name == selectedWalletCoin.symbol)
        if (exists) {
            return exists.amount
        } else {
            return 0
        }
    }


    return (
        <Layout fixed={true} >
            <CommonHeader
                title={selectedWalletCoin.name}
                hideRightBtn={true}
            />
            <Layout contentContainerStyle={styles.main}>
                {/* MAN CARD */}
                <View style={styles.card}>

                    <Image
                        source={selectedWalletCoin?.icon}
                        style={styles.logo}
                    />
                    <BodyText style={styles.txt1}>{selectedWalletCoin.name}</BodyText>
                    <View style={styles.view1}>
                        {/* PRICE */}
                        <BodyText style={styles.txt2}>{Number(getAvailableAmount())?.toFixed(4)}</BodyText>

                        <View style={styles.status}>
                            {
                                selectedWalletCoin?.isPositive ?
                                    <CaretUp width={hp(1)} height={hp(0.6)} fill={COLORS.WHITE} />
                                    :
                                    <CaretUp width={hp(1)} height={hp(0.6)} fill={COLORS.WHITE} style={styles.caretDown} />
                            }
                            <BodyText style={styles.txt3}>{selectedWalletCoin?.gain}%</BodyText>

                        </View>
                    </View>
                    {/* BUTTON CONTAINER */}
                    <View style={styles.view2}>

                        <PrimaryButton
                            title='Send'
                            icon={<SendBtnIcon width={hp(1.93)} height={hp(1.93)} />}
                            onPress={() => navigation.navigate(SCREENS.SEND_ADDRESS)}
                            style={styles.btn1}
                            textStyle={{ color: COLORS.BLACK }}
                        />

                        <PrimaryButton
                            title='Receive'
                            icon={<RecievceBtnIcon width={hp(1.93)} height={hp(1.93)} />}
                            onPress={() => navigation.navigate(SCREENS.DEPOSIT_ADDRESS)}
                            style={styles.btn2}
                        />

                    </View>

                </View>

                {/* HISTORY */}

                <View style={styles.coinContainer}>
                    <View style={styles.view3}>
                        <BodyText style={styles.txt4}>Transaction History</BodyText>
                    </View>

                    <View style={styles.row}>
                        {
                            TRANSACTION_ACTIONS.flatMap((item, index) => (
                                <TouchableOpacity
                                    key={index}
                                    activeOpacity={0.8}
                                    onPress={() => setselectedType(item.title)}
                                    style={{
                                        ...styles.chip,
                                        ...(index == 1 && { marginHorizontal: 10 }),
                                        ...(selectedType == item.title && { backgroundColor: COLORS.BLACK }),
                                    }}
                                >
                                    <BodyText style={{
                                        ...styles.chipTxt,
                                        ...(selectedType == item.title && { color: COLORS.WHITE }),
                                    }}>{item.title}</BodyText>
                                </TouchableOpacity>
                            ))
                        }
                    </View>
                    {
                        isLoading ?
                            <Layout fixed={true} containerStyle={{ backgroundColor: COLORS.WHITE }}>
                                <ActivityIndicator color={COLORS.PRIMARY} size={'large'} style={{ marginVertical: hp(5) }} />
                            </Layout>

                            :
                            getTransactions().length > 0 ?
                                <FlatList
                                    data={getTransactions()}
                                    renderItem={({ item, index }) => (
                                        <TouchableOpacity
                                            activeOpacity={0.8}
                                            onPress={() => {
                                                handleSelected(item);
                                            }}
                                            style={styles.item}>
                                            <View style={styles.row1}>
                                                <BodyText style={styles.type}>{item.type}</BodyText>
                                                <BodyText style={styles.amount}>{Number(item?.source_amount || item?.value).toFixed(4)}</BodyText>
                                            </View>
                                            <BodyText style={styles.trans}>{item.type == 'swap' ? `${item?.source_network_name} > ${item?.target_network_name}` : `${item?.token} - ${minimizeAddress(item?.tx_id)}`}</BodyText>
                                            <BodyText style={styles.date}>{moment(item.created_at).format('DD-MM-YYYY hh:mm:ss')}</BodyText>
                                        </TouchableOpacity>
                                    )}
                                />
                                :
                                <BodyText>No history available</BodyText>
                    }

                </View>

                <Spacer height={hp(15)} />


                <NotificationDetailModal
                    visible={isModalVisble}
                    onclose={handleCloseModal}
                    data={selectedNotification}
                    isLoading={isNotifyLoading}
                />
            </Layout>
        </Layout >
    )
}

export default TokenDetailScreen

