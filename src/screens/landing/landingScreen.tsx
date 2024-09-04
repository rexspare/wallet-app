import { useNavigation } from '@react-navigation/native'
import React from 'react'
import {
    Image,
    ImageBackground,
    View
} from 'react-native'
import { SCREENS } from '../../assets/constants'
import { IMAGES } from '../../assets/images'
import { BodyText, CommonHeader, PrimaryButton } from '../../components'
import { styles } from './styles'

const LandingScreen = () => {
    const navigation = useNavigation<any>()


    return (
        <ImageBackground
            source={IMAGES.LANDING_BG}
            style={styles.imageBg}
        >

            <CommonHeader
                hideRightBtn={true}
            />

            <View style={styles.context}>
                <View style={styles.logoContainer}>
                    <Image
                        source={IMAGES.LOGO}
                        style={styles.logo}
                    />

                    <BodyText style={styles.logoTxt}>GRADE{'\n'}<BodyText style={styles.walletTxt}>Wallet</BodyText></BodyText>
                </View>
            </View>

            <View style={styles.btnContainer}>
                <PrimaryButton
                    title='Login'
                    onPress={() => navigation.navigate(SCREENS.SIGN_IN)}
                />
                <PrimaryButton
                    title='Register'
                    onPress={() => navigation.navigate(SCREENS.SIGN_UP)}
                    filled={false}
                />
            </View>


        </ImageBackground>
    )
}

export default LandingScreen

