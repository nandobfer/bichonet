import { ImageSource } from "expo-image"
import React from "react"
import { Image, View } from "react-native"
import { GameText } from "../GameText"
import { Surface, TouchableRipple } from "react-native-paper"
import { colors } from "../../../style/colors"
import { MOBILE, ORIENTATION } from "../../../tools/orientation"
import { scale } from "../../../tools/scale"

interface BichoContainerProps {
    name: string
    image: ImageSource
    value: string
    selected?: boolean
    onBichoPress: (value: string) => void
}

export const BichoContainer: React.FC<BichoContainerProps> = ({ name, image, value, selected, onBichoPress }) => {
    const image_size = MOBILE ? 50 : scale(80)

    return (
        <TouchableRipple borderless style={[{ borderRadius: 15, flex: 1 }]} onPress={() => onBichoPress(value)}>
            <Surface
                style={[
                    { flex: 1, alignItems: "center", gap: 5, borderRadius: 15, backgroundColor: colors.primary, padding: scale(10) },
                    selected && { backgroundColor: colors.success },
                ]}
                elevation={1}
            >
                <GameText style={[{ fontSize: scale(16), alignSelf: "flex-start", fontWeight: "bold" }, MOBILE && { fontSize: 14 }]}>
                    {value}
                </GameText>
                <Image source={image} style={[{ width: image_size, height: image_size }]} resizeMode="contain" tintColor={colors.secondary} />
                <GameText style={[{ fontSize: scale(16), fontWeight: "bold" }, MOBILE && { fontSize: 14 }]}>{name}</GameText>
            </Surface>
        </TouchableRipple>
    )
}
