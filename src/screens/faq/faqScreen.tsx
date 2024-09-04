import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { hp } from '../../assets/stylesGuide'
import { CommonHeader, FaqItem, Layout, Spacer } from '../../components'
import { styles } from './styles'

const FaqScreen = () => {
  const navigation = useNavigation<any>()
  const FAQ_LIST = [
    {
      id: 1,
      title: 'What services do you offer?',
      description: `If you need assistance, our customer support team is here to help! You can reach us by emailing support@example.com or by calling our toll-free number at 1-800-123-4567. For quick answers, visit our Help Center or chat with us live on our website.`
    },
    {
      id: 2,
      title: 'How can I contact customer support?',
      description: `If you need assistance, our customer support team is here to help! You can reach us by emailing support@example.com or by calling our toll-free number at 1-800-123-4567. For quick answers, visit our Help Center or chat with us live on our website.`
    },
    {
      id: 3,
      title: 'What is your refund policy?',
      description: `If you need assistance, our customer support team is here to help! You can reach us by emailing support@example.com or by calling our toll-free number at 1-800-123-4567. For quick answers, visit our Help Center or chat with us live on our website.`
    },
    {
      id: 4,
      title: 'How do I create an account?',
      description: `If you need assistance, our customer support team is here to help! You can reach us by emailing support@example.com or by calling our toll-free number at 1-800-123-4567. For quick answers, visit our Help Center or chat with us live on our website.`
    },
  ]

  return (
    <Layout fixed={true} >

      <CommonHeader title='FAQ' hideRightBtn={true} />

      <Layout contentContainerStyle={styles.main}>

        <Spacer height={hp(1)} />

        {
          FAQ_LIST.map((faq, index) => (
            <FaqItem
              key={index}
              item={faq}
            />
          ))
        }

      </Layout>


    </Layout>
  )
}

export default FaqScreen
