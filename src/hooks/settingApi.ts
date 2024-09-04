import Toast from 'react-native-toast-message';
import { ALERT_HEADER, ALERT_TYPES, BASE_URL, ROUTES, SCREENS } from '../assets/constants';
import { appStateSelectors, useApp } from '../states/app';
import useAuth from './auth';
import { useState } from 'react';
import { useNavigation, CommonActions } from '@react-navigation/native';
import useRefreshToken from './refreshToken';
import useWalletApi from './walletApi';

const useSettingApi = () => {
    const user = useApp(appStateSelectors.user);
    const setUser = useApp(appStateSelectors.setUser);
    const { onLogout } = useAuth()
    const token = useApp(appStateSelectors.token);
    const navigation = useNavigation()
    const [isLoading, setisLoading] = useState(false)
    const { refreshToken } = useRefreshToken()
    const { getCoinList } = useWalletApi()


    const changeBaseCurrency = async (code: string, isRefreshed?: boolean) => {
        try {
            setisLoading(true)
            const response = await fetch(BASE_URL + ROUTES.CHANGE_BASE_CURRENCY, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token?.access}`
                },
                body: JSON.stringify({
                    new_base_currency: code?.toLowerCase()
                }),
            });

            if (response.status == 200 || response.status == 201) {
                const responseData = await response.json();
                setUser({
                    ...user,
                    base_currency: code?.toLowerCase()
                })
                await getCoinList()
                showToast(responseData, true)
                setisLoading(false)

            } else if (response.status === 401) {
                if (isRefreshed != true) {
                    const result = await refreshToken()
                    if (result == true) {
                        changeBaseCurrency(code, true)
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


    const passwordUpdateOtp = async (callback = () => { }, isRefreshed?: boolean) => {
        try {
            setisLoading(true)
            const response = await fetch(BASE_URL + ROUTES.VERIFY_EMAIL_SETTING, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token?.access}`
                },
                body: JSON.stringify({
                    otp_type: "reset_password"
                })
            });

            if (response.status == 200 || response.status == 201) {
                const responseData = await response.json();
                callback()
                showToast(responseData, true)
                setisLoading(false)

            } else if (response.status === 401) {
                if (isRefreshed != true) {
                    const result = await refreshToken()
                    if (result == true) {
                        passwordUpdateOtp(callback, true)
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

    const passwordUpdate = async (data: any, isRefreshed?: boolean) => {
        try {
            setisLoading(true)
            const response = await fetch(BASE_URL + ROUTES.UPUDATE_PASSWORD_SETTING, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token?.access}`
                },
                body: data
            });

            if (response.status == 200 || response.status == 201) {
                const responseData = await response.json();
                showToast(responseData, true)
                setisLoading(false)
                onLogout()
            } else if (response.status === 401) {
                if (isRefreshed != true) {
                    const result = await refreshToken()
                    if (result == true) {
                        passwordUpdate(data, true)
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

    const getAuthenticator = async (callback: any = () => { }, isRefreshed?: boolean) => {
        try {
            setisLoading(true)
            const response = await fetch(BASE_URL + ROUTES.TOTP_SETUP, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token?.access}`
                },
            });

            if (response.status == 200 || response.status == 201) {
                const responseData = await response.json();
                showToast(responseData, true)
                callback(responseData)
                setUser({
                    ...user,
                    is_totp: true
                })
                setisLoading(false)

            } else if (response.status === 401) {
                if (isRefreshed != true) {
                    const result = await refreshToken()
                    if (result == true) {
                        getAuthenticator(callback, true)
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

    const verifyAuthenticator = async (code: any, callBack = () => { }, isRefreshed?: boolean) => {
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
                        verifyAuthenticator(code, callBack, true)
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


    const showToast = (data: any = {}, isSuccess: boolean) => {
        Toast.show({
            type: isSuccess ? ALERT_TYPES.SUCCESS : ALERT_TYPES.WARNING,
            text1: isSuccess ? ALERT_HEADER.SUCCESS : ALERT_HEADER.DANGER,
            text2: data?.message || data?.error || "An Error occured please try again!",
        });
    }

    return {
        changeBaseCurrency,
        passwordUpdateOtp,
        passwordUpdate,
        getAuthenticator,
        verifyAuthenticator,
        isLoading,

    };
};

export default useSettingApi;
