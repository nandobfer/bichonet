import React from "react"
import { FlatList, View } from "react-native"
import { Button, Text } from "react-native-paper"
import { colors } from "../../style/colors"
import { useCart } from "../../hooks/useCart"
import { BetComponent } from "./BetComponent"
import { game_list } from "../../Screens/GameList/game_list"
import { BettedGameComponent } from "./BettedGameComponent"

interface CartComponentProps {}

export const CartComponent: React.FC<CartComponentProps> = ({}) => {
    const { bets } = useCart()

    const bettedGames = game_list.filter((item) => bets.find((bet) => bet.game.type == item.type))

    return (
        <View style={[{ paddingBottom: 30 }]}>
            <Text style={[{ fontSize: 40, color: colors.secondary }]}>Carrinho</Text>

            <FlatList
                data={bettedGames}
                renderItem={({ item }) => <BettedGameComponent game={item} bets={bets.filter((bet) => bet.game.type === item.type)} />}
                contentContainerStyle={[{ paddingVertical: 10, gap: 20 }]}
                ListFooterComponent={<BetComponent label="TOTAL" value={bets.reduce((total, bet) => (total += bet.betValue), 0)} bold />}
            />

            <Button
                mode="contained"
                buttonColor={colors.success}
                textColor={colors.background}
                labelStyle={[{ fontSize: 22, fontWeight: "bold" }]}
                style={[{ marginTop: 10 }]}
            >
                PAGAR
            </Button>
        </View>
    )
}
