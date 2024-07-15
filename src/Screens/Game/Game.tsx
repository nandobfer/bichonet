import { RouteProp } from "@react-navigation/native"
import React, { useState } from "react"
import { FlatList, View } from "react-native"
import { Surface, Text, TextInput } from "react-native-paper"
import { DefaultWrapper } from "../../components/DefaultWrapper"
import { game_list } from "../GameList/game_list"
import { colors } from "../../style/colors"
import { PrizeComponent } from "./PrizeComponent"
import { isPrizeSelected } from "../../tools/isPrizeSelected"

interface GameProps {
    route: RouteProp<any, any>
}

export const Game: React.FC<GameProps> = ({ route }) => {
    const game_type = route.params?.tipo
    const game = game_list.find((item) => item.path == game_type)

    const [value, setValue] = useState("")
    const [selectedPrizes, setSelectedPrizes] = useState(0)

    const handleChangeValue = (typed: string) => {
        const numeric = typed.match(/\d/g)
        if (numeric?.length == typed.length || !typed) {
            setValue(typed)
        }
    }

    const handlePressPrize = (prize_unix: number) => {
        let current_prizes = selectedPrizes
        const is_selected = isPrizeSelected(prize_unix, selectedPrizes)
        setSelectedPrizes(is_selected ? (current_prizes -= prize_unix) : (current_prizes += prize_unix))
    }

    return game ? (
        <DefaultWrapper>
            <View style={[{ paddingHorizontal: 30, gap: 20 }]}>
                <Surface style={[{ backgroundColor: colors.primary, borderRadius: 15, justifyContent: "center", alignItems: "center", padding: 10 }]}>
                    <Text style={[{ fontSize: 30, fontWeight: "bold", color: colors.background }]}>{game.label}</Text>
                </Surface>

                <TextInput
                    mode="outlined"
                    value={value}
                    onChangeText={handleChangeValue}
                    outlineStyle={[{ borderRadius: 15 }]}
                    keyboardType="number-pad"
                    contentStyle={[{ textAlign: "center", fontSize: 40, fontWeight: "bold", color: colors.background }]}
                    style={[{ padding: 10 }]}
                    maxLength={game.max_chars}
                />

                <Text style={[{ color: colors.secondary, fontSize: 20 }]}>Selecione os prêmios:</Text>

                <FlatList
                    horizontal
                    data={new Array(game.prizes).fill(1).map((_, index) => Math.pow(2, index))}
                    renderItem={({ item, index }) => (
                        <PrizeComponent
                            prize_number={index + 1}
                            value={item}
                            selected={isPrizeSelected(item, selectedPrizes)}
                            onPress={handlePressPrize}
                        />
                    )}
                    contentContainerStyle={[{ gap: 5 }]}
                />
            </View>
        </DefaultWrapper>
    ) : null
}
