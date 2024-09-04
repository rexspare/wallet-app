import { useNavigation } from '@react-navigation/native';
import React, { ReactNode, useState } from 'react';
import { StatusBar, StyleSheet, TextStyle, TouchableOpacity, View } from 'react-native';
import { BodyText } from '..';
import { BackArrow, CrossIcon, SearchIcon } from '../../assets/icons';
import { COLORS, FONTS, FONT_SIZE, hp, wp } from '../../assets/stylesGuide';
import { hasNotch, isIOS } from '../../utils/myUtils';


interface commonheaderProps {
  hideBackBtn?: boolean;
  hideRightBtn?: boolean;
  title?: string;
  onBackPress?: Function | null;
  onRightPress?: Function | null;
  titleStyles?: TextStyle;
  isSearching?: boolean;
}

const CommonHeader: React.FC<commonheaderProps> = (props) => {
  const {
    hideBackBtn = false,
    title,
    hideRightBtn = false,
    onBackPress = null,
    onRightPress = null,
    titleStyles = null,
    isSearching = false
  } = props
  const navigation = useNavigation()

  return (
    <View style={[styles.main]}>
      {
        hideBackBtn == false ?
          <TouchableOpacity
            activeOpacity={0.8}
            hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
            onPress={() => onBackPress ? onBackPress() : navigation.goBack()}
          >
            <BackArrow
              height={hp(2)} width={hp(2.3)}
            />
          </TouchableOpacity> :
          <View style={{ width: hp(2.3) }}>
          </View>
      }

      <View style={styles.container}>
        <BodyText style={{
          ...(styles.title),
          ...titleStyles
        }}>{title}</BodyText>
      </View>

      {
        hideRightBtn == false ?
          <TouchableOpacity
            activeOpacity={0.8}
            hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
            onPress={() => onRightPress ? onRightPress() : null}
          >
            {
              isSearching ?
                <CrossIcon
                  width={hp(2.3)}
                  height={hp(2.3)}
                />
                :
                <SearchIcon
                  width={hp(2.3)}
                  height={hp(2.3)}
                  fill={COLORS.PRIMARY}
                />
            }
          </TouchableOpacity>
          :
          <View style={{ width: hp(2.3) }}>
          </View>
      }
    </View >
  )
}

export default CommonHeader

const styles = StyleSheet.create({
  main: {
    width: wp(100),
    minHeight: 50,
    marginTop: (isIOS() && hasNotch()) ? 60 : StatusBar.currentHeight,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: '5%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  title: {
    textAlign: 'left',
    fontFamily: FONTS.SEMI_BOLD,
    color: COLORS.PRIMARY,
    fontSize: FONT_SIZE._18,
  },

})