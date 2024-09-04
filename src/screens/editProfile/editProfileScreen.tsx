import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { ImageBackground, TouchableOpacity, View } from 'react-native'
import { EditCirle } from '../../assets/icons'
import { IMAGES } from '../../assets/images'
import { hp } from '../../assets/stylesGuide'
import { BodyText, CommonHeader, Layout, PrimaryButton, PrimaryInput, Spacer } from '../../components'
import { appStateSelectors, useApp } from '../../states/app'
import { styles } from './styles'

const EditprofileScreen = () => {
  const navigation = useNavigation<any>()
  const user = useApp(appStateSelectors.user)
  const [name, setname] = useState('')


  console.log(user);

  return (
    <Layout fixed={true} >

      <CommonHeader
        title='Profile'
        hideRightBtn={true}
      />

      <Layout fixed={true} containerStyle={styles.main}>

        <View
          style={styles.profileContainer}
        >

          <View style={styles.profileContainerInner}>

            <TouchableOpacity>
              <ImageBackground
                source={IMAGES.AVATAR}
                style={styles.avatar}
                imageStyle={styles.avatar}
              >

                <EditCirle width={hp(1.9)} height={hp(1.9)} style={styles.edit} />

              </ImageBackground>
            </TouchableOpacity>
            <BodyText style={styles.txt1}>Andrew Harrison</BodyText>
            <BodyText style={styles.txt2}>{user?.email}</BodyText>

          </View>

        </View>

        <Spacer height={hp(2)} />

        <PrimaryInput
          title='Name'
          placeholder='Andrew Harrison'
          value={name}
          onChange={(txt) => setname(txt)}
        />

        <PrimaryInput
          title='Email'
          placeholder={user?.email}
          value={user?.email}
          editable={false}
        />



      </Layout>

      <View style={styles.btnContainer}>

        <PrimaryButton
          title={`Save Changes`}
          onPress={() => { }}
          filled={true}
        />

      </View>

    </Layout>
  )
}

export default EditprofileScreen
