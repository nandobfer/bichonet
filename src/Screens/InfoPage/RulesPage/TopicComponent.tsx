import React from "react"
import { View } from "react-native"
import { Surface } from "react-native-paper"
import { colors } from "../../../style/colors"
import { GameText } from "../../Game/GameText"

interface TopicComponentProps {
    label: string
    lines: string[]
}

export const TopicComponent: React.FC<TopicComponentProps> = ({ label, lines }) => {
    return (
        <View style={[{ borderColor: colors.primary, borderBottomWidth: 2, borderRadius: 15, padding: 20, gap: 20 }]}>
            <GameText style={[{ fontSize: 30, marginLeft: -20 }]}>{label}</GameText>

            <View style={[{ gap: 20 }]}>
                {lines.map((line) => (
                    <GameText key={line}>{line}</GameText>
                ))}
            </View>
        </View>
    )
}
