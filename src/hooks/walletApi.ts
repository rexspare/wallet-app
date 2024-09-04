import { useState } from 'react';
import Toast from 'react-native-toast-message';
import { ALERT_HEADER, ALERT_TYPES, BASE_URL, ROUTES } from '../assets/constants';
import { appStateSelectors, useApp } from '../states/app';
import { useWallet, walletStateSelectors } from '../states/wallet';
import { fixCoinSymbol, getCoinLocalData, getNetwork } from '../utils/myUtils';
import useRefreshToken from './refreshToken';
import { COINS } from '../assets/images';

const useWalletApi = () => {
    const token = useApp(appStateSelectors.token);
    const selectedWalletCoin = useWallet(walletStateSelectors.selectedWalletCoin)
    const setSelectedWalletCoin = useWallet(walletStateSelectors.setSelectedWalletCoin)
    const setCoinList = useWallet(walletStateSelectors.setCoinList)
    const setCoinBalanceList = useWallet(walletStateSelectors.setCoinBalanceList)

    const { refreshToken } = useRefreshToken()

    const [isLoading, setisLoading] = useState(false)

    const getCoinList = async (isRefreshed?: boolean) => {
        try {
            setisLoading(true)
            await getCoinBalanceList()
            const response = await fetch(BASE_URL + ROUTES.COIN_LIST, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token?.access}`
                },
            });

            if (response.status === 200 || response.status === 201) {
                const data = await response.json();
                let mList = data

                const fList = mList.map((x: any) => {

                    if (x?.symbol?.toUpperCase() == "ETHDYDX") {
                        return {
                            ...x,
                            isLocal: true,
                            shortName: x.symbol,
                            gain: 0,
                            isPositive: true,
                            vol: "35,497,897.88",
                            price: 0,
                            value: '≈£1120.73',
                            isCrypto: true,
                            ticker: x.symbol,
                            network: getNetwork('GRADE'),
                            name: "GRADE",
                            symbol: "GRADE",
                            ...getCoinLocalData({ ...x, symbol: "GRADE" })
                        }
                    } else {
                        return {
                            ...x,
                            isLocal: true,
                            shortName: x.symbol,
                            gain: x?.price_change_percentage_1h,
                            isPositive: !x?.price_change_percentage_1h?.includes('-'),
                            vol: "35,497,897.88",
                            price: Number(x.latest_price),
                            value: '≈£1120.73',
                            isCrypto: true,
                            ticker: x.symbol,
                            network: getNetwork(x.symbol),
                            ...getCoinLocalData(x)
                        }
                    }
                })

                const GRADE = {
                    isLocal: true,
                    shortName: 'GRADE',
                    gain: 0,
                    isPositive: true,
                    vol: "301",
                    price: 81,
                    value: '≈£1120.73',
                    isCrypto: true,
                    ticker: 'GRADE',
                    network: getNetwork('GRADE'),
                    name: "GRADE",
                    symbol: "GRADE",
                    icon: COINS.GRADE,
                }

                setCoinList([...fList, GRADE])
                setisLoading(false)
            } else if (response.status === 401) {
                if (isRefreshed != true) {
                    const result = await refreshToken()
                    if (result == true) {
                        getCoinList(true)
                    }
                } else {
                    setisLoading(false)
                    showToast(undefined, false)
                }
            } else {
                setisLoading(false)
                const data = await response.json();
                showToast(data, false)
            }
        } catch (error) {
            setisLoading(false)
            showToast(undefined, false)
        }
    }

    const getCoinBalanceList = async (isRefreshed?: boolean) => {
        try {

            const response = await fetch(BASE_URL + ROUTES.USER_COIN_BALANCE, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token?.access}`
                },
            });


            if (response.status === 200 || response.status === 201) {
                const data = await response.json();
                setCoinBalanceList(data)
            } else if (response.status === 401) {
                if (isRefreshed != true) {
                    const result = await refreshToken()
                    if (result == true) {
                        getCoinBalanceList(true)
                    }
                } else {
                    showToast(undefined, false)
                }
            } else {
                const data = await response.json();
                showToast(data, false)
            }
        } catch (error) {
            showToast(undefined, false)
        }
    }

    const getWalletAddress = async (setter: any = () => { }, isRefreshed?: boolean) => {
        try {
            setisLoading(true)

            const response = await fetch(BASE_URL + ROUTES.GET_WALLET, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token?.access}`
                },
                body: JSON.stringify({
                    network: fixCoinSymbol(selectedWalletCoin?.symbol)?.toUpperCase()
                }),
            });

            if (response.status === 200 || response.status === 201) {
                const data = await response.json();
                setter(data)
                setisLoading(false)
            } else if (response.status === 401) {
                if (isRefreshed != true) {
                    const result = await refreshToken()
                    if (result == true) {
                        getWalletAddress(setter, true)
                    }
                } else {
                    setisLoading(false)
                    showToast(undefined, false)
                }
            } else {
                setisLoading(false)
                const data = await response.json();
                showToast(data, false)
            }
        } catch (error) {
            setisLoading(false)
            showToast(undefined, false)
        }
    }

    const getCoinTransactions = async (coin: string, callback: any = () => { }, isRefreshed?: boolean) => {
        try {
            setisLoading(true)
            const response = await fetch(BASE_URL + ROUTES.TRANSACTION_HISTORY + coin, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token?.access}`
                },
            });

            if (response.status === 200 || response.status === 201) {
                const responseData = await response.json();
                const fiatSwapList = responseData?.fiat_swap?.map((x) => {
                    return {
                        ...x,
                        transaction_type: "Convert",
                        created_at: x.transaction_date
                    }
                })
                const mergedArray = [
                    ...responseData.transactions.map((x: any) => { return { ...x, type: x?.transaction_type } }),
                ];

                mergedArray.sort((a, b) => {
                    return new Date(b.created_at) - new Date(a.created_at);
                });
                setisLoading(false)
                callback(mergedArray)
            } else if (response.status === 401) {
                if (isRefreshed != true) {
                    const result = await refreshToken()
                    if (result == true) {
                        getCoinTransactions(coin, callback, true)
                    }
                } else {
                    showToast(undefined, false)
                    setisLoading(false)
                }
            } else {
                const data = await response.json();
                showToast(data, false)
                setisLoading(false)
            }
        } catch (error) {
            showToast(undefined, false)
            setisLoading(false)
        }
    }

    const showToast = (data: any = {}, isSuccess: boolean) => {
        Toast.show({
            type: isSuccess ? ALERT_TYPES.SUCCESS : ALERT_TYPES.WARNING,
            text1: isSuccess ? ALERT_HEADER.SUCCESS : ALERT_HEADER.DANGER,
            text2: data?.message || data?.error || "An Error occured please try again!",
        });
    }


    return {
        isLoading,
        getCoinList,
        getCoinBalanceList,
        getWalletAddress,
        getCoinTransactions
    };
};

export default useWalletApi;
