import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { SCREENS } from '../assets/constants';
import { ForgotpasswordScreen, LandingScreen, ResetPasswordScreen, SignInScreen, SignUpScreen, SignUpVerificationScreen } from '../screens';
import PasswordOtp from '../screens/passwordOtp/passwordOtp';

export type InitialNavigationStackParamList = {
    [SCREENS.LANDING]: undefined;
    [SCREENS.SIGN_IN]: undefined;
    [SCREENS.SIGN_UP]: undefined;
    [SCREENS.SIGNUP_VERIFICATION]: undefined;
    [SCREENS.FORGOT_PASSWORD]: undefined;
    [SCREENS.PASSWORD_OTP]: undefined;
    [SCREENS.RESET_PASSWORD]: undefined;
};

const Stack = createNativeStackNavigator<InitialNavigationStackParamList>();


const AuthStack = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false,
            animation: 'fade_from_bottom'
        }}>
            <Stack.Screen name={SCREENS.LANDING} component={LandingScreen} />
            <Stack.Screen name={SCREENS.SIGN_IN} component={SignInScreen} />
            <Stack.Screen name={SCREENS.SIGN_UP} component={SignUpScreen} />
            <Stack.Screen name={SCREENS.SIGNUP_VERIFICATION} component={SignUpVerificationScreen} />
            <Stack.Screen name={SCREENS.FORGOT_PASSWORD} component={ForgotpasswordScreen} />
            <Stack.Screen name={SCREENS.PASSWORD_OTP} component={PasswordOtp} />
            <Stack.Screen name={SCREENS.RESET_PASSWORD} component={ResetPasswordScreen} />

        </Stack.Navigator>
    )
}

export default AuthStack