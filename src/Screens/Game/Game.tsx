import { RouteProp } from "@react-navigation/native"
import React, { useState } from "react"
import { View } from "react-native"
import { Surface, Text, TextInput } from "react-native-paper"
import { DefaultWrapper } from "../../components/DefaultWrapper"
import { game_list } from "../GameList/game_list"
import { colors } from "../../style/colors"

interface GameProps {
    route: RouteProp<any, any>
}

export const Game: React.FC<GameProps> = ({ route }) => {
    const game_type = route.params?.tipo
    const game = game_list.find((item) => item.path == game_type)

    const [value, setValue] = useState("")

    return game ? (
        <DefaultWrapper>
            <View style={[{ paddingHorizontal: 30, gap: 20 }]}>
                <Surface style={[{ backgroundColor: colors.primary, borderRadius: 15, justifyContent: "center", alignItems: "center", padding: 10 }]}>
                    <Text style={[{ fontSize: 30, fontWeight: "bold", color: colors.background }]}>{game.label}</Text>
                </Surface>

                <TextInput
                    mode="outlined"
                    value={value}
                    onChangeText={(value) => setValue(value)}
                    outlineStyle={[{ borderRadius: 15 }]}
                    keyboardType="number-pad"
                    contentStyle={[{ textAlign: "center", fontSize: 40, fontWeight: "bold", color: colors.background }]}
                    style={[{ padding: 10 }]}
                    maxLength={game.max_chars}
                />

                <Text style={[{ color: colors.secondary }]}>Selecione os prêmios:</Text>
            </View>
        </DefaultWrapper>
    ) : null
}
