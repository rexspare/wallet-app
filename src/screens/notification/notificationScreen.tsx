import { useNavigation } from '@react-navigation/native'
import moment from 'moment'
import React, { useState } from 'react'
import { FlatList, TouchableOpacity } from 'react-native'
import { COLORS } from '../../assets/stylesGuide'
import { BodyText, CommonHeader, Layout, NotificationDetailModal } from '../../components'
import useNotification from '../../hooks/notification'
import { appStateSelectors, useApp } from '../../states/app'
import { styles } from './styles'

const NotificationScreen = () => {
  const navigation = useNavigation<any>()
  const notifications = useApp(appStateSelectors.notifications)
  const { getNotificationDetail, markNotificationAsRead, isLoading } = useNotification()
  const [selectedNotification, setselectedNotification] = useState({})
  const [isModalVisble, setisModalVisble] = useState(false)

  const handleSelected = async (item: any) => {
    setisModalVisble(true)
    getNotificationDetail(item?.id, setselectedNotification)
    if (item?.has_read == false) {
 
      markNotificationAsRead(item?.id)
    }
  }

  const handleCloseModal = () => {
    setselectedNotification({})
    setisModalVisble(false)
  }



  return (
    <Layout fixed={true} >

      <CommonHeader
        title='Notifications'
        hideRightBtn={true}
      />


      <FlatList
        data={notifications}
        ListEmptyComponent={<BodyText>You have No New Notifications</BodyText>}
        style={styles.coinContainer}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => handleSelected(item)}
            style={{
              ...styles.item,
              ...(index == notifications.length - 1 && { borderBottomWidth: 0 })
            }}
          >
            <BodyText style={{
              ...styles.txt1,
              ...(item?.has_read == true && { color: COLORS.DISABLED })
            }}>{item.notification_message}</BodyText>

            <BodyText style={styles.txt2}>{moment(item.timestamp).format('M/D/YYYY hh:mmA')}</BodyText>

          </TouchableOpacity>
        )}
      />
      <NotificationDetailModal
        visible={isModalVisble}
        onclose={handleCloseModal}
        data={selectedNotification}
        isLoading={isLoading}
      />

    </Layout>
  )
}

export default NotificationScreen
