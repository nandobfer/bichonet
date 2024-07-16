import React from "react"
import { View } from "react-native"
import { MD3TypescaleKey, Text, TextProps } from "react-native-paper"
import { colors } from "../../style/colors"
import { ORIENTATION } from "../../tools/orientation"

interface GameTextProps {}

export const GameText: React.FC<TextProps<MD3TypescaleKey>> = (props) => {
    return <Text {...props} style={[{ color: colors.secondary, fontSize: 20 }, ORIENTATION == "desktop" && { fontSize: 26 }, props.style]} />
}
