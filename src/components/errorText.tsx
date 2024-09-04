import React, { ReactNode } from 'react';
import { Text, TextStyle } from 'react-native';
import { COLORS, FONTS, FONT_SIZE, hp } from '../assets/stylesGuide';

interface bodyTextProps {
    children: ReactNode;
    fontFamily?: string;
    style?: TextStyle;
}

const ErrorText: React.FC<bodyTextProps | any> = (props) => {
    const { children, fontFamily = FONTS.REGULAR, style = {} } = props

    return (
        <Text
            {...props}
            allowFontScaling={false}
            style={{
                fontFamily: fontFamily,
                color: COLORS.DANGER,
                fontSize: FONT_SIZE._11,
                textAlign: 'left',
                marginVertical: 0,
                ...style
            }}
        >{children}</Text>
    )
}

export default ErrorText

