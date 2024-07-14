import React from "react"
import { FlatList, View } from "react-native"
import { Header } from "../MainMenu/Header"
import { Drawer } from "../MainMenu/Drawer"
import { colors } from "../../style/colors"
import { ORIENTATION } from "../../tools/orientation"
import { game_list } from "./game_list"
import { GameListButton } from "./GameListButton"
import { Text } from "react-native-paper"

interface GameListProps {}

export const GameList: React.FC<GameListProps> = ({}) => {
    return (
        <View style={[{ flex: 1, backgroundColor: colors.background, overflow: "hidden" }, ORIENTATION == "desktop" && { paddingHorizontal: 600 }]}>
            <Header />

            <Text style={[{ color: colors.secondary, fontSize: 22, padding: 30, textAlign: "center", paddingTop: 0 }]}>
                Escolha qual modalidade você quer apostar
            </Text>

            <FlatList
                numColumns={3}
                data={game_list}
                renderItem={({ item }) => <GameListButton label={item.label} secondary_label={item.secondary_label} />}
                keyExtractor={(item) => item.path}
                contentContainerStyle={[{ paddingHorizontal: 30, gap: 20, paddingBottom: 20 }]}
                columnWrapperStyle={[{ gap: 20 }]}
            />

            <Drawer />
        </View>
    )
}
