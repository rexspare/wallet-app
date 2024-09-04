import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { SCREENS } from '../assets/constants';
import BottomStack from './bottomTab';
import { DespositAddressScreen, EditprofileScreen, FaqScreen, NotificationScreen, PolicyScreen, PrivateKeyOtpScreen, PrivateKeyPasswordScreen, PrivateKeyScreen, PrivateKeySuccessScreen, SendAddressScreen, SendDetailScreen, SendOtpScreen, SendScreen, SendSuccessScreen, SettingScreen, TokenDetailScreen, UpdatePasswordOtpScreen, UpdatePasswordScreen } from '../screens';

export type InitialNavigationStackParamList = {
    [SCREENS.BOTTOM]: undefined;
    [SCREENS.TOKEN_DETAIL]: undefined;
    [SCREENS.DEPOSIT_ADDRESS]: undefined;
    [SCREENS.UPDATE_PASSWORD]: undefined;
    [SCREENS.SEND_ADDRESS]: undefined;
    [SCREENS.SEND_DETAIL]: undefined;
    [SCREENS.SEND_OTP]: undefined;
    [SCREENS.SEND_SUCCESS]: undefined;
    [SCREENS.SETTINGS]: undefined;
    [SCREENS.PASSWORD_UPDATE_OTP]: undefined;
    [SCREENS.SUPPORT]: undefined;
    [SCREENS.FAQ]: undefined;
    [SCREENS.EDIT_PROFILE]: undefined;
    [SCREENS.POLICY]: undefined;
    [SCREENS.NOTIFICATION]: undefined;
    [SCREENS.PRIVATE_KEY]: undefined;
    [SCREENS.PRIVATE_KEY_OTP]: undefined;
    [SCREENS.PRIVATE_KEY_PASSWORD]: undefined;
    [SCREENS.PRIVATE_KEY_SUCCESS]: undefined;
};

const Stack = createNativeStackNavigator<InitialNavigationStackParamList>();


const AppStack = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false,
            animation: 'fade_from_bottom'
        }}>
            <Stack.Screen name={SCREENS.BOTTOM} component={BottomStack} />
            <Stack.Screen name={SCREENS.TOKEN_DETAIL} component={TokenDetailScreen} />
            <Stack.Screen name={SCREENS.SEND_ADDRESS} component={SendAddressScreen} />
            <Stack.Screen name={SCREENS.SEND_DETAIL} component={SendDetailScreen} />
            <Stack.Screen name={SCREENS.SEND_OTP} component={SendOtpScreen} />
            <Stack.Screen name={SCREENS.SEND_SUCCESS} component={SendSuccessScreen} />
            <Stack.Screen name={SCREENS.DEPOSIT_ADDRESS} component={DespositAddressScreen} />
            <Stack.Screen name={SCREENS.SETTINGS} component={SettingScreen} />
            <Stack.Screen name={SCREENS.FAQ} component={FaqScreen} />
            <Stack.Screen name={SCREENS.POLICY} component={PolicyScreen} />
            <Stack.Screen name={SCREENS.UPDATE_PASSWORD} component={UpdatePasswordScreen} />
            <Stack.Screen name={SCREENS.PASSWORD_UPDATE_OTP} component={UpdatePasswordOtpScreen} />
            <Stack.Screen name={SCREENS.EDIT_PROFILE} component={EditprofileScreen} />
            <Stack.Screen name={SCREENS.NOTIFICATION} component={NotificationScreen} />
            <Stack.Screen name={SCREENS.PRIVATE_KEY} component={PrivateKeyScreen} />
            <Stack.Screen name={SCREENS.PRIVATE_KEY_OTP} component={PrivateKeyOtpScreen} />
            <Stack.Screen name={SCREENS.PRIVATE_KEY_PASSWORD} component={PrivateKeyPasswordScreen} />
            <Stack.Screen name={SCREENS.PRIVATE_KEY_SUCCESS} component={PrivateKeySuccessScreen} />
        </Stack.Navigator>
    )
}

export default AppStack