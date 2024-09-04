import React from 'react'
import { BodyText, CommonHeader, Layout, Spacer } from '../../components'
import { styles } from './styles'
import { Platform } from 'react-native'


const PolicyScreen = () => {
    return (
        <Layout fixed={true}>
            <CommonHeader
                title='Privacy Policy'
                hideRightBtn={true}
            />
            <Layout contentContainerStyle={styles.main}>
                <BodyText style={styles.txt1}>Privacy Policy</BodyText>

                <BodyText style={styles.txt2}>
                    Grade Wallet ("we," "us," or "our") values your privacy. This Privacy Policy ("Policy") describes
                    how we collect, use, and disclose information that we obtain about users of our mobile application
                    ("App") and any related services (collectively, the "Services"). By using the App, you agree that
                    your user data (including your personal information) will be handled as described in this Policy.
                    Your use of the App and any dispute over privacy is subject to this Policy and our Terms of Use,
                    including its applicable limitations on damages and provisions for the resolution of disputes.
                </BodyText>

                <BodyText style={styles.txt1}>Overview</BodyText>
                <BodyText style={styles.txt2}>Privacy is core to Grade Wallet’s mission and values. We take all appropriate steps to preserve user
                    privacy and aim to be as transparent as possible regarding the treatment of any data we collect or
                    that you provide to us. We do not: </BodyText>

                <BodyText style={styles.txt4}>{'\t'}•{Platform.OS == 'ios' ? '\t' :'\t\t\t'}Collect your private keys.</BodyText>
                <BodyText style={styles.txt4}>{'\t'}•{Platform.OS == 'ios' ? '\t' :'\t\t\t'}Sell your Personal Information. </BodyText>
                <BodyText style={styles.txt4}>{'\t'}•{Platform.OS == 'ios' ? '\t' :'\t\t\t'}Collect or retain Personal Information unless necessary to provide you the Services and a
                    great user experience.</BodyText>

                <BodyText style={styles.txt2}>
                    This policy will be updated whenever there are material changes to Grade Wallet’s privacy practices
                    or applicable law.
                </BodyText>

                <BodyText style={styles.txt1}>The Information We Collect</BodyText>

                <BodyText style={styles.txt2}>We collect information about you directly from you and from third parties, as well as automatically
                    through your use of our App.</BodyText>

                <BodyText style={styles.txt3}>Information We Collect Directly From You</BodyText>

                <BodyText style={styles.txt2}>You may use the App without registering or providing personal information; however, certain
                    information is collected from you as described below and for the purposes set out below: </BodyText>

                <BodyText style={styles.txt4}>{'\t'}•{Platform.OS == 'ios' ? '\t' :'\t\t\t'}Publicly available data such as your digital asset wallet address and public blockchain data,
                    which is used to provide and improve the Services and to ensure compliance with applicable
                    laws and regulations. </BodyText>
                <BodyText style={styles.txt4}>{'\t'}•{Platform.OS == 'ios' ? '\t' :'\t\t\t'}Your contact information and other data related to your use of the App (to the extent that you
                    provide it to us) in connection with survey responses or customer support queries. </BodyText>
                <BodyText style={styles.txt4}>{'\t'}•{Platform.OS == 'ios' ? '\t' :'\t\t\t'}While not required to access the App, you may choose to provide us with your email address
                    to participate in certain promotional activities or to receive additional information related to
                    upcoming product launches or developments. </BodyText>
                <BodyText style={styles.txt4}>{'\t'}•{Platform.OS == 'ios' ? '\t' :'\t\t\t'}If you provide personal information of third parties to us for specific purposes, you are
                    responsible for ensuring that you have all required permissions and consents (including
                    express consent from such third parties) to provide such personal information to us and that
                    our use of such personal information does not violate any applicable law. </BodyText>


                <BodyText style={styles.txt1}>Information Collected Automatically </BodyText>

                <BodyText style={styles.txt2}>We may automatically collect certain information due to your use of the Services. We use this
                    information to enable the basic functionality of the Services. We strive where possible to ensure that
                    the collected information is de-identified, aggregated, and/or anonymized. </BodyText>

                <BodyText style={styles.txt2}><BodyText style={styles.txt5}>{'\t'}•{Platform.OS == 'ios' ? '\t' :'\t\t\t'}Single Sign-On Through Internet Service Providers: </BodyText>When you decide to use single signin servers to connect to our Services, we may collect Personal Information from internet
                    service providers. Your interactions with these tools are governed by the privacy notices of
                    the corresponding platform. </BodyText>
                <BodyText style={styles.txt2}><BodyText style={styles.txt5}>{'\t'}•{Platform.OS == 'ios' ? '\t' :'\t\t\t'}Device and Usage Information: </BodyText>Device and Usage Information:</BodyText>
                <BodyText style={styles.txt2}><BodyText style={styles.txt5}>{'\t'}•{Platform.OS == 'ios' ? '\t' :'\t\t\t'}Cookies and Similar Technologies: </BodyText> When you access the Service, we may collect Personal
                    Information via cookies, pixel tags, or similar technologies on the Services (collectively
                    referred to as “Cookies”). For more information on our use of Cookies, please read our
                    Cookie Notice here. </BodyText>
                <BodyText style={styles.txt2}><BodyText style={styles.txt5}>{'\t'}•{Platform.OS == 'ios' ? '\t' :'\t\t\t'}Location Information: </BodyText>When you use the Services, we may collect general location
                    information (such as general location inferred from an IP address).</BodyText>
                <BodyText style={styles.txt2}><BodyText style={styles.txt5}>{'\t'}•{Platform.OS == 'ios' ? '\t' :'\t\t\t'}Information from Other Sources: </BodyText>We may collect information about you from third
                    parties, such as marketing partners (for example, when you engage with our marketing
                    campaigns) and researchers (for example, when you engage with our user experience
                    research activities). We may combine this information with information we collect from you
                    and use it as described in this Privacy Notice. </BodyText>




                <BodyText style={styles.txt1}>How We Use The Information We Collect</BodyText>
                <BodyText style={styles.txt2}>We use the information we collect for the following purposes: </BodyText>


                <BodyText style={styles.txt2}><BodyText style={styles.txt5}>{'\t'}•{Platform.OS == 'ios' ? '\t' :'\t\t\t'}Provide our services: </BodyText>To communicate with you about your use of our App and to respond
                    to your inquiries, fulfill your orders, and for other customer support purposes.</BodyText>
                <BodyText style={styles.txt2}><BodyText style={styles.txt5}>{'\t'}•{Platform.OS == 'ios' ? '\t' :'\t\t\t'}Provide personalized services: </BodyText>To tailor the content and information that we may send or
                    display to you and to otherwise personalize your experiences while using the App. </BodyText>
                <BodyText style={styles.txt2}><BodyText style={styles.txt5}>{'\t'}•{Platform.OS == 'ios' ? '\t' :'\t\t\t'}Improve and develop our services: </BodyText>To ensure our App is working as intended, to better
                    understand how users access and use our App, both on an aggregated and individualized
                    basis, and to make improvements and develop new functionality. </BodyText>
                <BodyText style={styles.txt2}><BodyText style={styles.txt5}>{'\t'}•{Platform.OS == 'ios' ? '\t' :'\t\t\t'}Offer promotions: </BodyText>To use your information for marketing and promotional purposes, such
                    as sending you news and newsletters, special offers, and promotions, and conducting
                    contests and sweepstakes. </BodyText>


                <BodyText style={styles.txt1}>How We Share The Information We Collect</BodyText>
                <BodyText style={styles.txt2}>We may share the information we collect as follows: </BodyText>

                <BodyText style={styles.txt2}><BodyText style={styles.txt5}>{'\t'}•{Platform.OS == 'ios' ? '\t' :'\t\t\t'}Consent: </BodyText>Where you have provided consent, we share your information as described at the
                    time of consent. </BodyText>
                <BodyText style={styles.txt2}><BodyText style={styles.txt5}>{'\t'}•{Platform.OS == 'ios' ? '\t' :'\t\t\t'}Affiliates & Service Providers: </BodyText>We may disclose the information we collect from you to
                    third-party vendors, service providers, contractors, or agents who perform functions on our
                    behalf. </BodyText>
                <BodyText style={styles.txt2}><BodyText style={styles.txt5}>{'\t'}•{Platform.OS == 'ios' ? '\t' :'\t\t\t'}Business Transfers: </BodyText>If we are acquired by or merged with another company, or if
                    substantially all of our assets are transferred to another company, we may transfer the
                    information we have collected from you to the other company. </BodyText>
                <BodyText style={styles.txt2}><BodyText style={styles.txt5}>{'\t'}•{Platform.OS == 'ios' ? '\t' :'\t\t\t'}In Response to Legal Process: </BodyText>To comply with the law, legal process, or legal obligations,
                    and to protect our property, legal rights, or that of others. </BodyText>
                <BodyText style={styles.txt2}><BodyText style={styles.txt5}>{'\t'}•{Platform.OS == 'ios' ? '\t' :'\t\t\t'}Aggregate and De-Identified Information: </BodyText>We may share aggregate or de-identified
                    information about users and their use of the App with third parties and publicly for
                    marketing, advertising, research, or similar purposes. </BodyText>



                <BodyText style={styles.txt1}>Our Use of Cookies and Other Tracking Mechanisms </BodyText>
                <BodyText style={styles.txt2}>We and our service providers use cookies and other tracking mechanisms to track information about
                    your use of our App. We may combine this information with other information we collect from you. </BodyText>

                <BodyText style={styles.txt1}>Cookies</BodyText>

                <BodyText style={styles.txt2}><BodyText style={styles.txt5}>{'\t'}•{Platform.OS == 'ios' ? '\t' :'\t\t\t'}Session Cookies: </BodyText>These cookies are temporary and expire once you close the App. </BodyText>
                <BodyText style={styles.txt2}><BodyText style={styles.txt5}>{'\t'}•{Platform.OS == 'ios' ? '\t' :'\t\t\t'}Persistent Cookies: </BodyText>These cookies remain on your device after you have closed the App or
                    turned off your device. </BodyText>

                <BodyText style={styles.txt2}>You may disable cookies through your device settings, but doing so may impair your use of the
                    App.</BodyText>

                <BodyText style={styles.txt1}>Security of Your Information </BodyText>
                <BodyText style={styles.txt2}>We have implemented commercially reasonable precautions to protect the information we collect
                    from loss, misuse, and unauthorized access, disclosure, alteration, and destruction. However, no
                    data security measures can guarantee 100% security. </BodyText>

                <BodyText style={styles.txt1}>Your Rights and Choices </BodyText>

                <BodyText style={styles.txt2}><BodyText style={styles.txt5}>{'\t'}•{Platform.OS == 'ios' ? '\t' :'\t\t\t'}Access and Update Information: </BodyText>You may request access to, a copy of, modification, or
                    deletion of your personal information by contacting us at [Contact Information]. </BodyText>
                <BodyText style={styles.txt2}><BodyText style={styles.txt5}>{'\t'}•{Platform.OS == 'ios' ? '\t' :'\t\t\t'}Marketing Opt-Out: </BodyText> You may opt out of receiving marketing emails by following the optout instructions contained in the e-mail. </BodyText>


                <BodyText style={styles.txt1}>Location of Information </BodyText>
                <BodyText style={styles.txt2}>Our App is offered from the United Kingdom. If you access the Services from outside the United
                    Kingdom, you agree to the transfer of your information to the United Kingdom.</BodyText>

                <BodyText style={styles.txt1}>Contact Us </BodyText>
                <BodyText style={styles.txt2}>If you have questions about our approach to privacy or would like to make a complaint, please
                    contact us at support@gradecybersecurity.com.</BodyText>

                <BodyText style={styles.txt1}>Changes to this Policy </BodyText>
                <BodyText style={styles.txt2}>This Policy is current as of the Effective Date set forth above. We may change this Policy from time
                    to time and will post any changes on the App. Your continued use of the App after the posting of a
                    modified Policy indicates your acceptance of the updated terms. </BodyText>

                <Spacer />


            </Layout>

        </Layout>
    )
}

export default PolicyScreen
