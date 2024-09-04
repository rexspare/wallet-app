import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { Alert, TouchableOpacity, View } from 'react-native'
import { SCREENS } from '../../assets/constants'
import { COLORS, FONT_SIZE, hp } from '../../assets/stylesGuide'
import { BodyText, CommonHeader, EmailDisclaimerModal, ErrorText, If, Label, Layout, PrimaryButton, PrimaryInput, Spacer } from '../../components'
import useAuth from '../../hooks/auth'
import useKeyboard from '../../hooks/Keyboard'
import { passowrdStrength_, validateEmail } from '../../utils/myUtils'
import { styles } from './styles'
import { InfoIcon } from '../../assets/icons'


const SignUpScreen = () => {
    const navigation = useNavigation<any>()
    const { keyboardStatus } = useKeyboard()
    const { onSignUp, isLoading } = useAuth()

    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [confirmPassword, setconfirmPassword] = useState('')
    const [isModalVisible, setisModalVisible] = useState(false)
    const [isSignUpDisclaimerVisible, setisSignUpDisclaimerVisible] = useState(false)


    const isPasswordNotMatched = () => {
        return confirmPassword !== '' && password !== confirmPassword;
    };

    const checkPassStrength = () => {
        return password === '' || passowrdStrength_(password) > 2;
    };

    const checkEmail = () => {
        return email === '' || validateEmail(email);
    };


    const handleSignUp = async () => {
        if (
            email &&
            validateEmail(email) &&
            passowrdStrength_(password) > 2 &&
            password == confirmPassword
        ) {
            setisSignUpDisclaimerVisible(true)
        }
    }

    const handleConfirm = () => {
        setisSignUpDisclaimerVisible(false)
        onSignUp(email, password)
    }


    return (
        <Layout fixed={true}>
            <CommonHeader
                hideRightBtn={true}
            />

            <Layout contentContainerStyle={styles.main}>


                <Label style={styles.title}>{`Let’s get started`}</Label>

                <Spacer height={hp(6)} />

                <PrimaryInput
                    title={<BodyText>Email{'  '}<TouchableOpacity
                        activeOpacity={0.8}
                        hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
                        onPress={() => setisModalVisible(true)}
                    >
                        <InfoIcon
                            width={FONT_SIZE._14}
                            height={FONT_SIZE._14} />
                    </TouchableOpacity></BodyText>}
                    placeholder={`Your Email`}
                    value={email}
                    onChange={(txt) => setemail(txt)}
                    inputContainer={{ ...(!checkEmail() && { borderColor: COLORS.DANGER }) }}
                    keyBoardType={'email-address'}
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
                        title={`Register`}
                        filled={true}
                        onPress={() => handleSignUp()}
                        isLoading={isLoading}
                    />

                    {/* <View style={styles.lineContainer}>
                        <View style={styles.line}></View>
                        <BodyText style={styles.txt1}>Or Register with</BodyText>
                        <View style={styles.line}></View>
                    </View>
                    <PrimaryButton
                        title={`Login with Google`}
                        onPress={() => navigation.navigate(SCREENS.SIGNUP_VERIFICATION)}
                        filled={false}
                        icon={<GoogleIcon width={hp(2.6)} height={hp(2.6)} />}
                        style={styles.googleBtn}
                    /> */}

                    <BodyText style={styles.txt2}>Already have an account? <BodyText
                        style={styles.txt3}
                        onPress={() => navigation.navigate(SCREENS.SIGN_IN)}>Login Now</BodyText></BodyText>

                </View>
            </If>

            <EmailDisclaimerModal
                visible={isModalVisible}
                onclose={() => setisModalVisible(false)}
            />
            <EmailDisclaimerModal
                visible={isSignUpDisclaimerVisible}
                onclose={() => setisSignUpDisclaimerVisible(false)}
                onConfirm={() => handleConfirm()}
            />
        </Layout>
    )
}

export default SignUpScreen
