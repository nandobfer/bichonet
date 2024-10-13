import React from "react"
import { View } from "react-native"
import { GameOption } from "../../types/GameOption"
import { BetItem } from "../../types/BetItem"
import { Text } from "react-native-paper"
import { colors } from "../../style/colors"
import { BetComponent } from "./BetComponent"
import { MOBILE, ORIENTATION } from "../../tools/orientation"
import { scale } from "../../tools/scale"

interface BettedGameComponentProps {
    game: GameOption
    bets: BetItem[]
    prize: number
}

export const BettedGameComponent: React.FC<BettedGameComponentProps> = ({ game, bets, prize }) => {
    return (
        <View style={[{ flex: 1, gap: scale(5) }]}>
            <Text
                style={[
                    {
                        fontFamily: "Courier",
                        fontSize: scale(16),
                        fontWeight: "bold",
                        color: "#000",
                        marginBottom: scale(10),
                    },
                    MOBILE && { fontSize: 16 },
                ]}
            >
                {game.label + " "}({prize === 1 ? "1º" : "1º ao 5º"})
            </Text>
            <View style={[{ gap: scale(5) }, MOBILE && { gap: 10 }]}>
                {bets.map((bet, index) => (
                    <BetComponent key={bet.betNumber + index.toString()} label={bet.betNumber} value={bet.betValue} id={bet.id} />
                ))}
            </View>
        </View>
    )
}
