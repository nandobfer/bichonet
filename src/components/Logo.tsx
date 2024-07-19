import React from "react"
import { Image, ImageStyle } from "expo-image"
import { ColorValue, StyleProp, TouchableOpacity } from "react-native"
import { useUser } from "../hooks/useUser"
import { useLinkTo } from "@react-navigation/native"

interface LogoProps {
    size?: number
    tintColor?: ColorValue
    style?: StyleProp<ImageStyle>
    contentFit?: "contain" | "cover" | "fill"
}

export const Logo: React.FC<LogoProps> = ({ size = 200, style, contentFit = "contain" }) => {
    const { user } = useUser()
    const linkTo = useLinkTo()

    const onPress = () => {
        linkTo(user ? "/inicio" : "/")
    }

    return (
        <TouchableOpacity onPress={onPress}>
            <Image source={require("../../assets/logo.png")} style={[{ height: size, width: (993 * size) / 369 }, style]} contentFit={contentFit} />
        </TouchableOpacity>
    )
}
