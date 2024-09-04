import React, { ReactNode } from 'react';
import { Text, TextStyle } from 'react-native';
import { COLORS, FONTS, FONT_SIZE, hp } from '../assets/stylesGuide';

interface bodyTextProps {
    children: ReactNode;
    size?: number;
    fontFamily?: string;
    style?: TextStyle;
}

const BodyText: React.FC<bodyTextProps | any> = (props) => {
    const { children, size = FONT_SIZE._14, fontFamily = FONTS.REGULAR, style = {} } = props

    return (
        <Text
            {...props}
            allowFontScaling={false}
            style={{
                fontFamily: fontFamily,
                fontSize: size,
                color: COLORS.BLACK,
                textAlign: 'center',
                marginVertical: hp(1),
                ...style
            }}
        >{children}</Text>
    )
}

export default BodyText

