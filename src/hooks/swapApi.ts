import Toast from 'react-native-toast-message';
import { ALERT_HEADER, ALERT_TYPES, BASE_URL, ROUTES, SCREENS } from '../assets/constants';
import { appStateSelectors, useApp } from '../states/app';
import useAuth from './auth';
import { useState } from 'react';
import { useNavigation, CommonActions } from '@react-navigation/native';
import useRefreshToken from './refreshToken';
import useWalletApi from './walletApi';
import { fixCoinSymbol } from '../utils/myUtils';

const useSwapApi = () => {
    const user = useApp(appStateSelectors.user);
    const setUser = useApp(appStateSelectors.setUser);
    const token = useApp(appStateSelectors.token);
    const navigation = useNavigation()
    const [isLoading, setisLoading] = useState(false)
    const { refreshToken } = useRefreshToken()
    const { getCoinList } = useWalletApi()


    const getConvertAmount = async (send_: any, receive_: any, sendAmount: string | number, isRefreshed?: boolean) => {
        return new Promise(async (resolve, reject) => {
            try {
                setisLoading(true)
                const response = await fetch(BASE_URL + ROUTES.CONVERTED_AMOUNT, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token?.access}`
                    },
                    body: JSON.stringify({
                        source_network: fixCoinSymbol(send_.symbol),
                        target_network: fixCoinSymbol(receive_.symbol),
                        source_amount: sendAmount
                    }),
                });
                setisLoading(false)
                if (response.status == 200 || response.status == 201) {
                    const responseData = await response.json();
                    resolve(responseData)

                } else if (response.status === 401) {
                    if (isRefreshed != true) {
                        const result = await refreshToken()
                        if (result == true) {
                            const res = await getConvertAmount(send_, receive_, sendAmount, true)
                            resolve(res)
                        }
                    } else {
                        const responseData = await response.json();
                        showToast(responseData, false)
                        resolve(false)
                    }
                } else {
                    const responseData = await response.json();
                    showToast(responseData, false)
                    resolve(false)
                }

            } catch (error) {
                setisLoading(false)
                console.log({ error });
                showToast(undefined, false)
                resolve(false)
            }
        })
    }


    const swap = async (send: any, receive: any, sendAmount: string | number, isRefreshed?: boolean) => {
        return new Promise(async (resolve, reject) => {
            try {
                setisLoading(true)
                const response = await fetch(BASE_URL + ROUTES.SWAP, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token?.access}`
                    },
                    body: JSON.stringify({
                        source_network: fixCoinSymbol(send.symbol),
                        target_network: fixCoinSymbol(receive.symbol),
                        source_amount: Number(sendAmount).toString()
                    }),
                });
            
                if (response.status == 200 || response.status == 201) {
                    setisLoading(false)
                    resolve(true)

                } else if (response.status === 401) {
                    if (isRefreshed != true) {
                        const result = await refreshToken()
                        if (result == true) {
                            const res = await swap(send, receive, sendAmount, true)
                            resolve(res)
                        }
                    } else {
                        const responseData = await response.json();
                        showToast(responseData, false)
                        setisLoading(false)
                        resolve(false)
                    }
                } else {
                    const responseData = await response.json();
                    showToast(responseData, false)
                    setisLoading(false)
                    resolve(false)
                }

            } catch (error) {
                setisLoading(false)
                console.log({ error });
                showToast(undefined, false)
                resolve(false)
            }
        })
    }

    const showToast = (data: any = {}, isSuccess: boolean) => {
        Toast.show({
            type: isSuccess ? ALERT_TYPES.SUCCESS : ALERT_TYPES.WARNING,
            text1: isSuccess ? ALERT_HEADER.SUCCESS : ALERT_HEADER.DANGER,
            text2: data?.message || data?.error || "An Error occured please try again!",
        });
    }

    return {
        getConvertAmount,
        swap,
        isLoading,

    };
};

export default useSwapApi;
