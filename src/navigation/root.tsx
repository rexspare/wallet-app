import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { SCREENS } from '../assets/constants';
import AuthStack from './authStack';
import { appStateSelectors, useApp } from '../states/app';
import AppStack from './appStack';
import { OnboardingScreen, SplashScreen } from '../screens';


export type InitialNavigationStackParamList = {
    [SCREENS.SPLASH]: undefined;
    [SCREENS.ONBOARDING]: undefined;
    [SCREENS.MAIN]: undefined;
};

const Stack = createNativeStackNavigator<InitialNavigationStackParamList>();


const linking = {
    prefixes: ['gradewallet://']
  };
  


const Root = () => {
    return (
        <NavigationContainer
        linking={linking}
        >
            <Stack.Navigator screenOptions={{
                headerShown: false,
                animation: 'fade_from_bottom'
            }}>
                <Stack.Screen name={SCREENS.SPLASH} component={SplashScreen} />
                <Stack.Screen name={SCREENS.ONBOARDING} component={OnboardingScreen} />
                <Stack.Screen name={SCREENS.MAIN} component={Main} />

            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Root

export type InitialMainNavigationStackParamList = {
    [SCREENS.AUTH]: undefined;
    [SCREENS.APP]: undefined;
};


const MainStack = createNativeStackNavigator<InitialMainNavigationStackParamList>();

const Main = () => {
    const isAuthenticated = useApp(appStateSelectors.isAuthenticated)


    return (
        <MainStack.Navigator screenOptions={{
            headerShown: false,
            animation: 'slide_from_right'
        }}>
            {
                isAuthenticated == false ?
                    <MainStack.Screen name={SCREENS.AUTH} component={AuthStack} />
                    :
                    <MainStack.Screen name={SCREENS.APP} component={AppStack} />
            }
        </MainStack.Navigator>
    )
}