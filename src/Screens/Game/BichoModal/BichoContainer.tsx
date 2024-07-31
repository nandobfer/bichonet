import { Image, ImageSource } from "expo-image"
import React from "react"
import { View } from "react-native"
import { GameText } from "../GameText"
import { Surface, TouchableRipple } from "react-native-paper"
import { colors } from "../../../style/colors"
import { ORIENTATION } from "../../../tools/orientation"

interface BichoContainerProps {
    name: string
    image: ImageSource
    value: string
    selected?: boolean
    onBichoPress: (value: string) => void
}

export const BichoContainer: React.FC<BichoContainerProps> = ({ name, image, value, selected, onBichoPress }) => {
    const image_size = ORIENTATION === "mobile" ? 50 : 80

    return (
        <TouchableRipple borderless style={[{ borderRadius: 15, flex: 1 }]} onPress={() => onBichoPress(value)}>
            <Surface
                style={[
                    { flex: 1, alignItems: "center", gap: 5, borderRadius: 15, backgroundColor: colors.primary, padding: 10 },
                    selected && { backgroundColor: colors.success },
                ]}
                elevation={1}
            >
                <GameText style={[{ fontSize: 16, alignSelf: "flex-start", fontWeight: "bold" }, ORIENTATION === "mobile" && { fontSize: 14 }]}>
                    {value}
                </GameText>
                <Image source={image} style={[{ width: image_size, height: image_size }]} contentFit="contain" tintColor={colors.secondary} />
                <GameText style={[{ fontSize: 16, fontWeight: "bold" }, ORIENTATION === "mobile" && { fontSize: 14 }]}>{name}</GameText>
            </Surface>
        </TouchableRipple>
    )
}
