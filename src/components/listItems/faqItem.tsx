import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { FC, useState } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { COLORS, FONTS, FONT_SIZE, hp } from '../../assets/stylesGuide'
import { ChevDownIcon, ChevUpIcon } from '../../assets/icons'
import BodyText from '../bodyText'
import Collapsible from 'react-native-collapsible';

interface faqItemProps {
    item: any;
}

const FaqItem: FC<faqItemProps> = ({ item }) => {
    const [isCollapse, setisCollapse] = useState(true)

    return (
        <View
            style={styles.swapMain}
        >
            <TouchableOpacity
                style={styles.row}
                activeOpacity={0.8}
                onPress={() => setisCollapse(!isCollapse)}>
                <BodyText style={styles.txt1}>{item.title}</BodyText>

                {
                    isCollapse ?
                        <ChevDownIcon width={hp(2.1)} height={hp(2.1)} />
                        :
                        <ChevUpIcon width={hp(2.1)} height={hp(2.1)} />
                }
            </TouchableOpacity>

            <Collapsible collapsed={isCollapse}>
                <>
                    <View style={styles.line}></View>
                    <BodyText style={styles.txt2}>{item.description}</BodyText>
                </>
            </Collapsible>

        </View>
    )
}

export default FaqItem

const styles = StyleSheet.create({
    swapMain: {
        width: '100%',
        borderRadius: 11,
        marginTop: hp(1.5),
        paddingHorizontal: '5%',
        paddingVertical: hp(1),
        backgroundColor: COLORS.WHITE
    },
    row: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    txt1: {
        fontFamily: FONTS.SEMI_BOLD,
        fontSize: FONT_SIZE._15,
        color: COLORS.BLACK,
        textAlign: 'left',
    },
    txt2: {
        fontFamily: FONTS.REGULAR,
        fontSize: FONT_SIZE._16,
        color: COLORS.BLACK,
        textAlign: 'left'
    },
    line: {
        width: '100%',
        height: 1 / 2,
        backgroundColor: "#E2E2E2",
        marginTop: hp(1)
    },
})