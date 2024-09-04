import Toast from 'react-native-toast-message';
import { ALERT_HEADER, ALERT_TYPES, BASE_URL, ROUTES, SCREENS } from '../assets/constants';
import { appStateSelectors, useApp } from '../states/app';
import useAuth from './auth';
import { useState } from 'react';
import { useNavigation, CommonActions } from '@react-navigation/native';
import useRefreshToken from './refreshToken';
import useWalletApi from './walletApi';
import { fixCoinSymbol } from '../utils/myUtils';

const useSendApi = () => {
    const user = useApp(appStateSelectors.user);
    const setUser = useApp(appStateSelectors.setUser);
    const token = useApp(appStateSelectors.token);
    const navigation = useNavigation()
    const [isLoading, setisLoading] = useState(false)
    const { refreshToken } = useRefreshToken()
    const { getCoinList, getCoinBalanceList } = useWalletApi()

    const getSendOtp = async (callBack = () => { }, isRefreshed?: boolean) => {
        try {
            setisLoading(true)
            const response = await fetch(BASE_URL + ROUTES.SEND_OTP, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token?.access}`
                },
            });

            if (response.status === 200 || response.status === 201) {
                const data = await response.json();
                showToast(data, true)
                setisLoading(false)
                callBack()
            } else if (response.status === 401) {
                if (isRefreshed != true) {
                    const result = await refreshToken()
                    if (result == true) {
                        getSendOtp(callBack, true)
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

    const verifySendOtp = async (otp: string, callBack = () => { }, isRefreshed?: boolean) => {
        try {
            setisLoading(true)
            const response = await fetch(BASE_URL + ROUTES.SEND_OTP, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token?.access}`
                },
                body: JSON.stringify({
                    otp_code: otp,
                }),
            });

            console.log({ verifySendOtp: response });


            if (response.status === 200 || response.status === 201) {
                const data = await response.json();
                showToast(data, true)
                callBack()
            } else if (response.status === 401) {
                if (isRefreshed != true) {
                    const result = await refreshToken()
                    if (result == true) {
                        verifySendOtp(otp, callBack, true)
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
            setisLoading(false)
        } catch (error) {
            setisLoading(false)
            showToast(undefined, false)
        }
    }

    const verifyTotp = async (code: any, callBack = () => { }, isRefreshed?: boolean) => {
        try {
            setisLoading(true)
            const response = await fetch(BASE_URL + ROUTES.TOTP_VERIFY, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token?.access}`
                },
                body: JSON.stringify({
                    otp: code
                }),
            });

            if (response.status == 200 || response.status == 201) {
                const responseData = await response.json();
                showToast(responseData, true)
                callBack()
                setisLoading(false)
            } else if (response.status === 401) {
                if (isRefreshed != true) {
                    const result = await refreshToken()
                    if (result == true) {
                        verifyTotp(code, callBack, true)
                    }
                } else {
                    const responseData = await response.json();
                    setisLoading(false)
                    showToast(responseData, false)
                }
            } else {
                const responseData = await response.json();
                setisLoading(false)
                showToast(responseData, false)
            }

        } catch (error) {
            setisLoading(false)
            console.log({ error });
            showToast(undefined, false)
        }
    }


    const send = async (asset: any, address: any, amount: string | number, memo: string | number, isRefreshed?: boolean) => {
        return new Promise(async (resolve, reject) => {
            try {
                setisLoading(true)
                let body: any = {
                    to_address: address,
                    amount: Number(amount),
                    currency: asset.symbol
                }

                if (memo) {
                    body = { ...body, memo: memo }
                }
                const response = await fetch(BASE_URL + ROUTES.SEND, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token?.access}`
                    },
                    body: JSON.stringify(body),
                });
                console.log({ send: response });

                if (response.status == 200 || response.status == 201) {
                    const responseData = await response.json();
                    await getCoinBalanceList()
                    setisLoading(false)
                    resolve(responseData)

                } else if (response.status === 401) {
                    if (isRefreshed != true) {
                        const result = await refreshToken()
                        if (result == true) {
                            const res = await send(asset, address, amount, memo, true)
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
                setisLoading(false)
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

    const getGasFee = async (network: String, callBack = (fee: any) => { }, isRefreshed?: boolean) => {
        try {
            setisLoading(true)
            const response = await fetch(BASE_URL + ROUTES.GET_GAS_FEE, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token?.access}`
                },
                body: JSON.stringify({
                    network: network
                }),
            });

            if (response.status == 200 || response.status == 201) {
                const responseData = await response.json();
                callBack(responseData?.max_gas_cost)
                setisLoading(false)
            } else if (response.status === 401) {
                if (isRefreshed != true) {
                    const result = await refreshToken()
                    if (result == true) {
                        getGasFee(network, callBack, true)
                    }
                } else {
                    const responseData = await response.json();
                    setisLoading(false)
                    showToast(responseData, false)
                }
            } else {
                const responseData = await response.json();
                setisLoading(false)
                showToast(responseData, false)
            }

        } catch (error) {
            setisLoading(false)
            console.log({ error });
            showToast(undefined, false)
        }
    }

    return {
        getSendOtp,
        verifySendOtp,
        verifyTotp,
        send,
        getGasFee,
        isLoading,

    };
};

export default useSendApi;
