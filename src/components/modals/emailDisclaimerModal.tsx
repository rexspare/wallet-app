import React, { FC } from 'react';
import { ActivityIndicator, Linking, Modal, StyleSheet, TouchableOpacity, View } from 'react-native';

import { BodyText, PrimaryButton } from '..';
import { BackArrow, CrossIcon } from '../../assets/icons';
import { COLORS, FONTS, FONT_SIZE, hp } from '../../assets/stylesGuide';



interface emailDisclaimerModalprops {
    visible: boolean;
    onclose: Function;
    onConfirm?: Function;
}

const EmailDisclaimerModal: FC<emailDisclaimerModalprops> = ({
    visible,
    onclose = () => { },
    onConfirm = () => { },
}) => {

    const handleConfirm = () => {
        onclose()
        onConfirm()
    }


    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={() => onclose()}
        >
            <View style={styles.modalContainer}>
                <View style={styles.confirmModalContent}>

                    <View style={styles.row}>
                        <View style={{ width: 14 }}></View>


                        <BodyText style={styles.txt1}>Discliamer</BodyText>

                        <TouchableOpacity
                            activeOpacity={0.8}
                            hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
                            onPress={() => onclose()}
                        >
                            <CrossIcon width={13} height={13} />
                        </TouchableOpacity>
                    </View>

                    <BodyText style={styles.txt2}>Please ensure you register with an email address that you have access to, as an OTP will be sent to this email for verification when you withdraw funds.</BodyText>

                    <View style={styles.row}>
                        <PrimaryButton
                            title={"I Understand and Acknowledge"}
                            onPress={() => handleConfirm()}
                        />

                    </View>


                </View>
            </View>
        </Modal>
    )
}

export default EmailDisclaimerModal

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',

    },
    confirmModalContent: {
        width: "90%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.BACKGROUND,
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 20,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%'
    },
    txt1: {
        fontFamily: FONTS.MEDIUM,
        fontSize: FONT_SIZE._18
    },
    txt2: {
        textAlign: 'left',
        lineHeight: FONT_SIZE._20,
        marginVertical: hp(2)
    },

})