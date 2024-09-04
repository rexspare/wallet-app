import { CommonActions, useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import Toast from 'react-native-toast-message';
import { ALERT_HEADER, ALERT_TYPES, ASYNC_KEYS, BASE_URL, ROUTES, SCREENS } from '../assets/constants';
import { removeItem, setItem } from '../services/asyncStorage';
import { appStateSelectors, useApp } from '../states/app';
import { passowrdStrength_, validateEmail } from '../utils/myUtils';

const useAuth = () => {
  const setAuthenticated = useApp(appStateSelectors.setAuthenticated);
  const setUser = useApp(appStateSelectors.setUser);
  const user = useApp(appStateSelectors.user);
  const token = useApp(appStateSelectors.token);
  const [isLoading, setisLoading] = useState<boolean>(false)
  const navigation = useNavigation<any>()

  const onSignUp = async (email: string, password: string) => {
    try {
      if (validateEmail(email) && passowrdStrength_(password) > 2) {
        setisLoading(true)

        const response = await fetch(BASE_URL + ROUTES.SIGNUP, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
          }),
        });

        if (response.status === 200 || response.status === 201) {
          const resData: any = await response.json();
          if (resData?.tokens) {
            const data = resData?.tokens
            await getUserData(data?.access)
            setAuthenticated(true, data)
            await setItem(ASYNC_KEYS.TOKEN, data)
          } else {
            Toast.show({
              type: ALERT_TYPES.WARNING,
              text1: ALERT_HEADER.DANGER,
              text2: "An Error occured please try again!",
            });
          }
        } else if (response.status === 400) {
          const data = await response.json();
          Toast.show({
            type: ALERT_TYPES.WARNING,
            text1: ALERT_HEADER.DANGER,
            text2: data?.error || data?.message,
          });
        } else {
          Toast.show({
            type: ALERT_TYPES.WARNING,
            text1: ALERT_HEADER.DANGER,
            text2: "An Error occured please try again!",
          });
        }
        setisLoading(false)

      } else {
        return
      }

    } catch (error) {
      setisLoading(false)
      Toast.show({
        type: ALERT_TYPES.WARNING,
        text1: ALERT_HEADER.DANGER,
        text2: JSON.stringify(error),
      });
    }
  }

  const onVerifyEmail = async (email: string, otp: string) => {
    try {
      if (otp) {
        setisLoading(true)

        const response = await fetch(BASE_URL + ROUTES.VERIFY_EMAIL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            otp,
          }),
        });

        if (response.status === 200 || response.status === 201) {
          const data = await response.json();
          Toast.show({
            type: ALERT_TYPES.SUCCESS,
            text1: ALERT_HEADER.SUCCESS,
            text2: data?.message,
          });
          navigateToLogin()
        } else {
          const data = await response.json();
          Toast.show({
            type: ALERT_TYPES.WARNING,
            text1: ALERT_HEADER.DANGER,
            text2: data?.message || 'Invalid OTP!',
          });
        }
        setisLoading(false)

      } else {
        return
      }

    } catch (error) {
      setisLoading(false)
      Toast.show({
        type: ALERT_TYPES.WARNING,
        text1: ALERT_HEADER.DANGER,
        text2: JSON.stringify(error),
      });
    }
  }

  const onSignIn = async (email: string, password: string) => {
    try {
      if (email && password) {
        setisLoading(true)

        const response = await fetch(BASE_URL + ROUTES.SIGNIN, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
          }),
        });

        console.log(response);


        if (response.status === 200 || response.status === 201) {
          const data = await response.json();
          await getUserData(data?.access)
          setAuthenticated(true, data)
          await setItem(ASYNC_KEYS.TOKEN, data)
        } else {
          const data = await response.json();
          Toast.show({
            type: ALERT_TYPES.WARNING,
            text1: ALERT_HEADER.DANGER,
            text2: data?.error || data?.message || "An Error occured please try again!",
          });
        }
        setisLoading(false)

      } else {
        return
      }

    } catch (error) {
      setisLoading(false)
      Toast.show({
        type: ALERT_TYPES.WARNING,
        text1: ALERT_HEADER.DANGER,
        text2: JSON.stringify(error),
      });
    }
  }

  const getUserData = async (accesskey: string = token?.access) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(BASE_URL + ROUTES.USER_DATA, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${accesskey}`,
          },
        });

        if (response.status == 200 || response.status == 201) {
          const responseData = await response.json();

          await setItem(ASYNC_KEYS.USER, responseData)
          setUser(responseData)
          resolve(true)
        } else {
          resolve(false)
        }
      } catch (error) {
        resolve(false)
      }
    })
  }


  const onResetPasswordRequest = async (email: string, callBack = () => { }) => {
    try {
      if (validateEmail(email)) {
        setisLoading(true)

        const response = await fetch(BASE_URL + ROUTES.REQUEST_RESET_PASS_OTP, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
          }),
        });

        if (response.status === 200 || response.status === 201) {
          const data = await response.json();
          Toast.show({
            type: ALERT_TYPES.SUCCESS,
            text1: ALERT_HEADER.SUCCESS,
            text2: data?.message,
          });
          callBack()
        } else {
          const data = await response.json();
          Toast.show({
            type: ALERT_TYPES.WARNING,
            text1: ALERT_HEADER.DANGER,
            text2: data?.message || data?.error || 'Email does not exists!',
          });
        }
        setisLoading(false)

      } else {
        return
      }

    } catch (error) {
      console.log(error);

      setisLoading(false)
      Toast.show({
        type: ALERT_TYPES.WARNING,
        text1: ALERT_HEADER.DANGER,
        text2: JSON.stringify(error),
      });
    }
  }

  const onVerifyPasswordOtp = async (email: string, otp: string) => {
    try {
      if (otp) {
        setisLoading(true)

        const response = await fetch(BASE_URL + ROUTES.VERIFY_RESET_PASS_OTP, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            otp,
          }),
        });

        if (response.status === 200 || response.status === 201) {
          const data = await response.json();
          Toast.show({
            type: ALERT_TYPES.SUCCESS,
            text1: ALERT_HEADER.SUCCESS,
            text2: data?.message,
          });
          navigation.navigate(SCREENS.RESET_PASSWORD, { email })
        } else {
          const data = await response.json();
          Toast.show({
            type: ALERT_TYPES.WARNING,
            text1: ALERT_HEADER.DANGER,
            text2: data?.message || 'Invalid OTP!',
          });
        }
        setisLoading(false)

      } else {
        return
      }

    } catch (error) {
      setisLoading(false)
      Toast.show({
        type: ALERT_TYPES.WARNING,
        text1: ALERT_HEADER.DANGER,
        text2: JSON.stringify(error),
      });
    }
  }

  const onUpdatePassword = async (email: string, new_password: string) => {
    try {
      if (email && new_password) {
        setisLoading(true)

        const response = await fetch(BASE_URL + ROUTES.RESET_PASSWORD_AUTH, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            new_password,
          }),
        });

        if (response.status === 200 || response.status === 201) {
          const data = await response.json();
          Toast.show({
            type: ALERT_TYPES.SUCCESS,
            text1: ALERT_HEADER.SUCCESS,
            text2: data?.message || "Password Updated Successfully!",
          });
          navigateToLogin()
        } else {
          const data = await response.json();

          Toast.show({
            type: ALERT_TYPES.WARNING,
            text1: ALERT_HEADER.DANGER,
            text2: data?.message || data?.error || "Couldn't update password. Try again later!",
          });
        }
        setisLoading(false)

      } else {
        return
      }

    } catch (error) {
      setisLoading(false)
      Toast.show({
        type: ALERT_TYPES.WARNING,
        text1: ALERT_HEADER.DANGER,
        text2: JSON.stringify(error),
      });
    }
  }

  const navigateToLogin = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [
          {
            name: SCREENS.LANDING,
          },
          {
            name: SCREENS.SIGN_IN,
          },
        ],
      })
    );
  }
  const onLogout = async () => {
    try {
      await removeItem(ASYNC_KEYS.TOKEN)
      await removeItem(ASYNC_KEYS.USER)
      setAuthenticated(false, false)
    } catch (error) {
      setAuthenticated(false, false)
    }
  }

  return {
    onSignUp,
    onVerifyEmail,
    onSignIn,
    getUserData,
    onResetPasswordRequest,
    onVerifyPasswordOtp,
    onUpdatePassword,
    onLogout,
    isLoading
  };
};

export default useAuth;
