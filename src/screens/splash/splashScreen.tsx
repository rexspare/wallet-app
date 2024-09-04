import { useNavigation } from '@react-navigation/native'
import React, { useEffect } from 'react'
import {
    Image,
    View
} from 'react-native'
import { IMAGES } from '../../assets/images'
import { BodyText, Layout } from '../../components'
import { styles } from './styles'
import { ASYNC_KEYS, SCREENS } from '../../assets/constants'
import { getItem } from '../../services/asyncStorage'

const SplashScreen = () => {
    const navigation = useNavigation<any>()

    useEffect(() => {
        setTimeout(() => {
            handleNavigation()
        }, 2000);
    }, []);

    const handleNavigation = async () => {
        try {
            const res = await getItem(ASYNC_KEYS.ONBOARDING, false)
            if (res == false) {
                navigation.replace(SCREENS.ONBOARDING)
            } else {
                navigation.replace(SCREENS.MAIN)
            }
        } catch (error) {
            navigation.replace(SCREENS.ONBOARDING)
        }
    }


    return (
        <Layout fixed={true} containerStyle={styles.main}>

            <View style={styles.logoContainer}>
                <Image
                    source={IMAGES.LOGO}
                    style={styles.logo}
                />

                <BodyText style={styles.logoTxt}>GRADE{'\n'}<BodyText style={styles.walletTxt}>Wallet</BodyText></BodyText>
            </View>

        </Layout>
    )
}

export default SplashScreen

