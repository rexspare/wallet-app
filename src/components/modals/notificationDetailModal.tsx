import React, { FC } from 'react';
import { ActivityIndicator, Linking, Modal, StyleSheet, TouchableOpacity, View } from 'react-native';

import { BodyText } from '..';
import { BackArrow, CrossIcon } from '../../assets/icons';
import { COLORS, FONTS, FONT_SIZE, hp } from '../../assets/stylesGuide';



interface notificationDetailModalProps {
    visible: boolean;
    onclose: Function;
    isLoading?: boolean;
    data: any
}

const NotificationDetailModal: FC<notificationDetailModalProps> = ({
    visible,
    onclose = () => { },
    isLoading = false,
    data = {}
}) => {

    const handleOpenExplorer = () => {
        try {
            let URL = ""
            switch (data?.token?.toUpperCase()) {
                case "ETH":
                case "USDT":
                    URL = `https://etherscan.io/tx/${data?.tx_id}`
                    break;
                case "BNB":
                case "GRADE":
                    URL = `https://bscscan.com/tx/${data?.tx_id}`
                    break;
                case "SOL":
                    URL = `https://solscan.io/tx/${data?.tx_id}`
                    break;
                case "XRP":
                    URL = `https://xrpscan.com/tx/${data?.tx_id}`
                    break;
                case "BTC":
                    URL = `https://www.blockchain.com/explorer/transactions/btc/${data?.tx_id}`
                    break;

                default:
                    break;
            }
            if (URL) {
                Linking.openURL(URL)
            }
        } catch (error) {

        }
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
                        <TouchableOpacity
                            activeOpacity={0.8}
                            hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
                            onPress={() => onclose()}
                        >
                            <BackArrow width={13} height={13} />
                        </TouchableOpacity>

                        <BodyText style={styles.txt1}>{data?.transaction_type} Details</BodyText>

                        <View style={{ width: 14 }}></View>
                    </View>

                    {
                        isLoading ?
                            <ActivityIndicator style={{ marginVertical: 10 }} color={COLORS.PRIMARY} size={'large'} />
                            :
                            <>
                                {
                                    data?.tx_id ?
                                        <>
                                            <BodyText style={styles.txt2}>Amount {data?.transaction_type}</BodyText>
                                            <BodyText style={styles.txt3}>{Number(data.value)?.toFixed(6)} {data?.token}</BodyText>

                                            <View style={{
                                                borderWidth: 1 / 2,
                                                width: '100%',
                                                paddingHorizontal: '5%',
                                                paddingVertical: 5,
                                                borderRadius: 10,
                                                borderColor: "#E2E2E2",
                                                marginTop: hp(1.5)
                                            }}>
                                                <BodyText style={styles.txt4}>{data?.tx_id}</BodyText>
                                            </View>

                                            <TouchableOpacity
                                                activeOpacity={0.8}
                                                hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
                                                onPress={() => handleOpenExplorer()}
                                            >
                                                <BodyText style={styles.txt5}>Open in Blockchain Explorer</BodyText>
                                            </TouchableOpacity>
                                        </>
                                        :
                                        <BodyText style={styles.txt3}>Something Went Wrong! Please Try Again.</BodyText>
                                }
                            </>
                    }

                </View>
            </View>
        </Modal>
    )
}

export default NotificationDetailModal

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
        fontSize: FONT_SIZE._15
    },
    txt2: {
        color: COLORS.DISABLED,
        marginBottom: 0
    },
    txt3: {
        fontSize: FONT_SIZE._24,
        marginTop: 0
    },
    txt4: {
        fontSize: FONT_SIZE._12,
        fontFamily: FONTS.MEDIUM,
        textAlign: 'left'
    },
    txt5: {
        fontSize: FONT_SIZE._13,
        fontFamily: FONTS.MEDIUM,
        textAlign: 'center',
        color: COLORS.LINK,
        marginTop: 10,
        textDecorationLine: 'underline'
    }
})