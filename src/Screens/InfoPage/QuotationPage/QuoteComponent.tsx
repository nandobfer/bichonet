import React from "react"
import { View } from "react-native"
import { QuoteResponse } from "../../../types/QuoteResponse"
import { Icon, Text } from "react-native-paper"
import { game_list } from "../../GameList/game_list"
import { GameText } from "../../Game/GameText"
import { currencyMask } from "../../../tools/currencyMask"
import { colors } from "../../../style/colors"
import { ORIENTATION } from "../../../tools/orientation"

interface QuoteComponentProps {
    quote: QuoteResponse
}

export const QuoteComponent: React.FC<QuoteComponentProps> = ({ quote }) => {
    const game = game_list.find((item) => item.type == quote.tipo)

    return (
        <View style={[{ flex: 1, flexDirection: "row", alignItems: "center", gap: 20 }]}>
            <Icon size={15} source={"circle"} color={colors.secondary} />

            <View style={[{ gap: 10 }]}>
                <GameText style={[{ fontSize: 22 }, ORIENTATION == "desktop" && { fontSize: 24 }]}>{game?.label}</GameText>
                <GameText style={[{ color: colors.success, fontWeight: "bold" }, ORIENTATION === "desktop" && { fontSize: 20 }]}>
                    {currencyMask(quote.valor)}
                </GameText>
            </View>
        </View>
    )
}
