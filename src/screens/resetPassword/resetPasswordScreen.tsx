import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useState } from 'react'
import { View } from 'react-native'
import { COLORS, hp } from '../../assets/stylesGuide'
import { CommonHeader, ErrorText, If, Label, Layout, PrimaryButton, PrimaryInput, Spacer } from '../../components'
import useAuth from '../../hooks/auth'
import useKeyboard from '../../hooks/Keyboard'
import { appStateSelectors, useApp } from '../../states/app'
import { passowrdStrength_ } from '../../utils/myUtils'
import { styles } from './styles'


const ResetPasswordScreen = () => {
    const navigation = useNavigation<any>()
    const route = useRoute<any>()
    const { keyboardStatus } = useKeyboard()
    const { onUpdatePassword, isLoading } = useAuth()
    const setAuthenticated = useApp(appStateSelectors.setAuthenticated)
    const [password, setpassword] = useState('')
    const [confirmPassword, setconfirmPassword] = useState('')


    const isPasswordNotMatched = () => {
        return confirmPassword !== '' && password !== confirmPassword;
    };

    const checkPassStrength = () => {
        return password === '' || passowrdStrength_(password) > 2;
    };


    const updatepassword = () => {

        if (
            route?.params?.email &&
            password &&
            passowrdStrength_(password) > 2 &&
            password == confirmPassword
        ) {
            onUpdatePassword(route?.params?.email, password)
        }
    }


    return (
        <Layout fixed={true}>
            <CommonHeader
                hideRightBtn={true}
            />

            <Layout contentContainerStyle={styles.main}>


                <Label style={styles.title}>{`Reset Your Password`}</Label>

                <Spacer height={hp(6)} />


                <PrimaryInput
                    title={`Password`}
                    placeholder={`Your Password`}
                    value={password}
                    onChange={(txt) => setpassword(txt)}
                    isPassword={true}
                    showPasswordStrenght={true}
                    titleStyles={{ marginTop: hp(1) }}
                    inputContainer={{ ...(!checkPassStrength() && { borderColor: COLORS.DANGER }) }}
                />

                {
                    !checkPassStrength() && <ErrorText>Please choose a stronger password with at least 10 characters, including uppercase, lowercase, numbers, and special symbols</ErrorText>
                }


                <PrimaryInput
                    title={`Confirm Password`}
                    placeholder={`Retype Password`}
                    value={confirmPassword}
                    onChange={(txt) => setconfirmPassword(txt)}
                    isPassword={true}
                    showPasswordStrenght={true}
                    titleStyles={{ marginTop: hp(1) }}
                    inputContainer={{ ...(isPasswordNotMatched() && { borderColor: COLORS.DANGER }) }}
                />

                {
                    isPasswordNotMatched() && <ErrorText >Passwords do match</ErrorText>
                }

            </Layout>

            <If condition={!keyboardStatus}>

                <View style={styles.btnContainer}>

                    <PrimaryButton
                        title={`Reset`}
                        onPress={() => updatepassword()}
                        filled={true}
                        isLoading={isLoading}
                    />

                </View>
            </If>

        </Layout>
    )
}

export default ResetPasswordScreen
