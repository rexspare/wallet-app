import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import {
    View
} from 'react-native'
import Collapsible from 'react-native-collapsible'
import { SCREENS } from '../../assets/constants'
import { SearchIcon } from '../../assets/icons'
import { COLORS, hp } from '../../assets/stylesGuide'
import { BodyText, CommonHeader, Layout, PrimaryInput, Spacer } from '../../components'
import DespositCoinItem from '../../components/listItems/depositCoinItem'
import { useWallet, walletStateSelectors } from '../../states/wallet'
import { sortCoinsList } from '../../utils/myUtils'
import { styles } from './styles'

const DepositScreen = () => {
    const navigation = useNavigation<any>()
    const selectedWalletCoin = useWallet(walletStateSelectors.selectedWalletCoin)
    const setSelectedWalletCoin = useWallet(walletStateSelectors.setSelectedWalletCoin)
    const COINSLIST = useWallet(walletStateSelectors.coinList)
    const [selectedType, setselectedType] = useState('All')

    const [isSearching, setisSearching] = useState(false)
    const [searchVal, setsearchVal] = useState<string>('')

    const filteredDataSource = () => {
        const txt = searchVal?.toUpperCase()
        return searchVal ?
            COINSLIST?.filter((coin) => coin?.name?.toUpperCase()?.includes(txt) || coin?.symbol?.toUpperCase()?.includes(txt))
            :
            COINSLIST
    }

    const handleContinue = (item: any) => {
        setSelectedWalletCoin(item)
        navigation.navigate(SCREENS.DEPOSIT_ADDRESS)
    }

    return (
        <Layout fixed={true} >
            <CommonHeader
                title={'Receive Crypto'}
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
                                <DespositCoinItem
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

export default DepositScreen

