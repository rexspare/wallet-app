import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Image, TouchableOpacity, View } from 'react-native'
import { SCREENS } from '../../assets/constants'
import { ChangePass, Logout, Policy, PrivateKey, RightChevIcon } from '../../assets/icons'
import { IMAGES } from '../../assets/images'
import { hp } from '../../assets/stylesGuide'
import { BodyText, CommonHeader, Layout } from '../../components'
import { appStateSelectors, useApp } from '../../states/app'
import { styles } from './styles'

const SettingScreen = () => {
  const navigation = useNavigation<any>()
  const setAuthenticated = useApp(appStateSelectors.setAuthenticated)
  const user = useApp(appStateSelectors.user)

  const SETTINGS: any[] = [
    {
      id: 1,
      title: "Request Private Key",
      icon: <PrivateKey width={hp(4.82)} height={hp(4.82)} />,
      onPress: () => navigation.navigate(SCREENS.PRIVATE_KEY)
    },
    {
      id: 2,
      title: "Reset Password",
      icon: <ChangePass width={hp(4.82)} height={hp(4.82)} />,
      onPress: () => navigation.navigate(SCREENS.UPDATE_PASSWORD)
    },
    // {
    //   id: 3,
    //   title: "F&Q",
    //   icon: <FAQ width={hp(4.82)} height={hp(4.82)} />,
    //   onPress: () => navigation.navigate(SCREENS.FAQ)
    // },
    {
      id: 4,
      title: "Privacy Policy",
      icon: <Policy width={hp(4.82)} height={hp(4.82)} />,
      onPress: () => navigation.navigate(SCREENS.POLICY)
    },
    {
      id: 5,
      title: "Logout",
      icon: <Logout width={hp(4.82)} height={hp(4.82)} />,
      onPress: () => { setAuthenticated(false, null) }
    },
  ]

  return (
    <Layout fixed={true} >

      <CommonHeader
        title='Settings'
        hideRightBtn={true}
      />

      <Layout fixed={true} containerStyle={styles.main}>

        <View
          style={styles.profileContainer}
        >
          <View style={styles.profileContainerInner}>

            <View style={styles.row}>
              <Image
                source={IMAGES.AVATAR}
                style={styles.avatar}
              />
              <View>
                {/* <BodyText style={styles.txt1}>Andrew Harrison</BodyText> */}
                <BodyText style={styles.txt2}>{user?.email}</BodyText>
              </View>
            </View>

            {/* <TouchableOpacity
              activeOpacity={0.8}
              hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
              onPress={() => navigation.navigate(SCREENS.EDIT_PROFILE)}
            >
              <EditIcon width={hp(3.21)} height={hp(3.21)} />
            </TouchableOpacity> */}

          </View>

        </View>

        <View style={styles.coinContainer}>
          {
            SETTINGS.map((setting, index) => (
              <>
                <TouchableOpacity
                  key={index}
                  activeOpacity={0.8}
                  style={styles.item}
                  onPress={() => setting.onPress()}
                >
                  <View style={styles.row}>
                    {setting?.icon}

                    <BodyText style={styles.title}>{setting.title}</BodyText>

                  </View>

                  <RightChevIcon width={hp(1.6)} height={hp(1.6)} />

                </TouchableOpacity>
                {index != SETTINGS?.length - 1 && <View style={styles.line}></View >}
              </>
            ))
          }
        </View>



      </Layout>

    </Layout>
  )
}

export default SettingScreen
