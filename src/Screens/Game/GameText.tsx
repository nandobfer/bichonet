import React from "react"
import { View } from "react-native"
import { MD3TypescaleKey, Text, TextProps } from "react-native-paper"
import { colors } from "../../style/colors"
import { ORIENTATION, WEB } from "../../tools/orientation"
import { scale } from "../../tools/scale"

interface GameTextProps {}

export const GameText: React.FC<TextProps<MD3TypescaleKey>> = (props) => {
    return <Text {...props} style={[{ color: colors.secondary, fontSize: 16, marginVertical: -5 }, WEB && { fontSize: scale(24) }, props.style]} />
}
