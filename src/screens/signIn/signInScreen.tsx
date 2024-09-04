import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { View } from 'react-native'
import { SCREENS } from '../../assets/constants'
import { COLORS, hp } from '../../assets/stylesGuide'
import { BodyText, CommonHeader, ErrorText, If, Label, Layout, PrimaryButton, PrimaryInput, Spacer, TextButton } from '../../components'
import useKeyboard from '../../hooks/Keyboard'
import useAuth from '../../hooks/auth'
import { appStateSelectors, useApp } from '../../states/app'
import { passowrdStrength_, validateEmail } from '../../utils/myUtils'
import { styles } from './styles'


const SignInScreen = () => {
    const navigation = useNavigation<any>()
    const { keyboardStatus } = useKeyboard()
    const { onSignIn, isLoading } = useAuth()
    const setAuthenticated = useApp(appStateSelectors.setAuthenticated)
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    // const [email, setemail] = useState('hamzazafarrc@gmail.com')
    // const [password, setpassword] = useState('Hamza123@@')
    // const [password, setpassword] = useState('User@12345');
    // const [email, setemail] = useState('saimaliabrish@gmail.com');


    const checkPassStrength = () => {
        return password === '' || passowrdStrength_(password) > 2;
    };

    const checkEmail = () => {
        return email === '' || validateEmail(email);
    };

    const handleSignin = async () => {
        if (email && password && checkEmail()) {
            onSignIn(email, password)
        }
    }


    return (
        <Layout fixed={true}>
            <CommonHeader
                hideRightBtn={true}
            />

            <Layout contentContainerStyle={styles.main}>


                <Label style={styles.title}>{`Welcome to Grade App`}</Label>

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

                <PrimaryInput
                    title={`Password`}
                    placeholder={`Your Password`}
                    value={password}
                    onChange={(txt) => setpassword(txt)}
                    isPassword={true}
                    showPasswordStrenght={true}
                    titleStyles={{ marginTop: hp(1) }}
                />

                <View style={styles.rowMain}>
                    <TextButton
                        title={`Forgot Password?`}
                        textStyle={styles.txtBtn}
                        onPress={() => navigation.navigate(SCREENS.FORGOT_PASSWORD)}
                    />
                </View>



            </Layout>

            <If condition={!keyboardStatus}>

                <View style={styles.btnContainer}>

                    <PrimaryButton
                        title={`Login`}
                        onPress={() => handleSignin()}
                        filled={true}
                        isLoading={isLoading}
                    />

                    {/* <View style={styles.lineContainer}>
                        <View style={styles.line}></View>
                        <BodyText style={styles.txt1}>Or Login with</BodyText>
                        <View style={styles.line}></View>
                    </View>
                    <PrimaryButton
                        title={`Login with Google`}
                        onPress={() => setAuthenticated(true, "TOKEN")}
                        filled={false}
                        icon={<GoogleIcon width={hp(2.6)} height={hp(2.6)} />}
                        style={styles.googleBtn}
                    /> */}

                    <BodyText style={styles.txt2}>Don’t have an account? <BodyText
                        style={styles.txt3}
                        onPress={() => navigation.navigate(SCREENS.SIGN_UP)}>Register Now</BodyText></BodyText>

                </View>
            </If>

        </Layout>
    )
}

export default SignInScreen
