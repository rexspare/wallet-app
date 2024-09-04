import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StatusBar, StyleSheet, TextStyle, TouchableOpacity, View } from 'react-native';
import { BodyText, If } from '..';
import { BackArrow, BellIcon, GradeIcon, SearchIcon } from '../../assets/icons';
import { COLORS, FONTS, FONT_SIZE, hp, wp } from '../../assets/stylesGuide';
import { hasNotch, isIOS } from '../../utils/myUtils';
import { SCREENS } from '../../assets/constants';
import { appStateSelectors, useApp } from '../../states/app';

interface homeheaderProps {

}

const HomeHeader: React.FC<homeheaderProps> = (props) => {
  const {

  } = props
  const navigation = useNavigation<any>()
  const notifications = useApp(appStateSelectors.notifications)

  const unReadNotificaton = () => {
    return notifications?.filter((x) => x?.has_read == false).length
  }

  return (
    <View style={[styles.main]}>

      <TouchableOpacity
        activeOpacity={0.8}
        hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
        onPress={() => navigation.navigate(SCREENS.SETTINGS)}
      >
        <GradeIcon
          height={hp(3.43)} width={hp(3.43)}
        />
      </TouchableOpacity>


      <TouchableOpacity
        activeOpacity={0.8}
        hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
        onPress={() => navigation.navigate(SCREENS.NOTIFICATION)}
      >
        <BellIcon
          width={hp(2.46)}
          height={hp(2.46)}
        />

        <If condition={unReadNotificaton() > 0}>
          <BodyText style={styles.total}>{unReadNotificaton()}</BodyText>
        </If>
      </TouchableOpacity>


    </View >
  )
}

export default HomeHeader

const styles = StyleSheet.create({
  main: {
    width: wp(100),
    minHeight: 50,
    marginTop: (isIOS() && hasNotch()) ? 60 : StatusBar.currentHeight,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: '5%',
  },
  bellContainer: {
    borderWidth: 2
  },
  total: {
    position: 'absolute',
    left: -5,
    backgroundColor: COLORS.DANGER,
    color: COLORS.WHITE,
    fontSize: FONT_SIZE._10,
    fontFamily: FONTS.SEMI_BOLD,
    paddingHorizontal: 4,
    borderRadius: 15
  }
})