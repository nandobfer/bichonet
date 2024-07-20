import React from "react"
import { View } from "react-native"
import { QuoteResponse } from "../../../types/QuoteResponse"
import { Text } from "react-native-paper"
import { game_list } from "../../GameList/game_list"
import { GameText } from "../../Game/GameText"
import { currencyMask } from "../../../tools/currencyMask"
import { colors } from "../../../style/colors"

interface QuoteComponentProps {
    quote: QuoteResponse
}

export const QuoteComponent: React.FC<QuoteComponentProps> = ({ quote }) => {
    const game = game_list.find((item) => item.type == quote.tipo)

    return (
        <View style={[{ flex: 1, flexDirection: "row", justifyContent: "space-between" }]}>
            <GameText>{game?.label}</GameText>
            <GameText style={[{ color: colors.success, fontWeight: "bold" }]}>{currencyMask(quote.valor)}</GameText>
        </View>
    )
}
