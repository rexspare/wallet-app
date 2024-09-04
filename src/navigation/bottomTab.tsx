import React from 'react';
import { SCREENS } from '../assets/constants';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TouchableOpacity, View } from 'react-native';
import { HomeActiveIcon, HomeInactiveIcon, RecieveActiveIcon, RecieveInactiveIcon, SendActiveIcon, SendInactiveIcon, SwapActiveIcon, SwapInactiveIcon, } from '../assets/icons';
import { COLORS, FONTS, FONT_SIZE, hp, wp } from '../assets/stylesGuide';
import { BodyText } from '../components';
import { hasNotch, isIOS } from '../utils/myUtils';
import LinearGradient from 'react-native-linear-gradient';
import { DepositScreen, HomeScreen, SendScreen } from '../screens';

const Tab = createBottomTabNavigator()

const BottomStack = () => {

    return (
        <Tab.Navigator screenOptions={{
            headerShown: false,
            tabBarHideOnKeyboard: true,
        }}
            tabBar={props => <CustomTabBar {...props} />}
        >
            <Tab.Screen name={SCREENS.HOME} component={HomeScreen} options={{ title: 'Home' }} />
            <Tab.Screen name={SCREENS.SEND} component={SendScreen} options={{ title: 'Send' }} />
            <Tab.Screen name={SCREENS.DEPOSIT} component={DepositScreen} options={{ title: 'Recieve' }} />
        </Tab.Navigator>
    )
}


const CustomTabBar = ({ state, descriptors, navigation }: any) => {

    const getIcon = (route: string, focused: boolean) => {
        switch (route) {
            case SCREENS.HOME:
                return focused ? <HomeActiveIcon width={hp(4.2)} height={hp(4.2)} /> : <HomeInactiveIcon width={hp(4.2)} height={hp(4.2)} />;
            case SCREENS.SEND:
                return focused ? <SendActiveIcon width={hp(4.2)} height={hp(4.2)} /> : <SendInactiveIcon width={hp(4.2)} height={hp(4.2)} />;
            case SCREENS.DEPOSIT:
                return focused ? <RecieveActiveIcon width={hp(4.2)} height={hp(4.2)} /> : <RecieveInactiveIcon width={hp(4.2)} height={hp(4.2)} />;

            default:
                return focused ? <HomeActiveIcon width={hp(4.2)} height={hp(4.2)} /> : <HomeInactiveIcon width={hp(4.2)} height={hp(4.2)} />;
        }
    }

    return (
        <View
            style={{
                backgroundColor: COLORS.WHITE,
                width: wp(73),
                maxWidth: 300,
                alignSelf: 'center',
                flexDirection: 'row',
                borderRadius: hp(10),
                overflow: 'hidden',
                bottom: (isIOS() && hasNotch()) ? 30 : 15,
                paddingHorizontal: '8%',
                position: 'absolute',
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 1,
                },
                shadowOpacity: 0.20,
                shadowRadius: 1.41,

                elevation: 1,
            }}>
            {state.routes.map((route: any, index: number) => {
                const { options } = descriptors[route.key];
                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name, route.params);
                    }

                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                return (
                    <TouchableOpacity
                        key={index}
                        activeOpacity={0.8}
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={{
                            flex: 1,
                            paddingVertical: 12,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        {getIcon(descriptors[route.key].route.name, isFocused)}

                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

export default BottomStack
