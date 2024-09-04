import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { View } from 'react-native'
import { SCREENS } from '../../assets/constants'
import { COLORS, hp } from '../../assets/stylesGuide'
import { CommonHeader, ErrorText, Label, Layout, PrimaryButton, PrimaryInput, Spacer } from '../../components'
import useAuth from '../../hooks/auth'
import useKeyboard from '../../hooks/Keyboard'
import { validateEmail } from '../../utils/myUtils'
import { styles } from './styles'

const ForgotpasswordScreen = () => {
    const navigation = useNavigation<any>()
    const { keyboardStatus } = useKeyboard()
    const { onResetPasswordRequest, isLoading } = useAuth()
    const [email, setemail] = useState('')


    const checkEmail = () => {
        return email === '' || validateEmail(email);
    };


    const handleRequestOtp = async () => {
        if (checkEmail() && email) {
            onResetPasswordRequest(email, () => navigation.navigate(SCREENS.PASSWORD_OTP, { email }))
        }
    }

    return (
        <Layout fixed={true}>
            <CommonHeader
                hideRightBtn={true}
            />

            <Layout contentContainerStyle={styles.main}>


                <Label style={styles.title}>{`Forgot Password! `}</Label>

                <Spacer height={hp(6)} />

                <PrimaryInput
                    title={`Email`}
                    placeholder={`Your Email`}
                    value={email}
                    onChange={(txt) => setemail(txt)}
                    inputContainer={{ ...(!checkEmail() && { borderColor: COLORS.DANGER }) }}
                />
                {
                    !checkEmail() && <ErrorText>Please enter a valid email</ErrorText>
                }


                <View style={styles.btnContainer}>

                    <PrimaryButton
                        title={`Next`}
                        filled={true}
                        onPress={() => handleRequestOtp()}
                        isLoading={isLoading}
                    />

                </View>


            </Layout>

        </Layout>
    )
}

export default ForgotpasswordScreen
