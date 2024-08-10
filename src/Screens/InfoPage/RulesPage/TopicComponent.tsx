import React from "react"
import { View } from "react-native"
import { Surface } from "react-native-paper"
import { colors } from "../../../style/colors"
import { GameText } from "../../Game/GameText"
import { scale } from "../../../tools/scale"

interface TopicComponentProps {
    label: string
    lines: string[]
}

export const TopicComponent: React.FC<TopicComponentProps> = ({ label, lines }) => {
    return (
        <View style={[{ borderColor: colors.primary, borderBottomWidth: 2, borderRadius: 15, padding: scale(20), gap: scale(20) }]}>
            <GameText style={[{ fontSize: scale(30), marginLeft: scale(-20) }]}>{label}</GameText>

            <View style={[{ gap: scale(20) }]}>
                {lines.map((line) => (
                    <GameText key={line}>{line}</GameText>
                ))}
            </View>
        </View>
    )
}
