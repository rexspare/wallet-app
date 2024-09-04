import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import Collapsible from 'react-native-collapsible'
import { SCREENS } from '../../assets/constants'
import { SearchIcon } from '../../assets/icons'
import { COLORS, hp } from '../../assets/stylesGuide'
import { BodyText, CommonHeader, Layout, PrimaryInput, SendCoinItem, Spacer } from '../../components'
import { useWallet, walletStateSelectors } from '../../states/wallet'
import { fixCoinSymbol, sortCoinsList } from '../../utils/myUtils'
import { styles } from './styles'

const SendScreen = () => {
    const navigation = useNavigation<any>()
    const setSelectedWalletCoin = useWallet(walletStateSelectors.setSelectedWalletCoin)
    const coinList = useWallet(walletStateSelectors.coinList)
    const coinBalanceList = useWallet(walletStateSelectors.coinBalanceList)
    const [myCoins, setmyCoins] = useState<any>([])

    const [isSearching, setisSearching] = useState(false)
    const [searchVal, setsearchVal] = useState<string>('')


    useEffect(() => {
        getMyAssets()
    }, [coinList, coinBalanceList])

    const getMyAssets = () => {
        const list = []
        for (let index = 0; index < coinBalanceList.length; index++) {
            const balance = coinBalanceList[index];
            const exists = findAsset(balance)
            if (exists) {
                list.push(exists)
            }
        }
        setmyCoins(list)
        return list
    }

    const findAsset = (balance: any) => {
        const exsits = coinList?.find((x) => fixCoinSymbol(x?.symbol) == fixCoinSymbol(balance?.network_name))
        if (exsits) {
            return {
                ...exsits,
                ...balance
            }
        } else {
            return null
        }
    }

    const filteredDataSource = () => {
        const txt = searchVal?.toUpperCase()
        return searchVal ?
            myCoins?.filter((coin: any) => coin?.name?.toUpperCase()?.includes(txt) || coin?.symbol?.toUpperCase()?.includes(txt))
            :
            myCoins
    }

    const handleContinue = (item: any) => {
        setSelectedWalletCoin(item)
        navigation.navigate(SCREENS.SEND_ADDRESS)
    }

    return (
        <Layout fixed={true} >
            <CommonHeader
                title={'Send Crypto'}
                onRightPress={() => setisSearching(!isSearching)}
                isSearching={isSearching}
            />
            <Collapsible collapsed={!isSearching}>
                <PrimaryInput
                    hideTitle={true}
                    containerStyles={styles.searchInput}
                    placeholder='Search'
                    value={searchVal}
                    onChange={(txt) => setsearchVal(txt)}
                    renderRightIcon={<SearchIcon
                        width={hp(2.3)}
                        height={hp(2.3)}
                        fill={COLORS.DISABLED}
                    />}
                    isPassword={true}
                />
            </Collapsible>
            <Layout contentContainerStyle={styles.main}>


                {/* COINS */}

                <View style={styles.coinContainer}>
                    <View style={styles.view3}>
                        <BodyText style={styles.txt4}>My Assets</BodyText>
                    </View>


                    {
                        sortCoinsList(filteredDataSource()).map((coin: any, index: number) => (
                            <>
                                <SendCoinItem
                                    key={index}
                                    item={coin}
                                    onPress={() => handleContinue(coin)}
                                />
                                {index != filteredDataSource()?.length - 1 && <View style={styles.line}></View >}
                            </>
                        ))
                    }

                </View>

                <Spacer height={hp(15)} />

            </Layout>
        </Layout >
    )
}

export default SendScreen

