import React, { ReactNode } from 'react';
import { Text, TextStyle } from 'react-native';
import { COLORS, FONTS, FONT_SIZE } from '../assets/stylesGuide';

interface labelProps {
    children: ReactNode;
    size?: number;
    fontFamily?: string;
    style?: TextStyle | TextStyle[];
}

const Label: React.FC<labelProps> = (props) => {
    const { children, size = FONT_SIZE._24, fontFamily = FONTS.ORBITRON_SEMI_BOLD, style = {} } = props

    return (
        <Text
            allowFontScaling={false}
            style={{
                fontFamily: fontFamily,
                fontSize: size,
                color: COLORS.PRIMARY,
                textAlign: 'center',
                ...style
            }}>{children}</Text>
    )
}

export default Label

