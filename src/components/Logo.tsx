import React from "react"
import { Image, ImageStyle } from "expo-image"
import { ColorValue, StyleProp } from "react-native"

interface LogoProps {
    size?: number
    tintColor?: ColorValue
    style?: StyleProp<ImageStyle>
    contentFit?: "contain" | "cover" | "fill"
}

export const Logo: React.FC<LogoProps> = ({ size = 200, style, contentFit = "contain" }) => {
    return <Image source={require("../../assets/logo.png")} style={[{ height: size, width: (993 * size) / 369 }, style]} contentFit={contentFit} />
}
