import Toast from 'react-native-toast-message';
import { ALERT_HEADER, ALERT_TYPES, BASE_URL, ROUTES, SCREENS } from '../assets/constants';
import { appStateSelectors, useApp } from '../states/app';
import useAuth from './auth';
import { useState } from 'react';
import { useNavigation, CommonActions } from '@react-navigation/native';
import useRefreshToken from './refreshToken';
import useWalletApi from './walletApi';
import { fixCoinSymbol } from '../utils/myUtils';

const usePrivateKeyApi = () => {
    const user = useApp(appStateSelectors.user);
    const setUser = useApp(appStateSelectors.setUser);
    const token = useApp(appStateSelectors.token);
    const navigation = useNavigation()
    const [isLoading, setisLoading] = useState(false)
    const { refreshToken } = useRefreshToken()

    const getPrivateKeyOtp = async (callBack = () => { }, isRefreshed?: boolean) => {
        try {
            setisLoading(true)
            const response = await fetch(BASE_URL + ROUTES.PRIVATE_KEY_OTP, {
                method: 'POST',
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
                        getPrivateKeyOtp(callBack, true)
                    }
                } else {
                    setisLoading(false)
                    showToast(undefined, false)
                }
            } else {
                setisLoading(false)
                const data = await response.json();
                console.log(data);
                showToast(data, false)
            }
        } catch (error) {
            setisLoading(false)
            showToast(undefined, false)
        }
    }

    const verifyPrivateKeyOtp = async (otp: string, callBack = () => { }, isRefreshed?: boolean) => {
        try {
            setisLoading(true)
            const response = await fetch(BASE_URL + ROUTES.PRIVATE_KEY_OTP_VERIFY, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token?.access}`
                },
                body: JSON.stringify({
                    otp_code: otp,
                }),
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
                        verifyPrivateKeyOtp(otp, callBack, true)
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

    const verifyPrivateKeyPassword = async (password: string, callBack = () => { }, isRefreshed?: boolean) => {
        try {
            setisLoading(true)
            const response = await fetch(BASE_URL + ROUTES.PRIVATE_KEY_OTP_PASSWORD, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token?.access}`
                },
                body: JSON.stringify({
                    password: password,
                }),
            });

            if (response.status === 200 || response.status === 201) {
                const data = await response.json();
                callBack()
            } else if (response.status === 401) {
                if (isRefreshed != true) {
                    const result = await refreshToken()
                    if (result == true) {
                        verifyPrivateKeyPassword(password, callBack, true)
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



    const getPirvateKey = async (asset: any, isRefreshed?: boolean) => {
        return new Promise(async (resolve, reject) => {
            try {
                setisLoading(true)
                const response = await fetch(BASE_URL + ROUTES.PRIVATE_KEY_GET, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token?.access}`
                    },
                    body: JSON.stringify({
                        network_name: asset.symbol
                    }),
                });

                if (response.status == 200 || response.status == 201) {
                    const responseData = await response.json();
                    setisLoading(false)
                    resolve(responseData)

                } else if (response.status === 401) {
                    if (isRefreshed != true) {
                        const result = await refreshToken()
                        if (result == true) {
                            const res = await getPirvateKey(asset, true)
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
        getPrivateKeyOtp,
        verifyPrivateKeyOtp,
        verifyPrivateKeyPassword,
        getPirvateKey,
        isLoading,

    };
};

export default usePrivateKeyApi;
