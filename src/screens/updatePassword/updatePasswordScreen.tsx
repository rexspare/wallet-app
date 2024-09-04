import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { View } from 'react-native'
import { SCREENS } from '../../assets/constants'
import { COLORS, hp } from '../../assets/stylesGuide'
import { BodyText, CommonHeader, ErrorText, If, Layout, PrimaryButton, PrimaryInput, Spacer } from '../../components'
import useKeyboard from '../../hooks/Keyboard'
import useSettingApi from '../../hooks/settingApi'
import { passowrdStrength_ } from '../../utils/myUtils'
import { styles } from './styles'

const UpdatePasswordScreen = () => {
    const navigation = useNavigation<any>()
    const { keyboardStatus } = useKeyboard()
    const { passwordUpdateOtp, isLoading } = useSettingApi()
    const [currentPassword, setcurrentPassword] = useState('')
    const [newPassword, setnewPassword] = useState('')
    const [confirmPassword, setconfirmPassword] = useState('')

    const isPasswordNotMatched = () => {
        return confirmPassword !== '' && newPassword !== confirmPassword;
    };

    const checkPassStrength = () => {
        return newPassword === '' || passowrdStrength_(newPassword) > 2;
    };

    const handleContinue = () => {
        if (
            newPassword &&
            passowrdStrength_(newPassword) > 2 &&
            newPassword == confirmPassword
        ) {
            passwordUpdateOtp(() => {
                navigation.navigate(SCREENS.PASSWORD_UPDATE_OTP, {
                    password: currentPassword,
                    newPassword,
                })
            })
        }

    }




    return (
        <Layout fixed={true}>
            <CommonHeader
                title='Reset Password'
                hideRightBtn={true}
            />
            <Layout contentContainerStyle={styles.main}>
                <BodyText style={styles.txt1}>Change Your Password</BodyText>

                <BodyText style={styles.txt2}>Set a strong password to keep secure your account </BodyText>

                <PrimaryInput
                    title='Current Password'
                    placeholder='Current Password'
                    isPassword={true}
                    value={currentPassword}
                    onChange={(txt) => setcurrentPassword(txt)}
                    containerStyles={{ marginTop: hp(4) }}
                />


                <PrimaryInput
                    title='New Password'
                    placeholder='New Password'
                    isPassword={true}
                    value={newPassword}
                    onChange={(txt) => setnewPassword(txt)}
                    inputContainer={{ ...(!checkPassStrength() && { borderColor: COLORS.DANGER }) }}
                />
                {
                    !checkPassStrength() && <ErrorText>Please choose a stronger password with at least 10 characters, including uppercase, lowercase, numbers, and special symbols</ErrorText>
                }

                <PrimaryInput
                    title='Confirm Password'
                    placeholder='Confirm Password'
                    isPassword={true}
                    value={confirmPassword}
                    onChange={(txt) => setconfirmPassword(txt)}
                    inputContainer={{ ...(isPasswordNotMatched() && { borderColor: COLORS.DANGER }) }}
                />
                {
                    isPasswordNotMatched() && <ErrorText >Passwords do match</ErrorText>
                }

                <Spacer height={hp(2)} />
                <View style={styles.row}>
                    <BodyText style={styles.txt3}>• </BodyText>
                    <BodyText style={styles.txt3}>At least 12 characters long but 14 or more is better.</BodyText>
                </View>
                <View style={styles.row}>
                    <BodyText style={styles.txt3}>• </BodyText>
                    <BodyText style={styles.txt3}>A combination of uppercase letters, lowercase letters, numbers, and symbols..</BodyText>
                </View>
                <View style={styles.row}>
                    <BodyText style={styles.txt3}>• </BodyText>
                    <BodyText style={styles.txt3}>Significantly different from your previous passwords.</BodyText>
                </View>

                <Spacer height={hp(15)} />
            </Layout>

            <If condition={!keyboardStatus}>

                <View style={styles.btnContainer}>

                    <PrimaryButton
                        title={`Change Password`}
                        onPress={() => handleContinue()}
                        filled={true}
                        isLoading={isLoading}
                    />

                </View>
            </If>

        </Layout>
    )
}

export default UpdatePasswordScreen
