import { ViewStyle, View } from 'react-native'
import React from 'react'

interface spacerProps {
    styles?: ViewStyle;
    height?: number;
}

const Spacer: React.FC<spacerProps> = ({ styles, height = 100 }) => {
    return (
        <View style={[{
            width: '100%',
            height: height
        }, styles]}>

        </View>
    )
}

export default Spacer
