import Toast from 'react-native-toast-message';
import { ALERT_HEADER, ALERT_TYPES, ROUTES } from '../assets/constants';
import { appStateSelectors, useApp } from '../states/app';
import useAuth from './auth';

const useRefreshToken = () => {
    const setAuthenticated = useApp(appStateSelectors.setAuthenticated);
    const token = useApp(appStateSelectors.token);
    const { onLogout } = useAuth()

    const refreshToken = async () => {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(false)
                Toast.show({
                    type: ALERT_TYPES.WARNING,
                    text1: ALERT_HEADER.DANGER,
                    text2: "Session Expired! Please login again",
                });
                onLogout()
            } catch (error) {
                resolve(false)
                Toast.show({
                    type: ALERT_TYPES.WARNING,
                    text1: ALERT_HEADER.DANGER,
                    text2: "Session Expired! Please login again",
                });
                onLogout()
            }
        })
    }

    return {
        refreshToken
    };
};

export default useRefreshToken;
