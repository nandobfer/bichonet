import React from "react"
import { FlatList, View } from "react-native"
import { Button, IconButton, Text } from "react-native-paper"
import { colors } from "../../style/colors"
import { useCart } from "../../hooks/useCart"
import { BetComponent } from "./BetComponent"
import { game_list } from "../../Screens/GameList/game_list"
import { BettedGameComponent } from "./BettedGameComponent"
import { useDrawer } from "../../hooks/useDrawer"
import { ORIENTATION } from "../../tools/orientation"

interface CartComponentProps {}

export const CartComponent: React.FC<CartComponentProps> = ({}) => {
    const { toggleDrawer } = useDrawer()
    const { bets, total } = useCart()

    const bettedGames = game_list.filter((item) => bets.find((bet) => bet.game.type == item.type))

    return (
        <View style={[{ paddingBottom: 30, gap: 20 }]}>
            <View style={[{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }]}>
                <Text style={[{ fontSize: 30, color: colors.secondary, fontWeight: "bold" }, ORIENTATION == "desktop" && { fontSize: 35 }]}>
                    Carrinho
                </Text>
                <IconButton
                    onPress={() => toggleDrawer()}
                    icon={"close-circle"}
                    style={[{ alignSelf: "flex-end", margin: 0 }]}
                    iconColor={colors.secondary}
                    size={ORIENTATION == "desktop" ? 50 : 35}
                />
            </View>

            <FlatList
                data={bettedGames}
                renderItem={({ item }) => <BettedGameComponent game={item} bets={bets.filter((bet) => bet.game.type === item.type)} />}
                contentContainerStyle={[{ paddingVertical: 10, gap: 20 }]}
                ListFooterComponent={<BetComponent label="TOTAL" value={total} bold />}
            />

            <Button
                mode="contained"
                buttonColor={colors.success}
                textColor={colors.background}
                labelStyle={[{ fontSize: 22, fontWeight: "bold" }]}
                disabled={!total}
            >
                PAGAR
            </Button>
        </View>
    )
}
