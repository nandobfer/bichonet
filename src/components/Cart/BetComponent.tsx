import React from "react"
import { TouchableOpacity, View } from "react-native"
import { BetItem } from "../../types/BetItem"
import { Icon, Text } from "react-native-paper"
import { GameText } from "../../Screens/Game/GameText"
import { colors } from "../../style/colors"
import { currencyMask } from "../../tools/currencyMask"
import { useCart } from "../../hooks/useCart"

interface BetComponentProps {
    id?: string
    label: string
    value: number
    bold?: boolean
}

export const BetComponent: React.FC<BetComponentProps> = ({ label, value, bold, id }) => {
    const { removeBet } = useCart()

    return (
        <View style={[{ flex: 1, flexDirection: "row", gap: 10, alignItems: "flex-end" }]}>
            <GameText style={[bold && { fontWeight: "bold" }]}>{label}</GameText>
            <View style={[{ flex: 1, borderBottomColor: colors.secondary, borderBottomWidth: 2, borderStyle: "dashed" }]} />
            <GameText style={[bold && { fontWeight: "bold" }]}>{currencyMask(value)}</GameText>
            {!!id && (
                <TouchableOpacity onPress={() => removeBet(id)}>
                    <Icon source={"delete-forever"} size={20} color={colors.error} />
                </TouchableOpacity>
            )}
        </View>
    )
}
