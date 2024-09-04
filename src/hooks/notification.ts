import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import Toast from 'react-native-toast-message';
import { ALERT_HEADER, ALERT_TYPES, BASE_URL, ROUTES } from '../assets/constants';
import { appStateSelectors, useApp } from '../states/app';
import useRefreshToken from './refreshToken';

const useNotification = () => {
    const notifications = useApp(appStateSelectors.notifications);
    const setNotifications = useApp(appStateSelectors.setNotifications);
    const token = useApp(appStateSelectors.token);
    const navigation = useNavigation()
    const [isLoading, setisLoading] = useState(false)
    const { refreshToken } = useRefreshToken()


    const getNotificationTransactions = async (isRefreshed?: boolean) => {
        try {
            const response = await fetch(BASE_URL + ROUTES.NOTIFICATION_TRANSACTIONS, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token?.access}`
                },
            });

            if (response.status === 200 || response.status === 201) {
                const data = await response.json();
                setNotifications(data)
            } else if (response.status === 401) {
                if (isRefreshed != true) {
                    const result = await refreshToken()
                    if (result == true) {
                        await getNotificationTransactions(true)
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

    const getNotificationDetail = async (id: String, callBack = (data: any) => { }, isRefreshed?: boolean) => {
        try {
            setisLoading(true)
            const response = await fetch(`${BASE_URL}${ROUTES.NOTIFICATION_DETAILS}${id}/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token?.access}`
                },
            });

            if (response.status == 200 || response.status == 201) {
                const responseData = await response.json();
                callBack(responseData)
                setisLoading(false)
            } else if (response.status === 401) {
                if (isRefreshed != true) {
                    const result = await refreshToken()
                    if (result == true) {
                        getNotificationDetail(id, callBack, true)
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

    const markNotificationAsRead = async (id: String, isRefreshed?: boolean) => {
        try {
            const response = await fetch(`https://gradepp.com/api/v1/notifications/${id}/mark_as_read/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token?.access}`
                },
            });

            const mData = notifications.map((item) => {
                return {
                    ...item,
                    ...(item?.id == id && { has_read: true })
                }
            })

            setNotifications(mData)

            if (response.status == 200 || response.status == 201) {
                const responseData = await response.json();

            } else if (response.status === 401) {
                if (isRefreshed != true) {
                    const result = await refreshToken()
                    if (result == true) {
                        markNotificationAsRead(id, true)
                    }
                } else {
                    const responseData = await response.json();
                    showToast(responseData, false)
                }
            } else {
                const responseData = await response.json();
                showToast(responseData, false)
            }

        } catch (error) {
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
        getNotificationTransactions,
        getNotificationDetail,
        markNotificationAsRead,
        isLoading,

    };
};

export default useNotification;
