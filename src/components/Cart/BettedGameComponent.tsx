import React from "react"
import { View } from "react-native"
import { GameOption } from "../../types/GameOption"
import { BetItem } from "../../types/BetItem"
import { Text } from "react-native-paper"
import { colors } from "../../style/colors"
import { BetComponent } from "./BetComponent"
import { ORIENTATION } from "../../tools/orientation"

interface BettedGameComponentProps {
    game: GameOption
    bets: BetItem[]
}

export const BettedGameComponent: React.FC<BettedGameComponentProps> = ({ game, bets }) => {
    const prizes = [...new Set(bets.map((item) => item.selectedPrizes).flatMap((item) => item))].map((item) => `(${item})`)

    return (
        <View style={[{ flex: 1, gap: 5 }]}>
            <Text style={[{ fontSize: 22, fontWeight: "bold", color: colors.secondary }, ORIENTATION == "mobile" && { fontSize: 18 }]}>
                {game.label + " "}
                {prizes.join(" ")}
            </Text>
            <View style={[{ gap: 5 }, ORIENTATION == "mobile" && { gap: 10 }]}>
                {bets.map((bet, index) => (
                    <BetComponent key={bet.betNumber + index.toString()} label={bet.betNumber} value={bet.betValue} id={bet.id} />
                ))}
            </View>
        </View>
    )
}
