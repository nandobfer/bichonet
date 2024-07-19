import React from "react"
import { View } from "react-native"
import { BetItem } from "../../types/BetItem"
import { Text } from "react-native-paper"
import { GameText } from "../../Screens/Game/GameText"
import { colors } from "../../style/colors"
import { currencyMask } from "../../tools/currencyMask"

interface BetComponentProps {
    label: string
    value: number
    bold?: boolean
}

export const BetComponent: React.FC<BetComponentProps> = ({ label, value, bold }) => {
    return (
        <View style={[{ flex: 1, flexDirection: "row", gap: 10 }]}>
            <GameText style={[bold && { fontWeight: "bold" }]}>{label}</GameText>
            <View style={[{ flex: 1, borderBottomColor: colors.secondary, borderBottomWidth: 2, borderStyle: "dashed" }]} />
            <GameText style={[bold && { fontWeight: "bold" }]}>{currencyMask(value)}</GameText>
        </View>
    )
}
